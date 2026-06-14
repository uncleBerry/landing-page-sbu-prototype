import { 
  ColorToken, 
  TypographyToken, 
  SpacingToken, 
  BorderRadiusToken, 
  ShadowToken, 
  CTAButtonVariant, 
  IconRecommendation, 
  SegmentConfig 
} from './types';

export const TARGET_SEGMENTS: SegmentConfig[] = [
  {
    id: 'federal_tender',
    label: 'Federal Bid / Joint Venture Tender',
    trustHook: 'ISO 9001 Alignment & Federal Procurement Compliance Audit Strategy',
    metricText: '99.4% Joint-Venture Bid Pass Rate with High-Value Projects',
    preferredCtaLabel: 'Download Gov-Tender Pre-Qualification Matrix'
  },
  {
    id: 'general_contractor',
    label: 'General Tier-1 Contractor',
    trustHook: 'Class-A Corporate Licensing System for Multi-State Compliance',
    metricText: 'Average 17 Business Days Fast-Track License Approval Speed',
    preferredCtaLabel: 'Get Corporate Compliance Diagnostic Report'
  },
  {
    id: 'infrastructure_developer',
    label: 'Infrastructure & Heavy Civil Developer',
    trustHook: 'Large-Scale Engineering Board Licensing, Bonding & Audit Risk Mitigation',
    metricText: '$1.4B Underwritten Project Insurance Capacity Complied With',
    preferredCtaLabel: 'Schedule Private Board Consultation'
  },
  {
    id: 'sme_builder',
    label: 'SME Commercial Contractor',
    trustHook: 'Local Builder to Commercial Contractor Transition License Matrix',
    metricText: 'Zero-Risk Full Assurance Deposit Insurance Coverage Scheme',
    preferredCtaLabel: 'Start Self-Guided Assessment Matrix'
  }
];

export const COLOR_TOKENS: ColorToken[] = [
  // Primary (Deep Corporate Trust)
  {
    name: 'Tender Anchor Navy (950)',
    variable: '--color-navy-950',
    hex: '#0a111b',
    usage: 'Primary layout background. Conveys high-value stability, federal weight, and premium security.',
    contrastRatio: '18.2:1 against White text',
    role: 'primary'
  },
  {
    name: 'Institutional Deep Navy (800)',
    variable: '--color-navy-800',
    hex: '#1c324d',
    usage: 'Container grids, high-fidelity headers, and content boundaries.',
    contrastRatio: '14.5:1 against White text',
    role: 'primary'
  },
  {
    name: 'Structural Mid Navy (600)',
    variable: '--color-navy-600',
    hex: '#3c628f',
    usage: 'Active borders, subtle cards, metadata accents, and key lines.',
    contrastRatio: '4.8:1 against Dark Canvas, 5.2:1 on White',
    role: 'primary'
  },
  
  // Orange (High-impact premium accents over professional Navy)
  {
    name: 'High-Impact Orange (500)',
    variable: '--color-orange-500',
    hex: '#f97316',
    usage: 'Premium accents, high-engagement indicators, call-to-actions, and warning markers.',
    contrastRatio: '4.8:1 against Navy-950 (WCAG Pass for titles)',
    role: 'accent'
  },
  {
    name: 'Energetic Flame Orange (600)',
    variable: '--color-orange-600',
    hex: '#ea580c',
    usage: 'Core button states, active text labels, highlighting, and dynamic metric labels.',
    contrastRatio: '5.1:1 on Navy-950',
    role: 'accent'
  },
  {
    name: 'Soft Sunset Orange (100)',
    variable: '--color-orange-100',
    hex: '#ffedd5',
    usage: 'Warm highlight panels, badge backgrounds, or high-focus indicators with premium reading contrast.',
    contrastRatio: '13.5:1 against Slate-950',
    role: 'accent'
  },

  // Neutrals (Concrete, Slate & Hard Steel representation)
  {
    name: 'Steel Slate Deep (800)',
    variable: '--color-slate-800',
    hex: '#1e293b',
    usage: 'Secondary layout cards, solid structure panels, and text blocks.',
    contrastRatio: '13.1:1 on White text',
    role: 'neutral'
  },
  {
    name: 'Hard Concrete Slate (500)',
    variable: '--color-slate-500',
    hex: '#64748b',
    usage: 'Pure functional text, secondary metadata descriptions, and disabled visual guidelines.',
    contrastRatio: '4.7:1 against White base',
    role: 'neutral'
  },
  {
    name: 'Clean Ice Slate (50)',
    variable: '--color-slate-50',
    hex: '#f8fafc',
    usage: 'Primary body text, code background panels, and layout cards.',
    contrastRatio: '19.4:1 on Navy-950 text',
    role: 'neutral'
  },
  
  // Status Colors (Ultra-high trust green for guarantees, red for audit risks)
  {
    name: 'Regulatory Approved Green',
    variable: '#22c55e',
    hex: '#22c55e',
    usage: 'Successful pre-qualification, audit validation, and government license approvals.',
    contrastRatio: '7.8:1 (Safe and Certified)',
    role: 'status'
  },
  {
    name: 'Audit Failure Warning Red',
    variable: '#ef4444',
    hex: '#ef4444',
    usage: 'Representing licensing compliance penalties, delay costs, and active audit risks.',
    contrastRatio: '5.2:1 (Clear Alert Contrast)',
    role: 'status'
  }
];

