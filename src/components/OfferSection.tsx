type OfferSectionProps = {
  heading: string;
  intro: string[];
  name: string;
  timeline: string;
  focusPoints: string[];
  ctaLabel: string;
  ctaHref: string;
};

export function OfferSection({
  heading,
  intro,
  name,
  timeline,
  focusPoints,
  ctaLabel,
  ctaHref,
}: OfferSectionProps) {
  return (
    <section className="section" aria-labelledby="offer-heading">
      <h2 id="offer-heading">{heading}</h2>
      {intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <article className="offer-card" aria-labelledby="offer-name">
        <h3 id="offer-name">{name}</h3>
        <p>{timeline}</p>
        <p>We focus on:</p>
        <ul>
          {focusPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <a className="button" href={ctaHref} target="_blank" rel="noreferrer">
          {ctaLabel}
        </a>
      </article>
    </section>
  );
}
