import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { FALLBACK_CMS_DATA } from './src/sanity/queries.ts';

// 1. Load dotenv
dotenv.config();

// 2. Explicitly load token ONLY from .env.local
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
console.log('\n--- TOKEN FINGERPRINT IN USE (MIGRATE) ---');
if (token) {
  console.log(`- Token length: ${token.length}`);
  console.log(`- First 6 characters: ${token.substring(0, 6)}`);
  console.log(`- Last 4 characters: ${token.substring(token.length - 4)}`);
} else {
  console.log('- Token exists: NO');
}
console.log('------------------------------------------\n');

const client = createClient({
  projectId: 'xcr46fa2',
  dataset: 'production',
  apiVersion: '2026-06-09',
  useCdn: false,
  token: token || undefined,
});

const schemaMappings: Record<string, { key: keyof typeof FALLBACK_CMS_DATA; label: string }> = {
  hero: { key: 'hero', label: 'Hero Section' },
  ctaConfig: { key: 'ctaConfig', label: 'CTA & Conversions' },
  logoCarousel: { key: 'logoCarousel', label: 'Logo Carousel (Trust Bar)' },
  problemSection: { key: 'problemSection', label: 'Problem Section' },
  benefitsSection: { key: 'benefitsSection', label: 'Benefits & Solutions' },
  whyChooseUs: { key: 'whyChooseUs', label: 'Why Choose Us' },
  workflowSection: { key: 'workflowSection', label: 'Workflow Steps' },
  testimonialsSection: { key: 'testimonialsSection', label: 'Testimonials Area' },
  pricingSection: { key: 'pricingSection', label: 'Pricing & Packages' },
  faqSection: { key: 'faqSection', label: 'FAQ Area' },
  footerConfig: { key: 'footerConfig', label: 'Footer Settings' },
  siteSettings: { key: 'siteSettings', label: 'General Settings & SEO' },
};

async function runMigration() {
  console.log('====================================================');
  console.log('     SANITY CMS SEED/MIGRATION SERVICE STARTED      ');
  console.log('====================================================');

  if (!token) {
    console.warn('\n[WARNING] No Sanity write token was detected in .env.local.');
    console.warn('The migration script will run in DRY-RUN validation mode.');
  } else {
    console.log('[INFO] Authorization Token detected from .env.local. Executing live migration...\n');
  }

  const report = {
    created: [] as string[],
    updated: [] as string[],
    skipped: [] as string[],
    failed: [] as { type: string; error: string }[],
  };

  for (const [docType, config] of Object.entries(schemaMappings)) {
    console.log(`\nProcessing schema type: "${docType}" (${config.label})`);
    const fallbackData = FALLBACK_CMS_DATA[config.key] as any;

    try {
      const existingDocs = await client.fetch<any[]>(`*[_type == "${docType}"]`);
      
      if (existingDocs.length > 0) {
        const doc = existingDocs[0];
        console.log(`  -> Document exists (ID: ${doc._id})`);

        const updates: Record<string, any> = {};
        let needsUpdate = false;

        for (const [field, val] of Object.entries(fallbackData)) {
          if (val === undefined || val === null) continue;

          if (doc[field] === undefined || doc[field] === null) {
            updates[field] = val;
            needsUpdate = true;
            console.log(`     + Queuing missing field: ${field}`);
          } else if (Array.isArray(val) && val.length > 0) {
            const existingArray = doc[field];
            if (!Array.isArray(existingArray) || existingArray.length === 0) {
              updates[field] = val;
              needsUpdate = true;
              console.log(`     + Queuing empty array seed: ${field} (${val.length} items)`);
            }
          }
        }

        if (needsUpdate) {
          if (!token) {
            console.log(`  [DRY-RUN] Will set updates on ${doc._id}:`, Object.keys(updates));
            report.updated.push(`${docType} (dry-run queue)`);
          } else {
            console.log(`  -> Committing updates ...`);
            await client.patch(doc._id).set(updates).commit();
            console.log(`  -> Successfully updated document!`);
            report.updated.push(docType);
          }
        } else {
          console.log(`  -> Already fully complete. Solid compliance, skipping.`);
          report.skipped.push(docType);
        }
      } else {
        console.log(`  -> No document found. Creating new ...`);
        
        const newDoc = {
          _id: docType, // Stable singleton ID
          _type: docType,
          ...fallbackData,
        };

        if (!token) {
          console.log(`  [DRY-RUN] Will create brand-new document for type "${docType}"`);
          report.created.push(`${docType} (dry-run queue)`);
        } else {
          const created = await (client as any).createIfNotExists(newDoc);
          console.log(`  -> Successfully created document! ID: ${created._id}`);
          report.created.push(docType);
        }
      }
    } catch (err: any) {
      console.error(`  [ERROR] Processing failed on "${docType}":`, err.message);
      report.failed.push({ type: docType, error: err.message });
    }
  }

  console.log('\n====================================================');
  console.log('              MIGRATION / SEED REPORT               ');
  console.log('====================================================');
  console.log(`Documents Created : ${report.created.length}`, report.created);
  console.log(`Documents Updated : ${report.updated.length}`, report.updated);
  console.log(`Documents Skipped : ${report.skipped.length}`, report.skipped);
  console.log(`Documents Failed  : ${report.failed.length}`);
  if (report.failed.length > 0) {
    report.failed.forEach(f => console.log(`  - Type: ${f.type} | Error: ${f.error}`));
  }
  console.log('====================================================\n');
}

runMigration().catch(err => {
  console.error('[FATAL EXCEPTION]:', err);
});
