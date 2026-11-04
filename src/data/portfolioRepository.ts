import {
  education as localEducation,
  experience as localExperience,
  portfolio as localPortfolio,
  services as localServices,
  type Experience,
  type PortfolioProfile,
  type Service,
} from '@/models/portfolio';

export interface PortfolioData {
  portfolio: PortfolioProfile;
  services: Service[];
  experience: Experience[];
  education: typeof localEducation;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isPortfolioProfile(value: unknown): value is PortfolioProfile {
  return (
    isRecord(value) &&
    isString(value.name) &&
    isString(value.role) &&
    isString(value.location) &&
    isString(value.email) &&
    isString(value.headline) &&
    isString(value.introduction) &&
    isString(value.availability)
  );
}

function isService(value: unknown): value is Service {
  return (
    isRecord(value) &&
    isString(value.slug) &&
    isString(value.number) &&
    isString(value.name) &&
    isString(value.shortName) &&
    isString(value.description) &&
    isString(value.intro) &&
    isString(value.accent) &&
    Array.isArray(value.deliverables) &&
    value.deliverables.every(isString)
  );
}

function isExperience(value: unknown): value is Experience {
  return (
    isRecord(value) &&
    isString(value.period) &&
    isString(value.role) &&
    isString(value.organization) &&
    Array.isArray(value.details) &&
    value.details.every(isString)
  );
}

function isEducation(value: unknown): value is PortfolioData['education'] {
  return (
    isRecord(value) &&
    isString(value.period) &&
    isString(value.qualification) &&
    isString(value.institution) &&
    isString(value.description)
  );
}

function isPortfolioData(value: unknown): value is PortfolioData {
  return (
    isRecord(value) &&
    isPortfolioProfile(value.portfolio) &&
    Array.isArray(value.services) &&
    value.services.every(isService) &&
    Array.isArray(value.experience) &&
    value.experience.every(isExperience) &&
    isEducation(value.education)
  );
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const apiUrl = process.env.PORTFOLIO_API_URL;

  if (!apiUrl) {
    return {
      portfolio: localPortfolio,
      services: localServices,
      experience: localExperience,
      education: localEducation,
    };
  }

  const apiBase = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
  const response = await fetch(new URL('portfolio', apiBase), { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Portfolio API request failed with status ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!isPortfolioData(payload)) {
    throw new Error('Portfolio API returned an invalid response shape');
  }

  return payload;
}
