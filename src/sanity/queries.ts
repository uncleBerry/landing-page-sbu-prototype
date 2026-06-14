import { LandingPageCmsData } from './types';

/**
 * Single-projection GROQ Query to pull all landing page segments at once.
 * Extremely fast, minimizing API roundtrips.
 */
export const LANDING_PAGE_QUERY = `
{
  "hero": *[_type == "hero"][0] {
    badgeText, titleFirstLine, titleHighlight, titleLastLine,
    description, ctaLabel, subCtaLabel, subCtaDescription,
    metric1Value, metric1Label, metric2Value, metric2Label, metric3Value, metric3Label,
    backgroundImage
  },
  "ctaConfig": *[_type == "ctaConfig"][0] {
    mainWhatsappMessage, urgencyBanner, freeConsultationQuotaText
  },
  "logoCarousel": *[_type == "logoCarousel"][0] {
    title, partners[] { name, logo }
  },
  "problemSection": *[_type == "problemSection"][0] {
    tagline, titleLine1, titleHighlight, titleLine2, warningText,
    problemsList[] { title, description }
  },
  "benefitsSection": *[_type == "benefitsSection"][0] {
    tagline, titleLine1, titleHighlight, titleLine2, description,
    benefitsList[] { title, description, metricLabel }
  },
  "whyChooseUs": *[_type == "whyChooseUs"][0] {
    tagline, title, subheading,
    pointsList[] { title, description }
  },
  "workflowSection": *[_type == "workflowSection"][0] {
    tagline, title, description,
    steps[] { stepNumber, title, description, badge }
  },
  "testimonialsSection": *[_type == "testimonialsSection"][0] {
    tagline, title, description,
    testimonialsList[] { quote, author, title, stars, date },
    whatsappClientName, whatsappClientMessage, whatsappAgentMessage
  },
  "pricingSection": *[_type == "pricingSection"][0] {
    tagline, titleLine1, titleHighlight, description,
    packages[] { tierName, tierBio, priceText, priceSubLabel, features, isFeatured, buttonLabel }
  },
  "faqSection": *[_type == "faqSection"][0] {
    tagline, title,
    faqList[] { question, answer }
  },
  "footerConfig": *[_type == "footerConfig"][0] {
    companyName, tagline, officeAddress, operationalHours, subtagline, copyrightText
  },
  "siteSettings": *[_type == "siteSettings"][0] {
    whatsappNumber, metaTitle, metaDescription, ogTitle, ogDescription, ogImage,
    brandName, brandLogo, favicon, headerCtaLabel, floatingWhatsappLabel, businessEmail,
    instagramUrl, linkedinUrl, facebookUrl, officeAddress,
    leadFormTitle, leadFormDescription, nameFieldLabel, nameFieldPlaceholder,
    phoneFieldLabel, phoneFieldPlaceholder, emailFieldLabel, emailFieldPlaceholder,
    companyFieldLabel, companyFieldPlaceholder, serviceFieldLabel,
    notesFieldLabel, notesFieldPlaceholder, submitButtonLabel, privacyNotice,
    successTitle, successMessage, manualRedirectLabel, manualRedirectButtonLabel,
    backButtonLabel, serviceOptions
  }
}
`;

/**
 * Pristine production Fallback data (based on the Indonesian Landing Page content)
 * which ensures the system never crashes on launch or in a zero-network sandbox.
 */
