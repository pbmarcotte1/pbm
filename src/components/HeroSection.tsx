type HeroSectionProps = {
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
};

export function HeroSection({ headline, subtext, ctaLabel, ctaHref }: HeroSectionProps) {
  return (
    <section className="section hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">{headline}</h1>
      <p className="lead">{subtext}</p>
      <a className="button" href={ctaHref} target="_blank" rel="noreferrer">
        {ctaLabel}
      </a>
    </section>
  );
}
