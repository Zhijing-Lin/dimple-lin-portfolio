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

const learnerDataProject: LegacyProject = {
  slug: 'learner-data',
  shortId: 'f8bd92a0',
  originalUrl: 'https://dimplelin.work/p/f8bd92a0',
  sections: [
    {
      sourceIndex: 0,
      type: 'hero',
      titleHtml: '<h2>Turning Learner Data into Course Design Decisions</h2>',
      subtitleHtml:
        '<p>An AI-assisted course evaluation that transforms learner data into evidence-based design decisions.</p>',
    },
    {
      sourceIndex: 1,
      type: 'text',
      html: `<h3>Overview</h3><p>Our clients were <strong>Carnegie Mellon University’s Open Learning Initiative (OLI)</strong> and the <strong>American College Health Association (ACHA)</strong>. I worked as an <strong>Instructional Designer and lead evaluator</strong> to evaluate the existing <em>Beyond Backpacks</em> travel health course and inform its next redesign cycle.</p><p>The course already had multiple sources of learner data, but the team needed a clearer understanding of <strong>where learners disengaged, where learning gaps remained, and which improvements should be prioritized</strong>. I analyzed learner behavior, performance, and perception data and translated the findings into a stakeholder-facing evaluation report with actionable recommendations for future course design and implementation.</p>`,
      cta: {
        title: 'Read the report',
        url: 'https://drive.google.com/file/d/1710SmeKFhPsYwO_NchHRWfI3Nr8ybXbe/view?usp=sharing',
      },
    },
    {
      sourceIndex: 2,
      type: 'columns',
      columns: [
        {
          html: `<h3>My Role</h3><p>I was the <strong>Instructional Designer and lead evaluator</strong> for this project.</p><p>My main contributions included <strong>defining evaluation metrics</strong>, <strong>analyzing learner engagement and performance data</strong>, <strong>validating AI-assisted analyses</strong>, identifying <strong>learning and engagement gaps</strong>, translating findings into <strong>instructional recommendations</strong>, and communicating results through a <a class="learner-resource-link" target="_blank" rel="noopener noreferrer nofollow" aria-label="Open stakeholder-facing evaluation report in a new tab" href="https://drive.google.com/file/d/1710SmeKFhPsYwO_NchHRWfI3Nr8ybXbe/view?usp=sharing"><strong>stakeholder-facing evaluation report</strong></a> and <a class="learner-resource-link" target="_blank" rel="noopener noreferrer nofollow" aria-label="Open client presentation in a new tab" href="https://drive.google.com/file/d/11bHtGO0WmJZDfikUR1ZfPzOmzQIc6qQv/view?usp=sharing"><strong>client presentation</strong></a>.</p>`,
          media: null,
        },
        {
          html: '<h3>Tools</h3><ul><li><p>ChatGPT</p></li><li><p>Claude Code</p></li><li><p>Google Doc</p></li><li><p>Google Slides</p></li></ul>',
          media: null,
        },
      ],
    },
    {
      sourceIndex: 3,
      type: 'text',
      html: '<h3>My Evaluation Process</h3><p></p>',
      cta: null,
    },
    {
      sourceIndex: 4,
      type: 'process',
      items: [
        { name: 'Build the Framework', sectionIndex: 5 },
        { name: 'Analyze Evidence', sectionIndex: 6 },
        { name: 'Translate Findings', sectionIndex: 7 },
        { name: 'Reflect & Improve', sectionIndex: 9 },
      ],
    },
    {
      sourceIndex: 5,
      type: 'split',
      html: `<h3>From Learner Data to an Evaluation Framework</h3><p>I worked across <strong>four sources of learner data</strong>—page views, performance records, DataShop data, and survey responses—to build a more complete picture of the learner experience. I synthesized evidence across these datasets and organized the evaluation around four dimensions: <strong>Course Reach, Learner Engagement, Learning Performance, and Experience &amp; Adoption</strong>.</p>`,
      media: null,
      flipped: false,
    },
    {
      sourceIndex: 6,
      type: 'split',
      html: `<h3>From Evidence to Design Decisions</h3><p>I analyzed each evaluation layer from multiple angles to identify meaningful patterns, then used a consistent <strong>evidence-to-design process</strong> to determine what those patterns actually meant for the course.</p>`,
      media: null,
      flipped: true,
    },
    {
      sourceIndex: 7,
      type: 'text',
      html: `<h3>Outcome</h3><p>The evaluation went beyond identifying problems. I translated learner data into <strong>29 specific, practical redesign recommendations</strong> across <strong>course engagement, learning support, implementation, and future evaluation</strong>, giving the client a concrete roadmap for improving the next version of the course.</p><h4>Exceeded Client Expectations</h4><p>The client praised the <strong>clarity and rigor of the analysis</strong> and was especially impressed by how specific and actionable the recommendations were. They had expected an evaluation of the existing course, but the final report also provided a practical roadmap for redesign.</p><blockquote class="learner-client-quote"><p>“Wow, this is amazing. I expected an evaluation, but I didn’t expect the recommendations to be this specific and practical. This gives us a really clear direction for what to improve next.”</p><cite>— Client, American College Health Association (ACHA)</cite></blockquote><h4>Informed the Next Redesign Cycle</h4><p>The recommendations were <strong>accepted by the client and are being used to guide the next iteration of the course</strong>, turning the evaluation report into a practical roadmap for continued redesign.</p>`,
      cta: null,
    },
    {
      sourceIndex: 8,
      type: 'gallery',
      layout: 'single',
      items: [
        {
          type: 'image',
          url: '/projects/course-evaluation.png',
          unavailable: false,
          caption:
            'Evaluation Report: From Evidence to Actionable Recommendations',
          alt: 'Evaluation report page with a chart, evidence, interpretation, and course-design recommendations',
          width: '960',
          height: '1280',
        },
      ],
    },
    {
      sourceIndex: 9,
      type: 'split',
      html: `<h3>Reflection: Human-in-the-Loop AI</h3><p>I used <strong>ChatGPT and Claude Code</strong> throughout the evaluation to speed up data analysis, generate tables and charts, explore patterns, and draft initial findings. My AI-assisted workflow followed four steps:</p><ol><li><p><strong>AI Accelerates:</strong> AI helped me quickly explore different cuts of the data, surface possible patterns, and produce first-pass analyses and interpretations.</p></li><li><p><strong>Human Validates:</strong> I checked how each result was produced against the raw data, including field definitions, data sources, units of analysis, denominators, exclusions, event sequences, and calculations.</p></li><li><p><strong>Human Challenges:</strong> I questioned whether each finding was truly supported by the data, whether there were alternative explanations, whether the wording went beyond the evidence, and whether the recommendation was actually connected to the finding.</p></li><li><p><strong>Human Redirects:</strong> When the analysis became too broad, repetitive, or disconnected from the evaluation question, I refined the prompt, narrowed the analytical lens, and redirected the work toward the stakeholder decision the report needed to support.</p></li></ol><h4>Key Takeaway</h4><p>AI can significantly improve efficiency, but it still requires an active <strong>human-in-the-loop</strong> process to validate evidence, challenge conclusions, and decide what is strong enough to inform redesign.</p>`,
      media: null,
      flipped: false,
    },
  ],
};

