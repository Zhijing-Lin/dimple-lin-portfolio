'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

const steps = [
  {
    number: '01',
    phase: 'Diagnose',
    title: 'Find the real problem',
    body: 'I use needs analysis, learner research, CTA, workflow observation, and stakeholder input to understand where performance actually breaks down.',
  },
  {
    number: '02',
    phase: 'Design',
    title: 'Turn insight into practice',
    body: 'I translate complex knowledge and judgment into scenarios, simulations, performance support, and structured practice.',
  },
  {
    number: '03',
    phase: 'Build',
    title: 'Use technology with purpose',
    body: 'I build interactive and AI-enabled experiences with tools like Storyline, Captivate, OLI Torus, and emerging AI technologies.',
  },
  {
    number: '04',
    phase: 'Evaluate',
    title: 'Let evidence shape what comes next',
    body: 'I use learner testing, analytics, A/B testing, and qualitative feedback to understand what works and guide the next iteration.',
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="home-section process-section" id="approach">
      <header className="home-section-heading process-heading">
        <p className="home-eyebrow">How I approach learning problems</p>
        <h2>From real gaps to the right intervention—and back to evidence.</h2>
      </header>
      <div className="process-grid">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          return (
            <article
              className={`process-step${isActive ? ' is-active' : ''}`}
              key={step.number}
            >
              <button
                className="process-step-toggle"
                type="button"
                aria-expanded={isActive}
                onClick={() => setActiveStep(isActive ? null : index)}
              >
                <span className="process-step-topline">
                  <span>{step.number}</span>
                  <span>{step.phase}</span>
                </span>
                <span className="process-step-title">{step.title}</span>
                <span className="process-step-prompt">
                  {isActive ? 'Close details' : 'Click for details'}
                  <Plus size={17} aria-hidden="true" />
                </span>
                <span className="process-step-detail" aria-hidden={!isActive}>
                  {step.body}
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
