import { AboutSection } from './AboutSection';
import { CTASection } from './CTASection';

export function Footer() {
  return (
    <footer className="page-footer">
      <AboutSection
        heading="About"
        name="Patrick Marcotte"
        headshotSrc="/pbm_image.png"
        headshotAlt="Patrick Marcotte"
        narrative={`I lead Lessi AI, where we're building tools to support special education teams with documentation, compliance, and day-to-day classroom work.

      Before that, I held operating and leadership roles across public companies, private equity-backed businesses, and global education organizations.

      At Cambium Learning Group, I served as President across multiple business units, with responsibility for product, go-to-market, and operations at scale. That included oversight of more than $150M in annual revenue and teams serving customers in over 175 countries.

      I've also worked closely with founders, CEOs, and boards during periods of growth, transition, and acquisition.

      Outside of work, I'm usually in a Minnesota state park with my spouse and our daughter.`}
        socialLinks={[]}
      />

      <div id="cta">
        <CTASection
          headline="Let's talk."
          description=""
          buttons={[
            {
              label: 'Reach out',
              href: 'mailto:pmarco@ipm.group?subject=Reach%20Out',
            },
            {
              label: 'Book a call',
              href: 'https://calendly.com/patrickmarcotte/meet-with-patrick-marcotte',
            },
            {
              label: 'Connect on LinkedIn',
              href: 'https://www.linkedin.com/in/patrick-b-marcotte/',
            },
          ]}
        />
      </div>
    </footer>
  );
}