const tutorialSearchProject: LegacyProject = {
  slug: 'tutorial-search-redesign',
  shortId: 'launchpad-search',
  originalUrl: '',
  sections: [
    {
      sourceIndex: 0,
      type: 'hero',
      titleHtml:
        '<h2>Improving Tutorial Discovery with AI-Augmented Design</h2>',
      subtitleHtml:
        '<p>Using synthetic user research, AI-assisted development, and iterative evaluation to make OLI Torus tutorials easier to find.</p>',
    },
    {
      sourceIndex: 1,
      type: 'text',
      html: `<h3>Project Overview</h3><p>The OLI Torus Tutorial Hub is a self-service support site that helps course authors and instructors find step-by-step tutorials for completing tasks in Torus.</p><p>I inherited an existing version of the site and used the project as an opportunity to explore continuous improvement through an AI-augmented design process. Rather than beginning with a feature idea, I first investigated how users might actually navigate the existing experience.</p><p>Task-based synthetic user testing revealed a clear problem: sidebar navigation worked well when users knew the site’s terminology, but search became unreliable when their wording differed from the search index.</p><p>I focused the redesign on improving tutorial discovery so users could find the right support without needing to know the exact terminology used by the site.</p>`,
      cta: null,
    },
    {
      sourceIndex: 2,
      type: 'columns',
      columns: [
        {
          html: `<h3>My Role</h3><p><strong>Learning Experience Designer &amp; AI-Augmented Product Designer</strong></p><p>I independently led the redesign process, including:</p><ul><li><p>Synthetic user research and problem definition</p></li><li><p>Content and system analysis</p></li><li><p>Search requirements and information design</p></li><li><p>AI-assisted implementation and QA</p></li><li><p>Before-and-after pilot evaluation</p></li><li><p>Iteration planning</p></li></ul><p>I also contributed to the broader Tutorial Hub by producing instructional tutorial videos in Camtasia.</p>`,
          media: null,
        },
        {
          html: `<h3>Team</h3><p><strong>Individual redesign project</strong></p><p>The project built on an existing Tutorial Hub created before I took over the work. My contribution focused on identifying improvement opportunities, redesigning the tutorial-discovery experience, and producing additional tutorial content.</p>`,
          media: null,
        },
        {
          html: `<h3>Tools</h3><p>Claude · ChatGPT · Cursor · Camtasia · HTML/CSS/JavaScript · Git/GitHub</p>`,
          media: null,
        },
      ],
    },
    {
      sourceIndex: 3,
      type: 'text',
      html: '<h3>My Design Process</h3><p></p>',
      cta: null,
    },
    {
      sourceIndex: 4,
      type: 'process',
      items: [
        { name: 'Discover', sectionIndex: 5 },
        { name: 'Diagnose', sectionIndex: 7 },
        { name: 'Design & Build', sectionIndex: 9 },
        { name: 'Evaluate & Iterate', sectionIndex: 14 },
      ],
    },
    {
      sourceIndex: 5,
      type: 'split',
      html: `<h3>Discover — Finding the Problem with Synthetic Users</h3><p>I did not begin by asking AI to critique the website or generate redesign ideas.</p><p>Instead, I used Claude as a synthetic user and gave it realistic tasks to complete as a first-time or returning Torus course author.</p><p><strong>Tasks included:</strong></p><ul><li><p>Finding how to create a new project</p></li><li><p>Finding collaborator and publishing settings</p></li><li><p>Returning later to locate a tutorial while remembering the task, but not the exact tutorial name</p></li></ul><p><strong>During each task, I observed:</strong></p><p>Search path · Hesitation · Backtracking · Search attempts · Task success</p>`,
      media: null,
      flipped: false,
    },
    {
      sourceIndex: 6,
      type: 'text',
      html: `<h4>What I Found</h4><p>The sidebar worked well when the language of the user’s task closely matched the site's terminology.</p><p>Search was where the friction appeared.</p><p>For example, a returning user trying to find publishing-related support experienced:</p><p><strong>publish → wrong result<br>publishing → no result<br>visibility → correct tutorial</strong></p><p>This helped me narrow the problem from a broad navigation issue to a much more specific search problem:</p><p><strong>Users know what they want to do, but search may fail when their language differs from the site’s exact terminology.</strong></p><p>It also led to an important scope decision: I did not redesign the sidebar because the research did not show that it needed to be redesigned.</p>`,
      cta: null,
    },
    {
      sourceIndex: 7,
      type: 'split',
      html: `<h3>Diagnose — From User Friction to Root Cause</h3><p>Finding that search was difficult was only the first step.</p><p>Before changing the site, I used Cursor to inspect the existing codebase without modifying it and understand how the search system actually worked.</p><p>The investigation revealed four underlying issues: search-index misalignment, unused tutorial content, literal matching, and limited result context.</p><p>The problem therefore became more than adding a few missing keywords. It was a combination of:</p><p><strong>Content structure + Search logic + Result design</strong></p>`,
      media: null,
      flipped: true,
    },
    {
      sourceIndex: 8,
      type: 'split',
      html: `<h4>Content Audit</h4><p>Before rebuilding the search index, I audited the existing Tutorial Hub to determine what content actually existed.</p><p>The audit revealed inconsistencies between:</p><ul><li><p>Sidebar entries</p></li><li><p>Search-indexed tutorials</p></li><li><p>Tutorial titles</p></li><li><p>Existing HTML pages</p></li><li><p>Video caption files</p></li></ul><p>Rather than allowing AI to generate metadata across everything it encountered, I first established a reliable corpus of valid tutorial pages.</p><p>This step was especially important in an AI-assisted workflow because it prevented the system from generating descriptions or keywords for missing or incomplete content.</p>`,
      media: null,
      flipped: false,
    },
    {
      sourceIndex: 9,
      type: 'text',
      html: '<h3>Design &amp; Build — Redesigning the Search Experience</h3><p>Based on the research and technical investigation, I focused the redesign on three areas.</p>',
      cta: null,
    },
    {
      sourceIndex: 10,
      type: 'split',
      html: `<h4>Smarter Matching, Ranking, and Results</h4><p><strong>Smarter Matching</strong></p><p>I expanded each tutorial into richer structured metadata, including: Title · Category · Section · Description · Keywords · Transcript · Page Path.</p><p>This gave the system more information about what each tutorial was actually designed to help users accomplish. It also allowed different ways of describing the same task to lead toward the same content—for example, quiz, MCQ, and multiple choice could all surface <em>Add Multiple-Choice Questions (MCQ)</em>.</p><p><strong>Intent-Based Ranking</strong></p><p>I redesigned the ranking logic so that stronger signals of user intent received more weight: Title → Keywords → Description → Category / Section → Transcript.</p><p>The goal was not simply to return more results. It was to make the most relevant result easier to find first.</p><p><strong>Clearer Search Results</strong></p><p>Improving retrieval was only part of the problem. Users also needed to quickly decide: “Is this actually the tutorial I need?” I redesigned result cards to provide category, section, description, a relevant transcript excerpt, and a clear call to action.</p>`,
      media: null,
      flipped: false,
    },
    {
      sourceIndex: 11,
      type: 'split',
      html: `<h4>Before / After Search UI</h4><p>The original search result offered limited context, making it harder to judge whether a result matched the user’s task.</p><p>The redesigned experience presents clearer result hierarchy, richer contextual information, highlighted query matches, and a direct path to the tutorial.</p>`,
      media: null,
      flipped: true,
    },
    {
      sourceIndex: 12,
      type: 'split',
      html: `<h3>AI-Augmented Design Workflow</h3><p>A major part of this project was not simply using AI, but deciding which AI should perform which type of work.</p><p><strong>Claude — Synthetic User</strong><br>I used Claude to simulate realistic user behavior and surface usability friction through task completion.</p><p><strong>ChatGPT — Design &amp; Reasoning Partner</strong><br>I used ChatGPT to help structure the research process, interpret findings, challenge assumptions, refine requirements, and plan evaluation.</p><p><strong>Cursor — Coding Agent</strong><br>I used Cursor to inspect the existing codebase, identify technical root causes, plan implementation, modify the search experience, and support QA.</p><p><strong>My Role — Orchestration &amp; Judgment</strong><br>I remained responsible for research framing, evidence quality, scope, requirements, design priorities, evaluation criteria, and final decisions.</p><p>AI accelerated the process; I remained responsible for deciding what evidence to trust and what changes were actually worth building.</p>`,
      media: null,
      flipped: false,
    },
    {
      sourceIndex: 13,
      type: 'split',
      html: `<h3>Additional Contribution — Tutorial Video Production</h3><p>Alongside the search redesign, I also produced step-by-step Torus tutorial videos in Camtasia to help course authors complete common workflows independently.</p><p>My production process included:</p><ul><li><p>Planning the tutorial workflow and screen states</p></li><li><p>Recording narration and interface demonstrations</p></li><li><p>Synchronizing voiceover with cursor movement and on-screen actions</p></li><li><p>Editing pacing and transitions</p></li><li><p>Using zoom and visual focus to direct attention toward important interface elements</p></li></ul><p>Through this work, I learned to treat video editing as part of the instructional design—not simply as visual polish.</p><p>A strong tutorial should help the learner always understand: <strong>Where should I look? What should I do? What happens next?</strong></p>`,
      media: null,
      flipped: true,
    },
    {
      sourceIndex: 14,
      type: 'split',
      html: `<h3>Evaluation — Pilot Validation</h3><p>To determine whether the redesign addressed the specific problems identified during discovery, I conducted a before-and-after synthetic-user pilot.</p><p>I used fresh Claude sessions to reduce carryover from previous testing and ran the same three task-based scenarios on both versions:</p><ul><li><p>Collaboration / Publishing</p></li><li><p>Quiz / Multiple-Choice Questions</p></li><li><p>Learning Objectives</p></li></ul><p>For each task, I compared task success, first-query success, number of search attempts, correct-result ranking, hesitation and backtracking, and result clarity.</p>`,
      media: null,
      flipped: false,
    },
    {
      sourceIndex: 15,
      type: 'split',
      html: `<h4>Pilot Findings</h4><p>The strongest improvement appeared in the Quiz / MCQ task.</p><p>In the original version, quiz, MCQ, and multiple choice did not surface the intended tutorial, forcing the synthetic user to browse manually.</p><p>In the redesigned version: <strong>quiz → Add Multiple-Choice Questions (MCQ) → Rank #1</strong>.</p><p>The redesigned descriptions also helped distinguish between similar results during the Learning Objectives task, suggesting that the redesign improved not only retrieval but also relevance judgment.</p>`,
      media: null,
      flipped: true,
    },
    {
      sourceIndex: 16,
      type: 'text',
      html: `<h4>How I Interpret the Results</h4><p>Because this was a small synthetic-user pilot, I treat these findings as directional evidence rather than statistically conclusive validation.</p><p>The pilot does not prove that all Torus users would perform better with the redesign.</p><p>Instead, it provides early evidence that the new search experience addressed the specific findability problems identified during discovery and gives me a stronger basis for moving into real-user validation.</p><p>This distinction is important to me as a designer: evaluation should reflect the strength of the evidence rather than overstate what the data can support.</p>`,
      cta: null,
    },
    {
      sourceIndex: 17,
      type: 'split',
      html: `<h3>Next Step — Real-User Validation</h3><p>The next evaluation round would test the redesigned search with representative Torus course authors or instructors.</p><p>For a formative usability study, I would recruit approximately 5–8 users and ask them to complete the same core search tasks using the original and redesigned experiences.</p><p>I would measure task success, first-query success, time to find, search attempts, result confidence, and behavioral friction.</p><p>This evaluation would help determine whether the patterns observed in the synthetic-user pilot consistently appear with real users and would provide stronger evidence for the effectiveness of the redesign.</p>`,
      media: null,
      flipped: false,
    },
    {
      sourceIndex: 18,
      type: 'split',
      html: `<h3>Reflection</h3><p>This project changed how I think about AI-assisted design.</p><p>The most effective use of AI was not asking a model to generate a finished solution. Instead, I used AI across different stages of a structured design process: Explore → Diagnose → Specify → Build → Evaluate.</p><p>AI helped me investigate user behavior, understand an unfamiliar technical system, accelerate implementation, and run an initial pilot.</p><p>But the most important decisions still required human judgment: What problem actually matters? What evidence is strong enough to act on? What should remain unchanged? How much complexity is justified? How strong is the evidence that the redesign worked?</p>`,
      media: null,
      flipped: true,
    },
    {
      sourceIndex: 19,
      type: 'split',
      html: `<h3>Future Iteration</h3><p>The pilot also surfaced one remaining interaction issue: reopening the search interface could preserve the previous query, requiring users to manually clear the text before beginning another search.</p><p>Rather than adding a new feature simply to make the project appear larger, my next iteration would address this observed friction by improving the search-input reset behavior.</p><p>This reflects the continuous-improvement approach behind the project.</p>`,
      media: null,
      flipped: false,
    },
  ],
};

export const legacyProjects = [
  ...(legacyProjectsJson as LegacyProject[]),
  learnerDataProject,
  tutorialSearchProject,
];

export const legacyProjectBySlug = Object.fromEntries(
  legacyProjects.map((project) => [project.slug, project]),
) as Record<string, LegacyProject>;
