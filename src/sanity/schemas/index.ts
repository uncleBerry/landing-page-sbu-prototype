/**
 * Sanity CMS Schemas index for Construction SBU Landing Page
 * Ready to be imported directly into sanity.config.ts or schemaTypes/index.ts in Sanity Studio.
 */

// 1. Hero Section Schema
export const heroSchema = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    { name: 'badgeText', title: 'Pillar Badge Text', type: 'string', initialValue: 'SERTIFIKASI LPJK RESMI' },
    { name: 'titleFirstLine', title: 'Title First Line', type: 'string', initialValue: 'Jasa Pengurusan' },
    { name: 'titleHighlight', title: 'Title Highlighted Line', type: 'string', initialValue: 'SBU Konstruksi' },
    { name: 'titleLastLine', title: 'Title Last Line', type: 'string', initialValue: 'Kilat & 100% Legal' },
    { name: 'description', title: 'Description Paragraph', type: 'text', initialValue: 'Fokus Anda di proyek, biarkan kami yang mengurus birokrasinya sampai tuntas terbit. Jangan biarkan tender melayang karena dokumen belum siap!' },
    { name: 'ctaLabel', title: 'Main CTA Label', type: 'string', initialValue: 'Amankan SBU Saya Sekarang' },
    { name: 'subCtaLabel', title: 'Sub-CTA Online Status Text', type: 'string', initialValue: '● KONSULTAN KAMI READY' },
    { name: 'subCtaDescription', title: 'Sub-CTA Online Description', type: 'string', initialValue: 'Real-time screening dari ahli regulasi LPJK' },
    { name: 'metric1Value', title: 'Metric 1 Value', type: 'string', initialValue: '2.400+' },
    { name: 'metric1Label', title: 'Metric 1 Label', type: 'string', initialValue: 'SBU Terbit' },
    { name: 'metric2Value', title: 'Metric 2 Value', type: 'string', initialValue: '7-14 Hari' },
    { name: 'metric2Label', title: 'Metric 2 Label', type: 'string', initialValue: 'Proses Cepat' },
    { name: 'metric3Value', title: 'Metric 3 Value', type: 'string', initialValue: '100%' },
    { name: 'metric3Label', title: 'Metric 3 Label', type: 'string', initialValue: 'Garansi Legal' },
    { name: 'backgroundImage', title: 'Background Image Overlay', type: 'image', options: { hotspot: true } }
  ]
};

// 2. CTA Configuration Schema (Global CTA Button settings)
export const ctaSchema = {
  name: 'ctaConfig',
  title: 'CTA & Conversions',
  type: 'document',
  fields: [
    { name: 'mainWhatsappMessage', title: 'Default WhatsApp Message Content', type: 'text', initialValue: 'Halo, saya ingin berkonsultasi mengenai pengurusan SBU untuk perusahaan saya.' },
    { name: 'urgencyBanner', title: 'Urgency Warning Banner Tagline', type: 'string', initialValue: '⚠️ SLOT KONSULTASI SBU TERBATAS PEKAN INI' },
    { name: 'freeConsultationQuotaText', title: 'Free Consultation Quota Promo Text', type: 'string', initialValue: 'Sisa kuota gratis hari ini: 3 Perusahaan' }
  ]
};

// 3. Logo Carousel Schema
export const logoCarouselSchema = {
  name: 'logoCarousel',
  title: 'Logo Carousel (Trust Bar)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Carousel Label Text', type: 'string', initialValue: 'DIPERCAYA OLEH:' },
    {
      name: 'partners',
      title: 'Partner Names / Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partner',
          fields: [
            { name: 'name', title: 'Partner Company Name', type: 'string' },
            { name: 'logo', title: 'Partner Logo Image (Optional)', type: 'image' }
          ]
        }
      ]
    }
  ]
};

