import adaptiveText from '@/content/adaptive-ai-feedback.txt?raw';
import architectureText from '@/content/ai-architecture.txt?raw';
import coachingText from '@/content/interactive-coaching.txt?raw';
import helpCenterText from '@/content/help-center.txt?raw';
import learnerDataText from '@/content/learner-data.txt?raw';
import nutritionText from '@/content/nutrition-literacy.txt?raw';
import reviewerText from '@/content/reviewer-judgment.txt?raw';
import survivalText from '@/content/survival-play.txt?raw';

export type ProjectDetail = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tools: string[];
  cover: string;
  productImage: string;
  productImageAlt: string;
  originalUrl: string;
  sourceText: string;
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'help-center',
    title: 'Needs-Driven Help Center for Tutor Performance Support',
    summary:
      'Using needs analysis, cross-functional collaboration, SME knowledge elicitation, and AI-assisted content development to turn recurring live-session challenges into actionable support.',
    category: 'Learning Strategy & Performance Enablement',
    tools: ['Notion'],
    cover: '/projects/covers/needs-driven-help-center.png',
    productImage: '/projects/help-center.png',
    productImageAlt: 'Tutor Help Center organized around tutoring workflows',
    originalUrl: 'https://dimplelin.work/b04fa22b',
    sourceText: helpCenterText,
  },
  {
    slug: 'reviewer-judgment',
    title: 'Turning Reviewer Judgment into a Learnable Skill',
    summary:
      'A research-informed pre-training course preparing OER reviewers to apply rubrics consistently and provide actionable feedback.',
    category: 'Learning Strategy & Performance Enablement',
    tools: ['OLI Torus', 'Vyond'],
    cover: '/projects/covers/reviewer-judgment.png',
    productImage: '/projects/reviewer-training.png',
    productImageAlt: 'Open 4 Peer Review reviewer essentials course in OLI Torus',
    originalUrl: 'https://dimplelin.work/6c8b7574',
    sourceText: reviewerText,
  },
  {
    slug: 'ai-architecture',
    title: 'AI Architecture Decision-Making Simulation',
    summary:
      'A multi-modal learning experience combining video and simulation to help AI product managers evaluate AI systems.',
    category: 'Interactive Learning & Simulation',
    tools: ['Articulate Storyline', 'Synthesia', 'HTML/CSS'],
    cover: '/projects/covers/ai-architecture.png',
    productImage: '/projects/ai-architecture.png',
    productImageAlt: 'AI architecture decision-making learning experience',
    originalUrl: 'https://dimplelin.work/8a18dbf3',
    sourceText: architectureText,
  },
  {
    slug: 'survival-play',
    title: 'Learning Survival Through Consequential Play',
    summary:
      'A narrative-driven educational game that helps novice campers build campsite-selection and firemaking skills.',
    category: 'Interactive Learning & Simulation',
    tools: ['Phaser', 'Midjourney', 'HTML/CSS'],
    cover: '/projects/covers/survival-play.png',
    productImage: '/projects/survival-game.png',
    productImageAlt: 'The Last Outbreak educational survival game',
    originalUrl: 'https://dimplelin.work/2dbba5ae',
    sourceText: survivalText,
  },
  {
    slug: 'nutrition-literacy',
    title: 'Building Nutrition Literacy Through Guided Practice',
    summary:
      'A Storyline e-learning module that uses objective-aligned instruction, interactive practice, feedback, and reflection to help young adults practice making informed food decisions.',
    category: 'Interactive Learning & Simulation',
    tools: ['Articulate Storyline'],
    cover: '/projects/covers/nutrition-literacy.png',
    productImage: '/projects/nutrition-literacy.png',
    productImageAlt: 'Making Informed Nutrition Decisions interactive course',
    originalUrl: 'https://dimplelin.work/ae5df7e7',
    sourceText: nutritionText,
  },
  {
    slug: 'interactive-coaching',
    title: 'Interactive Coaching Through Feedback',
    summary:
      'An interactive Storyline branching scenario that helps new managers practice giving clear, respectful, and actionable feedback during a performance conversation.',
    category: 'Interactive Learning & Simulation',
    tools: ['Articulate Storyline'],
    cover: '/projects/covers/interactive-coaching.png',
    productImage: '/projects/interactive-coaching.png',
    productImageAlt: 'Coaching Through Feedback branching scenario',
    originalUrl: 'https://dimplelin.work/da6053e0',
    sourceText: coachingText,
  },
  {
    slug: 'adaptive-ai-feedback',
    title: 'Adaptive Practice & AI-Powered Feedback for Corporate Training',
    summary:
      'An adaptive, AI-powered corporate training module that helps managers recognize, revise, and write effective performance feedback through scenario-based assessment, remediation, and targeted open-response feedback.',
    category: 'AI-Enabled Learning & Product Innovation',
    tools: ['Adobe Captivate', 'LLM API'],
    cover: '/projects/covers/adaptive-ai-feedback.png',
    productImage: '/projects/adaptive-feedback.png',
    productImageAlt: 'Writing Effective Performance Feedback course',
    originalUrl: 'https://dimplelin.work/7a2dba18',
    sourceText: adaptiveText,
  },
  {
    slug: 'learner-data',
    title: 'Turning Learner Data into Course Design Decisions',
    summary:
      'An AI-assisted course evaluation that transforms learner data into evidence-based design decisions.',
    category: 'Evaluation & Continuous Improvement',
    tools: ['Claude Code', 'ChatGPT', 'Google Slides'],
    cover: '/projects/covers/learner-data.png',
    productImage: '/projects/course-evaluation.png',
    productImageAlt: 'Beyond Backpacks course evaluation finding and chart',
    originalUrl: 'https://dimplelin.work/f8bd92a0',
    sourceText: learnerDataText,
  },
];