export const FALLBACK_CMS_DATA: LandingPageCmsData = {
  hero: {
    badgeText: 'SERTIFIKASI LPJK RESMI',
    titleFirstLine: 'Jasa Pengurusan',
    titleHighlight: 'SBU Konstruksi',
    titleLastLine: 'Kilat & 100% Legal',
    description: 'Fokus Anda di proyek, biarkan kami yang mengurus birokrasinya sampai tuntas terbit. Jangan biarkan tender melayang karena dokumen belum siap!',
    ctaLabel: 'Amankan SBU Saya Sekarang',
    subCtaLabel: '● KONSULTAN KAMI READY',
    subCtaDescription: 'Real-time screening dari ahli regulasi LPJK',
    metric1Value: '2.400+',
    metric1Label: 'SBU Terbit',
    metric2Value: '7-14 Hari',
    metric2Label: 'Proses Cepat',
    metric3Value: '100%',
    metric3Label: 'Garansi Legal'
  },
  ctaConfig: {
    mainWhatsappMessage: 'Halo selamat sore, saya ingin konsultasi pengurusan SBU Konstruksi resmi LPJK.',
    urgencyBanner: '⚠️ SLOT KONSULTASI SBU TERBATAS PEKAN INI',
    freeConsultationQuotaText: 'Sisa kuota gratis hari ini: 3 Perusahaan'
  },
  logoCarousel: {
    title: 'DIPERCAYA OLEH:',
    partners: [
      { name: 'ADHI KARYA' },
      { name: 'WASKITA' },
      { name: 'PP PERSERO' },
      { name: 'HUTAMA KARYA' },
      { name: 'WIKA' }
    ]
  },
  problemSection: {
    tagline: '// RISIKO & KENDALA LAPANGAN',
    titleLine1: 'Awas! Dokumen Tidak Lengkap Bisa',
    titleHighlight: 'Menghentikan',
    titleLine2: 'Bisnis Konstruksi Anda',
    warningText: '⚠️ Jika dibiarkan, peluang proyek dapat hilang secara permanen sebelum Anda sempat mengajukan penawaran resmi.',
    problemsList: [
      { title: "Tender Sudah Buka, SBU Belum Siap", description: "Ketertinggalan verifikasi administrasi membuat Anda kehilangan hak partisipasi tender penting." },
      { title: "Berkas Selalu Ditolak LPJK", description: "Kesalahan penempatan tenaga ahli (SKK) yang membuat pengajuan terus berputar tanpa rilis." },
      { title: "Khawatir Keaslian Sertifikat Bodong", description: "Banyak agen murah menjanjikan sertifikat instan yang tidak terdaftar di sistem pemindai QR LPJK." },
      { title: "Bingung Cara Naik Kelas Usaha", description: "Ingin naik ke SBU Menengah/Besar guna mengincar tender bernilai puluhan miliar tanpa tahu jalurnya." }
    ]
  },
  benefitsSection: {
    tagline: '// INTEGRITAS LAYANAN UTAMA',
    titleLine1: 'Layanan Terpadu Terbit SBU',
    titleHighlight: 'Satu Pintu',
    titleLine2: 'Selesai Kilat',
    description: 'Sistem pemrosesan kami dirancang untuk memotong birokrasi, memberikan visibilitas penuh, and melidungi dana investasi perizinan Anda secara komprehensif.',
    benefitsList: [
      { title: "Proses Terarah", description: "Setiap langkah pengumpulan tenaga kerja, kualifikasi keuangan, hingga verifikasi portal terkoordinasi rapi.", metricLabel: "100% On-Track Compliance" },
      { title: "Audit Kelayakan Awal", description: "Sebelum bayar, dokumen Anda disaring dengan standar evaluasi assessor asosiasi guna mencegah kegagalan.", metricLabel: "Zero Rejection Policy" },
      { title: "Layanan Legalitas Terintegrasi", description: "Satu komando untuk SKK (Sertifikat Kompetensi), registrasi asosiasi resmi, dan pencetakan SBU aktif LPJK.", metricLabel: "All-in-One Certification" },
      { title: "Dashboard Monitoring Proyek", description: "Kebebasan memantau status antrean verifikasi Anda di portal LPJK secara transparan tanpa ditutup-tutupi.", metricLabel: "Efisiensi Lintas Proyek" }
    ]
  },
  whyChooseUs: {
    tagline: '// ANALISIS KEUNGGULAN OPERASIONAL',
    title: 'Mengapa Banyak Kontraktor Memilih Kami?',
    subheading: 'STANDAR PERUSAHAAN INTERNASIONAL - ISO ALIGNED',
    pointsList: [
      { title: "Transparansi Biaya Mutlak", description: "Tidak ada tagihan keanggotaan tersembunyi atau biaya admin fiktif. Seluruh penawaran diajukan di awal di atas kertas bermeterai resmi." },
      { title: "Garansi Kelulusan Berkas", description: "Analisis berkas pra-syarat dilakukan oleh mantan auditor kualifikasi. Garansi uang kembali bila terjadi kegagalan audit sistemik." },
      { title: "Tim Ahli Hukum Terdedikasi", description: "Didampingi konsultan hukum konstruksi berlisensi guna menavigasi tumpang tindih regulasi UU Cipta Kerja terbaru." },
      { title: "Layanan One-Stop-Solution", description: "Mulai dari penyediaan tenaga ahli (SKA/SKK), sertifikasi badan usaha, hingga peningkatan kualifikasi usaha." },
      { title: "Jaringan Asosiasi Terluas", description: "Kemitraan erat lintas regional memudahkan koordinasi teknis dan penandatanganan rekomendasi kelayakan." },
      { title: "Pengantaran & Tayang Siki LPJK", description: "Bukan sekadar menerima folder berkas. Kami mengawal penayangan di portal LPJK hingga SBU Anda aktif dan terdaftar secara sah." }
    ]
  },
  workflowSection: {
    tagline: '// TRANSPARAN, EFISIEN, & TERVERIFIKASI',
    title: 'Peta Jalan Pengurusan SBU Anda',
    description: 'Proses pengurusan sertifikasi tidak lagi membingungkan. Kami melakukan pekerjaan berat sehingga Anda bisa beristirahat dengan tenang.',
    steps: [
      { stepNumber: "STEP-01", title: "Pra-Evaluasi & Diagnostik Kelayakan", description: "Penyaringan dokumen finansial, portofolio proyek lama, dan KTA asosiasi. Kami menyusun peta kesenjangan kualifikasi Anda secara gratis dalam 24 jam.", badge: "INITIAL COGNITIVE CHECK" },
      { stepNumber: "STEP-02", title: "Pemetaan & Pemenuhan Tenaga Kerja", description: "Penyelarasan standar kompetensi teknisi lapangan dengan SKK resmi LPJK. Tim hukum kami menyelesaikan penempatan kualifikasi tanpa membuang waktu Anda.", badge: "SKK ALIGNMENT MATRIX" },
      { stepNumber: "STEP-03", title: "Verifikasi Asosiasi & Sidang Komite", description: "Memasuki gerbang otorisasi asosiasi terakreditasi LPJK. Kami mendampingi sidang kelayakan internal agar rekomendasi teknis keluar secepatnya.", badge: "AUDIT HEARINGS" },
      { stepNumber: "STEP-04", title: "Penerbitan & Aktivasi SIKI LPJK", description: "SBU Anda dicetak dan diaktivasi dengan tanda tangan elektronik digital resmi. Validitas QR-code terdaftar nasional untuk kesiapan pengajuan tender.", badge: "FINAL LEGAL RELEASE" }
    ]
  },
  testimonialsSection: {
    tagline: '// REAL-TIME CHAT INTERACTIONS',
    title: 'Apa Kata Klien Kami?',
    description: 'Transparansi dan hasil nyata adalah komitmen utama kami. Kami bangga menjadi bagian dari kesuksesan tender puluhan korporat di Indonesia.',
    testimonialsList: [
      { quote: "SBU kami berhasil terbit tepat waktu sebelum penutupan tender. Tim sangat responsif dan membantu semua screening berkas sampai 100% selesai tanpa kendala teknis.", author: "Ir. H. Bambang Widjojo", title: "Direktur PT Mahakarya Pratama (General Contractor)", stars: 5, date: "Desember 2025" },
      { quote: "Paling suka karena biayanya transparan sejak awal. Sangat terbantu saat mengurus sertifikat tenaga kerja (SKK) untuk kualifikasi klasifikasi Menengah kami.", author: "Sofia Siregar, M.BA.", title: "HR & Compliance Specialist PT Hutama Konstruksi", stars: 5, date: "Januari 2026" },
      { quote: "Rekomendasi terbaik untuk seluruh rekan kontraktor yang jenuh berurusan dengan birokrasi berbelit. SBU keluar cepat, langsung tayang di portal resmi Siki LPJK.", author: "Rian Hidayat, S.T.", title: "Founder & CEO PT Sinergi Infrastruktur Indonesia", stars: 5, date: "Februari 2026" }
    ],
    whatsappClientName: 'Klien (PT Mitra Karya Utama)',
    whatsappClientMessage: 'Halo selamat sore mas. Saya mau kabarkan kalau SBU Kecil kami sudah tayang di siki lpjk ya mas, lancar dicek scan qr nya. Terima kasih bimbingannya!',
    whatsappAgentMessage: 'Sore Pak Wijaya, alhamdulillah ikut bersenang hati mendengar kabar baik ini. SBU sudah aktif resmi dan siap disubmit untuk pendaftaran tender Kemensetneg besok ya Pak. Semoga berkah proyeknya!'
  },
  pricingSection: {
    tagline: '// ESTIMASI ANGGARAN INVESTASI',
    titleLine1: 'Skema Rencana Biaya Transparan',
    titleHighlight: 'Sesuai Kualifikasi',
    description: 'Skema penganggaran transparan tanpa embel-embel biaya admin tambahan. Layanan pendampingan hukum dan penempatan berkas LPJK terjamin aman.',
    packages: [
      {
        tierName: 'PAKET KUALIFIKASI KECIL',
        tierBio: 'Untuk kontraktor pemula yang mengincar legalitas lokal',
        priceText: 'Rp 6.500.000',
        priceSubLabel: '*Sesuai sub-klasifikasi asosiasi',
        features: ['Pengurusan SBU Resmi LPJK', 'Screening Berkas Tenaga Kerja', 'Konsultasi Perizinan Gratis', 'Pendampingan Pengajuan s/d Terbit'],
        isFeatured: false,
        buttonLabel: 'PILIH PAKET KECIL'
      },
      {
        tierName: 'PAKET KUALIFIKASI MENENGAH',
        tierBio: 'Untuk perusahaan yang ingin upgrade klasifikasi kejar tender nasional',
        priceText: 'Rp 14.500.000',
        priceSubLabel: '*Sesuai klasifikasi sub-bidang LPJK',
        features: ['Semua Benefit Paket SBU Kecil', 'Prioritas Pendampingan Tim Hukum', 'Optimasi Strategi Persyaratan Tender', 'Review Berkas Mendalam Tanpa Rejection', 'SKK Tenaga Ahli Terpadu'],
        isFeatured: true,
        buttonLabel: 'PILIH PAKET MENENGAH'
      },
      {
        tierName: 'PAKET KUALIFIKASI BESAR / BUA',
        tierBio: 'Untuk korporasi skala masif dengan bonding penjamin kompleks',
        priceText: 'Custom Quote',
        priceSubLabel: '*Meeting proposal tersusun rapi',
        features: ['Pendampingan Corporate Terpadu', 'Audit Menyeluruh Kepatuhan Hukum', 'Konsultasi Strategis Asosiasi Inti', 'Penanganan Proyek Skala Multinasional', 'Rancangan Dokumen Joint Venture'],
        isFeatured: false,
        buttonLabel: 'JADWALKAN MEETING'
      }
    ]
  },
  faqSection: {
    tagline: '// REGULATORY CLEARANCE FAQ',
    title: 'FAQ Regulasi / Pengurusan SBU',
    faqList: [
      { question: "Berapa lama proses pengurusan SBU?", answer: "Waktu pengerjaan bergantung pada kelengkapan dokumen dan proses verifikasi asosiasi/LPJK. Kami memberikan analisis kelayakan dokumen di awal dan estimasi waktu terperinci antara 7 hingga 14 hari kerja." },
      { question: "Apa saja dokumen utama yang harus disediakan?", answer: "Dokumen esensial mencakup Akta Pendirian, NIB (Nomor Induk Berusaha), Laporan Keuangan, Sertifikat Kompetensi Kerja (SKK) Tenaga Ahli, dan bukti kepemilikan peralatan/proyek jika mendaftar kualifikasi menengah ke atas." },
      { question: "Apakah sertifikat terdaftar resmi di portal Siki?", answer: "Tentu saja. SBU yang diterbitkan 150% asli dan bersertifikat digital resmi, langsung terdaftar di sistem SIKI SBU LPJK PUPR dan dapat langsung divalidasi pemindaian QR di website LPJK resmi." },
      { question: "Bisakah mengurus SBU jika belum memiliki tenaga ahli (SKK)?", answer: "Bisa. Kami memiliki program pemenuhan tenaga ahli terpadu untuk mendampingi perekrutan/pelatihan tenaga kerja internal Anda agar memperoleh SKK resmi LPJK yang disyaratkan." }
    ]
  },
  footerConfig: {
    companyName: 'PT REGULASI KONSTRUKSI INDONESIA',
    tagline: 'Konsultan Terpercaya Mitigasi Tender & Sertifikasi Terpadu Keagenan LPJK Indonesia.',
    officeAddress: 'Treasury Tower lt. 18, Sudirman Central Business District (SCBD) Kav. 52-53, Jakarta Selatan',
    operationalHours: 'Senin - Jumat | 09:00 - 17:00 WIB',
    subtagline: 'PENAFIAN TEKNIS: Seluruh pengurusan diuji & didukung oleh tim kualifikasi penjaminan independen. Kami bukan instansi pemerintah LPJK/PUPR, melainkan kantor jasa konsultasi komersial berlisensi keagenan resmi.',
    copyrightText: '© 2026 PT Regulasi Konstruksi Indonesia. All rights reserved.'
  },
  siteSettings: {
    whatsappNumber: '628123456789',
    metaTitle: 'Jasa Pengurusan SBU Konstruksi Kilat & 100% Legal - LPJK Resmi',
    metaDescription: 'Fokus tawarkan tender Anda, kami urus SBU kilat terpercaya. Proses 7-14 hari kerja selesai garansi uang kembali 100% dari PT Regulasi Konstruksi.',
    ogTitle: 'Jasa SBU Konstruksi Kilat Resmi LPJK & KemenPUPR',
    ogDescription: 'Penerbitan SBU legal, amanah, dan terjamin untuk memenangkan tender Anda. Hubungi ahli regulasi kami sekarang!',
    brandName: 'SBU Express',
    brandLogo: undefined,
    favicon: undefined,
    headerCtaLabel: 'Konsultasi Gratis',
    floatingWhatsappLabel: 'Konsultasi WhatsApp',
    businessEmail: 'info@sbuexpress.co.id',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
    facebookUrl: 'https://facebook.com',
    officeAddress: 'Treasury Tower lt. 18, Sudirman Central Business District (SCBD) Kav. 52-53, Jakarta Selatan',
    leadFormTitle: 'Formulir Pengajuan Evaluasi Dokumen SBU',
    leadFormDescription: 'Silakan isi data legalitas awal Anda, sistem akan me-redirect chat konsultasi secara otomatis.',
    nameFieldLabel: 'Nama Lengkap Pemohon *',
    nameFieldPlaceholder: 'contoh: Ir. Bambang Widjojo',
    phoneFieldLabel: 'Nomor WhatsApp Aktif *',
    phoneFieldPlaceholder: 'contoh: 08123456789',
    emailFieldLabel: 'Email Bisnis Resmi *',
    emailFieldPlaceholder: 'contoh: ditektur@perusahaan.co.id',
    companyFieldLabel: 'Nama Perusahaan Konstruksi *',
    companyFieldPlaceholder: 'contoh: PT Mahakarya Pratama',
    serviceFieldLabel: 'Jenis Layanan Sertifikat *',
    notesFieldLabel: 'Catatan Tambahan (Opsional)',
    notesFieldPlaceholder: 'e.g. Ingin perpanjangan SBU kode klasifikasi BG-009 dalam 3 minggu.',
    submitButtonLabel: 'Submit & Jadwalkan Sesi Konsultasi',
    privacyNotice: '🔒 DATA ANDA DILINDUNGI PROTOKOL PRIVASI SSL ENCRYPTED',
    successTitle: 'FORMULIR BERHASIL TERKIRIM',
    successMessage: 'Terima kasih Bapak/Ibu {name}. Anda sedang dialihkan secara otomatis ke aplikasi WhatsApp resmi konsultan utama kami.',
    manualRedirectLabel: 'JIKA WHATSAPP TIDAK TERBUKA OTOMATIS:',
    manualRedirectButtonLabel: 'KLIK MANUAL UTK WHATSAPP CO',
    backButtonLabel: 'KEMBALI KE HALAMAN PERIZINAN SBU',
    serviceOptions: [
      'SBU Kualifikasi Kecil',
      'SBU Kualifikasi Menengah',
      'SBU Kualifikasi Besar',
      'Paket SKK + SBU Terpadu',
      'Belum Tahu (Perlu konsultasi lebih lanjut)'
    ]
  }
};
