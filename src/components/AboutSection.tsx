type AboutSectionProps = {
  heading?: string;
  name?: string;
  narrative: string;
  headshotSrc?: string;
  headshotAlt?: string;
  socialLinks?: {
    label: string;
    href: string;
  }[];
};

export function AboutSection({
  heading = 'About',
  name,
  narrative,
  headshotSrc,
  headshotAlt = 'Patrick Marcotte headshot',
  socialLinks = [],
}: AboutSectionProps) {
  const paragraphs = narrative.split('\n\n').filter(Boolean);

  return (
    <section className="section" aria-labelledby="about-heading">
      <h2 id="about-heading">{heading}</h2>
      {name && <p className="about-name">{name}</p>}
      <div className="about-content">
        {headshotSrc && (
          <img className="about-headshot" src={headshotSrc} alt={headshotAlt} loading="lazy" />
        )}
        <div>
          {paragraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
      {socialLinks.length > 0 && (
        <ul className="social-list" aria-label="Social links">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
