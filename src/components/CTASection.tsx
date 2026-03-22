type CTAButton = {
  label: string;
  href: string;
};

type CTASectionProps = {
  headline: string;
  description?: string;
  buttons: CTAButton[];
};

export function CTASection({ headline, description, buttons }: CTASectionProps) {
  return (
    <section className="section cta" aria-labelledby="cta-heading">
      <h2 id="cta-heading">{headline}</h2>
      {description && <p>{description}</p>}
      <div className="button-row">
        {buttons.map((button) => (
          <a key={button.href} className="button" href={button.href}>
            {button.label}
          </a>
        ))}
      </div>
    </section>
  );
}
