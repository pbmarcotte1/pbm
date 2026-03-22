type AboutSectionProps = {
  narrative: string;
  socialLinks: {
    label: string;
    href: string;
  }[];
};

export function AboutSection({ narrative, socialLinks }: AboutSectionProps) {
  return (
    <section className="section" aria-labelledby="about-heading">
      <h2 id="about-heading">About</h2>
      <p>{narrative}</p>
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
