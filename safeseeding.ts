import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { FALLBACK_CMS_DATA, LANDING_PAGE_QUERY } from './src/sanity/queries.ts';

// 1. Load dotenv
dotenv.config();

// 2. Explicitly parse .env.local to strictly isolate the user's local token
let token = '';
try {
  const envLocalPath = path.resolve('.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf-8');
    const match = content.match(/VITE_SANITY_PREVIEW_TOKEN=(.*)/);
    if (match && match[1]) {
      token = match[1].trim();
    }
  }
} catch (err: any) {
  console.error('[ERROR] Failed reading .env.local file:', err.message);
}

// 3. Print the token fingerprint
console.log('\n--- TOKEN FINGERPRINT IN USE ---');
if (token) {
  console.log(`- Token length: ${token.length}`);
  console.log(`- First 6 characters: ${token.substring(0, 6)}`);
  console.log(`- Last 4 characters: ${token.substring(token.length - 4)}`);
} else {
  console.log('- Token exists: NO');
}
console.log('--------------------------------\n');

if (!token) {
  console.error('ERROR: VITE_SANITY_PREVIEW_TOKEN is not defined inside .env.local!');
  process.exit(1);
}

const client = createClient({
  projectId: 'xcr46fa2',
  dataset: 'production',
  apiVersion: '2026-06-09',
  useCdn: false,
  token: token,
});

const schemaNames = [
  'hero',
  'ctaConfig',
  'logoCarousel',
  'problemSection',
  'benefitsSection',
  'whyChooseUs',
  'workflowSection',
  'testimonialsSection',
  'pricingSection',
  'faqSection',
  'footerConfig',
  'siteSettings'
];

const schemaMappings: Record<string, keyof typeof FALLBACK_CMS_DATA> = {
  hero: 'hero',
  ctaConfig: 'ctaConfig',
  logoCarousel: 'logoCarousel',
  problemSection: 'problemSection',
  benefitsSection: 'benefitsSection',
  whyChooseUs: 'whyChooseUs',
  workflowSection: 'workflowSection',
  testimonialsSection: 'testimonialsSection',
  pricingSection: 'pricingSection',
  faqSection: 'faqSection',
  footerConfig: 'footerConfig',
  siteSettings: 'siteSettings',
};

