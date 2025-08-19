import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { CaseStudyOverview, CaseStudy, CaseStudyOverviewSchema } from './types';

const caseStudiesDirectory = path.join(process.cwd(), 'lib/case-studies/content');

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(caseStudiesDirectory);
  return fileNames
    // Only include markdown files that are intended to be case studies
    // Exclude README and any files prefixed with an underscore
    .filter(fileName => fileName.endsWith('.md'))
    .filter(fileName => fileName.toLowerCase() !== 'readme.md')
    .filter(fileName => !fileName.startsWith('_'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getAllCaseStudies(): CaseStudyOverview[] {
  const slugs = getAllCaseStudySlugs();
  const caseStudies = slugs
    .map(slug => getCaseStudyOverviewBySlug(slug))
    .filter(Boolean) as CaseStudyOverview[];

  return caseStudies.sort((a, b) => a.company.localeCompare(b.company));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
    console.log('fullPath', fullPath);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate front matter using Zod schema
    const validationResult = CaseStudyOverviewSchema.safeParse({
      slug,
      ...data,
    });

    if (!validationResult.success) {
      console.warn(`Invalid case study data for ${slug}:`, validationResult.error);
      return null;
    }

    const validatedData = validationResult.data;

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const htmlContent = processedContent.toString();

    return {
      slug: validatedData.slug,
      company: validatedData.company,
      logo: validatedData.logo,
      industry: validatedData.industry,
      website: validatedData.website,
      overview: validatedData.overview,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading case study ${slug}:`, error);
    return null;
  }
}

export function getCaseStudyOverviewBySlug(slug: string): CaseStudyOverview | null {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // Validate front matter using Zod schema
    const validationResult = CaseStudyOverviewSchema.safeParse({
      slug,
      ...data,
    });

    if (!validationResult.success) {
      console.warn(`Invalid case study overview data for ${slug}:`, validationResult.error);
      return null;
    }

    const validatedData = validationResult.data;
    return {
      slug: validatedData.slug,
      company: validatedData.company,
      logo: validatedData.logo,
      industry: validatedData.industry,
      website: validatedData.website,
      overview: validatedData.overview,
    };
  } catch (error) {
    console.error(`Error reading case study overview ${slug}:`, error);
    return null;
  }
}

export function getCaseStudiesByIndustry(industry: string): CaseStudyOverview[] {
  const allCaseStudies = getAllCaseStudies();
  return allCaseStudies.filter(caseStudy => caseStudy.industry === industry);
}

export function getIndustries(): string[] {
  const allCaseStudies = getAllCaseStudies();
  const industries = [...new Set(allCaseStudies.map(caseStudy => caseStudy.industry))];
  return industries.sort();
}
