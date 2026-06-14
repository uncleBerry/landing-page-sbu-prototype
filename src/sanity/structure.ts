import { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Landing Page CMS')
    .items([
      S.listItem()
        .title('Hero Section')
        .id('hero')
        .child(
          S.document()
            .schemaType('hero')
            .documentId('86ddcab2-9697-4fa9-8089-2f5642cbce6f')
        ),
      S.listItem()
        .title('CTA & Conversion')
        .id('ctaConfig')
        .child(
          S.document()
            .schemaType('ctaConfig')
            .documentId('ctaConfig')
        ),
      S.listItem()
        .title('Logo Carousel')
        .id('logoCarousel')
        .child(
          S.document()
            .schemaType('logoCarousel')
            .documentId('logoCarousel')
        ),
      S.listItem()
        .title('Problem Identification')
        .id('problemSection')
        .child(
          S.document()
            .schemaType('problemSection')
            .documentId('fecc954d-3a67-4f60-a798-299c6a6c47ec')
        ),
      S.listItem()
        .title('Benefits & Solutions')
        .id('benefitsSection')
        .child(
          S.document()
            .schemaType('benefitsSection')
            .documentId('benefitsSection')
        ),
      S.listItem()
        .title('Why Choose Us')
        .id('whyChooseUs')
        .child(
          S.document()
            .schemaType('whyChooseUs')
            .documentId('whyChooseUs')
        ),
      S.listItem()
        .title('Workflow')
        .id('workflowSection')
        .child(
          S.document()
            .schemaType('workflowSection')
            .documentId('workflowSection')
        ),
      S.listItem()
        .title('Testimonials')
        .id('testimonialsSection')
        .child(
          S.document()
            .schemaType('testimonialsSection')
            .documentId('testimonialsSection')
        ),
      S.listItem()
        .title('Pricing')
        .id('pricingSection')
        .child(
          S.document()
            .schemaType('pricingSection')
            .documentId('pricingSection')
        ),
      S.listItem()
        .title('FAQ')
        .id('faqSection')
        .child(
          S.document()
            .schemaType('faqSection')
            .documentId('faqSection')
        ),
      S.listItem()
        .title('Footer')
        .id('footerConfig')
        .child(
          S.document()
            .schemaType('footerConfig')
            .documentId('footerConfig')
        ),
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ]);
