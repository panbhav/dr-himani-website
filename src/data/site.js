export const SITE_URL = 'https://drhimani.pixeltocloud.com/';

export const PAGE_METADATA = {
  '/': {
    title: 'Dr. Himani | MBBS, MD, FGES, FRM | Obstetrics & Gynaecology',
    description: 'Meet Dr. Himani, an obstetrician and gynaecologist in Alwar, with MD training at AIIMS Rishikesh and fellowships in endoscopy and reproductive medicine.',
  },
  '/specialties': {
    title: 'Clinical Specialties & Procedures | Dr. Himani',
    description: 'Explore pregnancy, gynaecology, endoscopy, fertility and supportive care with Dr. Himani in Alwar.',
  },
  '/career': {
    title: 'Career, Fellowships & Research | Dr. Himani | AIIMS Rishikesh',
    description: 'Explore Dr. Himani’s education, fellowship training, hospital appointments and research references.',
  },
  '/contact': {
    title: 'Consultation & Contact | Dr. Himani',
    description: 'Contact Dr. Himani for consultation availability at Geetanjali Hospital, Alwar. Send an enquiry, call, email or get directions.',
  },
};

export function pageUrl(path) {
  return new URL(path === '/' ? '' : `${path.replace(/^\//, '')}/`, SITE_URL).href;
}
