import { CaseStudyIcon } from './CaseStudyIcon';

type CaseFragmentProps = {
  iconKey: 'conversion' | 'signal';
  iconLabel: string;
  situation: string;
  mistaken_assumption: string;
  actual_issue: string;
  outcome: string;
};

export function CaseFragment({
  iconKey,
  iconLabel,
  situation,
  mistaken_assumption,
  actual_issue,
  outcome,
}: CaseFragmentProps) {
  return (
    <article className="case-fragment" aria-label={`Case study: ${situation}`}>
      <div className="case-header">
        <CaseStudyIcon iconKey={iconKey} label={iconLabel} />
        <h3>{situation}</h3>
      </div>
      <dl>
        <div>
          <dt>Stated issue</dt>
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
