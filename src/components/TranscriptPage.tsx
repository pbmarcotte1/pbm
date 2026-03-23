import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { workExamples } from '../content/workExamples';
import { Footer } from './Footer';

export function TranscriptPage() {
  const { id } = useParams<{ id: string }>();
  const workExample = workExamples.find((ex) => ex.id === id);
  const [fullTranscript, setFullTranscript] = useState<string | null>(null);

  useEffect(() => {
    if (!workExample?.transcriptFileUrl) {
      setFullTranscript(null);
      return;
    }

    let isActive = true;

    fetch(workExample.transcriptFileUrl)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Transcript file not available');
        }
        return response.text();
      })
      .then((text) => {
        if (isActive) {
          setFullTranscript(text.trim());
        }
      })
      .catch(() => {
        if (isActive) {
          setFullTranscript(null);
        }
      });

    return () => {
      isActive = false;
    };
  }, [workExample]);

  useEffect(() => {
    if (workExample) {
      // Set document title
      document.title = `${workExample.title} | Patrick Marcotte`;

      // Create or update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      let descElement = metaDescription as HTMLMetaElement | null;
      if (!descElement) {
        descElement = document.createElement('meta');
        descElement.setAttribute('name', 'description');
        document.head.appendChild(descElement);
      }
      descElement.setAttribute('content', workExample.description);

      // Create or update og:title
      let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', workExample.title);

      // Create or update og:description
      let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', workExample.description);

      // Scroll to top
      window.scrollTo(0, 0);

      // Cleanup: restore main page title
      return () => {
        document.title = 'Patrick Marcotte';
      };
    }
  }, [workExample]);

  if (!workExample) {
    return (
      <main id="main-content" className="page">
        <div className="transcript-page">
          <Link to="/" className="back-button">
            ← Back
          </Link>
          <p>Transcript not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const transcriptParagraphs = fullTranscript
    ? fullTranscript
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
    : Array.isArray(workExample.transcript)
      ? workExample.transcript
      : [workExample.transcript];

  return (
    <main id="main-content" className="page">
      <article className="transcript-page">
        <Link to="/" className="back-button">
          ← Back
        </Link>

        <header className="transcript-header">
          <h1>{workExample.title}</h1>
          <p className="transcript-meta">{workExample.description}</p>
        </header>

        <div className="transcript-content">
          {transcriptParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