// 4. Problem Section Schema
export const problemSchema = {
  name: 'problemSection',
  title: 'Problem Section',
  type: 'document',
  fields: [
    { name: 'tagline', title: 'Warning Tagline', type: 'string', initialValue: '// RISIKO & KENDALA LAPANGAN' },
    { name: 'titleLine1', title: 'Heading Line 1', type: 'string', initialValue: 'Awas! Dokumen Tidak Lengkap Bisa' },
    { name: 'titleHighlight', title: 'Heading Highlighted Word', type: 'string', initialValue: 'Menghentikan' },
    { name: 'titleLine2', title: 'Heading Line 2', type: 'string', initialValue: 'Bisnis Konstruksi Anda' },
    { name: 'warningText', title: 'Warning Banner Paragraph', type: 'text', initialValue: '⚠️ Jika dibiarkan, peluang proyek dapat hilang secara permanen sebelum Anda sempat mengajukan penawaran resmi.' },
    {
      name: 'problemsList',
      title: 'Problem Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'problemItem',
          fields: [
            { name: 'title', title: 'Problem Title', type: 'string' },
            { name: 'description', title: 'Problem Description', type: 'text' }
          ]
        }
      ]
    }
  ]
};

// 5. Benefits / Solution Section Schema
export const benefitsSchema = {
  name: 'benefitsSection',
  title: 'Benefits & Solutions',
  type: 'document',
  fields: [
    { name: 'tagline', title: 'Solution Tagline', type: 'string', initialValue: '// INTEGRITAS LAYANAN UTAMA' },
    { name: 'titleLine1', title: 'Heading Line 1', type: 'string', initialValue: 'Layanan Terpadu Terbit SBU' },
    { name: 'titleHighlight', title: 'Heading Highlighted Word', type: 'string', initialValue: 'Satu Pintu' },
    { name: 'titleLine2', title: 'Heading Line 2', type: 'string', initialValue: 'Selesai Kilat' },
    { name: 'description', title: 'Section Description', type: 'text', initialValue: 'Sistem pemrosesan kami dirancang untuk memotong birokrasi, memberikan visibilitas penuh, dan melindungi dana investasi perizinan Anda secara komprehensif.' },
    {
      name: 'benefitsList',
      title: 'Benefit Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'benefitItem',
          fields: [
            { name: 'title', title: 'Benefit Cardinal Title', type: 'string' },
            { name: 'description', title: 'Detailed Value Description', type: 'text' },
            { name: 'metricLabel', title: 'Bottom Metric/Label', type: 'string' }
          ]
        }
      ]
    }
  ]
};

// 6. Why Choose Us Schema
export const whyChooseUsSchema = {
  name: 'whyChooseUs',
  title: 'Why Choose Us Section',
  type: 'document',
  fields: [
    { name: 'tagline', title: 'Section Tagline', type: 'string', initialValue: '// ANALISIS KEUNGGULAN OPERASIONAL' },
    { name: 'title', title: 'Heading Title', type: 'string', initialValue: 'Mengapa Banyak Kontraktor Memilih Kami?' },
    { name: 'subheading', title: 'Section Sub-heading label', type: 'string', initialValue: 'STANDAR PERUSAHAAN INTERNASIONAL - ISO ALIGNED' },
    {
      name: 'pointsList',
      title: 'Competitive Edge Points',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'whyChooseUsItem',
          fields: [
            { name: 'title', title: 'Point Title', type: 'string' },
            { name: 'description', title: 'Description Text', type: 'text' }
          ]
        }
      ]
    }
  ]
};

// 7. Workflow State / Steps Schema
export const workflowSchema = {
  name: 'workflowSection',
  title: 'Workflow Steps',
  type: 'document',
  fields: [
    { name: 'tagline', title: 'Section Tagline', type: 'string', initialValue: '// TRANSPARAN, EFISIEN, & TERVERIFIKASI' },
    { name: 'title', title: 'Heading Title', type: 'string', initialValue: 'Peta Jalan Pengurusan SBU Anda' },
    { name: 'description', title: 'Section Description', type: 'text', initialValue: 'Proses pengurusan sertifikasi tidak lagi membingungkan. Kami melakukan pekerjaan berat sehingga Anda bisa beristirahat dengan tenang.' },
    {
      name: 'steps',
      title: 'Workflow Steps List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stepItem',
          fields: [
            { name: 'stepNumber', title: 'Step Number/Code', type: 'string' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Action details', type: 'text' },
            { name: 'badge', title: 'Dynamic Status Badge', type: 'string' }
          ]
        }
      ]
    }
  ]
};

