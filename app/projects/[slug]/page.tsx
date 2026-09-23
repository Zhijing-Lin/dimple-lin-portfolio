import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bot,
  BrainCircuit,
  Captions,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Database,
  FileSearch,
  FileText,
  Flame,
  ExternalLink,
  Handshake,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  MousePointerClick,
  Mountain,
  MessagesSquare,
  RefreshCw,
  RotateCcw,
  ScanSearch,
  Search,
  Scale,
  Sparkles,
  Target,
  TentTree,
  Timer,
  UsersRound,
  Video,
  Waypoints,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import {
  ProjectProgressNav,
  type ProjectProgressItem,
} from '@/components/project-progress-nav';
import { ProjectImageLightbox } from '@/components/project-image-lightbox';
import { ProjectVisualLightbox } from '@/components/project-visual-lightbox';
import { SiteHeader } from '@/components/site-header';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  legacyProjectBySlug,
  type LegacyMedia,
  type LegacySection,
} from '@/lib/legacy-projects';
import {
  metaHeadings,
  projectDetailBySlug,
  projectDetails,
} from '@/lib/project-details';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&rarr;/g, '→')
    .replace(/&mdash;/g, '—');
}

function plainText(html: string) {
  return decodeEntities(
    html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function firstHeading(html: string) {
  const match = html.match(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/i);
  return match ? plainText(match[1]) : '';
}

function sectionTitle(section: LegacySection, index: number) {
  if (
    section.type === 'heading' ||
    section.type === 'text' ||
    section.type === 'split'
  ) {
    return firstHeading(section.html) || `Section ${index + 1}`;
  }
  if (section.type === 'columns') {
    return firstHeading(section.columns[0]?.html || '') || 'Project details';
  }
  if (section.type === 'process') return 'Design process';
  if (section.type === 'gallery') return 'Project gallery';
  return 'Overview';
}

function sectionId(title: string, index: number) {
  const value = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${value || 'section'}-${index + 1}`;
}

function metadataToneClass(heading: string) {
  if (heading === 'Team' || heading === 'Course Audience') {
    return 'metadata-card-warm';
  }
  if (heading === 'My Role') return 'metadata-card-blue';
  if (heading === 'Tools' || heading === 'Tool Used' || heading === 'Methods') {
    return 'metadata-card-green';
  }
  if (heading === 'Timeline') return 'metadata-card-rose';
  return 'metadata-card-neutral';
}

function RichText({
  html,
  className = '',
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`legacy-rich-text${className ? ` ${className}` : ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const zoomableProjectImages = new Set([
  '/projects/ai-architecture-anchored-learning.png',
  '/projects/ai-architecture-flow-diagram.jpg',
  '/projects/ai-architecture-immediate-feedback.png',
  '/projects/ai-architecture-just-in-time.png',
  '/projects/ai-architecture-prototype.png',
  '/projects/ai-architecture-storyboard.png',
  '/projects/help-center-procedural-job-aid.png',
  '/projects/help-center-operational-decision-guide.png',
  '/projects/reviewer-performance-gaps.png',
  '/projects/course-evaluation.png',
  '/projects/survival-consequence-feedback.jpg',
  '/projects/survival-contrasting-cases.jpg',
  '/projects/survival-game-loop.png',
  '/projects/survival-learning-by-doing.jpg',
  '/projects/survival-prototype-1.jpg',
  '/projects/survival-prototype-2-hd.png',
  '/projects/survival-prototype-3-hd.png',
  '/projects/survival-scaffolding.jpg',
  '/projects/survival-campsite-cta-hd.jpg',
  '/projects/survival-firemaking-cta-hd.jpg',
  '/projects/nutrition-theoretical-cta-model.png',
  '/projects/nutrition-empirical-expert-novice-cta.png',
  '/projects/tutor-problem-space-mapping.png',
  '/projects/tutorial-search-original.webp',
  '/projects/tutorial-search-redesigned.webp',
]);

function ProjectMedia({ media }: { media: LegacyMedia | null }) {
  if (!media || media.unavailable || !media.url) {
    return (
      <figure
        className="legacy-media-placeholder"
        aria-label="Media placeholder"
      >
        <span>Media</span>
        <p>Original media is not available yet.</p>
      </figure>
    );
  }

  const caption = media.caption ? plainText(media.caption) : '';

  if (media.type === 'image' && zoomableProjectImages.has(media.url)) {
    return (
      <ProjectImageLightbox
        src={media.url}
        alt={media.alt || caption || ''}
        caption={caption}
      />
    );
  }

  return (
    <figure className={`legacy-media legacy-media-${media.type}`}>
      <div className="legacy-media-frame">
        {media.type === 'video' ? (
          <iframe
            src={media.url}
            title={caption || 'Project video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <img
            src={media.url}
            alt={media.alt || caption || ''}
            loading="lazy"
          />
        )}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

const humanLoopWorkflowSteps = [
  'Tutor issue',
  'Supervisor SME meeting',
  'AI notes',
  'GPT draft',
  'My review',
  'Supervisor validation',
  'Published article',
];

function HumanLoopWorkflow() {
  return (
    <figure className="legacy-media human-loop-workflow">
      <div className="human-loop-workflow-frame">
        <div className="human-loop-workflow-intro">
          <span>Article workflow</span>
          <p>From tutor need to validated guidance</p>
        </div>
        <ol>
          {humanLoopWorkflowSteps.map((step, stepIndex) => (
            <li key={step}>
              <span>{String(stepIndex + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>AI-assisted workflow with human review built in</figcaption>
    </figure>
  );
}

const reviewerKnowledgeItems = [
  {
    title: 'Project Context & Purpose',
    description:
      'Understand Open 4 Peer Review and why structured peer review matters for OER quality.',
    icon: BookOpen,
  },
  {
    title: 'Reviewer Role & Mindset',
    description:
      'Support improvement through evidence—not grading or judging the author.',
    icon: Handshake,
  },
  {
    title: 'Single-Point Rubrics',
    description:
      'Understand how single-point rubrics differ from traditional grading rubrics.',
    icon: Target,
  },
  {
    title: 'Rating Categories',
    description:
      'Interpret Does Not Meet, Exemplifies, and Exceeds consistently.',
    icon: ListChecks,
  },
  {
    title: 'Rubric Structure',
    description:
      'Recognize each rubric section, framing language, glossary, and criteria.',
    icon: Waypoints,
  },
  {
    title: 'Rubric Scope',
    description:
      'Distinguish what belongs within the assigned rubric from what falls outside it.',
    icon: ScanSearch,
  },
  {
    title: 'Review Workflow',
    description:
      'Read the rubric, review the OER, gather evidence, and draft feedback.',
    icon: RefreshCw,
  },
];

function ReviewerKnowledgeMap() {
  return (
    <figure className="legacy-media reviewer-knowledge-map">
      <div className="reviewer-knowledge-map-frame">
        <p className="reviewer-visual-eyebrow">Foundational knowledge</p>
        <ul>
          {reviewerKnowledgeItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <span className="reviewer-knowledge-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption>
        Core Reviewer Knowledge Identified Through Analysis
      </figcaption>
    </figure>
  );
}

const reviewerWorkflowSteps = [
  {
    title: 'Align on objectives and course architecture',
    description:
      'Translate the needs analysis into learning objectives and an initial course structure.',
    icon: Target,
  },
  {
    title: 'Weekly team design reviews',
    description:
      'Refine scope, sequence, learning activities, and production decisions.',
    icon: UsersRound,
  },
  {
    title: 'Biweekly stakeholder reviews',
    description:
      'Validate major decisions and secure approval before development.',
    icon: MessagesSquare,
  },
  {
    title: 'User testing-informed iteration',
    description:
      'Update the learning experience based on learner feedback and observed needs.',
    icon: RotateCcw,
  },
];

function ReviewerProjectWorkflow() {
  return (
    <figure className="legacy-media reviewer-project-workflow">
      <div className="reviewer-project-workflow-frame">
        <p className="reviewer-visual-eyebrow">Recurring alignment cycle</p>
        <ol>
          {reviewerWorkflowSteps.map((step, stepIndex) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <span className="reviewer-workflow-marker" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.9} />
                </span>
                <div>
                  <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="reviewer-workflow-outcome">
          <BadgeCheck size={18} aria-hidden="true" />
          <span>Validated, learner-informed course design</span>
        </div>
      </div>
      <figcaption>Project alignment and iteration workflow</figcaption>
    </figure>
  );
}

const survivalReasoningGroups = [
  {
    title: 'Campsite Selection',
    icon: TentTree,
    items: [
      'Focused on one obvious feature',
      'Relied on general impressions',
      'Struggled to weigh trade-offs',
      'Overlooked hazards without prompts',
    ],
  },
  {
    title: 'Firemaking',
    icon: Flame,
    items: [
      'Knew individual steps, but not the full sequence',
      'Confused the roles of tinder, kindling, and fuel',
      'Paid limited attention to airflow and structure',
      'Reacted to failure instead of diagnosing the cause',
    ],
  },
];

function SurvivalReasoningGaps() {
  return (
    <figure className="legacy-media survival-reasoning-gaps">
      <div className="survival-diagram-frame">
        <p className="survival-diagram-eyebrow">Research synthesis</p>
        <h3>What we found: novice reasoning gaps</h3>
        <div className="survival-reasoning-grid">
          {survivalReasoningGroups.map((group) => {
            const Icon = group.icon;
            return (
              <section key={group.title}>
                <header>
                  <strong>{group.title}</strong>
                  <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                </header>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
      <figcaption>Novice Reasoning Gaps Identified Through CTA</figcaption>
    </figure>
  );
}

const survivalExperienceGoals = [
  {
    title: 'Decisions feel weighted, not graded',
    icon: Scale,
  },
  {
    title: 'Players think in trade-offs rather than recall',
    icon: BrainCircuit,
  },
  {
    title: 'Knowledge grows through consequence and surprise',
    icon: Flame,
  },
  {
    title: 'Support gradually shifts into independent judgment',
    icon: Target,
  },
  {
    title: 'Learning stays connected to a meaningful mission',
    icon: Mountain,
  },
];

function SurvivalGoalsMap() {
  return (
    <figure className="legacy-media survival-goals-map">
      <div className="survival-diagram-frame">
        <p className="survival-diagram-eyebrow">
          Instructional design strategy
        </p>
        <h3>Aligned learning and experience goals</h3>
        <div className="survival-goals-grid">
          <section className="survival-learning-goals">
            <h4>Learning goals</h4>
            <article>
              <TentTree size={25} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <strong>Campsite Selection</strong>
                <p>
                  Evaluate environmental cues and trade-offs to choose a safe
                  campsite as conditions change.
                </p>
              </div>
            </article>
            <article>
              <Flame size={25} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <strong>Firemaking</strong>
                <p>
                  Select materials, sequence actions, support airflow, and
                  diagnose failure.
                </p>
              </div>
            </article>
          </section>
          <section className="survival-experience-goals">
            <h4>Experience goals</h4>
            <ul>
              {survivalExperienceGoals.map((goal) => {
                const Icon = goal.icon;
                return (
                  <li key={goal.title}>
                    <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                    <span>{goal.title}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
      <figcaption>Learning &amp; Experience Goals</figcaption>
    </figure>
  );
}

const survivalPlaytestingChanges = [
  {
    title: 'From Passive Inspection to Active Decision-Making',
    before:
      'Players clicked through environmental hotspots, read explanations, and then selected a campsite.',
    after:
      'Players compare campsite options, prioritize environmental evidence, make a decision, and then receive feedback.',
  },
  {
    title: 'From “Click Everything” to Selective Judgment',
    before:
      'Players could inspect every hotspot, allowing progress without deciding which clues actually mattered.',
    after:
      'Players can inspect only 3 of 7 clues, including distractors, and must prioritize information based on changing weather conditions.',
  },
  {
    title: 'From Separate Activities to a Connected Survival Loop',
    before:
      'Campsite selection, firemaking, and herb collection felt like separate learning activities.',
    after:
      'The activities are connected into one survival loop: Campsite Selection → Material Collection → Fire Building → Herb Search. Earlier decisions can affect the difficulty of later tasks.',
  },
];

function SurvivalPlaytestingChanges() {
  return (
    <figure className="legacy-media survival-playtesting-map">
      <div className="survival-change-board">
        {survivalPlaytestingChanges.map((change, changeIndex) => (
          <section className="survival-change-row" key={change.title}>
            <h4>
              <span>{changeIndex + 1}</span>
              {change.title}
            </h4>
            <div className="survival-change-comparison">
              <article className="is-before">
                <strong>Before</strong>
                <p>{change.before}</p>
              </article>
              <ArrowRight aria-hidden="true" size={20} strokeWidth={1.7} />
              <article className="is-after">
                <strong>After</strong>
                <p>{change.after}</p>
              </article>
            </div>
          </section>
        ))}
        <div className="survival-change-evolution">
          <strong>Design Evolution</strong>
          <span>Explain → Click → Continue</span>
          <ArrowRight aria-hidden="true" size={20} strokeWidth={1.7} />
          <span>Observe → Decide → Experience Consequences → Adapt</span>
        </div>
      </div>
    </figure>
  );
}

const nutritionDesignFlowSteps = [
  {
    title: 'Learner Need',
    icon: UsersRound,
  },
  {
    title: 'Learning Goals',
    icon: Target,
  },
  {
    title: 'Assessment Tasks',
    icon: ClipboardCheck,
  },
  {
    title: 'CTA / Think-Aloud',
    icon: MessagesSquare,
  },
  {
    title: 'Refine Instruction & Scaffolding',
    icon: Lightbulb,
  },
  {
    title: 'Storyline Development',
    icon: BookOpen,
  },
  {
    title: 'Learner Testing',
    icon: ScanSearch,
  },
  {
    title: 'Iteration',
    icon: RefreshCw,
  },
];

function NutritionDesignApproachFlow() {
  return (
    <ProjectVisualLightbox
      className="nutrition-design-flow"
      caption="Design Approach Flowchart"
    >
      <div className="nutrition-visual-frame">
        <p className="nutrition-visual-eyebrow">Research-informed design</p>
        <ol>
          {nutritionDesignFlowSteps.map((step, stepIndex) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <span className="nutrition-flow-number">
                  {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                <strong>{step.title}</strong>
              </li>
            );
          })}
        </ol>
        <div className="nutrition-feedback-loop">
          <RefreshCw size={17} strokeWidth={1.8} aria-hidden="true" />
          <span>
            Learner testing and iteration feed back into instruction and
            scaffolding.
          </span>
        </div>
      </div>
    </ProjectVisualLightbox>
  );
}

function NutritionDesignAlignment() {
  return (
    <ProjectVisualLightbox
      className="nutrition-alignment-map"
      caption="Design Alignment Figure"
    >
      <div className="nutrition-visual-frame">
        <p className="nutrition-visual-eyebrow">Backward design alignment</p>
        <div className="nutrition-alignment-canvas">
          <svg
            className="nutrition-alignment-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="nutrition-alignment-arrow"
                markerWidth="7"
                markerHeight="7"
                refX="5.8"
                refY="3.5"
                orient="auto"
              >
                <path d="M0,0 L7,3.5 L0,7" fill="none" />
              </marker>
            </defs>
            <path
              className="is-cycle"
              d="M34 19 H66"
              markerEnd="url(#nutrition-alignment-arrow)"
            />
            <path
              className="is-cycle"
              d="M84 31 V72 Q84 82 73 82 H65"
              markerEnd="url(#nutrition-alignment-arrow)"
            />
            <path
              className="is-cycle"
              d="M35 82 H25 Q16 82 16 72 V31"
              markerEnd="url(#nutrition-alignment-arrow)"
            />
            <path className="is-learning" d="M31 31 L45 49" />
            <path className="is-learning" d="M69 31 L55 49" />
            <path className="is-learning" d="M50 59 V68" />
          </svg>
          <article className="is-objective">
            <span>01</span>
            <strong>Learning Objectives</strong>
            <p>Define what learners should know and do.</p>
          </article>
          <article className="is-assessment">
            <span>02</span>
            <strong>Assessment</strong>
            <p>Measure whether learners can demonstrate those outcomes.</p>
          </article>
          <div className="nutrition-learning-hub">
            <BrainCircuit size={21} strokeWidth={1.8} aria-hidden="true" />
            <strong>Student Learning</strong>
          </div>
          <article className="nutrition-instruction-card">
            <span>03</span>
            <strong>Instruction &amp; Practice</strong>
            <p>
              Prepare learners through content, practice, feedback, and
              reflection.
            </p>
          </article>
          <small className="is-goals-label">Goals define evidence</small>
          <small className="is-instruction-label">
            Instruction supports goals
          </small>
          <small className="is-assessment-label">
            Assessment guides instruction
          </small>
        </div>
      </div>
    </ProjectVisualLightbox>
  );
}

const nutritionCtaFindings = [
  {
    novice: 'Focuses on isolated cues, such as calories',
    expert: 'Weighs multiple criteria cues together',
    implication: 'Add guided comparison tasks',
  },
  {
    novice: 'Uses nutrition numbers without knowing what they mean',
    expert:
      'Explains what calorie, protein, and sodium levels mean for this person',
    implication: 'Add examples that connect nutrition data to persona needs',
  },
  {
    novice: 'Gives descriptive explanations',
    expert: 'Justifies choices with evidence',
    implication: 'Add reflection and justification prompts',
  },
];

function NutritionCTAFindings() {
  return (
    <figure className="legacy-media nutrition-visual nutrition-cta-findings">
      <div className="nutrition-visual-frame">
        <p className="nutrition-visual-eyebrow">Cognitive task analysis</p>
        <h3>From reasoning gap to design response</h3>
        <div className="nutrition-findings-table" role="table">
          <div className="nutrition-findings-header" role="row">
            <span role="columnheader">Novice Reasoning</span>
            <span role="columnheader">Expert Reasoning</span>
            <span role="columnheader">Design Implication</span>
          </div>
          {nutritionCtaFindings.map((finding) => (
            <div
              className="nutrition-findings-row"
              role="row"
              key={finding.novice}
            >
              <span role="cell">{finding.novice}</span>
              <span role="cell">{finding.expert}</span>
              <span role="cell">{finding.implication}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption>CTA Findings</figcaption>
    </figure>
  );
}

function NutritionCTAModelGallery({ items }: { items: LegacyMedia[] }) {
  return (
    <Carousel
      className="nutrition-cta-carousel"
      opts={{ align: 'start', loop: true }}
      aria-label="Cognitive task analysis diagrams"
    >
      <CarouselContent>
        <CarouselItem>
          <NutritionCTAFindings />
        </CarouselItem>
        {items.slice(0, 2).map((item, itemIndex) => (
          <CarouselItem key={`${item.url}-${itemIndex}`}>
            <ProjectMedia media={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="nutrition-cta-carousel-previous" />
      <CarouselNext className="nutrition-cta-carousel-next" />
    </Carousel>
  );
}

const tutorialDiscoverySteps = [
  {
    title: 'Define realistic tasks',
    detail: 'Create a project · Find publishing settings · Re-find support',
    icon: ClipboardCheck,
  },
  {
    title: 'Prompt a synthetic user',
    detail: 'Complete the task as a first-time or returning course author',
    icon: Bot,
  },
  {
    title: 'Observe behavior',
    detail: 'Search path · Hesitation · Backtracking · Attempts · Success',
    icon: FileSearch,
  },
  {
    title: 'Set the right scope',
    detail: 'Redesign search. Keep the working sidebar.',
    icon: Target,
  },
];

function TutorialSyntheticUserPath() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-discovery-map">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">Synthetic user task testing</p>
        <h3>How I identified search friction before redesigning</h3>
        <ol className="tutorial-step-flow">
          {tutorialDiscoverySteps.map((step, stepIndex) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <span className="tutorial-step-icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <span className="tutorial-step-number">
                  {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </li>
            );
          })}
        </ol>
        <div className="tutorial-query-finding">
          <div>
            <span>publish</span>
            <small>wrong result</small>
          </div>
          <ArrowRight size={17} aria-hidden="true" />
          <div>
            <span>publishing</span>
            <small>no result</small>
          </div>
          <ArrowRight size={17} aria-hidden="true" />
          <div className="is-success">
            <span>visibility</span>
            <small>correct tutorial</small>
          </div>
        </div>
        <p className="tutorial-visual-note">
          Key finding: search failed when user language differed from site
          terminology.
        </p>
      </div>
      <figcaption>
        Evidence narrowed the redesign to search—not navigation.
      </figcaption>
    </figure>
  );
}

const tutorialRootCauses = [
  {
    title: 'Search Index Misalignment',
    detail: 'Visible title ≠ indexed title · “Publishing” missing',
    icon: Database,
  },
  {
    title: 'Unused Caption Content',
    detail: 'Helpful video language existed but was not searchable',
    icon: Captions,
  },
  {
    title: 'Literal Matching',
    detail: 'publish ≠ publishing · quiz ≠ MCQ',
    icon: Search,
  },
  {
    title: 'Weak Result Context',
    detail: 'Sparse result cards made relevance hard to judge',
    icon: FileText,
  },
];

function TutorialRootCauseDiagram() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-root-causes">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">Root cause analysis</p>
        <h3>Why was search failing?</h3>
        <div className="tutorial-problem-core">
          Users could not reliably find the right tutorial through search
        </div>
        <div className="tutorial-cause-grid">
          {tutorialRootCauses.map((cause) => {
            const Icon = cause.icon;
            return (
              <article key={cause.title}>
                <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
                <strong>{cause.title}</strong>
                <p>{cause.detail}</p>
              </article>
            );
          })}
        </div>
        <div className="tutorial-insight-bar">
          <Lightbulb size={18} aria-hidden="true" />
          <span>
            Not a missing-keyword problem: content structure + search logic +
            result design
          </span>
        </div>
      </div>
    </figure>
  );
}

function TutorialContentAuditFlow() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-audit-flow">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">Content audit before redesign</p>
        <div className="tutorial-audit-steps">
          <article>
            <Database size={23} strokeWidth={1.7} aria-hidden="true" />
            <strong>Existing content</strong>
            <p>Sidebar · Search index · Tutorial pages · Captions</p>
          </article>
          <ArrowRight size={20} aria-hidden="true" />
          <article>
            <FileSearch size={23} strokeWidth={1.7} aria-hidden="true" />
            <strong>Validate what exists</strong>
            <p>Resolve gaps, duplicates, and incomplete pages</p>
          </article>
          <ArrowRight size={20} aria-hidden="true" />
          <article className="is-audit-result">
            <CheckCircle2 size={23} strokeWidth={1.7} aria-hidden="true" />
            <strong>Reliable searchable corpus</strong>
            <p>Generate metadata only for verified tutorials</p>
          </article>
        </div>
      </div>
    </figure>
  );
}

const tutorialRedesignMoves = [
  {
    title: 'Smarter Matching',
    detail: 'Richer metadata, synonyms, and word variations',
    example: 'quiz · MCQ · multiple choice',
    icon: Search,
  },
  {
    title: 'Intent-Based Ranking',
    detail: 'Weight the strongest signals of intent first',
    example: 'Title → Keywords → Description → Category → Transcript',
    icon: Waypoints,
  },
  {
    title: 'Clearer Results',
    detail: 'Add category, description, excerpt, and action',
    example: 'Faster relevance judgment before opening',
    icon: FileText,
  },
];

function TutorialSearchRedesignOverview() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-redesign-overview">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">Search redesign overview</p>
        <h3>Redesigning the search experience</h3>
        <div className="tutorial-redesign-grid">
          {tutorialRedesignMoves.map((move, moveIndex) => {
            const Icon = move.icon;
            return (
              <article key={move.title}>
                <div className="tutorial-redesign-card-heading">
                  <span>{String(moveIndex + 1).padStart(2, '0')}</span>
                  <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <strong>{move.title}</strong>
                <p>{move.detail}</p>
                <small>{move.example}</small>
              </article>
            );
          })}
        </div>
      </div>
    </figure>
  );
}

function TutorialSearchComparison() {
  return (
    <figure className="tutorial-search-comparison">
      <div>
        <ProjectImageLightbox
          src="/projects/tutorial-search-original.webp"
          alt="Original tutorial search showing one sparse result for publish"
          caption="Original Search Experience"
        />
        <ul>
          <li>Literal matching</li>
          <li>Limited result context</li>
        </ul>
      </div>
      <div>
        <ProjectImageLightbox
          src="/projects/tutorial-search-redesigned.webp"
          alt="Redesigned tutorial search showing ranked contextual results for publish"
          caption="Redesigned Search Experience"
        />
        <ul>
          <li>Supports word variations</li>
          <li>Clearer ranking and relevance cues</li>
        </ul>
      </div>
    </figure>
  );
}

function TutorialAIWorkflow() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-ai-workflow">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">AI-augmented workflow</p>
        <div className="tutorial-ai-top">
          <Bot size={23} strokeWidth={1.7} aria-hidden="true" />
          <div>
            <strong>Claude — Synthetic User</strong>
            <p>Simulate behavior · Complete tasks · Surface friction</p>
          </div>
        </div>
        <div className="tutorial-ai-center">
          <span>Me</span>
          <strong>Frame · Review · Decide</strong>
          <p>
            Define tasks · Interpret evidence · Set scope · Make decisions ·
            Evaluate results
          </p>
        </div>
        <div className="tutorial-ai-partners">
          <article>
            <Sparkles size={21} strokeWidth={1.7} aria-hidden="true" />
            <strong>ChatGPT</strong>
            <span>Design &amp; Reasoning Partner</span>
            <p>Structure research · Challenge assumptions · Plan evaluation</p>
          </article>
          <article>
            <Code2 size={21} strokeWidth={1.7} aria-hidden="true" />
            <strong>Cursor</strong>
            <span>Coding Agent</span>
            <p>Inspect code · Diagnose causes · Implement · Support QA</p>
          </article>
        </div>
        <div className="tutorial-human-summary">
          AI supports the process. Human judgment guides the decisions.
        </div>
      </div>
    </figure>
  );
}

function TutorialVideoProduction() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-video-production">
      <div className="tutorial-visual-frame">
        <div className="tutorial-video-stage">
          <div className="tutorial-video-browser">
            <div className="tutorial-window-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="tutorial-video-screen">
              <span className="tutorial-video-step">Step 2</span>
              <strong>Configure visibility</strong>
              <button type="button" tabIndex={-1}>
                Save changes
              </button>
              <MousePointerClick size={24} aria-hidden="true" />
            </div>
          </div>
          <div className="tutorial-video-timeline" aria-hidden="true">
            <span />
            <span />
            <span />
            <i />
          </div>
        </div>
        <div className="tutorial-video-copy">
          <Video size={25} strokeWidth={1.7} aria-hidden="true" />
          <h3>Tutorial Video Production in Camtasia</h3>
          <ul>
            <li>Planned workflow demonstrations</li>
            <li>Recorded narration and screen capture</li>
            <li>Edited pacing, transitions, zoom, and visual focus</li>
          </ul>
          <div className="tutorial-skill-tags">
            <span>Screen Recording</span>
            <span>Video Editing</span>
            <span>Visual Attention</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

const tutorialMetrics = [
  { before: '2/3', after: '3/3', label: 'Search Task Success' },
  { before: '1/3', after: '3/3', label: 'First-Query Success' },
  { before: '1/3', after: '3/3', label: 'Correct Tutorial Ranked #1' },
];

function TutorialOutcomeMetrics() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-outcome-metrics">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">Before-and-after pilot</p>
        <div className="tutorial-metric-grid">
          {tutorialMetrics.map((metric) => (
            <article key={metric.label}>
              <div>
                <span>{metric.before}</span>
                <ArrowRight size={18} aria-hidden="true" />
                <strong>{metric.after}</strong>
              </div>
              <p>{metric.label}</p>
            </article>
          ))}
        </div>
        <p className="tutorial-visual-note">
          Pilot findings from before-and-after synthetic-user evaluation
        </p>
      </div>
    </figure>
  );
}

function TutorialQuizCallout() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-quiz-callout">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">
          Strongest improvement: Quiz / MCQ task
        </p>
        <div className="tutorial-quiz-grid">
          <article className="is-original">
            <strong>Original</strong>
            <p>quiz → no correct result</p>
            <p>MCQ → no correct result</p>
            <p>multiple choice → no correct result</p>
            <small>User had to browse manually</small>
          </article>
          <ArrowRight size={22} aria-hidden="true" />
          <article className="is-redesigned">
            <strong>Redesigned</strong>
            <p>quiz</p>
            <ArrowRight size={18} aria-hidden="true" />
            <p>Add Multiple-Choice Questions (MCQ)</p>
            <span>Rank #1</span>
          </article>
        </div>
      </div>
    </figure>
  );
}

const tutorialValidationSteps = [
  {
    title: 'Recruit Users',
    detail: '5–8 Torus course authors or instructors',
    icon: UsersRound,
  },
  {
    title: 'Run Search Tasks',
    detail: 'Publishing · Quiz / MCQ · Learning objectives',
    icon: Search,
  },
  {
    title: 'Measure Outcomes',
    detail: 'Success · Time · Attempts · Confidence · Friction',
    icon: Timer,
  },
];

function TutorialValidationPlan() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-validation-plan">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">Next step</p>
        <h3>Real-user validation</h3>
        <ol className="tutorial-validation-steps">
          {tutorialValidationSteps.map((step, stepIndex) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <span>{stepIndex + 1}</span>
                <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </li>
            );
          })}
        </ol>
        <div className="tutorial-human-summary">
          Move from directional pilot evidence to stronger real-user validation
        </div>
      </div>
    </figure>
  );
}

function TutorialReflectionQuote() {
  return (
    <figure className="legacy-media tutorial-reflection-quote">
      <blockquote>
        “AI can accelerate research and development, but the designer remains
        responsible for framing the problem, evaluating evidence, controlling
        scope, and deciding what should actually be built.”
      </blockquote>
    </figure>
  );
}

const tutorialImprovementSteps = [
  'Evaluate',
  'Identify Remaining Friction',
  'Refine',
  'Retest',
];

function TutorialImprovementLoop() {
  return (
    <figure className="legacy-media tutorial-visual tutorial-improvement-loop">
      <div className="tutorial-visual-frame">
        <p className="tutorial-visual-eyebrow">Continuous improvement</p>
        <div className="tutorial-loop-steps">
          {tutorialImprovementSteps.map((step, stepIndex) => (
            <div key={step}>
              <article className={stepIndex === 1 ? 'is-friction' : ''}>
                <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
                {stepIndex === 1 ? (
                  <small>Search field retains previous query</small>
                ) : null}
              </article>
              <RefreshCw size={18} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

function TutorialVisual({ sourceIndex }: { sourceIndex: number }) {
  switch (sourceIndex) {
    case 5:
      return <TutorialSyntheticUserPath />;
    case 7:
      return <TutorialRootCauseDiagram />;
    case 8:
      return <TutorialContentAuditFlow />;
    case 10:
      return <TutorialSearchRedesignOverview />;
    case 11:
      return <TutorialSearchComparison />;
    case 12:
      return <TutorialAIWorkflow />;
    case 13:
      return <TutorialVideoProduction />;
    case 14:
      return <TutorialOutcomeMetrics />;
    case 15:
      return <TutorialQuizCallout />;
    case 17:
      return <TutorialValidationPlan />;
    case 18:
      return <TutorialReflectionQuote />;
    case 19:
      return <TutorialImprovementLoop />;
    default:
      return null;
  }
}

const learnerDataSources = [
  {
    title: 'Page-view data',
    detail: 'Course access, page reach, and unit progression',
    tone: 'blue',
  },
  {
    title: 'Performance records',
    detail: 'Activity attempts and participation metrics',
    tone: 'teal',
  },
  {
    title: 'DataShop data',
    detail: 'Correctness, retries, feedback, and learning-objective tags',
    tone: 'green',
  },
  {
    title: 'Survey responses',
    detail: 'Satisfaction, confidence, and adoption signals',
    tone: 'gold',
  },
];

const learnerEvaluationLayers = [
  {
    layer: 'Layer A',
    title: 'Course Reach',
    detail: 'Who accessed the course and where progression dropped',
    tone: 'blue',
  },
  {
    layer: 'Layer B',
    title: 'Learner Engagement',
    detail: 'How deeply learners moved and how they used activities',
    tone: 'green',
  },
  {
    layer: 'Layer C',
    title: 'Learning Performance',
    detail: 'Where learners performed strongly and where gaps remained',
    tone: 'gold',
  },
  {
    layer: 'Layer D',
    title: 'Experience & Adoption',
    detail: 'What learners valued and what supported adoption readiness',
    tone: 'navy',
  },
];

function LearnerEvaluationFramework() {
  return (
    <figure className="legacy-media learner-data-visual learner-framework-map">
      <div className="learner-data-visual-frame">
        <section>
          <p className="learner-data-step">Step 1</p>
          <h3>Data Collection</h3>
          <div className="learner-framework-grid">
            {learnerDataSources.map((source) => (
              <article className={`is-${source.tone}`} key={source.title}>
                <Database size={20} strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <strong>{source.title}</strong>
                  <p>{source.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="learner-framework-bridge" aria-hidden="true">
          <ArrowRight size={28} strokeWidth={1.5} />
        </div>
        <section>
          <p className="learner-data-step">Step 2</p>
          <h3>Analytical Layers</h3>
          <div className="learner-framework-grid">
            {learnerEvaluationLayers.map((layer) => (
              <article className={`is-${layer.tone}`} key={layer.layer}>
                <span>{layer.layer}</span>
                <div>
                  <strong>{layer.title}</strong>
                  <p>{layer.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <figcaption>From Learner Data to an Evaluation Framework</figcaption>
    </figure>
  );
}

const learnerEvidenceSteps = [
  {
    title: 'Observe',
    detail: 'Look for unusual patterns or differences.',
    icon: Search,
    tone: 'blue',
  },
  {
    title: 'Hypothesize',
    detail: 'Develop a plausible explanation for why the pattern may occur.',
    icon: Lightbulb,
    tone: 'purple',
  },
  {
    title: 'Validate',
    detail:
      'Use another dataset, course context, or relevant research to test the explanation.',
    icon: BadgeCheck,
    tone: 'teal',
  },
  {
    title: 'Recommend',
    detail:
      'Translate the supported interpretation into a feasible course-design or implementation change.',
    icon: Target,
    tone: 'green',
  },
];

function LearnerEvidenceProcess() {
  return (
    <figure className="legacy-media learner-data-visual learner-evidence-process">
      <div className="learner-data-visual-frame">
        <p className="learner-data-visual-eyebrow">
          Evidence-to-design process
        </p>
        <ol>
          {learnerEvidenceSteps.map((step, stepIndex) => {
            const Icon = step.icon;
            return (
              <li className={`is-${step.tone}`} key={step.title}>
                <span>{stepIndex + 1}</span>
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption>Evidence-to-Design Process</figcaption>
    </figure>
  );
}

const learnerHumanLoopSteps = [
  {
    title: 'AI Accelerates',
    detail:
      'Explore data cuts, surface patterns, and draft first-pass analyses.',
    icon: Sparkles,
  },
  {
    title: 'Human Validates',
    detail:
      'Check definitions, sources, denominators, exclusions, and calculations.',
    icon: CheckCircle2,
  },
  {
    title: 'Human Challenges',
    detail:
      'Test the evidence, wording, alternatives, and recommendation logic.',
    icon: ScanSearch,
  },
  {
    title: 'Human Redirects',
    detail: 'Narrow the lens and reconnect analysis to stakeholder decisions.',
    icon: RefreshCw,
  },
];

function LearnerHumanLoopWorkflow() {
  return (
    <figure className="legacy-media learner-data-visual learner-human-loop">
      <div className="learner-data-visual-frame">
        <p className="learner-data-visual-eyebrow">Human-in-the-loop AI</p>
        <ol>
          {learnerHumanLoopSteps.map((step, stepIndex) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <div>
                  <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </li>
            );
          })}
        </ol>
        <p className="learner-human-loop-note">
          AI improves efficiency. Human judgment decides what is strong enough
          to inform redesign.
        </p>
      </div>
      <figcaption>AI-Assisted Analysis with Human Judgment</figcaption>
    </figure>
  );
}

function LegacySectionView({
  section,
  index,
  id,
  projectSlug,
}: {
  section: LegacySection;
  index: number;
  id: string;
  projectSlug: string;
}) {
  if (section.type === 'hero') return null;

  const sourceIndex = section.sourceIndex ?? index;

  if (section.type === 'heading') {
    return (
      <section
        className="legacy-section legacy-section-heading"
        data-source-index={sourceIndex}
        id={id}
      >
        <p className="legacy-section-kicker">
          {String(index).padStart(2, '0')}
        </p>
        <RichText html={section.html} />
      </section>
    );
  }

  if (section.type === 'text') {
    return (
      <section
        className="legacy-section legacy-section-text"
        data-source-index={sourceIndex}
        id={id}
      >
        <RichText html={section.html} />
      </section>
    );
  }

  if (section.type === 'columns') {
    const columnHeadings = section.columns
      .map((column) => firstHeading(column.html))
      .filter(Boolean);
    const isMetadata =
      columnHeadings.length > 1 &&
      columnHeadings.every((heading) => metaHeadings.has(heading));

    return (
      <section
        className={`legacy-section legacy-columns legacy-columns-${Math.min(section.columns.length, 4)}${isMetadata ? ' is-metadata' : ''}`}
        data-source-index={sourceIndex}
        id={id}
      >
        {section.columns.map((column, columnIndex) => {
          const metadataClass = isMetadata
            ? ` ${metadataToneClass(firstHeading(column.html))}`
            : '';

          return (
            <article
              className={`legacy-column${metadataClass}`}
              key={`${index}-${columnIndex}`}
            >
              {column.media ? <ProjectMedia media={column.media} /> : null}
              <RichText html={column.html} />
            </article>
          );
        })}
      </section>
    );
  }

  if (section.type === 'split') {
    const usesHumanLoopWorkflow =
      projectSlug === 'help-center' && sourceIndex === 12;
    const usesReviewerKnowledgeMap =
      projectSlug === 'reviewer-judgment' && sourceIndex === 8;
    const usesReviewerWorkflow =
      projectSlug === 'reviewer-judgment' && sourceIndex === 11;
    const usesReviewerGapTable =
      projectSlug === 'reviewer-judgment' && sourceIndex === 10;
    const usesSurvivalReasoningGaps =
      projectSlug === 'survival-play' && sourceIndex === 5;
    const usesSurvivalGoalsMap =
      projectSlug === 'survival-play' && sourceIndex === 7;
    const usesSurvivalPlaytestingChanges =
      projectSlug === 'survival-play' && sourceIndex === 16;
    const usesTutorialVisual =
      projectSlug === 'tutorial-search-redesign' &&
      [5, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19].includes(sourceIndex);
    const usesLearnerEvaluationFramework =
      projectSlug === 'learner-data' && sourceIndex === 5;
    const usesLearnerEvidenceProcess =
      projectSlug === 'learner-data' && sourceIndex === 6;
    const usesLearnerHumanLoopWorkflow =
      projectSlug === 'learner-data' && sourceIndex === 9;
    const usesNutritionDesignFlow =
      projectSlug === 'nutrition-literacy' && sourceIndex === 6;
    const usesNutritionDesignAlignment =
      projectSlug === 'nutrition-literacy' && sourceIndex === 8;
    const usesNutritionCtaFindings =
      projectSlug === 'nutrition-literacy' && sourceIndex === 10;

    if (usesReviewerGapTable) {
      return (
        <section
          className="legacy-section legacy-gallery reviewer-gap-table"
          data-source-index={sourceIndex}
          id={id}
        >
          <ProjectMedia media={section.media} />
        </section>
      );
    }

    if (usesNutritionCtaFindings) {
      return (
        <section
          className="legacy-section legacy-section-text nutrition-cta-intro"
          data-source-index={sourceIndex}
          id={id}
        >
          <RichText html={section.html} />
        </section>
      );
    }

    return (
      <section
        className={`legacy-section legacy-split${section.flipped ? ' is-flipped' : ''}`}
        data-source-index={sourceIndex}
        id={id}
      >
        <div className="legacy-split-copy">
          <RichText html={section.html} />
        </div>
        {usesHumanLoopWorkflow ? (
          <HumanLoopWorkflow />
        ) : usesReviewerKnowledgeMap ? (
          <ReviewerKnowledgeMap />
        ) : usesReviewerWorkflow ? (
          <ReviewerProjectWorkflow />
        ) : usesSurvivalReasoningGaps ? (
          <SurvivalReasoningGaps />
        ) : usesSurvivalGoalsMap ? (
          <SurvivalGoalsMap />
        ) : usesSurvivalPlaytestingChanges ? (
          <SurvivalPlaytestingChanges />
        ) : usesTutorialVisual ? (
          <TutorialVisual sourceIndex={sourceIndex} />
        ) : usesLearnerEvaluationFramework ? (
          <LearnerEvaluationFramework />
        ) : usesLearnerEvidenceProcess ? (
          <LearnerEvidenceProcess />
        ) : usesLearnerHumanLoopWorkflow ? (
          <LearnerHumanLoopWorkflow />
        ) : usesNutritionDesignFlow ? (
          <NutritionDesignApproachFlow />
        ) : usesNutritionDesignAlignment ? (
          <NutritionDesignAlignment />
        ) : (
          <ProjectMedia media={section.media} />
        )}
      </section>
    );
  }

  if (section.type === 'process') {
    return (
      <section
        className="legacy-section legacy-process"
        data-source-index={sourceIndex}
        id={id}
      >
        <p className="legacy-section-kicker">Project path</p>
        <ol>
          {section.items.map((item, itemIndex) => (
            <li key={`${item.name}-${itemIndex}`}>
              <span>{String(itemIndex + 1).padStart(2, '0')}</span>
              <strong>{item.name}</strong>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (
    section.type === 'gallery' &&
    projectSlug === 'nutrition-literacy' &&
    sourceIndex === 11
  ) {
    return (
      <section
        className="legacy-section legacy-gallery nutrition-cta-gallery"
        data-source-index={sourceIndex}
        id={id}
      >
        <NutritionCTAModelGallery items={section.items} />
      </section>
    );
  }

  return (
    <section
      className="legacy-section legacy-gallery"
      data-source-index={sourceIndex}
      id={id}
    >
      {section.items.map((item, itemIndex) => (
        <ProjectMedia media={item} key={`${item.url}-${itemIndex}`} />
      ))}
    </section>
  );
}

export function generateStaticParams() {
  return projectDetails.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetailBySlug[slug];
  if (!project) return {};

  return {
    title: `${project.title} — Dimple Lin`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Dimple Lin`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [{ url: project.productImage, alt: project.productImageAlt }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Dimple Lin`,
      description: project.summary,
      images: [project.productImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectDetailBySlug[slug];
  const legacyProject = legacyProjectBySlug[slug];
  if (!project || !legacyProject) notFound();

  const sections = legacyProject.sections.filter(
    (section) => section.type !== 'hero' && section.type !== 'process',
  );
  const processSection = legacyProject.sections.find(
    (section) => section.type === 'process',
  );
  const hero = legacyProject.sections.find(
    (section) => section.type === 'hero',
  );
  const renderedSections = sections.map((section, index) => {
    const title = sectionTitle(section, index);
    return {
      section,
      index: index + 1,
      title,
      id: sectionId(title, section.sourceIndex ?? index),
    };
  });
  const fallbackExcludedTitles = new Set([
    'Tools',
    'Team',
    'Timeline',
    'My Role',
    'Course Audience',
    'Project details',
    'Project gallery',
  ]);
  const progressItems: ProjectProgressItem[] =
    processSection?.type === 'process' && processSection.items.length
      ? processSection.items
          .map((item) => {
            const target =
              renderedSections.find(
                ({ section }) => section.sourceIndex === item.sectionIndex,
              ) ||
              renderedSections.find(
                ({ section }) =>
                  section.sourceIndex !== null &&
                  section.sourceIndex >= item.sectionIndex,
              ) ||
              renderedSections.at(-1);
            return target
              ? { label: item.name, targetId: target.id }
              : undefined;
          })
          .filter((item): item is ProjectProgressItem => Boolean(item))
      : renderedSections
          .filter(
            ({ section, title }) =>
              !fallbackExcludedTitles.has(title) &&
              !title.startsWith('Section ') &&
              (section.type === 'heading' ||
                section.type === 'text' ||
                section.type === 'split' ||
                section.type === 'columns'),
          )
          .map(({ title, id }) => ({ label: title, targetId: id }));
  const currentIndex = projectDetails.findIndex((item) => item.slug === slug);
  const nextProject =
    projectDetails[(currentIndex + 1) % projectDetails.length];
  const progressNavAfterSourceIndex =
    project.slug === 'reviewer-judgment'
      ? 6
      : project.slug === 'ai-architecture'
        ? 4
        : project.slug === 'survival-play'
          ? 3
          : project.slug === 'tutorial-search-redesign'
            ? 3
            : project.slug === 'learner-data'
              ? 3
              : project.slug === 'nutrition-literacy'
                ? 4
                : null;
  const delaysProgressNav = progressNavAfterSourceIndex !== null;
  const introductionSections = delaysProgressNav
    ? renderedSections.filter(
        ({ section }) =>
          section.sourceIndex !== null &&
          section.sourceIndex <= (progressNavAfterSourceIndex ?? -1),
      )
    : [];
  const mainSections = delaysProgressNav
    ? renderedSections.filter(
        ({ section }) =>
          section.sourceIndex === null ||
          section.sourceIndex > (progressNavAfterSourceIndex ?? -1),
      )
    : renderedSections;
  const renderSection = ({
    section,
    index,
    id,
  }: (typeof renderedSections)[number]) => (
    <LegacySectionView
      section={section}
      index={index}
      id={id}
      projectSlug={project.slug}
      key={`${section.type}-${id}`}
    />
  );

  return (
    <main className="case-study" data-project-slug={project.slug} id="top">
      <SiteHeader active="projects" />

      <article>
        <header className="case-study-hero">
          <div className="case-study-hero-copy">
            <a className="back-link" href="/projects">
              <ArrowLeft size={16} aria-hidden="true" /> All projects
            </a>
            <p className="eyebrow">{project.category}</p>
            {hero?.type === 'hero' ? (
              <RichText html={hero.titleHtml} className="case-study-title" />
            ) : (
              <h1>{project.title}</h1>
            )}
            {hero?.type === 'hero' && plainText(hero.subtitleHtml) ? (
              <RichText
                html={hero.subtitleHtml}
                className="case-study-summary case-study-summary-rich"
              />
            ) : (
              <p className="case-study-summary">{project.summary}</p>
            )}
            <div className="tool-list" aria-label="Tools used">
              {project.tools.map((tool) => (
                <span className="tool-tag" key={tool}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="case-study-visual">
            <figure className="case-study-cover">
              <img src={project.cover} alt="" />
            </figure>
            <div className="case-study-launches" aria-label="Project links">
              {project.launchLinks.map((launchLink) => (
                <a
                  className="case-study-launch"
                  href={launchLink.url}
                  target="_blank"
                  rel="noreferrer"
                  key={launchLink.url}
                >
                  <span>{launchLink.label}</span>
                  <span className="case-study-launch-icon" aria-hidden="true">
                    <ExternalLink size={16} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </header>

        {delaysProgressNav ? (
          <>
            <div className="case-study-body case-study-body-before-progress">
              <div className="case-study-content">
                {introductionSections.map(renderSection)}
              </div>
            </div>
            <ProjectProgressNav items={progressItems} />
            <div className="case-study-body case-study-body-after-progress">
              <div className="case-study-content">
                {mainSections.map(renderSection)}
              </div>
            </div>
          </>
        ) : (
          <>
            <ProjectProgressNav items={progressItems} />
            <div className="case-study-body">
              <div className="case-study-content">
                {mainSections.map(renderSection)}
              </div>
            </div>
          </>
        )}

        <footer className="next-project">
          <div className="next-project-actions">
            <a
              className="next-project-button next-project-button-primary"
              href={`/projects/${nextProject.slug}`}
              aria-label={`Next project: ${nextProject.title}`}
            >
              <span>Next Project</span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              className="next-project-button next-project-button-secondary"
              href="/projects"
            >
              <LayoutGrid size={16} aria-hidden="true" />
              <span>All Projects</span>
            </a>
          </div>
          <img src={nextProject.cover} alt="" />
        </footer>
      </article>
    </main>
  );
}
