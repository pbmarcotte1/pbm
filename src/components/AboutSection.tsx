type AboutSectionProps = {
  heading?: string;
  narrative: string;
  socialLinks: {
    label: string;
    href: string;
  }[];
};

export function AboutSection({ heading = 'About', narrative, socialLinks }: AboutSectionProps) {
  const paragraphs = narrative.split('\n\n').filter(Boolean);

  return (
    <section className="section" aria-labelledby="about-heading">
      <h2 id="about-heading">{heading}</h2>
      {paragraphs.map((para) => (
        <p key={para}>{para}</p>
      ))}
      <ul className="social-list" aria-label="Social links">
        {socialLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
