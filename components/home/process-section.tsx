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
  return (
    <section className="home-section process-section" id="approach">
      <header className="home-section-heading">
        <p className="home-eyebrow">How I approach learning problems</p>
        <h2>From real gaps to the right intervention—and back to evidence.</h2>
      </header>
      <div className="process-grid">
        {steps.map((step) => (
          <article className="process-step" key={step.number}>
            <div className="process-step-topline">
              <span>{step.number}</span>
              <p>{step.phase}</p>
            </div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