export const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  {
    name: 'Elite Display Sans (Plus Jakarta Sans)',
    family: 'var(--font-display)',
    size: 'text-4xl to text-6xl (36px to 64px)',
    lineHeight: 'leading-none to leading-tight',
    weight: 'font-bold (700)',
    usage: 'Primary hero headers, B2B trust hook titles, and bold value metrics.',
    previewText: 'STRUCTURAL LICENSING EXCELLENCE'
  },
  {
    name: 'Prestige Authority Serif (Playfair Display)',
    family: 'var(--font-serif)',
    size: 'text-2xl to text-4xl (24px to 36px)',
    lineHeight: 'leading-normal',
    weight: 'font-medium (500) & italicize highlights',
    usage: 'Trust endorsements, premium testimonials, executive pull-quotes and luxury consulting packages.',
    previewText: '"Underwritten with absolute compliance guarantees."'
  },
  {
    name: 'Sub-headers & Card Titles (Plus Jakarta Sans)',
    family: 'var(--font-display)',
    size: 'text-lg to text-xl (18px to 20px)',
    lineHeight: 'leading-snug',
    weight: 'font-medium (500) to semi-bold (600)',
    usage: 'Card titles, feature matrix items, regulatory categories, and form field anchors.',
    previewText: 'Class-A Corporate Qualification Tier'
  },
  {
    name: 'Supreme Duty Body (Inter)',
    family: 'var(--font-sans)',
    size: 'text-sm to text-base (14px to 16px)',
    lineHeight: 'leading-relaxed',
    weight: 'font-normal (400) & Medium (500)',
    usage: 'Primary body texts, dense service scopes, multi-state regulations breakdown, and explanatory text paragraphs.',
    previewText: 'We navigate complex state boards, financial underwriting audits, and municipal compliance matrices. Your license is delivered fully guaranteed, or we cover the business delay expense completely.'
  }
];

export const SPACING_TOKENS: SpacingToken[] = [
  { token: '4 (1/4 rem)', rem: '0.25rem', px: '4px', visualWidth: '4%', bestFor: 'Inner padding for badges, bullet alignments, and microscopic line items.' },
  { token: '8 (1/2 rem)', rem: '0.50rem', px: '8px', visualWidth: '8%', bestFor: 'Spacing between tiny details, status badges, labels and text caps.' },
  { token: '12 (3/4 rem)', rem: '0.75rem', px: '12px', visualWidth: '12%', bestFor: 'Card inner margins, compact input fields, list elements.' },
  { token: '16 (1 rem)', rem: '1.00rem', px: '16px', visualWidth: '16%', bestFor: 'Default mobile container padding, standard inputs, gap between buttons.' },
  { token: '24 (1.5 rem)', rem: '1.50rem', px: '24px', visualWidth: '24%', bestFor: 'Desktop card inner padding, secondary title spacing, features grid gaps.' },
  { token: '32 (2 rem)', rem: '2.00rem', px: '32px', visualWidth: '32%', bestFor: 'Form layout rows, layout modules, side borders margin gaps.' },
  { token: '48 (3 rem)', rem: '3.00rem', px: '48px', visualWidth: '48%', bestFor: 'Standard desktop block margins, distance between small sections.' },
  { token: '64 (4 rem)', rem: '4.00rem', px: '64px', visualWidth: '64%', bestFor: 'Large B2B Landing Hero padding, primary section vertical divides.' },
  { token: '96 (6 rem)', rem: '6.00rem', px: '96px', visualWidth: '96%', bestFor: 'Ultimate negative space for premium framing. Keeps page clean and high-status.' }
];

export const RADIUS_TOKENS: BorderRadiusToken[] = [
  {
    token: 'rounded-none',
    value: '0px (Sharp)',
    concept: 'Uncompromising Precision',
    constructionAnalogy: 'Raw marble slab edge. Pure corporate structural authority. Essential for primary CTA outer borders or primary layout frame segments.'
  },
  {
    token: 'rounded-sm',
    value: '4px (Conservative)',
    concept: 'Grounded Stability',
    constructionAnalogy: 'Pre-cast concrete bricks. Standard sharp engineering angle. Excellent for buttons, status grids, form inputs, and technical metrics.'
  },
  {
    token: 'rounded-md',
    value: '8px (Professional)',
    concept: 'Structured Balance',
    constructionAnalogy: 'Polished structural pillar cross-section. Clean but modern, never casual. Recommended default for feature cards, testimonials, and sub-panels.'
  },
  {
    token: 'rounded-lg',
    value: '12px (Premium Overlay)',
    concept: 'Cushioned Sophistication',
    constructionAnalogy: 'Tempered glass partition panels. Maximum padding for B2B dashboards, deep shadow containers, or user files overlays.'
  }
];