export const projectDetailBySlug = Object.fromEntries(
  projectDetails.map((project) => [project.slug, project]),
) as Record<string, ProjectDetail>;

export const majorHeadings = new Set([
  'Project Overview',
  'Overview',
  'Problem',
  'Solution',
  'Project Challenge',
  'Analysis & Actions',
  'My Design Process',
  'Design Approach',
  'Reframing the Problem',
  'Need Analysis',
  'Needs Analysis: Identifying Where Tutors Actually Get Stuck',
  'Intervention Selection',
  'Performance Support Design & Develop',
  'Performance Support Design',
  'Action Mapping',
  'Storyboard & Prototype',
  'User Testing & Iteration',
  'Final Development',
  'Project Management',
  'Learning Design & Development',
  'Learning Design & Develop',
  'Implementation & Evaluation',
  'Research & Define',
  'Design & Development',
  'Prototype, Playtest & Iterate',
  'Outcome & Reflect',
  'Outcome',
  'Learning & Experience Goals',
  'Learning Mechanisms',
  'What Playtesting Changed',
  'Instructional Strategy & Storyline Development',
  'Adaptive Practice & Remediation',
  'AI-Powered Targeted Feedback',
  'From Raw Data to an Evaluation Framework',
  'From Evidence to Design Decisions',
  'Reflection: Human-in-the-Loop AI',
  'Next Steps & Reflection',
  'Reflection',
  'Evaluation',
]);

export const metaHeadings = new Set([
  'Course Audience',
  'Tools',
  'Tool Used',
  'My Role',
  'Team',
  'Timeline',
  'Methods',
]);

export const subheadings = new Set([
  'From a Top-Down Help Center to a Needs-Driven Support System',
  'From Tutor Problems to the Right Intervention',
  'Matching the Support Format to the Type of Problem',
  'A. Procedural Job Aids',
  'B. Operational Decision Guides',
  'Human-in-the-Loop AI Workflow',
  'Analysis — What Reviewers Need to Know',
  'Analysis — What Reviewers Need to Do',
  'Analysis — From Performance Gaps to Training Priorities',
  'Scenario-Based Multimedia + Flexible Access',
  'Metacognitive Reflection',
  'Immediate, Tailored Feedback + Guided Discovery',
  'Identifying Learner Barriers',
  'Practice Activity Design',
  'Research & Learning Goal Elicitation',
  'From Research to Learning & Experience Goals',
  'Storyboarding, Prototyping, and Learner Testing',
  'Prototype 1 — Low-Fidelity Story Prototype',
  'Prototype 2 — Interactive Digital Prototype',
  'Prototype 3 — Revised Gameplay Prototype',
  'Learning by Doing',
  'Scaffolding → Fading',
  'Contrasting Cases + Variability',
  'Consequence-Based Feedback',
  'Immediate Feedback',
  'Just-in-Time Support',
  'Anchored Learning',
  'Design Approach & Alignment',
  'Design Alignment',
  'Cognitive Task Analysis',
  'Storyline Development',
  'Metacognitive Reflection & Self-Explanation',
  'Procedural Scaffolding & Segmenting',
  'Multimedia, Modality, Embodiment, Contiguity & Coherence',
  'Universal Design for Learning & Accessibility',
  'Branching Scenario Flow Map',
  'Flow Map Legend',
  'Key Takeaway',
]);
