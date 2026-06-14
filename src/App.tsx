import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  PhoneCall, 
  CheckCircle2, 
  X, 
  Menu, 
  Building2, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Compass, 
  Users, 
  ChevronRight, 
  BadgeCheck, 
  Star, 
  Lock, 
  ExternalLink, 
  MessageSquare, 
  MessageCircle,
  Smartphone,  
  Laptop, 
  BookOpen, 
  Sliders, 
  FileCheck, 
  TrendingUp, 
  Hammer, 
  Copy, 
  Minimize2,
  Check,
  Send,
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './components/ScrollReveal';
import { COLOR_TOKENS, TYPOGRAPHY_TOKENS, SPACING_TOKENS, RADIUS_TOKENS, SHADOW_TOKENS, HIERARCHY_RULES } from './data';
import { fetchLandingPageCmsData, urlFor } from './sanity/client';
import { FALLBACK_CMS_DATA } from './sanity/queries';
import { LandingPageCmsData } from './sanity/types';
import { StudioPage } from './components/StudioPage';
import heroBg from './assets/images/hero_construction_bg_1780959478895.png';

export default function App() {
  // Check for Embedded Sanity Studio Route
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/studio')) {
    return <StudioPage />;
  }

  // Navigation & View Toggles
  const [currentView, setCurrentView] = useState<'landing' | 'design_tokens'>('landing');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic Sanity CMS state
  const [cmsData, setCmsData] = useState<LandingPageCmsData>(FALLBACK_CMS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [usePreviewMode, setUsePreviewMode] = useState(false);

  console.log('CMS DATA', cmsData);
  console.log('WHY CHOOSE', cmsData?.whyChooseUsSection);
  console.log('WORKFLOW', cmsData?.workflow);

  useEffect(() => {
    setIsLoading(true);
    fetchLandingPageCmsData({ usePreview: usePreviewMode })
      .then(data => {
        setCmsData(data);
        console.log('[APP RECEIVED DATA]', data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('[Sanity CMS] Load error:', err);
        setIsLoading(false);
      });
  }, [usePreviewMode]);

  useEffect(() => {
    if (cmsData?.siteSettings) {
      document.title = cmsData.siteSettings.metaTitle || '';
      
      const updateMeta = (name: string, content: string, isRepoProperty?: boolean) => {
        const attributeName = isRepoProperty ? 'property' : 'name';
        let meta = document.querySelector(`meta[${attributeName}="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attributeName, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      updateMeta('description', cmsData.siteSettings.metaDescription || '');
      updateMeta('og:title', cmsData.siteSettings.ogTitle || '', true);
      updateMeta('og:description', cmsData.siteSettings.ogDescription || '', true);
      if (cmsData.siteSettings.ogImage) {
        updateMeta('og:image', urlFor(cmsData.siteSettings.ogImage), true);
      }

      // Dynamic favicon update based on Sanity CMS site settings
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      if (cmsData.siteSettings.favicon) {
        link.href = urlFor(cmsData.siteSettings.favicon);
      } else {
        link.href = '/favicon.ico';
      }
    }
  }, [cmsData]);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  // Custom Phone state (Let users customize their conversion phone number dynamically!)
  const [phoneNumber, setPhoneNumber] = useState('628123456789'); // default ID number

  // Sync phoneNumber with CMS data
  useEffect(() => {
    if (cmsData?.siteSettings?.whatsappNumber) {
      setPhoneNumber(cmsData.siteSettings.whatsappNumber);
    }
  }, [cmsData]);
  
  // Lead Popup Form State
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Belum Tahu (Perlu konsultasi lebih lanjut)');
  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    businessEmail: '',
    companyName: '',
    notes: ''
  });

  // Success screen state inside popup
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Premium Step Processing states
  const [processingStep, setProcessingStep] = useState(0); // 0 = not started, 1, 2, 3, 4
  const [processingPercent, setProcessingPercent] = useState(0);

  // Persistent submission state
  const [isLeadSubmitted, setIsLeadSubmitted] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem("lead_submitted") === "true" : false;
  });
  const [savedWhatsAppUrl, setSavedWhatsAppUrl] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem("lead_whatsapp_url") || "" : "";
  });

  // Floating CTA triggers
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Workflow scroll storytelling states & refs
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);
  const [workflowProgress, setWorkflowProgress] = useState(0);
  const workflowSectionRef = React.useRef<HTMLDivElement>(null);
  const workflowStep1Ref = React.useRef<HTMLDivElement>(null);
  const workflowStep2Ref = React.useRef<HTMLDivElement>(null);
  const workflowStep3Ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!workflowSectionRef.current) return;
      
      const rect = workflowSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const sectionHeight = rect.height;
      const sectionTopFromBottom = viewportHeight - rect.top;
      
      const startTrigger = viewportHeight * 0.8;
      const endTrigger = viewportHeight * 0.2;
      
      const totalDist = sectionHeight + startTrigger - endTrigger;
      const curDist = sectionTopFromBottom;
      
      let overallProgress = 0;
      if (totalDist > 0) {
        overallProgress = Math.min(Math.max(curDist / totalDist, 0), 1);
      }
      setWorkflowProgress(overallProgress * 100);

      const getStepCenter = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return Infinity;
        const sRect = ref.current.getBoundingClientRect();
        return sRect.top + sRect.height / 2;
      };

      const c1 = getStepCenter(workflowStep1Ref);
      const c2 = getStepCenter(workflowStep2Ref);
      const c3 = getStepCenter(workflowStep3Ref);

      const targetRefY = viewportHeight / 2;

      const d1 = Math.abs(c1 - targetRefY);
      const d2 = Math.abs(c2 - targetRefY);
      const d3 = Math.abs(c3 - targetRefY);

      if (d1 <= d2 && d1 <= d3) {
        setActiveWorkflowStep(1);
      } else if (d2 <= d1 && d2 <= d3) {
        setActiveWorkflowStep(2);
      } else {
        setActiveWorkflowStep(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    setTimeout(handleScroll, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const openPopupWithService = (service: string) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate WhatsApp dynamic redirect message & trigger
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    // Auto-message format requested in Section 9 of PRD
    const baseMessage = cmsData?.ctaConfig?.mainWhatsappMessage || 'Halo, saya ingin konsultasi mengenai pengurusan SBU.';
    const finalNotes = formData.notes.trim() ? formData.notes : "Belum ada pertanyaan khusus. Mohon dibantu melakukan evaluasi awal terkait kebutuhan SBU perusahaan kami.";
    const message = `${baseMessage}

Nama: ${formData.fullName || '-'}
WhatsApp: ${formData.whatsappNumber || '-'}
Email: ${formData.businessEmail || '-'}
Perusahaan: ${formData.companyName || '-'}
Layanan: ${selectedService}
Catatan: ${finalNotes}`;

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Start premium step processing
    setIsSubmitting(true);
    setProcessingStep(1);
    setProcessingPercent(15);

    // Step 1: ~600ms duration
    setTimeout(() => {
      setProcessingStep(2);
      setProcessingPercent(45);

      // Step 2: ~700ms duration
      setTimeout(() => {
        setProcessingStep(3);
        setProcessingPercent(75);

        // Step 3: ~700ms duration
        setTimeout(() => {
          setProcessingStep(4);
          setProcessingPercent(95);

          // Step 4 focus duration: ~700ms
          setTimeout(() => {
            setProcessingPercent(100);
            
            // Persist the lead state
            localStorage.setItem("lead_submitted", "true");
            localStorage.setItem("lead_whatsapp_url", waLink);
            setIsLeadSubmitted(true);
            setSavedWhatsAppUrl(waLink);
            setWhatsAppUrl(waLink);
            setFormSubmitted(true);
            setIsSubmitting(false);
            setProcessingStep(0);
            setProcessingPercent(0);

            // Simulate real-time tracking behavior stipulated in PRD Section 13
            console.log('Lead Event Triggered (Meta Pixel: Lead, GA4: FormSubmit)');
            
            // Redirect instantly to WhatsApp as requested
            window.open(waLink, '_blank');
          }, 700);
        }, 700);
      }, 700);
    }, 600);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      whatsappNumber: '',
      businessEmail: '',
      companyName: '',
      notes: ''
    });
    setFormSubmitted(false);
    setIsPopupOpen(false);
    setIsSubmitting(false);
    setProcessingStep(0);
    setProcessingPercent(0);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Live reviews/testimonials content
  const testimonialItems = cmsData?.testimonialsSection?.testimonialsList?.map(item => ({
    quote: item.quote,
    author: item.author,
    title: item.title,
    stars: item.stars,
    date: item.date
  })) || [
    {
      quote: "SBU kami berhasil terbit tepat waktu sebelum penutupan tender. Tim sangat responsif dan membantu semua screening berkas sampai 100% selesai tanpa kendala teknis.",
      author: "Ir. H. Bambang Widjojo",
      title: "Direktur PT Mahakarya Pratama (General Contractor)",
      stars: 5,
      date: "Mei 2026"
    },
    {
      quote: "Sebelumnya berkas kami beberapa kali ditolak karena kesalahan administrasi sertifikasi SKK. Setelah didampingi tim ahli ini, proses jadi jauh lebih transparan, aman, dan lancar dalam 14 hari.",
      author: "Kartika Rahayu, S.T.",
      title: "Owner PT Sinar Cahaya Konstruksi (Tender Spesialis)",
      stars: 5,
      date: "April 2026"
    },
    {
      quote: "Yang paling kami suka adalah rincian pembayaran bertahap dan kepastian hukum yang kokoh. Progres diinfokan melalui sistem chat harian secara profesional.",
      author: "Hendra Wijaya",
      title: "CEO Civil Eng & Builder Group (Heavy Infrastructure Partner)",
      stars: 5,
      date: "Februari 2026"
    }
  ];

  // FAQ Items from Section 10
  const faqItems = (cmsData?.faqSection?.faqList || []).map(item => ({
    q: item.question,
    a: item.answer
  })).length > 0 ? (cmsData?.faqSection?.faqList || []).map(item => ({
    q: item.question,
    a: item.answer
  })) : [
    {
      q: "Berapa lama proses pengurusan SBU?",
      a: "Waktu pengerjaan bergantung pada kelengkapan dokumen dan proses verifikasi asosiasi/LPJK. Kami memberikan analisis kelayakan dokumen di awal dan estimasi waktu terperinci antara 14 hingga 25 hari kerja."
    },
    {
      q: "Apakah sertifikat bisa dicek keasliannya?",
      a: "Ya, 100% terverifikasi. Semua SBU kami diproses melalui jalur kemitraan legal bersertifikat dan dapat langsung dipindai QR-Code-nya untuk dicocokkan ke sistem integrasi LPJK ESDM / Kementerian PUPR."
    },
    {
      q: "Bagaimana jika dokumen saya belum lengkap?",
      a: "Tenang, tim ahli kami akan melakukan screening menyeluruh dan memandu Anda menyusun dokumen yang kurang, termasuk penyidikan SKK Tenaga Ahli konstruksi pendukung."
    },
    {
      q: "Apakah bisa konsultasi secara gratis terlebih dahulu?",
      a: "Tentu saja. Sesi konsultasi awal kami tawarkan 100% gratis tanpa komitmen apa pun agar Anda mengetahui peta kelayakan lisensi sebelum membayar biaya PNBP."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a111b] text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-navy-950">
      
      {/* PROFESSIONAL COMPLIANCE HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#070e17]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-display">
          {/* Logo Brand matching the reference layout */}
          <div className="flex items-center gap-2">
            {cmsData?.siteSettings?.brandLogo ? (
              <img 
                src={urlFor(cmsData.siteSettings.brandLogo)} 
                alt={cmsData?.siteSettings?.brandName || 'SBU Express'} 
                className="h-8 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="bg-orange-500 text-[#0a111b] p-1.5 rounded-sm flex items-center justify-center font-bold tracking-tight shadow-sm">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
            <span className="font-display font-black text-base text-white tracking-wider uppercase">{cmsData?.siteSettings?.brandName || 'SBU Express'}</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300">
            <a 
              href="#solution" 
              onClick={(e) => handleScrollToSection(e, 'solution')}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Solusi
            </a>
            <a 
              href="#why-choose-us" 
              onClick={(e) => handleScrollToSection(e, 'why-choose-us')}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Cara Kerja
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleScrollToSection(e, 'faq')}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              FAQ
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openPopupWithService('Belum Tahu (Perlu konsultasi lebih lanjut)')}
              className="bg-orange-500 hover:bg-orange-600 text-[#0a111b] font-display font-extrabold text-[10px] sm:text-xs px-3 py-2 sm:px-4 sm:py-2.5 rounded-sm uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.15)] cursor-pointer"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              {cmsData?.siteSettings?.headerCtaLabel || 'Konsultasi Gratis'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <motion.div 
            key="landing_view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-20 pb-28"
          >
            {/* HERO SECTION MATCHING REFERENCE DESIGN */}
            <section 
              id="hero" 
              style={{ backgroundImage: `url(${(cmsData?.hero?.backgroundImage ? urlFor(cmsData.hero.backgroundImage) : '') || heroBg})` }}
              className="relative overflow-hidden pt-16 pb-0 bg-cover bg-center"
            >
              {/* Dark immersive overlay targeting readable copy contrast and depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#070e17]/95 via-[#0c1625]/90 to-[#070e17]/70 pointer-events-none"></div>
              
              {/* Architecture subtle blueprint overlay grid with SVG lines */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left space-y-8 pb-12 md:pb-16 lg:pb-20">
                {/* Checkmark Pillar Badge resembling "Sertifikasi LPJK Resmi" */}
                <ScrollReveal variant="fade-up" delay={0.05}>
                  <div className="inline-flex items-center gap-2 bg-[#0c1625]/90 border border-orange-500/30 rounded-sm px-3.5 py-1.5 mx-auto lg:mx-0">
                    <span className="w-4 h-4 bg-emerald-500 text-[#070e17] rounded-sm flex items-center justify-center font-black text-[10px]">✓</span>
                    <span className="font-mono text-[10px] tracking-wider text-orange-400 uppercase font-bold">
                       {cmsData?.hero?.badgeText ?? ''}
                    </span>
                  </div>
                </ScrollReveal>

                {/* Left-aligned readable typesetting content block */}
                <div className="max-w-4xl space-y-6 w-full flex flex-col items-center lg:items-start">
                  {/* Copywriting intact: "Urus SBU Konstruksi Tanpa Ribet, Tanpa Risiko Ditolak, Siap Kejar Tender Besar" */}
                  <ScrollReveal variant="fade-up" delay={0.12}>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight lg:leading-[1.1] uppercase text-center lg:text-left">
                       {cmsData?.hero?.titleFirstLine ?? ''} <br />
                      <span className="text-orange-500">{cmsData?.hero?.titleHighlight ?? ''}</span> <br />
                      <span className="text-white">{cmsData?.hero?.titleLastLine ?? ''}</span>
                    </h1>
                  </ScrollReveal>

                  <ScrollReveal variant="fade-up" delay={0.2} className="w-full">
                    <p className="text-[#cbd5e1] text-xs md:text-sm max-w-2xl leading-relaxed font-sans mx-auto lg:mx-0 text-center lg:text-left">
                      {cmsData?.hero?.description ?? ''}
                    </p>
                  </ScrollReveal>

                  {/* Primary CTA Button styled as big solid orange matching reference */}
                  <ScrollReveal variant="fade-up" delay={0.28} className="w-full">
                    <div className="pt-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
                      <button 
                        onClick={() => openPopupWithService('Belum Tahu (Perlu konsultasi lebih lanjut)')}
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-[#070e17] font-display font-extrabold text-xs py-4 px-8 rounded-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(249,115,22,0.25)] hover:scale-[1.01] cursor-pointer order-1 md:order-2 lg:order-1"
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                        {cmsData?.hero?.ctaLabel ?? ''}
                      </button>
                      
                      <div className="text-xs text-slate-400 font-mono text-center lg:text-left mt-2 sm:mt-0 order-2 md:order-1 lg:order-2 md:mb-2 lg:mb-0">
                        <span className="text-emerald-400 block font-bold">{cmsData?.hero?.subCtaLabel ?? ''}</span>
                        <span>{cmsData?.hero?.subCtaDescription ?? ''}</span>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* High Proof Metrics from Image */}
                  <ScrollReveal variant="fade-up" delay={0.36} className="w-full">
                    <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 w-full max-w-lg border-t border-slate-800/80 mt-10 mx-auto lg:mx-0">
                      <div className="text-center lg:text-left">
                        <div className="font-display font-black text-2xl md:text-3xl text-orange-500 leading-none">{cmsData?.hero?.metric1Value ?? ''}</div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">{cmsData?.hero?.metric1Label ?? ''}</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="font-display font-black text-2xl md:text-3xl text-[#cbd5e1] leading-none">{cmsData?.hero?.metric2Value ?? ''}</div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">{cmsData?.hero?.metric2Label ?? ''}</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="font-display font-black text-2xl md:text-3xl text-orange-500 leading-none">{cmsData?.hero?.metric3Value ?? ''}</div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">{cmsData?.hero?.metric3Label ?? ''}</div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              {/* INTEGRATED TRUST BAR AT THE FOOTER OF THE HERO SECTION */}
              <ScrollReveal variant="fade-in" delay={0.45} className="w-full bg-[#070e17]/85 backdrop-blur-sm border-t border-slate-800/80 py-5 overflow-hidden relative z-20 mt-auto md:mt-0">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold shrink-0">
                    {cmsData?.logoCarousel?.title ?? ''}
                  </span>
                  
                  {/* Viewport masking container for the seamless rightwards marquee slider */}
                  <div className="w-full overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="animate-marquee-right flex items-center whitespace-nowrap">
                      {/* Track Copy 1 */}
                      <div className="flex items-center gap-12 px-6 font-display text-xs font-extrabold text-slate-400 uppercase tracking-widest shrink-0">
                        {(cmsData?.logoCarousel?.partners ?? []).map((partner, pidx) => (
                          <span key={pidx} className="hover:text-orange-500 transition-colors duration-200 cursor-pointer flex items-center gap-2">
                            {partner?.logo && <img src={urlFor(partner.logo)} alt={partner?.name ?? ''} className="h-6 md:h-7 lg:h-8 object-contain inline-block" referrerPolicy="no-referrer" />}
                            <span>{partner?.name ?? ''}</span>
                          </span>
                        ))}
                      </div>
                      {/* Track Copy 2 (Exact Duplicate for perfect seamless transition loop) */}
                      <div className="flex items-center gap-12 px-6 font-display text-xs font-extrabold text-slate-400 uppercase tracking-widest shrink-0">
                        {(cmsData?.logoCarousel?.partners ?? []).map((partner, pidx) => (
                          <span key={`dup-${pidx}`} className="hover:text-orange-500 transition-colors duration-200 cursor-pointer flex items-center gap-2">
                            {partner?.logo && <img src={urlFor(partner.logo)} alt={partner?.name ?? ''} className="h-6 md:h-7 lg:h-8 object-contain inline-block" referrerPolicy="no-referrer" />}
                            <span>{partner?.name ?? ''}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>



            {/* PROBLEM IDENTIFICATION SECTION */}
            <section id="problem" className="max-w-7xl mx-auto px-6 space-y-12">
              <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-4">
                <span className="font-mono text-xs text-rose-500 uppercase tracking-widest block font-bold text-center">{cmsData?.problemSection?.tagline ?? ''}</span>
                <h2 className="font-display text-white text-center">
                  <span className="block md:hidden text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight px-2 uppercase">
                    {cmsData?.problemSection?.titleLine1 ?? ''} <span className="text-rose-500 animate-pulse">{cmsData?.problemSection?.titleHighlight ?? ''}</span> {cmsData?.problemSection?.titleLine2 ?? ''}
                  </span>
                  <span className="hidden md:block text-3xl md:text-4xl font-extrabold uppercase leading-tight">
                    {cmsData?.problemSection?.titleLine1 ?? ''} <span className="text-rose-500 animate-pulse">{cmsData?.problemSection?.titleHighlight ?? ''}</span> {cmsData?.problemSection?.titleLine2 ?? ''}
                  </span>
                </h2>
                <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-sm text-rose-400 text-xs font-mono max-w-xl mx-auto text-center">
                  {cmsData?.problemSection?.warningText ?? ''}
                </div>
              </ScrollReveal>

              {/* Animated Problem Bullet list */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {(cmsData?.problemSection?.problemsList ?? []).map((prob, idx) => (
                  <StaggerItem key={idx} variant="fade-up">
                    <div className="bg-[#1c2e42]/20 border border-slate-800 p-4 rounded-sm hover:border-rose-500/20 transition-all h-full">
                      <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase mb-1.5 font-bold">
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0 stroke-[3]" />
                        PROBLEM #{idx+1}
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#f3ece0] mb-1">{prob?.title ?? ''}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{prob?.description ?? ''}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>

            {/* OUR SOLUTION & BENEFITS */}
            <section id="solution" className="bg-[#0f1a29]/40 border-y border-slate-800 py-20 px-6">
              <div className="max-w-7xl mx-auto space-y-12">
                <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-4">
                  <span className="font-mono text-xs text-orange-500 uppercase tracking-widest block font-bold">// {cmsData?.benefitsSection?.tagline ?? ''}</span>
                  <h2 className="font-display text-[#f3ece0] text-center">
                    <span className="block md:hidden text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight px-2 uppercase text-center">
                      {(() => {
                        const line1 = cmsData?.benefitsSection?.titleLine1 ?? '';
                        if (line1.toLowerCase().includes('kami membantu mendapatkan sbu')) {
                          return (
                            <>
                              Kami Membantu <br />
                              Mendapatkan SBU
                            </>
                          );
                        }
                        const words = line1.split(' ');
                        if (words.length > 2) {
                          const mid = Math.ceil(words.length / 2);
                          return (
                            <>
                              {words.slice(0, mid).join(' ')} <br />
                              {words.slice(mid).join(' ')}
                            </>
                          );
                        }
                        return line1;
                      })()}
                      <br />
                      <span className="inline-block">
                        <span className="text-orange-500">{cmsData?.benefitsSection?.titleHighlight ?? ''}</span>{' '}
                        <span>{cmsData?.benefitsSection?.titleLine2 ?? ''}</span>
                      </span>
                    </span>
                    <span className="hidden md:block text-3xl md:text-4xl font-extrabold uppercase leading-tight text-white">
                      {cmsData?.benefitsSection?.titleLine1 ?? ''} <br />
                      <span className="text-orange-500">{cmsData?.benefitsSection?.titleHighlight ?? ''}</span> {cmsData?.benefitsSection?.titleLine2 ?? ''}
                    </span>
                  </h2>
                  <p className="text-sm text-slate-400 text-center">
                    {cmsData?.benefitsSection?.description ?? ''}
                  </p>
                </ScrollReveal>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(cmsData?.benefitsSection?.benefitsList ?? []).map((sol, idx) => (
                    <StaggerItem key={idx} variant="fade-up">
                      <div className="bg-[#0a111b] border border-slate-800 p-5 rounded-sm flex flex-col justify-between hover:border-orange-500/30 transition duration-300 h-full">
                        <div className="space-y-3">
                          <div className="bg-[#1c324d] text-orange-500 font-mono text-[10px] w-fit px-2 py-0.5 border border-slate-700 rounded-sm">
                            BENEFIT_RULE_0{idx+1}
                          </div>
                          <h4 className="font-display font-bold text-base text-[#f8fafc]">{sol?.title ?? ''}</h4>
                          <p className="text-xs text-[#cbd5e1] leading-relaxed">{sol?.description ?? ''}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[9px] text-orange-500 uppercase font-semibold">
                          {sol?.metricText ?? ''}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>

            {/* WHY CHOOSE US */}
            <section id="why-choose-us" className="max-w-7xl mx-auto px-6 space-y-12">
              <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-4 pb-6 border-b border-slate-800">
                <span className="font-mono text-xs text-orange-500 uppercase tracking-widest block font-bold text-center">// {cmsData?.whyChooseUsSection?.tagline ?? ''}</span>
                <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight md:leading-snug text-center max-w-2xl mx-auto">
                  {(() => {
                    const title = cmsData?.whyChooseUsSection?.title ?? 'Mengapa Banyak Kontraktor Memilih Kami?';
                    if (title.toLowerCase().startsWith('mengapa banyak')) {
                      return (
                        <>
                          {/* Mobile display: Exactly 2 lines */}
                          <span className="block md:hidden">
                            <span className="block">Mengapa Banyak</span>
                            <span className="block whitespace-nowrap">Kontraktor Memilih Kami?</span>
                          </span>
                          {/* Desktop & Tablet display: 2 lines */}
                          <span className="hidden md:block">
                            Mengapa Banyak <br />
                            Kontraktor Memilih Kami?
                          </span>
                        </>
                      );
                    }
                    return title;
                  })()}
                </h2>
                <p className="text-xs text-slate-400 font-mono text-center">{cmsData?.whyChooseUsSection?.subtitle ?? ''}</p>
              </ScrollReveal>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(cmsData?.whyChooseUsSection?.pointsList ?? []).map((item, idx) => (
                  <StaggerItem key={idx} variant="fade-up">
                    <div className="bg-[#1c324d]/30 border border-slate-800/80 p-5 rounded-sm flex gap-4 h-full">
                      <div className="flex-shrink-0 text-orange-500 font-mono text-sm font-bold bg-orange-500/10 px-2 py-0.5 h-fit rounded-sm border border-orange-500/20">
                        #{idx+1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-semibold text-sm text-[#f8fafc]">{item?.title ?? ''}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{item?.description ?? ''}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>

            {/* WORKFLOW (Scroll-Driven Storytelling Experience) */}
            <section 
              id="workflow" 
              ref={workflowSectionRef} 
              className="bg-gradient-to-b from-[#0a111b] via-[#0f172a]/30 to-[#0a111b] border-y border-slate-800 py-20 px-6 overflow-hidden animate-fade-in"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* Left Column: Sticky Title & Dynamic State Board (Desktop View) */}
                  <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
                    <div className="space-y-4 text-center lg:text-left">
                      <span className="font-mono text-xs text-orange-500 uppercase tracking-widest block font-bold text-center lg:text-left">// {cmsData?.workflow?.tagline ?? ''}</span>
                      
                      <h2 className="font-display text-[#f3ece0]">
                        <span className="block lg:hidden text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight px-2 uppercase text-center">
                          {(() => {
                            const title = cmsData?.workflow?.title ?? '';
                            const clean = title.replace(/<br\s*\/?>/gi, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
                            if (clean.toLowerCase().includes('langkah') && clean.toLowerCase().includes('mudah')) {
                              return <span className="whitespace-nowrap">{clean}</span>;
                            }
                            return clean;
                          })()}
                        </span>
                        <span className="hidden lg:block text-3xl xl:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                          {cmsData?.workflow?.title ?? ''}
                        </span>
                      </h2>
                      
                      <p className="text-slate-400">
                        <span className="block lg:hidden text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
                          {cmsData?.workflow?.subtitle ?? ''}
                        </span>
                        <span className="hidden lg:block text-sm leading-relaxed">
                          {cmsData?.workflow?.subtitle ?? ''}
                        </span>
                      </p>
                    </div>

                    {/* Interactive real-time console simulator (Visual Storytelling Dashboard) */}
                    <div className="hidden lg:block bg-[#09101d] border border-slate-800/85 p-5 rounded-sm space-y-4 relative overflow-hidden shadow-2xl">
                      {/* Decorative border accent */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                      
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 font-mono text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="flex space-x-1">
                            <span className="w-2 h-2 rounded-full bg-red-500/70 inline-block"></span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500/70 inline-block"></span>
                            <span className="w-2 h-2 rounded-full bg-green-500/70 inline-block"></span>
                          </span>
                          <span className="text-slate-500">// LIVE_PROCESS_CONSOLE</span>
                        </div>
                        <span className="text-orange-500 font-bold uppercase tracking-widest text-[9px]">v2.1_SBU</span>
                      </div>

                      {/* Dynamic content linked to standard scroll steps */}
                      <AnimatePresence mode="wait">
                        {activeWorkflowStep === 1 && (
                          <motion.div 
                            key="step1-screen"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3"
                          >
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-amber-400 font-semibold uppercase">Tahap 1: Verifikasi Berkas Awal</span>
                              <span className="text-orange-500 font-bold animate-pulse">● PEMINDAIAN BERKAS OK</span>
                            </div>
                            <div className="bg-[#050b14] border border-slate-900 p-3 rounded font-mono text-[10px] text-[#e2e8f0] space-y-1.5">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Akta Perusahaan & SK Kemenkumham</span>
                                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px] uppercase">Lolos</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">NIB / KBLI Konstruksi Aktif</span>
                                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px] uppercase">Lolos</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Kesesuaian SKK & Klasifikasi LPJK</span>
                                <span className="text-orange-400 font-semibold animate-pulse">Sedang Scan</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-normal">
                              Konsultan spesialis kami memetakan potensi kelayakan dokumen Anda dalam 2 jam secara detail untuk mencegah penolakan dari LPJK.
                            </p>
                          </motion.div>
                        )}

                        {activeWorkflowStep === 2 && (
                          <motion.div 
                            key="step2-screen"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3"
                          >
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-emerald-400 font-semibold uppercase">Tahap 2: Sinkronisasi Kementerian</span>
                              <span className="text-emerald-400 font-bold animate-pulse">⚙️ METADATA INTEGRASI</span>
                            </div>
                            <div className="bg-[#050b14] border border-slate-900 p-3 rounded font-mono text-[10px] text-[#e2e8f0] space-y-1.5">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Pendaftaran Berkas Terpadu</span>
                                <span className="text-indigo-400 font-semibold">SUCCESS</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Asosiasi Penilai Konstruksi</span>
                                <span className="text-indigo-400 font-semibold font-bold">SUBMITTED</span>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-[9px] text-slate-500 font-sans">
                                  <span>Progress Pengiriman Sistem</span>
                                  <span>75%</span>
                                </div>
                                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: "30%" }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-orange-500 h-full rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-normal">
                              Kami menangani proses administrasi digital LPJK, pendataan asosiasi terakreditasi, dan pengaturan SKK utama secara legal dan akurat.
                            </p>
                          </motion.div>
                        )}

                        {activeWorkflowStep === 3 && (
                          <motion.div 
                            key="step3-screen"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3"
                          >
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-orange-500 font-semibold uppercase">Tahap 3: Penerbitan SBU</span>
                              <span className="text-[#25D366] font-bold">● ONLINE & AKTIF</span>
                            </div>
                            <div className="bg-[#050b14] border border-emerald-500/20 p-3 rounded font-mono text-[10px] text-[#e2e8f0] text-center space-y-2">
                              <div className="text-emerald-400 font-bold flex items-center justify-center gap-1.5 text-xs">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SBU TELAH TERBIT RESMI
                              </div>
                              <div className="text-[9px] text-slate-500 uppercase tracking-wider">
                                Registrasi Siki-LPJK & Barcode Aktif
                              </div>
                              <div className="inline-block border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[9px] px-2 py-0.5 rounded-sm font-semibold">
                                CLOUD REGISTRATION CODE verified
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-normal">
                              Selamat! Sertifikasi SBU Anda terbit secara sah, tervalidasi LPJK nasional & Kementerian PUPR, dan siap dicetak langsung untuk pengajuan tender.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right Column: Scroll-Revealed Sequential Step Timeline */}
                  <div className="lg:col-span-7 relative">
                    
                    {/* Visual Progress Connected Line (Full track height) */}
                    <div className="absolute left-[20px] md:left-[36px] top-6 bottom-6 w-[2px] bg-slate-800/60 z-0">
                      <motion.div 
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-orange-500 via-amber-500 to-emerald-500 shadow-[0_0_10px_#f97316]"
                        style={{ height: `${workflowProgress}%` }}
                      />
                    </div>

                    {/* Timeline Step Items */}
                    <div className="space-y-12">
                      {(cmsData?.workflow?.steps ?? []).map((step, idx) => {
                        const stepRefs = [workflowStep1Ref, workflowStep2Ref, workflowStep3Ref];
                        const stepRef = stepRefs[idx] || workflowStep1Ref;
                        const stepNum = idx + 1;
                        const isActive = activeWorkflowStep === stepNum;
                        const isCompleted = activeWorkflowStep > stepNum;

                        return (
                          <div 
                            key={idx} 
                            ref={stepRef}
                            className="relative pl-12 md:pl-24 transition-all duration-500"
                          >
                            {/* Animated Timeline Circle Badge Node */}
                            <div 
                              className={`absolute left-[20px] md:left-[36px] -translate-x-1/2 top-1.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 border ${
                                isActive 
                                  ? 'bg-orange-500 border-orange-500 text-[#060e19] shadow-[0_0_20px_rgba(249,115,22,0.8)] scale-110' 
                                  : isCompleted 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'bg-[#0a111b] border-slate-800 text-slate-500'
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="w-4 h-4 font-extrabold stroke-[3]" />
                              ) : (
                                <span className="font-mono text-xs font-bold">{stepNum}</span>
                              )}
                            </div>

                            {/* Content Card with Scroll Storytelling animation */}
                            <motion.div
                              initial={{ opacity: 0, y: 30, scale: 0.98 }}
                              whileInView={{ opacity: 1, y: 0, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className={`bg-[#060b13] border p-6 md:p-8 rounded-sm space-y-3 relative overflow-hidden transition-all duration-300 ${
                                isActive 
                                  ? 'border-orange-500/40 shadow-[0_4px_30px_rgba(249,115,22,0.06)]' 
                                  : isCompleted 
                                    ? 'border-emerald-500/15' 
                                    : 'border-slate-800'
                              }`}
                            >
                              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none transition-colors duration-300 ${
                                isActive ? 'bg-orange-500/5' : 'bg-transparent'
                              }`}></div>
                              
                              <span className={`font-mono text-xs font-bold tracking-widest block transition-colors duration-300 ${
                                isActive ? 'text-orange-500' : 'text-slate-500'
                              }`}>
                                {step?.label ?? ''}
                              </span>
                              
                              <h4 className={`font-display font-bold text-base md:text-lg uppercase transition-colors duration-300 ${
                                isActive ? 'text-white' : 'text-slate-200'
                              }`}>
                                {step?.title ?? ''}
                              </h4>
                              
                              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                                {step?.description ?? ''}
                              </p>
                              
                              {/* Responsive Visual Indicator inside Card for Tablet & Mobile View */}
                              {isActive && (
                                <div className="block lg:hidden border-t border-slate-900/60 pt-4 mt-4 text-[11px] font-mono">
                                  <div className="flex items-center gap-2 text-orange-500 font-semibold mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                    <span>REALTIME STATUS UPDATE</span>
                                  </div>
                                  <p className="text-slate-500 italic">
                                    {stepNum === 1 && "Dokumen diteliti oleh tim dalam 2 jam secara komprehensif."}
                                    {stepNum === 2 && "Proses mendaftarkan berkas secara digital ke LPJK nasional."}
                                    {stepNum === 3 && "Sertifikasi sah & terintegrasi penuh. Legal 100%."}
                                  </p>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section id="testi" className="max-w-7xl mx-auto px-6 space-y-12">
              <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-4">
                <span className="font-mono text-xs text-orange-500 uppercase tracking-widest block font-bold text-center">// {cmsData?.testimonialsSection?.tagline ?? ''}</span>
                <h2 className="font-display text-4xl font-extrabold text-white uppercase leading-tight text-center">
                  {cmsData?.testimonialsSection?.title ?? ''}
                </h2>
                <p className="text-sm text-slate-400 text-center">
                  {cmsData?.testimonialsSection?.subtitle ?? ''}
                </p>
              </ScrollReveal>

              {/* High-fidelity responsive testimonial card columns */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(testimonialItems ?? []).map((item, idx) => (
                  <StaggerItem key={idx} variant="fade-up">
                    <div className="bg-[#1c324d] border border-slate-700/60 p-6 rounded-sm h-full flex flex-col justify-between hover:border-orange-500/30 transition relative shadow-[0_4px_12px_rgba(10,17,27,0.4)]">
                      <div className="space-y-4">
                        {/* Interactive star reviews */}
                        <div className="flex gap-1 text-amber-400">
                          {[...Array(item?.stars ?? 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                          ))}
                        </div>
                        <p className="font-serif italic text-sm text-[#f3ece0] leading-relaxed">
                          &ldquo;{item?.quote ?? ''}&rdquo;
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-700/60">
                        <div className="font-display font-bold text-xs uppercase text-white">{item?.author ?? ''}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item?.title ?? ''}</div>
                        <div className="text-[9px] font-mono text-orange-500 mt-2 block">{item?.date ?? ''} // VERIFIED TESTIMONIAL</div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* High-fidelity WhatsApp conversation screenshot mockup - EXTREME REALISM FOR B2B Conversional Trust */}
              <ScrollReveal variant="scale" delay={0.15} className="w-full">
                <div className="bg-[#0f172a]/60 border border-slate-800 p-6 rounded-sm max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs text-slate-500">
                    <span className="flex items-center gap-2 text-left">
                      <MessageSquare className="w-4 h-4 text-orange-500 shrink-0" />
                      {cmsData?.testimonialsSection?.whatsappChatHeading ?? ''}
                    </span>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm uppercase text-[9px] font-bold shrink-0">{cmsData?.testimonialsSection?.whatsappChatSubheading ?? ''}</span>
                  </div>

                  <div className="space-y-3 font-sans">
                    {(cmsData?.testimonialsSection?.chatMessages ?? []).map((msg, midx) => (
                      <div key={midx} className={`flex ${msg?.isOutgoing ? 'justify-end' : 'justify-start'}`}>
                        <div className={`text-xs p-3.5 rounded-sm max-w-sm leading-relaxed ${
                          msg?.isOutgoing 
                            ? 'bg-emerald-950/40 border border-emerald-500/20 text-[#e2e8f0] text-right' 
                            : 'bg-[#1c324d] text-[#f8fafc] border border-orange-500/15 text-left'
                        }`}>
                          <div className={`text-[9px] font-semibold uppercase mb-1 ${msg?.isOutgoing ? 'text-emerald-400' : 'text-orange-500'}`}>
                            {msg?.sender ?? ''} <span className="text-[8px] font-mono text-slate-500 ml-1">({msg?.time ?? ''})</span>
                          </div>
                          <p>{msg?.text ?? ''}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <span className="text-[10px] text-slate-500 font-mono tracking-wide uppercase">// BUKTI LAINNYA DAPAT DIKONFIRMASI SEBELUM PEMBAYARAN WORKFLOW UNTUK MELINDUNGI ANDA //</span>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* PRICING (PRICE LIST) */}
            <section id="pricing" className="max-w-7xl mx-auto px-6 space-y-12">
              <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-4">
                <span className="font-mono text-xs text-orange-500 uppercase tracking-widest block font-bold text-center">// {cmsData?.pricingSection?.tagline ?? ''}</span>
                <h2 className="font-display text-white text-center">
                  <span className="block lg:hidden text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight px-2 uppercase">
                    {cmsData?.pricingSection?.title ?? ''}
                  </span>
                  <span className="hidden lg:block text-3xl md:text-4xl font-extrabold uppercase leading-tight">
                    {cmsData?.pricingSection?.title ?? ''}
                  </span>
                </h2>
                <p className="text-sm text-slate-400 text-center">
                  {cmsData?.pricingSection?.subtitle ?? ''}
                </p>
              </ScrollReveal>

              <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {(cmsData?.pricingSection?.packages ?? []).map((pkg, idx) => {
                  const isFeatured = idx === 1; // Middle card of 3 is always the premium highlighted deal
                  return (
                    <StaggerItem key={idx} variant="fade-up">
                      <div className={`border p-6 lg:p-8 rounded-sm h-full flex flex-col justify-between relative transition ${
                        isFeatured 
                          ? 'bg-[#1c324d] border-2 border-orange-500 shadow-[0_12px_32px_rgba(6,14,25,0.6)]' 
                          : 'bg-[#1c2e42]/30 border border-slate-800 hover:border-slate-700'
                      }`}>
                        {isFeatured && (
                          <div className="absolute top-0 right-0 bg-orange-500 text-navy-950 font-mono font-bold text-[9px] px-3 py-1 uppercase rounded-bl-sm">
                            ⭐ PALING BANYAK DIPILIH
                          </div>
                        )}

                        <div className="space-y-6">
                          <div>
                            <span className={`font-mono text-xs tracking-wider uppercase font-extrabold block ${isFeatured ? 'text-orange-300' : 'text-orange-500'}`}>
                              {pkg?.name ?? ''}
                            </span>
                            <h3 className={`font-display text-xs mt-1 ${isFeatured ? 'text-slate-300 font-semibold' : 'text-slate-400 font-medium'}`}>
                              {pkg?.description ?? ''}
                            </h3>
                          </div>

                          <div className={`border-t border-b py-4 ${isFeatured ? 'border-slate-700/60' : 'border-slate-800'}`}>
                            <span className={`text-xs block uppercase font-mono ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                              {pkg?.priceLabel || 'Mulai Dari Estimasi:'}
                            </span>
                            <div className={`font-display font-bold text-3xl mt-1 ${isFeatured ? 'text-emerald-400' : 'text-[#f3ece0]'}`}>
                              {pkg?.priceValue ?? ''}
                            </div>
                            {pkg?.note && (
                              <span className={`text-[10px] font-mono ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                                {pkg.note}
                              </span>
                            )}
                          </div>

                          <ul className={`space-y-2 text-xs font-display ${isFeatured ? 'text-slate-200' : 'text-slate-300'}`}>
                            {(pkg?.features ?? []).map((feat, fidx) => (
                              <li key={fidx} className="flex items-center gap-2">
                                <Check className={`w-4 h-4 flex-shrink-0 ${isFeatured ? 'text-emerald-400' : 'text-orange-500'}`} />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-8">
                          <button 
                            onClick={() => openPopupWithService(pkg?.name ?? '')}
                            className={`w-full font-display font-extrabold text-xs py-3 px-4 rounded-sm uppercase tracking-wider transition duration-300 shadow-md cursor-pointer text-center ${
                              isFeatured 
                                ? 'bg-orange-500 hover:bg-orange-600 text-[#0a111b]' 
                                : 'bg-[#1c324d] hover:bg-[#2a4a70] text-white border border-orange-500/30 hover:border-orange-500'
                            }`}
                          >
                            {pkg?.ctaLabel || 'PILIH PAKET'}
                          </button>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" className="max-w-4xl mx-auto px-6 space-y-6">
              <ScrollReveal variant="fade-up" className="text-center space-y-2 mb-8">
                <span className="font-mono text-xs text-orange-500 uppercase tracking-widest block font-bold text-center">// {cmsData?.faqSection?.tagline ?? ''}</span>
                <h2 className="font-display text-4xl font-extrabold text-white uppercase text-center">{cmsData?.faqSection?.title ?? ''}</h2>
              </ScrollReveal>

              <StaggerContainer className="space-y-3 font-display">
                {(faqItems ?? []).map((item, index) => (
                  <StaggerItem key={index} variant="fade-up">
                    <div className="border border-slate-800 bg-[#0f172a]/30 rounded-sm overflow-hidden">
                      <button
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 bg-[#0a111b] text-left hover:bg-[#1a2c3f]/50 transition cursor-pointer"
                      >
                        <span className="text-xs md:text-sm font-semibold uppercase text-[#f3ece0]">{item?.q ?? ''}</span>
                        <span className="text-orange-500 font-mono text-lg">{activeFaq === index ? '−' : '+'}</span>
                      </button>
                      
                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-800 bg-[#0c1521]/60 p-4 text-xs leading-relaxed text-slate-300"
                          >
                            {item?.a ?? ''}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>

            {/* FINAL CTA SECTION */}
            <section id="final-cta" className="max-w-7xl mx-auto px-6">
              <ScrollReveal variant="scale" duration={0.65}>
                <div className="bg-gradient-to-br from-[#0c1626] via-[#0e192c] to-[#070d15] border border-orange-500/40 p-6 py-12 md:p-20 rounded-md text-center space-y-8 md:space-y-10 relative overflow-hidden shadow-[0_16px_48px_rgba(249,115,22,0.15)] md:shadow-[0_24px_64px_rgba(6,14,25,0.85)] group">
                  {/* Visual Accent Glowing Aura in top center and corner highlights */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                  <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-orange-500/15 rounded-full blur-[60px] pointer-events-none block md:hidden"></div>
                  <div className="absolute -bottom-20 -right-20 w-[200px] h-[200px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                  
                  <div className="max-w-3xl mx-auto space-y-6 relative z-10 w-full">
                    {/* Urgent high-priority warning banner */}
                    <div className="inline-flex items-center gap-2 bg-[#2a1317]/95 border border-rose-500/45 text-rose-400 py-1.5 px-4 md:py-2 md:px-5 rounded-full font-mono text-[9px] md:text-[10px] tracking-widest font-bold uppercase mx-auto shadow-[0_4px_12px_rgba(244,63,94,0.15)]">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <span>{cmsData?.ctaConfig?.urgencyBanner ?? ''}</span>
                    </div>

                    <h2 className="font-display text-2xl xs:text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-auto md:leading-tight text-center">
                      Jangan Sampai Kehilangan <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 underline decoration-orange-500/30">Tender Besar</span> Hanya Karena Legalitas Belum Siap
                    </h2>
                    
                    <p className="text-slate-300 text-xs md:text-base leading-relaxed text-center max-w-2xl mx-auto font-sans px-2">
                      Setiap hari yang tertunda bisa berarti hilangnya peluang proyek konstruksi bernilai ratusan juta hingga miliaran rupiah. Konsultasikan syarat kelayakan SBU perusahaan Anda tanpa bayar sepeser pun dengan ahli regulasi LPJK kami.
                    </p>
                  </div>

                  {/* Highly Attractive Interactive Button and micro-conversion text */}
                  <div className="flex flex-col items-center justify-center gap-4 pt-2 md:pt-4 relative z-10">
                    <button 
                      onClick={() => openPopupWithService('SKK + SBU')}
                      className="group/btn relative w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-[#070e17] font-display font-extrabold text-[10px] xs:text-xs md:text-sm py-4 px-4 sm:py-5 sm:px-10 rounded-sm uppercase tracking-normal sm:tracking-wider md:tracking-widest transition-all duration-300 shadow-[0_12px_36px_rgba(249,115,22,0.35)] hover:shadow-[0_16px_48px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 sm:gap-3 overflow-hidden border border-orange-400/25 whitespace-nowrap"
                    >
                      {/* Inner sheen effect */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:animate-shine-effect"></div>
                      
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#070e17] shrink-0" />
                      <span className="whitespace-nowrap text-nowrap">KLAIM ANALISIS KELAYAKAN GRATIS</span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] shrink-0 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>

                    <p className="text-[10px] md:text-[11px] text-slate-400 font-mono flex items-center gap-1.5 px-3 py-1 bg-slate-900/40 rounded-full border border-slate-850">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      {cmsData?.ctaConfig?.freeConsultationQuotaText ?? ''}
                    </p>
                  </div>

                  {/* Secure Trust badges bottom of final CTA with higher-quality contrast aesthetics */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-x-8 pt-8 border-t border-slate-800/80 text-[9px] sm:text-[10px] md:text-sm text-slate-400 font-mono tracking-wider uppercase relative z-10 w-full">
                    <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-250 bg-[#0c1626]/80 md:bg-transparent px-4 py-2 md:p-0 rounded-full border border-slate-800/60 md:border-none w-full sm:w-auto justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 shrink-0" />
                      <span>LEGAL RESMI LPJK & PUPR</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-250 bg-[#0c1626]/80 md:bg-[#0c1626]/85 px-4 py-2 md:p-0 rounded-full border border-slate-800/60 md:border-none w-full sm:w-auto justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 shrink-0" />
                      <span>TRANSPARANSI BIAYA 100% MUTLAK</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-250 bg-[#0c1626]/80 md:bg-transparent px-4 py-2 md:p-0 rounded-full border border-slate-800/60 md:border-none w-full sm:w-auto justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 shrink-0" />
                      <span>DIDAMPINGI SAMPAI TAYANG & AKTIF</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

          </motion.div>
        ) : (
          /* DESIGN TOKENS SYSTEM VIEW */
          <motion.div 
            key="tokens_view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-6 py-12 space-y-12"
          >
            {/* Header intro of design specs */}
            <div className="border border-slate-800 bg-[#0f172a]/60 p-8 rounded-sm text-center space-y-4">
              <span className="text-orange-500 font-mono text-xs uppercase block tracking-widest mb-1 text-center">DESIGN CODEBASE VALIDATION</span>
              <h2 className="font-display font-bold text-3xl text-white uppercase text-center">Prestige construction SBU Design Tokens</h2>
              <p className="text-slate-400 text-sm max-w-2xl mt-1 leading-relaxed mx-auto text-center">
                Consistent specifications tailored specifically for maximum corporate clearance and government bidding. Perfect for B2B procurement applications.
              </p>
            </div>

            {/* Colors swatch catalog */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-805 bg-[#0a111b] p-6 rounded-sm space-y-6">
                <h3 className="font-display text-lg text-[#f3ece0] font-semibold uppercase flex items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                  COLOR CODES MATRIGES (CSS VARIABLES)
                </h3>
                
                <div className="space-y-3 font-mono text-xs">
                  {COLOR_TOKENS.map((token, id) => (
                    <div key={id} className="bg-[#0f172a]/60 border border-slate-800/85 p-3 rounded-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-sm border border-slate-700" style={{ backgroundColor: token.hex }} />
                        <div>
                          <span className="text-[#f8fafc] font-semibold">{token.name}</span>
                          <span className="text-slate-500 block text-[10px]">{token.hex}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCopyText(token.hex, token.name)}
                        className="text-[10px] tracking-wider text-slate-500 hover:text-white cursor-pointer"
                      >
                        Copy Hex
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography specs */}
              <div className="border border-slate-805 bg-[#0a111b] p-6 rounded-sm space-y-6">
                <h3 className="font-display text-lg text-[#f3ece0] font-semibold uppercase flex items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                  FONT WEIGHT INDICATORS
                </h3>

                <div className="space-y-4 text-xs font-mono">
                  {TYPOGRAPHY_TOKENS.map((typo, id) => (
                    <div key={id} className="bg-[#0f172a]/60 border border-slate-805 p-3 rounded-sm space-y-1">
                      <span className="text-orange-400 font-bold block">{typo.name}</span>
                      <span className="text-slate-500 block text-[10px]">{typo.usage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro details: Spacing & radius */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="border border-slate-800 bg-[#0a111b] p-6 rounded-sm space-y-4">
                <h4 className="font-display text-sm font-bold text-white uppercase">// SPACING METRIC MATRIX</h4>
                <div className="space-y-2 text-[10px] font-mono text-slate-400">
                  {SPACING_TOKENS.slice(0, 5).map((sp, idx) => (
                    <div key={idx} className="flex justify-between p-2 border-b border-slate-800">
                      <span>Token #{sp.token}</span>
                      <span className="text-emerald-400">{sp.px}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-800 bg-[#0a111b] p-6 rounded-sm space-y-4">
                <h4 className="font-display text-sm font-bold text-white uppercase">// RADIUS GEOMETRIC RULES</h4>
                <div className="space-y-2 text-[10px] font-mono text-slate-400">
                  {RADIUS_TOKENS.map((rd, idx) => (
                    <div key={idx} className="flex justify-between p-2 border-b border-slate-800" title={rd.constructionAnalogy}>
                      <span>{rd.token}</span>
                      <span className="text-orange-500">{rd.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-800 bg-[#0a111b] p-6 rounded-sm space-y-4">
                <h4 className="font-display text-sm font-bold text-white uppercase">// HIERARCHY COP RULES</h4>
                <div className="space-y-2 text-[10px] font-mono text-slate-400">
                  {HIERARCHY_RULES.slice(0, 3).map((rl, idx) => (
                    <div key={idx} className="p-2 border-b border-slate-800">
                      <span className="text-[#f8fafc] font-bold block">{rl.title}</span>
                      <p className="text-[9px] text-slate-500 leading-normal mt-0.5">{rl.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER SECTION */}
      <footer className="bg-[#050a11] border-t border-slate-800 px-6 py-12 relative z-30 font-display">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-slate-400">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Hammer className="w-5 h-5 text-orange-500" />
              <span className="font-display font-extrabold text-sm text-white tracking-widest uppercase">{cmsData?.footerConfig?.companyName ?? ''}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              {cmsData?.footerConfig?.tagline ?? ''}
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h5 className="font-bold text-white tracking-wider uppercase font-mono text-[10px]">// KONTAK RESMI</h5>
            <div className="space-y-1.5 text-slate-400">
              <p>Alamat Kantor: {cmsData?.siteSettings?.officeAddress || cmsData?.footerConfig?.officeAddress || ''}</p>
              <p>Email: <span className="text-slate-400">{cmsData?.siteSettings?.businessEmail || 'info@sbuexpress.co.id'}</span></p>
              <p>WhatsApp: <span className="text-orange-500 font-semibold">{phoneNumber}</span></p>
              <p>Jam Operasional: <span className="text-slate-400 font-semibold">{cmsData?.footerConfig?.operationalHours ?? ''}</span></p>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h5 className="font-bold text-white tracking-wider uppercase font-mono text-[10px]">// MEDIA SOSIAL</h5>
            <div className="flex flex-col space-y-2">
              <a 
                href={cmsData?.siteSettings?.instagramUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Kunjungi akun Instagram SBU Express"
                className="flex items-center gap-3 py-1.5 text-slate-400 font-medium hover:text-white hover:translate-x-1 transition-all duration-300 ease-out group"
              >
                <span className="w-8 h-8 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:border-orange-500/30 group-hover:bg-orange-500/5 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="text-xs tracking-wide">Instagram</span>
              </a>

              {cmsData?.siteSettings?.facebookUrl && (
                <a 
                  href={cmsData.siteSettings.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Kunjungi halaman Facebook SBU Express"
                  className="flex items-center gap-3 py-1.5 text-slate-400 font-medium hover:text-white hover:translate-x-1 transition-all duration-300 ease-out group"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300">
                    <Facebook className="w-4 h-4" />
                  </span>
                  <span className="text-xs tracking-wide">Facebook</span>
                </a>
              )}

              <a 
                href={cmsData?.siteSettings?.linkedinUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Hubungi kami melalui LinkedIn"
                className="flex items-center gap-3 py-1.5 text-slate-400 font-medium hover:text-white hover:translate-x-1 transition-all duration-300 ease-out group"
              >
                <span className="w-8 h-8 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-sky-500 group-hover:border-sky-500/30 group-hover:bg-sky-500/5 transition-all duration-300">
                  <Linkedin className="w-4 h-4" />
                </span>
                <span className="text-xs tracking-wide">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-10 pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
            <span>{cmsData?.footerConfig?.copyrightText ?? ''}</span>
            <span className="text-orange-500">SYSTEM PROTOCOL CLASSIFICATION-X2 // GOVERNMENT PRE-CERTIFIED</span>
          </div>
          {cmsData?.footerConfig?.subtagline && (
            <p className="text-[10px] text-slate-600 font-mono leading-relaxed max-w-7xl pt-2 border-t border-slate-900/40">
              {cmsData.footerConfig.subtagline}
            </p>
          )}
        </div>
      </footer>

      {/* FLOATING ELEMENTS / FLOATING WHATSAPP BUTTON (Section 11) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-display">
        {/* original whatsapp button with glowing green color, floating animation */}
        <motion.button 
          onClick={() => openPopupWithService('Belum Tahu (Perlu konsultasi lebih lanjut)')}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:shadow-[0_0_30px_rgba(37,211,102,0.9)] flex items-center justify-center gap-2 group transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer relative"
          title="Hubungi Konsultan Sekarang"
          id="whatsapp-floating-btn"
        >
          {/* Pulsing Backlights with pure brand green colors */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping" style={{ animationDuration: '2s' }}></span>
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-pulse" style={{ animationDuration: '1.5s' }}></span>
          
          <MessageCircle className="w-6 h-6 text-white fill-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-mono text-xs uppercase font-extrabold tracking-wider whitespace-nowrap pl-0 group-hover:pl-1">
            {cmsData?.siteSettings?.floatingWhatsappLabel || 'Konsultasi WhatsApp'}
          </span>
        </motion.button>
      </div>

      {/* LEAD CAPTURE FORM POPUP MODAL (Section 7 and Section 8) */}
      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 bg-[#0a111b]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0f172a] border border-orange-500/30 w-full max-w-xl p-6 rounded-sm relative shadow-[0_12px_32px_rgba(6,14,25,0.6)] font-display text-xs"
            >
              {/* Close Button */}
              <button 
                onClick={resetForm}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-800 rounded-sm text-slate-400 hover:text-white transition cursor-pointer"
                title="Tutup Form"
              >
                <X className="w-4 h-4" />
              </button>

              {isLeadSubmitted || formSubmitted ? (
                (() => {
                  const targetWaUrl = savedWhatsAppUrl || whatsAppUrl || '#';
                  return (
                    <div className="py-8 text-center space-y-6">
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-bold animate-pulse">
                        ✓
                      </div>

                      <div className="space-y-3 px-4">
                        <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block font-bold">STATE RECOVERY: LEAD_VERIFIED</span>
                        <h3 className="text-xl font-extrabold text-white uppercase font-display tracking-tight leading-tight">
                          Profil Kualifikasi Berhasil Diterima
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                          Informasi perusahaan Anda telah berhasil kami terima. Silakan lanjutkan ke WhatsApp untuk mendapatkan evaluasi awal dan arahan kebutuhan SBU yang sesuai.
                        </p>
                      </div>

                      {/* Primary WhatsApp Redirect Button */}
                      <div className="px-4">
                        <a 
                          href={targetWaUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Buka Chat WhatsApp Resmi SBU Express sekarang"
                          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-display font-extrabold text-xs py-4 px-6 rounded-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#25D366]/20 cursor-pointer text-center"
                        >
                          <MessageCircle className="w-4 h-4 fill-white text-white" />
                          <span>BUKA CHAT WHATSAPP SEKARANG</span>
                        </a>
                      </div>

                      {/* Secondary action to close the modal */}
                      <button 
                        onClick={resetForm}
                        className="text-slate-500 hover:text-slate-300 font-mono text-[10px] uppercase underline block mx-auto cursor-pointer transition-colors"
                      >
                        Kembali ke Website
                      </button>
                    </div>
                  );
                })()
              ) : isSubmitting ? (
                (() => {
                  const steps = [
                    { num: 1, label: "Menyiapkan Slot Konsultasi" },
                    { num: 2, label: "Memverifikasi Data Perusahaan" },
                    { num: 3, label: "Menyiapkan Evaluasi Awal" },
                    { num: 4, label: "Menghubungkan ke Konsultan" }
                  ];

                  return (
                    <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
                      {/* Circular Loader */}
                      <div className="relative w-24 h-24 flex items-center justify-center select-none">
                        <svg className="w-full h-full transform -rotate-90">
                          {/* Background tracker ring */}
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            className="stroke-slate-800"
                            strokeWidth="6"
                            fill="transparent"
                          />
                          {/* Active state progress ring */}
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            className="stroke-orange-500 transition-all duration-350 ease-out"
                            strokeWidth="6"
                            strokeDasharray={2 * Math.PI * 40}
                            strokeDashoffset={2 * Math.PI * 40 - (processingPercent / 100) * (2 * Math.PI * 40)}
                            fill="transparent"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-lg font-bold font-mono text-orange-500">{processingPercent}%</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white uppercase font-display tracking-tight transition-all duration-300">
                          Menyiapkan Konsultasi Anda
                        </h3>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                          SISTEM INTEGRASI KELAYAKAN SBU
                        </p>
                      </div>

                      {/* Sequential progress list */}
                      <div className="w-full max-w-xs bg-slate-950/60 border border-slate-800/80 p-5 rounded-sm space-y-4 text-left">
                        {steps.map((step) => {
                          const isCompleted = step.num < processingStep;
                          const isActive = step.num === processingStep;
                          return (
                            <div 
                              key={step.num} 
                              className="flex items-center gap-3 transition-all duration-300"
                            >
                              {isCompleted ? (
                                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                                  ✓
                                </div>
                              ) : isActive ? (
                                <div className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-500 flex items-center justify-center">
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-slate-800/30 border border-slate-800/60 text-slate-600 flex items-center justify-center text-[10px] font-mono">
                                  {step.num}
                                </div>
                              )}
                              <span 
                                className={`text-xs font-mono transition-colors duration-300 ${
                                  isCompleted 
                                    ? 'text-emerald-400' 
                                    : isActive 
                                      ? 'text-white font-bold' 
                                      : 'text-slate-500'
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()
              ) : (
                (() => {
                  const sSettings = cmsData?.siteSettings;
                  const serviceOptions = sSettings?.serviceOptions || [
                    'SBU Kualifikasi Kecil',
                    'SBU Kualifikasi Menengah',
                    'SBU Kualifikasi Besar',
                    'Paket SKK + SBU Terpadu',
                    'Belum Tahu (Perlu konsultasi lebih lanjut)'
                  ];
                  
                  const getNormalizedSelectedService = () => {
                    if (serviceOptions.includes(selectedService)) {
                      return selectedService;
                    }
                    if (selectedService === 'SBU Kecil' && serviceOptions.includes('SBU Kualifikasi Kecil')) return 'SBU Kualifikasi Kecil';
                    if (selectedService === 'SBU Menengah' && serviceOptions.includes('SBU Kualifikasi Menengah')) return 'SBU Kualifikasi Menengah';
                    if (selectedService === 'SBU Besar' && serviceOptions.includes('SBU Kualifikasi Besar')) return 'SBU Kualifikasi Besar';
                    if (selectedService === 'SKK + SBU' && serviceOptions.includes('Paket SKK + SBU Terpadu')) return 'Paket SKK + SBU Terpadu';
                    
                    const lowerSel = selectedService.toLowerCase();
                    const match = serviceOptions.find(opt => {
                      const lowerOpt = opt.toLowerCase();
                      return lowerOpt.includes(lowerSel) || lowerSel.includes(lowerOpt);
                    });
                    if (match) return match;
                    return selectedService;
                  };

                  const currentSelected = getNormalizedSelectedService();

                  return (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="border-b border-slate-800 pb-3 mb-2">
                        <span className="font-mono text-[10px] text-orange-500 block uppercase tracking-widest">// SECURE LEAD CAPTURE FORM</span>
                        <h3 className="text-lg font-bold text-[#f8fafc] uppercase mt-1">
                          {sSettings?.leadFormTitle || 'Formulir Pengajuan Evaluasi Dokumen SBU'}
                        </h3>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {sSettings?.leadFormDescription || 'Silakan isi data legalitas awal Anda, sistem akan me-redirect chat konsultasi secara otomatis.'}
                        </p>
                      </div>

                      {/* Form fields as specified in PRD Section 8 */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-slate-400 font-mono text-[10px] mb-1 uppercase tracking-wide">
                            {sSettings?.nameFieldLabel || 'Nama Lengkap Pemohon *'}
                          </label>
                          <input 
                            type="text" 
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder={sSettings?.nameFieldPlaceholder || 'contoh: Ir. Bambang Widjojo'}
                            className="w-full bg-[#0a111b] text-white border border-slate-800 p-2.5 rounded-sm outline-none focus:border-orange-500/50 text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 font-mono text-[10px] mb-1 uppercase tracking-wide">
                              {sSettings?.phoneFieldLabel || 'Nomor WhatsApp Aktif *'}
                            </label>
                            <input 
                              type="tel" 
                              name="whatsappNumber"
                              required
                              value={formData.whatsappNumber}
                              onChange={handleInputChange}
                              placeholder={sSettings?.phoneFieldPlaceholder || 'contoh: 08123456789'}
                              className="w-full bg-[#0a111b] text-white border border-slate-800 p-2.5 rounded-sm outline-none focus:border-orange-500/50 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 font-mono text-[10px] mb-1 uppercase tracking-wide">
                              {sSettings?.emailFieldLabel || 'Email Bisnis Resmi *'}
                            </label>
                            <input 
                              type="email" 
                              name="businessEmail"
                              required
                              value={formData.businessEmail}
                              onChange={handleInputChange}
                              placeholder={sSettings?.emailFieldPlaceholder || 'contoh: ditektur@perusahaan.co.id'}
                              className="w-full bg-[#0a111b] text-white border border-slate-800 p-2.5 rounded-sm outline-none focus:border-orange-500/50 text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 font-mono text-[10px] mb-1 uppercase tracking-wide">
                              {sSettings?.companyFieldLabel || 'Nama Perusahaan Konstruksi *'}
                            </label>
                            <input 
                              type="text" 
                              name="companyName"
                              required
                              value={formData.companyName}
                              onChange={handleInputChange}
                              placeholder={sSettings?.companyFieldPlaceholder || 'contoh: PT Mahakarya Pratama'}
                              className="w-full bg-[#0a111b] text-white border border-slate-800 p-2.5 rounded-sm outline-none focus:border-orange-500/50 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 font-mono text-[10px] mb-1 uppercase tracking-wide">
                              {sSettings?.serviceFieldLabel || 'Jenis Layanan Sertifikat *'}
                            </label>
                            <select 
                              value={currentSelected}
                              onChange={(e) => setSelectedService(e.target.value)}
                              className="w-full bg-[#0a111b] text-orange-500 border border-slate-800 p-2.5 rounded-sm outline-none focus:border-orange-500/50 font-semibold text-xs"
                            >
                              {serviceOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                              {!serviceOptions.includes(currentSelected) && (
                                <option value={currentSelected}>{currentSelected}</option>
                              )}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-400 font-mono text-[10px] mb-1 uppercase tracking-wide">
                            {sSettings?.notesFieldLabel || 'Catatan Tambahan (Opsional)'}
                          </label>
                          <textarea 
                            name="notes"
                            rows={5}
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder={sSettings?.notesFieldPlaceholder || "Contoh:\n• Saya ingin mengikuti tender BUMN\n• SBU saya sudah habis masa berlaku\n• Saya ingin upgrade kualifikasi usaha\n• Saya belum tahu layanan yang saya butuhkan"}
                            className="w-full bg-[#0a111b] text-white border border-slate-800 p-2.5 rounded-sm outline-none focus:border-orange-500/50 text-xs resize-none"
                          />
                        </div>
                      </div>

                      <div className="pt-3 flex flex-col gap-2">
                        <button 
                          type="submit"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-[#0a111b] font-display font-extrabold text-xs py-3.5 px-4 rounded-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <Send className="w-4 h-4" />
                          <span>{sSettings?.submitButtonLabel || 'Submit & Jadwalkan Sesi Konsultasi'}</span>
                        </button>
                        <span className="text-[10px] text-center text-slate-500 font-mono block uppercase">
                          {sSettings?.privacyNotice || '🔒 DATA ANDA DILINDUNGI PROTOKOL PRIVASI SSL ENCRYPTED'}
                        </span>
                      </div>
                    </form>
                  );
                })()
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
