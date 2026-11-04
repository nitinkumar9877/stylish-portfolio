import { getPortfolioHome } from '@/controllers/portfolioController';
import PortfolioHome from '@/views/PortfolioHome';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const pageData = await getPortfolioHome();
  return <PortfolioHome {...pageData} />;
}
