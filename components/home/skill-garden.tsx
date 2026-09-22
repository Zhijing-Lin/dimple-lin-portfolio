'use client';

import { useState, type CSSProperties } from 'react';
import { X } from 'lucide-react';

type Skill = {
  name: string;
  description: string;
  spriteX: string;
  spriteY: string;
};

const skills: Skill[] = [
  {
    name: 'Research & Strategy',
    description:
      'I find the real learning or performance gap before deciding what to build.',
    spriteX: '0%',
    spriteY: '0%',
  },
  {
    name: 'Learning Experience Design',
    description:
      'I turn complex knowledge and judgment into practice, feedback, and meaningful learning experiences.',
    spriteX: '50%',
    spriteY: '0%',
  },
  {
    name: 'AI & Learning Technology',
    description:
      'I use AI and learning technology where they improve support, feedback, or decision-making—not just for novelty.',
    spriteX: '100%',
    spriteY: '0%',
  },
  {
    name: 'Performance Enablement',
    description:
      'I design just-in-time resources and systems that help people perform more independently in the flow of work.',
    spriteX: '0%',
    spriteY: '100%',
  },
  {
    name: 'Evaluation & Analytics',
    description:
      'I use learner data, testing, and feedback to understand what works and guide the next iteration.',
    spriteX: '50%',
    spriteY: '100%',
  },
  {
    name: 'Project Leadership & Collaboration',
    description:
      'I align clients, SMEs, designers, developers, and researchers around shared goals, decisions, and delivery.',
    spriteX: '100%',
    spriteY: '100%',
  },
];

export function SkillGarden() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  return (
    <section className="skill-garden" aria-labelledby="skill-garden-title">
      <div className="garden-heading-row">
        <p className="home-eyebrow" id="skill-garden-title">
          How I work
        </p>
        <p className="garden-hint">
          Click to learn more <span aria-hidden="true">↘</span>
        </p>
      </div>
      <div className="garden-stage">
        <div className="garden-ground" aria-hidden="true" />
        {skills.map((skill, index) => {
          const isActive = activeSkill === index;
          const spriteStyle = {
            '--sprite-x': skill.spriteX,
            '--sprite-y': skill.spriteY,
          } as CSSProperties;

          return (
            <div
              className={`skill-plant skill-plant-${index + 1}${
                isActive ? ' is-active' : ''
              }`}
              key={skill.name}
            >
              <button
                className="skill-flower-button"
                type="button"
                aria-label={`${skill.name}: show description`}
                aria-expanded={isActive}
                aria-controls={`skill-description-${index}`}
                onClick={() => setActiveSkill(isActive ? null : index)}
              >
                <span
                  className="skill-flower-art"
                  style={spriteStyle}
                  aria-hidden="true"
                />
                <span className="skill-flower-name">{skill.name}</span>
              </button>

              {isActive ? (
                <div
                  className="skill-info-card"
                  id={`skill-description-${index}`}
                  aria-live="polite"
                >
                  <button
                    type="button"
                    aria-label={`Close ${skill.name} description`}
                    onClick={() => setActiveSkill(null)}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                  <strong>{skill.name}</strong>
                  <p>{skill.description}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
