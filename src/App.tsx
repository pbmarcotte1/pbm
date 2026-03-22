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
      'When price comes up as the blocker, I usually look somewhere else first. Most of the time, the real issue is clarity around when and how the product actually gets used.',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    transcript: [
      'Pricing is visible, so it gets blamed. But visible doesn\'t mean it\'s the problem.',
      'What usually sits underneath is uncertainty—around timing, who owns the decision, what happens if it doesn\'t work.',
      'If someone\'s still asking when would we even use this, cutting the price by 20% won\'t change that.',
    ],
    insights: [
      'Visible problems get blamed first',
      'Real objection is usually timing or clarity, not cost',
      'Price cuts don\'t fix confusion',
    ],
    applications: [
      'strong interest, low conversion',
      'long sales cycles with vague objections',
    ],
  },
  {
    title: 'What looks like demand but isn’t',
    description:
      'Positive feedback feels like a signal, but it often isn\'t. Real demand shows up as pressure—urgency, deadlines, bringing in decision-makers.',
    audioUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    transcript: [
      'People are polite. They say nice things. That\'s not the same as wanting to buy.',
      'One serious buyer who\'s asking when can we start is worth more than ten people who say this is great.',
      'I look for what changes: Are they bringing in stakeholders? Asking how to implement it? Talking about a timeline?',
    ],
    insights: [
      'Politeness looks like demand but isn\'t',
      'True signal is urgency, not enthusiasm',
      'Watch for behavior change, not compliments',
    ],
    applications: [
      'lots of demos, very few closes',
      'strong compliments, but no one\'s ready to commit',
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
        headline="What's actually going on here?"
        subtext="A few ways I work through that question with teams when something doesn't add up."
        ctaLabel="Get a clear read"
        ctaHref="#cta"
      />

      <section className="section" aria-labelledby="context-heading">
        <h2 id="context-heading">Context</h2>
        <p>
          You can skim this, but it works better if you don't.
        </p>
        <p>
          Each piece below is a short way of looking at a situation: what usually shows up, what's often actually happening underneath, and where it tends to appear in the real world.
        </p>
        <p>
          If something feels familiar, it probably is.
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
        heading="A bit of context"
        narrative={`I've spent most of my career in situations where the stakes are real and the signal isn't clear.

That's been true inside public companies, private equity-backed businesses, and global education organizations\u2014where decisions affect real revenue, teams, and outcomes.

I've led product, go-to-market, and operations at scale, including business units responsible for over $150M in revenue across 175 countries.

These days, I'm usually brought in when something doesn't add up.

The product is there. The effort is there.
But the results don't match.

My role is to get clear on what's actually happening, remove what isn't the problem, and help teams decide what to do next.`}
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

      <section className="section transition-heading" aria-labelledby="transition-id">
        <h2 id="transition-id">If this is the kind of thinking you want in the room, here's how that works.</h2>
      </section>

      <OfferSection
        name="Decision Sprint"
        explanation="A focused engagement to diagnose what's really happening, test the most important assumptions, and leave with a clear decision path your team can execute."
        priceRange="$3,000–$8,000"
        timeline="1–2 weeks"
      />

      <div id="cta">
        <CTASection
          headline="Let's talk."
          description=""
          buttons={[
            {
              label: 'Get a clear read',
              href: 'mailto:patrick@example.com?subject=Clear%20Read%20Request',
            },
            {
              label: 'Talk to me',
              href: 'mailto:patrick@example.com?subject=Advisory%20Inquiry',
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
