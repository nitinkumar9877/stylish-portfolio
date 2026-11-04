import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServicePageData } from '@/controllers/portfolioController';
import ServicePage from '@/views/ServicePage';

export const dynamic = 'force-dynamic';

interface ServiceRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: 'Page not found | Rishi Thakor' };
  }

  return {
    title: `${service.name} | Rishi Thakor`,
    description: service.description,
  };
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const pageData = await getServicePageData(slug);

  if (!pageData) notFound();

  return <ServicePage {...pageData} />;
}
