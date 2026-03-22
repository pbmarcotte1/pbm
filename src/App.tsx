import { AboutSection } from './components/AboutSection';
import { CaseFragment } from './components/CaseFragment';
import { CTASection } from './components/CTASection';
import { HeroSection } from './components/HeroSection';
import { OfferSection } from './components/OfferSection';
import { ThinkingModule } from './components/ThinkingModule';

type ThinkingData = {
  title: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript: string[];
  insights: string[];
  applications: string[];
};

const thinkingModules: ThinkingData[] = [
  {
    title: 'Why pricing is rarely the problem',
    description:
      'When teams say price is the blocker, I usually hear a clarity problem. People cannot place the product in a specific moment of use.',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    transcript: [
      'Pricing feels like the obvious variable because everyone can point to it. But visible does not mean causal.',
      'Most stalled deals are not about cost. They are about uncertainty around timing, ownership, and expected result.',
      'If buyers are still asking basic “when would we use this?” questions, lowering the number does not resolve the decision.',
    ],
    insights: [
      'Pricing is often blamed because it’s visible',
      'Buyers usually don’t understand when to use the product',
      'Lowering price rarely fixes confusion',
    ],
    applications: [
      'strong interest, low conversion',
      'long sales cycles with vague objections',
    ],
  },
  {
    title: 'What looks like demand but isn’t',
    description:
      'A lot of positive feedback is social politeness. Real demand behaves differently: it creates pressure, deadlines, and clear commitments.',
    audioUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    transcript: [
      'Early conversations can feel exciting, especially when people say they love the idea. That is useful but not enough.',
      'Signal quality matters more than signal volume. A small number of urgent buyers beats broad casual interest.',
      'I look for behavior change: do they bring stakeholders, ask implementation questions, or ask for a start date?',
    ],
    insights: [
      'Interest is often politeness, not intent',
      'Early traction can be misleading',
      'Real demand shows up as urgency',
    ],
    applications: [
      'lots of demos, few closes',
      'positive feedback, no buying',
    ],
  },
];

const caseFragments = [
  {
    situation: 'B2B product with healthy demo flow but flat revenue',
    mistaken_assumption: 'Sales team needed better objection handling.',
    actual_issue: 'Prospects could not map the product to a first concrete workflow.',
    outcome: 'Reframed onboarding around one trigger event; close rate improved in six weeks.',
  },
  {
    situation: 'Founder seeing strong inbound interest after launch',
    mistaken_assumption: 'Demand was validated and pricing could be increased immediately.',
    actual_issue: 'Interest came from peers and curious observers, not active buyers.',
    outcome: 'Shifted targeting to urgent operator pain; pipeline shrank but win rate rose.',
  },
];

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content" className="page">
      <HeroSection
        headline="A working view into how Patrick Marcotte thinks"
        subtext="Short, direct thinking modules for teams that need clearer decisions."
        ctaLabel="Book a Decision Sprint"
        ctaHref="#cta"
      />

      <section className="section" aria-labelledby="context-heading">
        <h2 id="context-heading">Context</h2>
        <p>
          This page is meant to be used, not skimmed. Each module shows a compact argument,
          supporting media, transcript, and practical situations where the pattern shows up.
        </p>
      </section>

      <section className="section" aria-labelledby="thinking-heading">
        <h2 id="thinking-heading">Thinking Modules</h2>
        <div className="module-grid">
          {thinkingModules.map((module) => (
            <ThinkingModule key={module.title} {...module} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="cases-heading">
        <h2 id="cases-heading">Case Fragments</h2>
        <div className="case-grid">
          {caseFragments.map((fragment) => (
            <CaseFragment key={fragment.situation} {...fragment} />
          ))}
        </div>
      </section>

      <AboutSection
        narrative="I work with founders and product teams when decisions are muddy and the signal is noisy. The work is practical: clarify the real problem, tighten the decision path, and move."
        socialLinks={[
          {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/patrick-marcotte',
          },
          {
            label: 'Lessi on Facebook',
            href: 'https://www.facebook.com/lessi',
          },
        ]}
      />

      <OfferSection
        name="Decision Sprint"
        explanation="A focused engagement to diagnose the core decision problem, test assumptions, and leave with a practical decision path your team can execute right away."
        priceRange="$3,000–$8,000"
        timeline="1–2 weeks"
      />

      <div id="cta">
        <CTASection
          headline="If this matches how you think, let’s talk."
          description="Reach out for advisory support or speaking engagements."
          buttons={[
            {
              label: 'Reach out for advisory',
              href: 'mailto:patrick@example.com?subject=Advisory%20Inquiry',
            },
            {
              label: 'Invite for speaking',
              href: 'mailto:patrick@example.com?subject=Speaking%20Engagement',
            },
            {
              label: 'Connect on LinkedIn',
              href: 'https://www.linkedin.com/in/patrick-marcotte',
            },
          ]}
        />
      </div>
      </main>
    </>
  );
}

export default App;
