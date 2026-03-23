import { Link } from 'react-router-dom';

type ThinkingModuleProps = {
  title: string;
  description: string;
  id: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript: string | string[];
  insights: string[];
  applications: string[];
};

export function ThinkingModule({
  title,
  description,
  id,
  videoUrl,
  audioUrl,
  transcript,
  insights,
  applications,
}: ThinkingModuleProps) {
  return (
    <article className="thinking-module" aria-labelledby="module-title">
      <header>
        <h3 id="module-title">{title}</h3>
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

      <section>
        <p>
          <Link to={`/transcript/${id}`} className="text-button">
            Read full transcript
          </Link>
        </p>
      </section>

      <section aria-labelledby="insights-heading">
        <h4 id="insights-heading">Key Observations</h4>
        <ul>
          {insights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="applications-heading">
        <h4 id="applications-heading">Where this applies</h4>
        <ul>
          {applications.map((application) => (
            <li key={application}>{application}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
