
export interface Experience {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  animationType?: 'pulse' | 'orbit' | 'secure';
  telemetry: { label: string; value: string }[];
  colSpan: string;
  delay: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  role: string;
  location: string;
  phone: string;
  email: string;
}

export interface HeroContent {
  heading: string;
  role: string;
  tagline: string;
}

export interface SiteContent {
  config: SiteConfig;
  nav: NavItem[];
  hero: HeroContent;
  summary: string;
  skills: string[];
  experiences: Experience[];
  projects: Project[];
}
