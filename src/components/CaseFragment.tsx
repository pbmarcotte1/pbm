type CaseFragmentProps = {
  situation: string;
  mistaken_assumption: string;
  actual_issue: string;
  outcome: string;
};

export function CaseFragment({
  situation,
  mistaken_assumption,
  actual_issue,
  outcome,
}: CaseFragmentProps) {
  return (
    <article className="case-fragment" aria-label={`Case fragment: ${situation}`}>
      <h3>{situation}</h3>
      <dl>
        <div>
          <dt>Mistaken assumption</dt>
          <dd>{mistaken_assumption}</dd>
        </div>
        <div>
          <dt>Actual issue</dt>
          <dd>{actual_issue}</dd>
        </div>
        <div>
          <dt>Outcome</dt>
          <dd>{outcome}</dd>
        </div>
      </dl>
    </article>
  );
}
