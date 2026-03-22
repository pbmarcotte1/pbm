import { useId } from 'react';

type ThinkingModuleProps = {
  title: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript: string | string[];
  insights: string[];
  applications: string[];
};

export function ThinkingModule({
  title,
  description,
  videoUrl,
  audioUrl,
  transcript,
  insights,
  applications,
}: ThinkingModuleProps) {
  const transcriptId = useId();
  const transcriptParagraphs = Array.isArray(transcript) ? transcript : [transcript];

  return (
    <article className="thinking-module" aria-labelledby={`${transcriptId}-title`}>
      <header>
        <h3 id={`${transcriptId}-title`}>{title}</h3>
      </header>

      {(videoUrl || audioUrl) && (
        <div className="media-stack" aria-label="Module media">
          {videoUrl && (
            <div className="media-frame">
              <video controls preload="metadata" src={videoUrl}>
                Sorry, your browser does not support embedded videos.
              </video>
            </div>
          )}

          {audioUrl && (
            <div className="audio-wrap">
              <audio controls preload="metadata" src={audioUrl}>
                Sorry, your browser does not support embedded audio.
              </audio>
            </div>
          )}
        </div>
      )}

      <p>{description}</p>

      <section aria-labelledby={`${transcriptId}-transcript-heading`}>
        <h4 id={`${transcriptId}-transcript-heading`} className="sr-only">
          Transcript
        </h4>
        <details className="transcript-details">
          <summary className="text-button">Transcript</summary>
          <div id={`${transcriptId}-transcript-content`} className="transcript">
            {transcriptParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      </section>

      <section aria-labelledby={`${transcriptId}-insights`}>
        <h4 id={`${transcriptId}-insights`}>Key Observations</h4>
        <ul>
          {insights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${transcriptId}-applications`}>
        <h4 id={`${transcriptId}-applications`}>Where this applies</h4>
        <ul>
          {applications.map((application) => (
            <li key={application}>{application}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