// 8. Testimonials Schema
export const testimonialsSchema = {
  name: 'testimonialsSection',
  title: 'Testimonials Area',
  type: 'document',
  fields: [
    { name: 'tagline', title: 'Section Tagline', type: 'string', initialValue: '// REAL-TIME CHAT INTERACTIONS' },
    { name: 'title', title: 'Heading Title', type: 'string', initialValue: 'Apa Kata Klien Kami?' },
    { name: 'description', title: 'Section Subtext', type: 'text', initialValue: 'Transparansi dan hasil nyata adalah komitmen utama kami. Kami bangga menjadi bagian dari kesuksesan tender puluhan korporat di Indonesia.' },
    {
      name: 'testimonialsList',
      title: 'Customer Reviews List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonialItem',
          fields: [
            { name: 'quote', title: 'Quote text', type: 'text' },
            { name: 'author', title: 'Client Director Name', type: 'string' },
            { name: 'title', title: 'Company Title / Bio', type: 'string' },
            { name: 'stars', title: 'Star Count (5-1)', type: 'number', initialValue: 5 },
            { name: 'date', title: 'Review Date Label', type: 'string' }
          ]
        }
      ]
    },
    { name: 'whatsappClientName', title: 'Mock WhatsApp Client Username', type: 'string', initialValue: 'Klien (PT Mitra Karya Utama)' },
    { name: 'whatsappClientMessage', title: 'Mock WhatsApp Client Chat Bubble', type: 'text', initialValue: 'Halo selamat sore mas. Saya mau kabarkan kalau SBU Kecil kami sudah tayang di siki lpjk ya mas, lancar dicek scan qr nya. Terima kasih bimbingannya!' },
    { name: 'whatsappAgentMessage', title: 'Mock WhatsApp Admin Response Bubble', type: 'text', initialValue: 'Sore Pak Wijaya, alhamdulillah ikut bersenang hati mendengar kabar baik ini. SBU sudah aktif resmi dan siap disubmit untuk pendaftaran tender Kemensetneg besok ya Pak. Semoga berkah proyeknya!' }
  ]
};

// 9. Pricing/Qualifications Schema
export const pricingSchema = {
  name: 'pricingSection',
  title: 'Pricing & Packages',
  type: 'document',
  fields: [
    { name: 'tagline', title: 'Section Tagline', type: 'string', initialValue: '// ESTIMASI ANGGARAN INVESTASI' },
    { name: 'titleLine1', title: 'Heading Line 1', type: 'string', initialValue: 'Skema Rencana Biaya Transparan' },
    { name: 'titleHighlight', title: 'Heading Highlight', type: 'string', initialValue: 'Sesuai Kualifikasi' },
    { name: 'description', title: 'Section Description', type: 'text', initialValue: 'Skema penganggaran transparan tanpa embel-embel biaya admin tambahan. Layanan pendampingan hukum dan penempatan berkas LPJK terjamin aman.' },
    {
      name: 'packages',
      title: 'Pricing Packages List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pricingPackage',
          fields: [
            { name: 'tierName', title: 'Tier Name (e.g. Kualifikasi Kecil)', type: 'string' },
            { name: 'tierBio', title: 'Tier Brief Summary', type: 'string' },
            { name: 'priceText', title: 'Price Tag text (e.g. Rp X.XXX.XXX)', type: 'string' },
            { name: 'priceSubLabel', title: 'Price Disclaimer Text', type: 'string' },
            { name: 'features', title: 'Inclusions list', type: 'array', of: [{ type: 'string' }] },
            { name: 'isFeatured', title: 'Paling Banyak Dipilih (Highlight Card)', type: 'boolean', initialValue: false },
            { name: 'buttonLabel', title: 'Button CTA Text', type: 'string' }
          ]
        }
      ]
    }
  ]
};

// 10. FAQ Schema
export const faqSchema = {
  name: 'faqSection',
  title: 'FAQ Area',
  type: 'document',
  fields: [
    { name: 'tagline', title: 'Section Tagline', type: 'string', initialValue: '// REGULATORY CLEARANCE FAQ' },
    { name: 'title', title: 'Heading Title', type: 'string', initialValue: 'FAQ Regulasi / Pengurusan SBU' },
    {
      name: 'faqList',
      title: 'Questions and Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            { name: 'question', title: 'Question (Q)', type: 'string' },
            { name: 'answer', title: 'Answer (A)', type: 'text' }
          ]
        }
      ]
    }
  ]
};

