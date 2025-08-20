import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { LegalPageOverview, LegalPage, LegalPageSchema } from './types';

const legalPagesDirectory = path.join(process.cwd(), 'lib/legal/content');

export function getAllLegalPageSlugs(): string[] {
  if (!fs.existsSync(legalPagesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(legalPagesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .filter(fileName => fileName.toLowerCase() !== 'readme.md')
    .filter(fileName => !fileName.startsWith('_'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPage | null> {
  try {
    const fullPath = path.join(legalPagesDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate front matter using Zod schema
    const validationResult = LegalPageSchema.safeParse({
      slug,
      ...data,
    });

    if (!validationResult.success) {
      console.warn(`Invalid legal page data for ${slug}:`, validationResult.error);
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
      title: validatedData.title,
      description: validatedData.description,
      lastUpdated: validatedData.lastUpdated,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading legal page ${slug}:`, error);
    return null;
  }
}

export function getLegalPageOverviewBySlug(slug: string): LegalPageOverview | null {
  try {
    const fullPath = path.join(legalPagesDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // Validate front matter using Zod schema
    const validationResult = LegalPageSchema.safeParse({
      slug,
      ...data,
    });

    if (!validationResult.success) {
      console.warn(`Invalid legal page overview data for ${slug}:`, validationResult.error);
      return null;
    }

    const validatedData = validationResult.data;
    return {
      slug: validatedData.slug,
      title: validatedData.title,
      description: validatedData.description,
      lastUpdated: validatedData.lastUpdated,
    };
  } catch (error) {
    console.error(`Error reading legal page overview ${slug}:`, error);
    return null;
  }
}
