import type { PortfolioProfile, Service } from '@/models/portfolio';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import RelatedServices from '@/components/service/RelatedServices';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceScope from '@/components/service/ServiceScope';

interface ServicePageProps {
  service: Service;
  services: Service[];
  portfolio: PortfolioProfile;
}

export default function ServicePage({ service, services, portfolio }: ServicePageProps) {
  return (
    <>
      <SiteHeader services={services} />
      <main>
        <ServiceHero service={service} />
        <ServiceScope service={service} />
        <RelatedServices current={service} services={services} />
      </main>
      <SiteFooter portfolio={portfolio} />
    </>
  );
}