// 11. Footer configuration
export const footerSchema = {
  name: 'footerConfig',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    { name: 'companyName', title: 'Full Corporate Name', type: 'string', initialValue: 'PT REGULASI KONSTRUKSI INDONESIA' },
    { name: 'tagline', title: 'Footer Corporate Slogan', type: 'string', initialValue: 'Konsultan Terpercaya Mitigasi Tender & Sertifikasi Terpadu Keagenan LPJK Indonesia.' },
    { name: 'officeAddress', title: 'Physical Office Address', type: 'text', initialValue: 'Treasury Tower It. 18, Sudirman Central Business District (SCBD) Kav. 52-53, Jakarta Selatan' },
    { name: 'operationalHours', title: 'Active Business Hours', type: 'string', initialValue: 'Senin - Jumat | 09:00 - 17:00 WIB' },
    { name: 'subtagline', title: 'Disclaimers Text / Footnote', type: 'text', initialValue: 'PENAFIAN TEKNIS: Seluruh pengurusan diuji & didukung oleh tim kualifikasi penjaminan independen. Kami bukan instansi pemerintah LPJK/PUPR, melainkan kantor jasa konsultasi komersial berlisensi keagenan resmi.' },
    { name: 'copyrightText', title: 'Copyright string text', type: 'string', initialValue: '© 2026 PT Regulasi Konstruksi Indonesia. All rights reserved.' }
  ]
};

