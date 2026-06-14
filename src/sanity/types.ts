/**
 * TypeScript Interfaces representing Sanity CMS documents
 */

export interface SanityImageReference {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanityHero {
  badgeText: string;
  titleFirstLine: string;
  titleHighlight: string;
  titleLastLine: string;
  description: string;
  ctaLabel: string;
  subCtaLabel: string;
  subCtaDescription: string;
  metric1Value: string;
  metric1Label: string;
  metric2Value: string;
  metric2Label: string;
  metric3Value: string;
  metric3Label: string;
  backgroundImage?: SanityImageReference;
}

export interface SanityCtaConfig {
  mainWhatsappMessage: string;
  urgencyBanner: string;
  freeConsultationQuotaText: string;
}

export interface SanityPartner {
  name: string;
  logo?: SanityImageReference;
}

export interface SanityLogoCarousel {
  title: string;
  partners: SanityPartner[];
}

export interface SanityProblemItem {
  title: string;
  description: string;
}

export interface SanityProblemSection {
  tagline: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  warningText: string;
  problemsList: SanityProblemItem[];
}

export interface SanityBenefitItem {
  title: string;
  description: string;
  metricLabel: string;
  metricText?: string;
}

export interface SanityBenefitsSection {
  tagline: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  description: string;
  benefitsList: SanityBenefitItem[];
}

export interface SanityWhyChooseUsItem {
  title: string;
  description: string;
}

export interface SanityWhyChooseUs {
  tagline: string;
  title: string;
  subheading: string;
  subtitle?: string;
  pointsList: SanityWhyChooseUsItem[];
}

export interface SanityWorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  badge: string;
  label?: string;
}

export interface SanityWorkflowSection {
  tagline: string;
  title: string;
  description: string;
  subtitle?: string;
  steps: SanityWorkflowStep[];
}

export interface SanityTestimonialItem {
  quote: string;
  author: string;
  title: string;
  stars: number;
  date: string;
}

export interface SanityTestimonialsSection {
  tagline: string;
  title: string;
  description: string;
  subtitle?: string;
  testimonialsList: SanityTestimonialItem[];
  whatsappClientName: string;
  whatsappClientMessage: string;
  whatsappAgentMessage: string;
  whatsappChatHeading?: string;
  whatsappChatSubheading?: string;
  chatMessages?: Array<{ sender: string; text: string; time: string; isOutgoing: boolean }>;
}

export interface SanityPricingPackage {
  tierName: string;
  tierBio: string;
  priceText: string;
  priceSubLabel: string;
  features: string[];
  isFeatured: boolean;
  buttonLabel: string;
  name?: string;
  description?: string;
  priceValue?: string;
  priceLabel?: string;
  note?: string;
  ctaLabel?: string;
}

export interface SanityPricingSection {
  tagline: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  packages: SanityPricingPackage[];
  title?: string;
  subtitle?: string;
}

export interface SanityFaqItem {
  question: string;
  answer: string;
}

export interface SanityFaqSection {
  tagline: string;
  title: string;
  faqList: SanityFaqItem[];
}

export interface SanityFooterConfig {
  companyName: string;
  tagline: string;
  officeAddress: string;
  operationalHours: string;
  subtagline: string;
  copyrightText: string;
}

export interface SanitySiteSettings {
  whatsappNumber: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: SanityImageReference;
  brandName?: string;
  brandLogo?: SanityImageReference;
  favicon?: SanityImageReference;
  headerCtaLabel?: string;
  floatingWhatsappLabel?: string;
  businessEmail?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  officeAddress?: string;
  leadFormTitle?: string;
  leadFormDescription?: string;
  nameFieldLabel?: string;
  nameFieldPlaceholder?: string;
  phoneFieldLabel?: string;
  phoneFieldPlaceholder?: string;
  emailFieldLabel?: string;
  emailFieldPlaceholder?: string;
  companyFieldLabel?: string;
  companyFieldPlaceholder?: string;
  serviceFieldLabel?: string;
  notesFieldLabel?: string;
  notesFieldPlaceholder?: string;
  submitButtonLabel?: string;
  privacyNotice?: string;
  successTitle?: string;
  successMessage?: string;
  manualRedirectLabel?: string;
  manualRedirectButtonLabel?: string;
  backButtonLabel?: string;
  serviceOptions?: string[];
}

/**
 * Combined dataset containing all editable items for the landing page
 */
export interface LandingPageCmsData {
  hero: SanityHero;
  ctaConfig: SanityCtaConfig;
  logoCarousel: SanityLogoCarousel;
  problemSection: SanityProblemSection;
  benefitsSection: SanityBenefitsSection;
  whyChooseUs: SanityWhyChooseUs;
  whyChooseUsSection?: SanityWhyChooseUs;
  workflowSection: SanityWorkflowSection;
  workflow?: SanityWorkflowSection;
  testimonialsSection: SanityTestimonialsSection;
  pricingSection: SanityPricingSection;
  faqSection: SanityFaqSection;
  footerConfig: SanityFooterConfig;
  siteSettings: SanitySiteSettings;
}
