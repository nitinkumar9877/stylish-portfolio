import { getPortfolioData } from '@/data/portfolioRepository';
export async function getPortfolioHome() {
  return getPortfolioData();
}

export async function getServiceBySlug(slug: string) {
  const data = await getPortfolioData();
  return data.services.find((service) => service.slug === slug);
}

export async function getServicePageData(slug: string) {
  const data = await getPortfolioData();
  const service = data.services.find((item) => item.slug === slug);
  return service ? { ...data, service } : undefined;
}