export const SHADOW_TOKENS: ShadowToken[] = [
  {
    token: 'shadow-sm (Grounded Slate)',
    tailwindClass: 'shadow-[0_1px_2px_rgba(20,42,66,0.3)]',
    value: '1px clean depth with deep slate bias',
    useCase: 'Used for flat input fields or table cells to create a firm, non-floating baseline.'
  },
  {
    token: 'shadow-md (Anchor Shield)',
    tailwindClass: 'shadow-[0_4px_12px_rgba(10,17,27,0.4)]',
    value: 'Structured 12px depth with rich dark navy overlay',
    useCase: 'Primary card components, service descriptions, and active modal controls.'
  },
  {
    token: 'shadow-lg (Heavy Gravity Overhang)',
    tailwindClass: 'shadow-[0_12px_32px_rgba(6,14,25,0.6)]',
    value: 'Dramatic 32px professional fall shadow with navy-950 tint',
    useCase: 'High-impact element separation, primary lead forms, and visual overlays.'
  },
  {
    token: 'shadow-orange (Elite Accent Glow)',
    tailwindClass: 'shadow-[0_0_15px_rgba(249,115,22,0.15)] border border-orange-500/20',
    value: '15px subtle orange atmospheric back-glow',
    useCase: 'Guaranteed contract highlights, certified status plaques, and active validation feedback.'
  }
];

export const CTA_BUTTONS: CTAButtonVariant[] = [
  {
    name: 'Primary Anchor conversion (Firm Border)',
    classes: 'bg-orange-500 text-navy-950 hover:bg-orange-400 font-display font-semibold transition-all duration-300 tracking-wide select-none',
    purpose: 'Main B2B conversion trigger. Sharp, high contrast, draws direct visual focus.',
    conversionRole: 'Establishes high-prestige premium consulting focus. Replaces childish soft purple pill buttons with majestic orange authority.'
  },
  {
    name: 'Secondary Frame (Deep Navy Contrast)',
    classes: 'border border-orange-500/40 text-orange-400 hover:text-white hover:border-white bg-transparent font-display font-medium transition-all duration-300',
    purpose: 'Secondary paths, licensing criteria downloads, audit checklists.',
    conversionRole: 'Exudes conservative reserve. Lets the decision-maker browse high-value regulatory detail without feeling hard-sold.'
  },
  {
    name: 'Technical Grid Row Link',
    classes: 'text-slate-50 hover:text-orange-400 font-mono text-sm underline underline-offset-4 decoration-orange-500/40 hover:decoration-orange-500 transition-all duration-200',
    purpose: 'Footer legal directories, regional board guidelines, document criteria codes.',
    conversionRole: 'Instills confidence via extreme compliance utility. Connects builder logic with bureaucratic precision.'
  }
];

export const ICON_RECOMMENDATIONS: IconRecommendation[] = [
  { name: 'ShieldAlert', iconName: 'ShieldAlert', role: 'Risk highlighting', useCase: 'Showing raw penalties and project delay costs before licensing validation.' },
  { name: 'BadgeCheck', iconName: 'BadgeCheck', role: 'Affiliation & Status', useCase: 'Stating official state board approvals, dynamic pre-qualifications, and compliance guarantees.' },
  { name: 'Scale', iconName: 'Scale', role: 'Regulatory oversight', useCase: 'Analyzing legal construction requirements, joint-venture corporate bylaws, and city tax codes.' },
  { name: 'TrendingUp', iconName: 'TrendingUp', role: 'Tender Pre-qualification', useCase: 'Guiding constructors on how tier upgrade licensing secures million-dollar government tenders.' },
  { name: 'Hammer', iconName: 'Hammer', role: 'Industrial integrity', useCase: 'Representing commercial builders, sub-contractors, heavy civil developers, and engineers.' },
  { name: 'Lock', iconName: 'Lock', role: 'Bonding & Insurance security', useCase: 'Showing that all client records, audit scores, and financial filings are isolated with federal grade privacy.' }
];

export const HIERARCHY_RULES = [
  {
    title: 'The "70-20-10" Anchor Accent Rule',
    description: 'We allocate 70% of the canvas to structural dark navy layout screens (#0a111b) to express institutional gravity, 20% to crisp cold slate texts, and strictly restrict energetic Orange (#f97316) to 10% for high-conversion call-to-actions, regulatory approvals, and crucial statistics.'
  },
  {
    title: 'Contrast over Clutter',
    description: 'No tiny playful dots or decorative grids. Trust is established through pristine letter spacing (tracking-tight for bold titles, tracking-wide for uppercase caps), balanced 1.625x Golden Ratio line heights, and ample empty page margins.'
  },
  {
    title: 'Visual Proof Framing',
    description: 'Place official credentials and corporate metrics immediately above or adjacent to interactive fields. Never place forms in isolation; they must always be "shielded" by proof stats and guaranteed board outcomes.'
  },
  {
    title: 'Empathetic Risk Framing',
    description: 'Every B2B user has a burning fear of audit failure or licensing delays blocking their project tender. Present this dynamic warning status block in deep crimson adjacent to your orange-accented resolution guarantee.'
  }
];