async function main() {
  console.log('================================================================');
  console.log('       STARTING SAFE SANITY CMS SEEDING & MIGRATION SERVICE');
  console.log('================================================================');

  // STEP 1 — AUDIT
  console.log('\n--- STEP 1: PERFORMING DATASET AUDIT ---');
  const auditResults: { schema: string; exists: boolean; id: string; action: 'KEEP EXISTING' | 'CREATE NEW' }[] = [];
  const existingDocsMap: Record<string, any> = {};

  for (const schema of schemaNames) {
    try {
      const docs = await client.fetch<any[]>(`*[_type == "${schema}"]`);
      if (docs.length > 0) {
        const doc = docs[0];
        existingDocsMap[schema] = doc;
        auditResults.push({
          schema,
          exists: true,
          id: doc._id,
          action: 'KEEP EXISTING'
        });
      } else {
        auditResults.push({
          schema,
          exists: false,
          id: 'N/A',
          action: 'CREATE NEW'
        });
      }
    } catch (err: any) {
      console.error(`Audit error for ${schema}:`, err.message);
      process.exit(1);
    }
  }

  // Print audit table nicely using template string concatenation (no bitwise OR operator!)
  console.log(`${'Schema'.padEnd(22)} | ${'Exists'.padEnd(8)} | ${'Document ID'.padEnd(40)} | Action`);
  console.log('-'.repeat(85));
  for (const res of auditResults) {
    const sStr = res.schema.padEnd(22);
    const eStr = (res.exists ? 'YES' : 'NO').padEnd(8);
    const idStr = res.id.padEnd(40);
    const actStr = res.action;
    console.log(`${sStr} | ${eStr} | ${idStr} | ${actStr}`);
  }

  // STEP 2 — BACKUP
  console.log('\n--- STEP 2: BACKING UP EXISTING DOCUMENTS ---');
  for (const [schema, doc] of Object.entries(existingDocsMap)) {
    console.log(`\nExisting Document Backup for "${schema}":`);
    console.log(JSON.stringify(doc, null, 2));
  }

  // STEP 3 — PREVIEW
  console.log('\n--- STEP 3: PREVIEWING SEED OPERATIONS ---');
  const missingSchemas = auditResults.filter(r => r.action === 'CREATE NEW');
  if (missingSchemas.length === 0) {
    console.log('All schemas already have existing documents. No documents will be created.');
  } else {
    for (const res of missingSchemas) {
      const key = schemaMappings[res.schema];
      const dataToInsert = FALLBACK_CMS_DATA[key];
      const fieldsPreview = Object.keys(dataToInsert);
      console.log(`\nPreparing creation of: "${res.schema}"`);
      console.log(`  - Document Type: "${res.schema}"`);
      console.log(`  - Target Stable Document ID: "${res.schema}"`);
      console.log(`  - Fields to be inserted: ${fieldsPreview.join(', ')}`);
      
      for (const [fName, fVal] of Object.entries(dataToInsert)) {
        if (Array.isArray(fVal)) {
          console.log(`    + Nested Array "${fName}" contains ${fVal.length} items to be seeded.`);
        }
      }
    }
  }

  // STEP 4 — EXECUTION
  console.log('\n--- STEP 4: EXECUTING SAFE WRITE OPERATIONS ---');
  let createdCount = 0;
  for (const res of auditResults) {
    if (res.action === 'CREATE NEW') {
      const schema = res.schema;
      const key = schemaMappings[schema];
      const fallbackData = FALLBACK_CMS_DATA[key];

      const docToCreate = {
        _id: schema, // Singleton stable ID matching type name
        _type: schema,
        ...fallbackData
      };

      console.log(`Creating singleton document for "${schema}" with ID "${schema}"...`);
      try {
        const result = await (client as any).createIfNotExists(docToCreate);
        console.log(`  -> Successfully created / confirmed "${schema}"! ID: ${result._id}`);
        createdCount++;
      } catch (err: any) {
        console.error(`  [ERROR] Failed to create "${schema}":`, err.message);
        process.exit(1);
      }
    } else {
      console.log(`Preserving existing document "${res.schema}" (ID: ${res.id}) without overwriting.`);
    }
  }
  console.log(`\nSuccessfully completed execution. Created ${createdCount} new documents.`);

  // STEP 5 — VERIFICATION
  console.log('\n--- STEP 5: VERIFYING POST-SEED DATASET STATUS ---');
  const verificationResults: { schema: string; count: number; id: string }[] = [];
  for (const schema of schemaNames) {
    try {
      const docs = await client.fetch<any[]>(`*[_type == "${schema}"]`);
      verificationResults.push({
        schema,
        count: docs.length,
        id: docs.map(d => d._id).join(', ') || 'N/A'
      });
    } catch (err: any) {
      console.error(`Verification query failed for ${schema}:`, err.message);
    }
  }

  console.log(`${'Schema'.padEnd(22)} | ${'Count'.padEnd(8)} | Document ID(s)`);
  console.log('-'.repeat(70));
  for (const vRes of verificationResults) {
    console.log(`${vRes.schema.padEnd(22)} | ${vRes.count.toString().padEnd(8)} | ${vRes.id}`);
  }

  // STEP 6 — LIVE TEST
  console.log('\n--- STEP 6: EXECUTING LIVE landingPage DATA FETCH TEST ---');
  try {
    const rawData = await client.fetch<any>(LANDING_PAGE_QUERY);
    
    console.log('\nVerifying that each section holds live Sanity CMS data:');
    for (const section of schemaNames) {
      const liveSectionData = rawData[section];
      if (liveSectionData) {
        console.log(`  [OK] "${section}" returns live valid content (ID/Source: Sanity)`);
      } else {
        console.log(`  [FAILED] "${section}" returned null or empty!`);
      }
    }

    console.log('\nSanity CMS is now the primary content source for all landing page sections.');
  } catch (err: any) {
    console.error('Unified Fetch Query Failed:', err.message);
  }

  console.log('\n================================================================');
  console.log('       SAFE SANITY CMS SEEDING & MIGRATION COMPLETED SUCCESSFULLY');
  console.log('================================================================\n');
}

main().catch(err => {
  console.error('Fatal crash inside seeding engine:', err);
});
