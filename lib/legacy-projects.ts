import legacyProjectsJson from '@/content/legacy-projects.json';

export type LegacyMedia = {
  type: 'image' | 'video';
  url: string | null;
  unavailable: boolean;
  caption: string | null;
  alt: string | null;
  width: string | null;
  height: string | null;
};

export type LegacyCta = {
  title: string;
  url: string;
};

type LegacySectionBase = {
  sourceIndex: number | null;
};

export type LegacySection = LegacySectionBase &
  (
    | { type: 'hero'; titleHtml: string; subtitleHtml: string }
    | { type: 'heading'; html: string }
    | { type: 'text'; html: string; cta: LegacyCta | null }
    | {
        type: 'columns';
        columns: { html: string; media: LegacyMedia | null }[];
      }
    | {
        type: 'split';
        html: string;
        media: LegacyMedia | null;
        flipped: boolean;
      }
    | {
        type: 'process';
        items: { name: string; sectionIndex: number }[];
      }
    | { type: 'gallery'; layout: string; items: LegacyMedia[] }
  );

export type LegacyProject = {
  slug: string;
  shortId: string;
  originalUrl: string;
  sections: LegacySection[];
};

export const legacyProjects = legacyProjectsJson as LegacyProject[];

export const legacyProjectBySlug = Object.fromEntries(
  legacyProjects.map((project) => [project.slug, project]),
) as Record<string, LegacyProject>;
