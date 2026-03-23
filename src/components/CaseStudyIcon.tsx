type CaseStudyIconProps = {
  iconKey: 'conversion' | 'signal';
  label: string;
};

export function CaseStudyIcon({ iconKey, label }: CaseStudyIconProps) {
  if (iconKey === 'signal') {
    return (
      <span className="case-icon" aria-hidden="true" title={label}>
        <svg viewBox="0 0 24 24" role="img" focusable="false">
          <path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3Z" fill="currentColor" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </span>
    );
  }

  return (
    <span className="case-icon" aria-hidden="true" title={label}>
      <svg viewBox="0 0 24 24" role="img" focusable="false">
        <path d="M4 19h16v2H2V3h2v16Z" fill="currentColor" />
        <path d="M7 14h3v4H7v-4Zm4-5h3v9h-3V9Zm4 2h3v7h-3v-7Z" fill="currentColor" />
      </svg>
    </span>
  );
}