// 12. SEO and Settings Schema (Configuration document)
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'General Settings & SEO',
  type: 'document',
  fields: [
    { name: 'whatsappNumber', title: 'WhatsApp Contact Number (No leading +, e.g., 628123456789)', type: 'string', initialValue: '628123456789' },
    { name: 'metaTitle', title: 'Meta SEO Title', type: 'string', initialValue: 'Jasa Pengurusan SBU Konstruksi Kilat & 100% Legal - LPJK Resmi' },
    { name: 'metaDescription', title: 'Meta SEO Description', type: 'text', initialValue: 'Fokus tawarkan tender Anda, kami urus SBU kilat terpercaya. Proses 7-14 hari kerja selesai garansi uang kembali 100% dari PT Regulasi Konstruksi.' },
    { name: 'ogTitle', title: 'Open Graph Social Title', type: 'string', initialValue: 'Jasa SBU Konstruksi Kilat Resmi LPJK & KemenPUPR' },
    { name: 'ogDescription', title: 'Open Graph Social Description', type: 'text', initialValue: 'Penerbitan SBU legal, amanah, dan terjamin untuk memenangkan tender Anda. Hubungi ahli regulasi kami sekarang!' },
    { name: 'ogImage', title: 'Open Graph Sharing Image link', type: 'image' },
    { name: 'brandName', title: 'Header Brand Name', type: 'string', initialValue: 'SBU Express' },
    { name: 'brandLogo', title: 'Brand Logo', type: 'image', options: { hotspot: true } },
    { name: 'favicon', title: 'Favicon', type: 'image', options: { hotspot: true } },
    { name: 'headerCtaLabel', title: 'Header CTA Button Label', type: 'string', initialValue: 'Konsultasi Gratis' },
    { name: 'floatingWhatsappLabel', title: 'Floating WhatsApp Button Label', type: 'string', initialValue: 'Konsultasi WhatsApp' },
    { name: 'businessEmail', title: 'Business Email Address', type: 'string', initialValue: 'info@sbuexpress.co.id' },
    { name: 'instagramUrl', title: 'Instagram Profile URL', type: 'url', initialValue: 'https://instagram.com' },
    { name: 'linkedinUrl', title: 'LinkedIn Profile URL', type: 'url', initialValue: 'https://linkedin.com' },
    { name: 'facebookUrl', title: 'Facebook Page URL', type: 'url', initialValue: 'https://facebook.com' },
    { name: 'officeAddress', title: 'Corporate Office Address', type: 'text', initialValue: 'Treasury Tower lt. 18, Sudirman Central Business District (SCBD) Kav. 52-53, Jakarta Selatan' },
    { name: 'leadFormTitle', title: 'Lead Form Title', type: 'string', initialValue: 'Formulir Pengajuan Evaluasi Dokumen SBU' },
    { name: 'leadFormDescription', title: 'Lead Form Description', type: 'text', initialValue: 'Silakan isi data legalitas awal Anda, sistem akan me-redirect chat konsultasi secara otomatis.' },
    { name: 'nameFieldLabel', title: 'Name Field Label', type: 'string', initialValue: 'Nama Lengkap Pemohon *' },
    { name: 'nameFieldPlaceholder', title: 'Name Field Placeholder', type: 'string', initialValue: 'contoh: Ir. Bambang Widjojo' },
    { name: 'phoneFieldLabel', title: 'Phone Field Label', type: 'string', initialValue: 'Nomor WhatsApp Aktif *' },
    { name: 'phoneFieldPlaceholder', title: 'Phone Field Placeholder', type: 'string', initialValue: 'contoh: 08123456789' },
    { name: 'emailFieldLabel', title: 'Email Field Label', type: 'string', initialValue: 'Email Bisnis Resmi *' },
    { name: 'emailFieldPlaceholder', title: 'Email Field Placeholder', type: 'string', initialValue: 'contoh: ditektur@perusahaan.co.id' },
    { name: 'companyFieldLabel', title: 'Company Field Label', type: 'string', initialValue: 'Nama Perusahaan Konstruksi *' },
    { name: 'companyFieldPlaceholder', title: 'Company Field Placeholder', type: 'string', initialValue: 'contoh: PT Mahakarya Pratama' },
    { name: 'serviceFieldLabel', title: 'Service Field Label', type: 'string', initialValue: 'Jenis Layanan Sertifikat *' },
    { name: 'notesFieldLabel', title: 'Notes Field Label', type: 'string', initialValue: 'Catatan Tambahan (Opsional)' },
    { name: 'notesFieldPlaceholder', title: 'Notes Field Placeholder', type: 'string', initialValue: 'e.g. Ingin perpanjangan SBU kode klasifikasi BG-009 dalam 3 minggu.' },
    { name: 'submitButtonLabel', title: 'Submit Button Label', type: 'string', initialValue: 'Submit & Jadwalkan Sesi Konsultasi' },
    { name: 'privacyNotice', title: 'Privacy Notice Text', type: 'string', initialValue: '🔒 DATA ANDA DILINDUNGI PROTOKOL PRIVASI SSL ENCRYPTED' },
    { name: 'successTitle', title: 'Success Title', type: 'string', initialValue: 'FORMULIR BERHASIL TERKIRIM' },
    { name: 'successMessage', title: 'Success Message Text', type: 'text', initialValue: 'Terima kasih Bapak/Ibu {name}. Anda sedang dialihkan secara otomatis ke aplikasi WhatsApp resmi konsultan utama kami.' },
    { name: 'manualRedirectLabel', title: 'Manual Redirect Label', type: 'string', initialValue: 'JIKA WHATSAPP TIDAK TERBUKA OTOMATIS:' },
    { name: 'manualRedirectButtonLabel', title: 'Manual Redirect Button Label', type: 'string', initialValue: 'KLIK MANUAL UTK WHATSAPP CO' },
    { name: 'backButtonLabel', title: 'Back Button Label', type: 'string', initialValue: 'KEMBALI KE HALAMAN PERIZINAN SBU' },
    {
      name: 'serviceOptions',
      title: 'Service Dropdown Options',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'SBU Kualifikasi Kecil',
        'SBU Kualifikasi Menengah',
        'SBU Kualifikasi Besar',
        'Paket SKK + SBU Terpadu',
        'Belum Tahu (Perlu konsultasi lebih lanjut)'
      ]
    }
  ]
};

// Exporting full array of schemas for Sanity Studio initialization config
export const schemaTypes = [
  heroSchema,
  ctaSchema,
  logoCarouselSchema,
  problemSchema,
  benefitsSchema,
  whyChooseUsSchema,
  workflowSchema,
  testimonialsSchema,
  pricingSchema,
  faqSchema,
  footerSchema,
  siteSettingsSchema
];
