export interface Service {
  slug: string;
  number: string;
  name: string;
  shortName: string;
  description: string;
  intro: string;
  deliverables: string[];
  accent: string;
}

export interface Experience {
  period: string;
  role: string;
  organization: string;
  details: string[];
}

export interface PortfolioProfile {
  name: string;
  role: string;
  location: string;
  email: string;
  headline: string;
  introduction: string;
  availability: string;
}

export const portfolio: PortfolioProfile = {
  name: 'Rishi Thakor',
  role: 'Independent designer & developer',
  location: 'Remote-first, worldwide',
  email: 'rishithakor218@gmail.com',
  headline: 'Thoughtful digital work, from first sketch to launch.',
  introduction:
    'I’m Rishi — a photographer, graphic designer, UI/UX designer and developer. I help people turn good ideas into clear, useful digital experiences.',
  availability: 'Available for select projects',
};

export const services: Service[] = [
  {
    slug: 'web-development',
    number: '01',
    name: 'Web Development',
    shortName: 'Web',
    description: 'Fast, thoughtful websites built to make your next idea real.',
    intro:
      'From the first wireframe to a site that is ready to go live, I bring design and development together to make the whole experience feel considered.',
    deliverables: [
      'Discovery, goals and project planning',
      'UX, visual design and responsive layouts',
      'Front-end and back-end development',
      'Technical SEO and performance',
      'Testing, launch and ongoing support',
    ],
    accent: '#a65b3c',
  },
  {
    slug: 'app-development',
    number: '02',
    name: 'App Development',
    shortName: 'Apps',
    description: 'Useful app experiences, shaped around the people who use them.',
    intro:
      'I take apps from an early product idea through to a polished release, keeping the experience intuitive and the implementation dependable.',
    deliverables: [
      'Product scoping and user flows',
      'Interface design and prototyping',
      'App development and integrations',
      'Quality testing across devices',
      'Store launch and post-release updates',
    ],
    accent: '#8a7753',
  },
  {
    slug: 'ui-ux-design',
    number: '03',
    name: 'UI/UX Design',
    shortName: 'UI/UX',
    description: 'Clear product journeys, from the first user flow to final UI.',
    intro:
      'Good interface design starts with understanding. I connect user needs and business goals, then turn that understanding into practical, polished product experiences.',
    deliverables: [
      'Brand and business needs analysis',
      'User and competitor research',
      'Information architecture and user flows',
      'Wireframes and high-fidelity UI',
      'Interactive prototypes and usability testing',
    ],
    accent: '#74816d',
  },
  {
    slug: 'graphic-design',
    number: '04',
    name: 'Graphic Design',
    shortName: 'Graphic',
    description: 'Distinctive visual content that feels true to your brand.',
    intro:
      'From a clear visual direction to the final set of assets, I create graphic work that gives a brand a consistent and recognizable voice.',
    deliverables: [
      'Brand, audience and tone analysis',
      'Visual direction built around your guidelines',
      'Posters and social media creatives',
      'Strong typography and clear hierarchy',
      'Platform-ready files in every format you need',
    ],
    accent: '#a4552c',
  },
];

export const experience: Experience[] = [
  {
    period: 'Oct 2026 — Now',
    role: 'Independent freelancer',
    organization: 'Working for myself, remote-first',
    details: [
      'Websites, iOS apps, interfaces and brand creatives, carried from the first sketch to launch.',
      'Working directly with clients, wherever they are.',
    ],
  },
  {
    period: 'Jul 2026 — Sep 2026',
    role: 'Graphic designer',
    organization: 'Himspring LLC',
    details: [
      'Managed visual content across social media for real estate, luxury water bottle and clothing brands.',
      'Designed social media creatives, stories and carousels in Adobe Illustrator.',
    ],
  },
  {
    period: 'Jan 2026 — Jun 2026',
    role: 'UI/UX designer',
    organization: 'Quicko Pvt Ltd, Ahmedabad',
    details: [
      'Designed website interfaces and user experiences in Figma, focused on usability and visual clarity.',
      'Built no-code web pages and interactive financial tools in Framer.',
    ],
  },
  {
    period: 'Jan 2025 — May 2025',
    role: 'Graphic designer intern',
    organization: 'WBT, Delhi · Remote',
    details: [
      'Designed pitch decks and presentations to communicate ideas and business concepts.',
      'Created social media creatives and visual assets for branding and marketing.',
    ],
  },
];

export const education = {
  period: 'Jul 2022 — May 2026',
  qualification: 'B.Tech, Computer Science',
  institution: 'Pandit Deendayal Energy University (PDEU)',
  description:
    'Four years of computer science: where it all started, with code in the classroom and design on the side. Graduated in May 2026, with internships and real projects already under way.',
};
