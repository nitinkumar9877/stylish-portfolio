import type { Experience, PortfolioProfile, Service } from '@/models/portfolio';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import HomeHero from '@/components/home/HomeHero';
import ServicesSection from '@/components/home/ServicesSection';
import StorySection from '@/components/home/StorySection';

interface PortfolioHomeProps {
  portfolio: PortfolioProfile;
  services: Service[];
  experience: Experience[];
  education: {
    period: string;
    qualification: string;
    institution: string;
    description: string;
  };
}

export default function PortfolioHome({
  portfolio,
  services,
  experience,
  education,
}: PortfolioHomeProps) {
  return (
    <>
      <SiteHeader services={services} />
      <main>
        <HomeHero portfolio={portfolio} />
        <ServicesSection services={services} />
        <StorySection experience={experience} education={education} />
      </main>
      <SiteFooter portfolio={portfolio} />
    </>
  );
}
