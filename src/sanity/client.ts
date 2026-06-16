import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { LandingPageCmsData } from './types';
import { LANDING_PAGE_QUERY, FALLBACK_CMS_DATA } from './queries';

/**
 * Configure standard Sanity Client.
 * Variables are retrieved dynamically with production-ready fallbacks.
 * These can be configured in .env or the AI Studio settings panel.
 */
const env = (import.meta as any).env || {};

export const sanityConfig = {
  projectId: env.VITE_SANITY_PROJECT_ID || 'xcr46fa2',
  dataset: env.VITE_SANITY_DATASET || 'production',
  apiVersion: env.VITE_SANITY_API_VERSION || '2026-06-09',
  useCdn: env.NODE_ENV === 'production', // Use CDN in production for ultra-low latency
  token: env.VITE_SANITY_PREVIEW_TOKEN || '', // Standard authorization token for previews and editorial Drafts
};

// Create the standard public client (caches on Sanity Edge CDN)
export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
});

// Create a client for Draft/Preview modes (bypasses CDN to fetch fresh drafts immediately)
export const previewClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: false,
  token: sanityConfig.token || undefined,
  perspective: 'previewDrafts', // Fetches both draft and published documents, prioritizing drafts
});

// Image URL helper builder
const imageBuilder = imageUrlBuilder(sanityClient);

/**
 * Turns Sanity image asset references into fully-formed public CDN URLs.
 * Bypasses elegantly if no image object is given.
 */
export function urlFor(source: any) {
  if (!source || !source.asset) return '';
  return imageBuilder.image(source).url() || '';
}

/**
 * Data Fetching Architecture:
 * Load all landing page components from either Sanity CMS (with real-time draft/preview toggles)
 * or fall back seamlessly to premium offline data if Sanity is not yet deployed.
 */
