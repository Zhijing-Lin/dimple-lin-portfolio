import fs from 'node:fs';
import path from 'node:path';

const sourcePath = process.argv[2];
const outputPath = process.argv[3];

if (!sourcePath || !outputPath) {
  throw new Error(
    'Usage: node scripts/import-legacy-projects.mjs <source.json> <output.json>',
  );
}

const slugByShortId = {
  b04fa22b: 'help-center',
  '6c8b7574': 'reviewer-judgment',
  '8a18dbf3': 'ai-architecture',
  '2dbba5ae': 'survival-play',
  ae5df7e7: 'nutrition-literacy',
  da6053e0: 'interactive-coaching',
  '7a2dba18': 'adaptive-ai-feedback',
  f8bd92a0: 'learner-data',
};

const order = Object.values(slugByShortId);
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

function html(value) {
  return String(value || '').replace(/\s(?:class|style)="[^"]*"/gi, '');
}

function media(value) {
  if (!value) return null;
  const url = value.croppedImageUrl || value.url || null;
  if (!url) return null;

  const unavailable = url.includes('/example_project_images/empty-');
  return {
    type: String(value.type || 'Image').toLowerCase(),
    url: unavailable ? null : url,
    unavailable,
    caption: value.caption || null,
    alt: value.altTag || null,
    width: value.width || null,
    height: value.height || null,
  };
}

function cta(value) {
  if (!value?.show || !value.url) return null;
  return {
    title: value.title || 'Open project',
    url: value.url,
  };
}

function section(value) {
  const base = { sourceIndex: value.index ?? null };

  switch (value.type) {
    case 'MainHeader':
      return {
        ...base,
        type: 'hero',
        titleHtml: html(value.title?.text || value.sectionTitle),
        subtitleHtml: html(value.subtitle?.text || value.sectionSubTitle),
      };
    case 'Header':
      return {
        ...base,
        type: 'heading',
        html: html(value.title?.text || value.sectionTitle),
      };
    case 'Text':
      return {
        ...base,
        type: 'text',
        html: html(value.text?.text),
        cta: cta(value.cta),
      };
    case 'Columns':
      return {
        ...base,
        type: 'columns',
        columns: (value.columns || []).map((column) => ({
          html: html(column.text?.text),
          media: media(column.media),
        })),
      };
    case 'TextAndMedia':
      return {
        ...base,
        type: 'split',
        html: html(value.text?.text),
        media: media(value.media),
        flipped: Boolean(value.contentSettings?.flipped),
      };
    case 'Process':
      return {
        ...base,
        type: 'process',
        items: (value.processItems || []).map((item) => ({
          name: item.name,
          sectionIndex: item.sectionIndex,
        })),
      };
    case 'Gallery':
      return {
        ...base,
        type: 'gallery',
        layout: value.layout || 'Grid',
        items: (value.galleryItems || [])
          .map((item) => media(item.media))
          .filter(Boolean),
      };
    default:
      return null;
  }
}

const projects = source.caseStudies
  .map((project) => {
    const slug = slugByShortId[project.shortId];
    if (!slug) return null;
    return {
      slug,
      shortId: project.shortId,
      originalUrl: `https://dimplelin.work/${project.shortId}`,
      sections: (project.sections || []).map(section).filter(Boolean),
    };
  })
  .filter(Boolean)
  .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(projects, null, 2)}\n`);

console.log(`Imported ${projects.length} legacy projects to ${outputPath}`);
