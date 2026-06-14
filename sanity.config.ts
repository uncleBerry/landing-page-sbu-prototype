import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';
import { structure } from './src/sanity/structure';

const env = (import.meta as any).env || {};

const singletonTypes = [
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

export default defineConfig({
  name: 'default',
  title: 'SBU Konstruksi CMS',

  projectId: env.VITE_SANITY_PROJECT_ID || 'xcr46fa2',
  dataset: env.VITE_SANITY_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
    // Disable creating new singleton documents from the global "New Document" menu button
    templates: (prev) => prev.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },

  document: {
    // Restrict actions on singleton types to protect integrity of stable database records
    actions: (prev, context) => {
      if (singletonTypes.includes(context.schemaType)) {
        return prev.filter((actionObj) => {
          return actionObj.action && !['delete', 'duplicate', 'unpublish'].includes(actionObj.action);
        });
      }
      return prev;
    }
  }
});


