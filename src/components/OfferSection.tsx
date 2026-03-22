type OfferSectionProps = {
  name: string;
  explanation: string;
  priceRange: string;
  timeline: string;
};

export function OfferSection({
  name,
  explanation,
  priceRange,
  timeline,
}: OfferSectionProps) {
  return (
    <section className="section" aria-labelledby="offer-heading">
      <h2 id="offer-heading">Offer</h2>
      <article className="offer-card" aria-labelledby="offer-name">
        <h3 id="offer-name">{name}</h3>
        <p>{explanation}</p>
        <ul>
          <li>
            <strong>Price range:</strong> {priceRange}
          </li>
          <li>
            <strong>Timeline:</strong> {timeline}
          </li>
        </ul>
      </article>
    </section>
  );
}