export async function fetchLandingPageCmsData(options?: {
  usePreview?: boolean;
}): Promise<LandingPageCmsData> {
  const isPreview = options?.usePreview || false;
  const clientToUse = isPreview ? previewClient : sanityClient;

  console.log('[SANITY CONFIG]', {
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: sanityConfig.useCdn
  });

  // Check if project configuration exists, otherwise skip expensive fail-loops and fallback instantly
  if (!sanityConfig.projectId || sanityConfig.projectId === 'your_project_id' || sanityConfig.projectId.trim() === '') {
    console.info('[Sanity CMS] Standard fallback active. Utilizing local offline-first CMS data.');
    console.warn('[Sanity CMS] Project ID not configured yet. Using offline-first fallbacks.');
    return {
      ...FALLBACK_CMS_DATA,
      whyChooseUsSection: {
        ...FALLBACK_CMS_DATA.whyChooseUs,
        subtitle: FALLBACK_CMS_DATA.whyChooseUs.subheading,
      },
      workflow: {
        ...FALLBACK_CMS_DATA.workflowSection,
        subtitle: FALLBACK_CMS_DATA.workflowSection.description,
        steps: FALLBACK_CMS_DATA.workflowSection.steps.map(s => ({ ...s, label: s.badge })),
      },
      testimonialsSection: {
        ...FALLBACK_CMS_DATA.testimonialsSection,
        subtitle: FALLBACK_CMS_DATA.testimonialsSection.description,
        whatsappChatHeading: FALLBACK_CMS_DATA.testimonialsSection.whatsappClientName,
        whatsappChatSubheading: 'Online',
        chatMessages: [
          { sender: FALLBACK_CMS_DATA.testimonialsSection.whatsappClientName, text: FALLBACK_CMS_DATA.testimonialsSection.whatsappClientMessage, time: '15:42', isOutgoing: false },
          { sender: 'Konsultan SBU', text: FALLBACK_CMS_DATA.testimonialsSection.whatsappAgentMessage, time: '15:45', isOutgoing: true }
        ],
      },
      pricingSection: {
        ...FALLBACK_CMS_DATA.pricingSection,
        title: FALLBACK_CMS_DATA.pricingSection.titleLine1,
        subtitle: FALLBACK_CMS_DATA.pricingSection.description,
        packages: FALLBACK_CMS_DATA.pricingSection.packages.map(pkg => ({
          ...pkg,
          name: pkg.tierName,
          description: pkg.tierBio,
          priceValue: pkg.priceText,
          priceLabel: pkg.priceSubLabel,
          note: pkg.priceSubLabel,
          ctaLabel: pkg.buttonLabel,
        })),
      }
    } as any;
  }

  try {
    console.log('[SANITY FETCH START]');
    const rawData = await clientToUse.fetch<any>(LANDING_PAGE_QUERY);
    console.log('[SANITY RAW RESPONSE]', rawData);
    console.log('RAW SANITY RESPONSE', rawData);

    const mappedBenefits = (rawData?.benefitsSection?.benefitsList || FALLBACK_CMS_DATA.benefitsSection.benefitsList).map((b: any) => ({
      ...b,
      metricText: b.metricLabel || b.metricText || '',
    }));

    const mappedPackages = (rawData?.pricingSection?.packages || FALLBACK_CMS_DATA.pricingSection.packages).map((pkg: any) => ({
      ...pkg,
      name: pkg.tierName || pkg.name || '',
      description: pkg.tierBio || pkg.description || '',
      priceValue: pkg.priceText || pkg.priceValue || '',
      priceLabel: pkg.priceSubLabel || pkg.priceLabel || '',
      note: pkg.priceSubLabel || pkg.note || '',
      ctaLabel: pkg.buttonLabel || pkg.ctaLabel || '',
    }));

    const whyChooseUsData = {
      ...FALLBACK_CMS_DATA.whyChooseUs,
      ...(rawData?.whyChooseUs || {}),
      pointsList: rawData?.whyChooseUs?.pointsList || FALLBACK_CMS_DATA.whyChooseUs.pointsList,
      subtitle: rawData?.whyChooseUs?.subheading || rawData?.whyChooseUs?.subtitle || FALLBACK_CMS_DATA.whyChooseUs.subheading,
    };

    const workflowData = {
      ...FALLBACK_CMS_DATA.workflowSection,
      ...(rawData?.workflowSection || {}),
      steps: (rawData?.workflowSection?.steps || FALLBACK_CMS_DATA.workflowSection.steps).map((s: any) => ({
        ...s,
        label: s.badge || s.label || '',
      })),
      subtitle: rawData?.workflowSection?.description || rawData?.workflowSection?.subtitle || FALLBACK_CMS_DATA.workflowSection.description,
    };

    const testimonialsData = {
      ...FALLBACK_CMS_DATA.testimonialsSection,
      ...(rawData?.testimonialsSection || {}),
      testimonialsList: rawData?.testimonialsSection?.testimonialsList || FALLBACK_CMS_DATA.testimonialsSection.testimonialsList,
      subtitle: rawData?.testimonialsSection?.description || rawData?.testimonialsSection?.subtitle || FALLBACK_CMS_DATA.testimonialsSection.description,
      whatsappChatHeading: rawData?.testimonialsSection?.whatsappClientName || FALLBACK_CMS_DATA.testimonialsSection.whatsappClientName,
      whatsappChatSubheading: 'Online',
      chatMessages: [
        {
          sender: rawData?.testimonialsSection?.whatsappClientName || FALLBACK_CMS_DATA.testimonialsSection.whatsappClientName,
          text: rawData?.testimonialsSection?.whatsappClientMessage || FALLBACK_CMS_DATA.testimonialsSection.whatsappClientMessage,
          time: '15:42',
          isOutgoing: false
        },
        {
          sender: 'Konsultan SBU',
          text: rawData?.testimonialsSection?.whatsappAgentMessage || FALLBACK_CMS_DATA.testimonialsSection.whatsappAgentMessage,
          time: '15:45',
          isOutgoing: true
        }
      ],
    };

    const pricingData = {
      ...FALLBACK_CMS_DATA.pricingSection,
      ...(rawData?.pricingSection || {}),
      title: rawData?.pricingSection?.titleLine1 || rawData?.pricingSection?.title || FALLBACK_CMS_DATA.pricingSection.titleLine1,
      subtitle: rawData?.pricingSection?.description || rawData?.pricingSection?.subtitle || FALLBACK_CMS_DATA.pricingSection.description,
      packages: mappedPackages,
    };

    const mergedData: LandingPageCmsData = {
      hero: { ...FALLBACK_CMS_DATA.hero, ...(rawData?.hero || {}) },
      ctaConfig: { ...FALLBACK_CMS_DATA.ctaConfig, ...(rawData?.ctaConfig || {}) },
      logoCarousel: {
        title: rawData?.logoCarousel?.title || FALLBACK_CMS_DATA.logoCarousel.title,
        partners: rawData?.logoCarousel?.partners || FALLBACK_CMS_DATA.logoCarousel.partners,
      },
      problemSection: {
        ...FALLBACK_CMS_DATA.problemSection,
        ...(rawData?.problemSection || {}),
        problemsList: rawData?.problemSection?.problemsList || FALLBACK_CMS_DATA.problemSection.problemsList,
      },
      benefitsSection: {
        ...FALLBACK_CMS_DATA.benefitsSection,
        ...(rawData?.benefitsSection || {}),
        benefitsList: mappedBenefits,
      },
      whyChooseUs: whyChooseUsData,
      whyChooseUsSection: whyChooseUsData,
      workflowSection: workflowData,
      workflow: workflowData,
      testimonialsSection: testimonialsData,
      pricingSection: pricingData,
      faqSection: {
        ...FALLBACK_CMS_DATA.faqSection,
        ...(rawData?.faqSection || {}),
        faqList: rawData?.faqSection?.faqList || FALLBACK_CMS_DATA.faqSection.faqList,
      },
      footerConfig: { ...FALLBACK_CMS_DATA.footerConfig, ...(rawData?.footerConfig || {}) },
      siteSettings: { ...FALLBACK_CMS_DATA.siteSettings, ...(rawData?.siteSettings || {}) },
    };

    const mappedData = mergedData;
    console.log('MAPPED DATA', mappedData);
    console.log('[SANITY MERGED DATA]', mergedData);
    console.log('MAPPED CMS DATA', mergedData);
    return mergedData;
  } catch (error) {
    console.error('[SANITY FETCH ERROR]', error);
    console.warn('[Sanity CMS] Expected API fallback triggered. Serving local offline-first dataset.', error);
    return {
      ...FALLBACK_CMS_DATA,
      whyChooseUsSection: {
        ...FALLBACK_CMS_DATA.whyChooseUs,
        subtitle: FALLBACK_CMS_DATA.whyChooseUs.subheading,
      },
      workflow: {
        ...FALLBACK_CMS_DATA.workflowSection,
        subtitle: FALLBACK_CMS_DATA.workflowSection.description,
        steps: FALLBACK_CMS_DATA.workflowSection.steps.map(s => ({ ...s, label: s.badge })),
      },
      testimonialsSection: {
        ...FALLBACK_CMS_DATA.testimonialsSection,
        subtitle: FALLBACK_CMS_DATA.testimonialsSection.description,
        whatsappChatHeading: FALLBACK_CMS_DATA.testimonialsSection.whatsappClientName,
        whatsappChatSubheading: 'Online',
        chatMessages: [
          { sender: FALLBACK_CMS_DATA.testimonialsSection.whatsappClientName, text: FALLBACK_CMS_DATA.testimonialsSection.whatsappClientMessage, time: '15:42', isOutgoing: false },
          { sender: 'Konsultan SBU', text: FALLBACK_CMS_DATA.testimonialsSection.whatsappAgentMessage, time: '15:45', isOutgoing: true }
        ],
      },
      pricingSection: {
        ...FALLBACK_CMS_DATA.pricingSection,
        title: FALLBACK_CMS_DATA.pricingSection.titleLine1,
        subtitle: FALLBACK_CMS_DATA.pricingSection.description,
        packages: FALLBACK_CMS_DATA.pricingSection.packages.map(pkg => ({
          ...pkg,
          name: pkg.tierName,
          description: pkg.tierBio,
          priceValue: pkg.priceText,
          priceLabel: pkg.priceSubLabel,
          note: pkg.priceSubLabel,
          ctaLabel: pkg.buttonLabel,
        })),
      }
    } as any;
  }
}
