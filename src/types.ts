/**
 * B2B Construction Licensing Design System Types
 */

export type ThemeVariant = 'dark' | 'light';

export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  usage: string;
  contrastRatio: string; // WCAG contrast score preview (e.g., "7.4:1 on Navy-950")
  role: 'primary' | 'secondary' | 'accent' | 'neutral' | 'status';
}

export interface TypographyToken {
  name: string;
  family: string;
  size: string;
  lineHeight: string;
  weight: string;
  usage: string;
  previewText: string;
}

export interface SpacingToken {
  token: string;
  rem: string;
  px: string;
  visualWidth: string; // Percentage value for preview bar representation
  bestFor: string;
}

export interface BorderRadiusToken {
  token: string;
  value: string;
  concept: string;
  constructionAnalogy: string; // Grounded high-relevance analogies for structural authority
}

export interface ShadowToken {
  token: string;
  tailwindClass: string;
  value: string;
  useCase: string;
}

export interface CTAButtonVariant {
  name: string;
  classes: string;
  purpose: string;
  conversionRole: string; // Why this specific style increases trust
}

export interface IconRecommendation {
  name: string;
  iconName: string; // Lucide icon reference string
  role: string;
  useCase: string;
}

/**
 * Concrete construction target segments for dynamic content customization:
 * Shifting the landing page's context live represents a conversion-focused design system.
 */
export type TargetSegment = 'general_contractor' | 'federal_tender' | 'infrastructure_developer' | 'sme_builder';

export interface SegmentConfig {
  id: TargetSegment;
  label: string;
  trustHook: string; // Target-specific top hero hook or trust anchor
  metricText: string; // Tender metrics of importance
  preferredCtaLabel: string;
}
