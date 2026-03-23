import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CaseFragment } from './components/CaseFragment';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ThinkingModule } from './components/ThinkingModule';
import { TranscriptPage } from './components/TranscriptPage';
import { caseStudies } from './content/caseStudies';
import { workExamples } from './content/workExamples';

function MainPage() {
  const enabledCaseStudies = caseStudies.filter((study) => study.enabled);
  const enabledWorkExamples = workExamples.filter((module) => module.enabled);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content" className="page">
        <HeroSection
          headline="Clarity where it matters most"
          subtext="Most problems show up in one place but come from another."
          ctaLabel="Reach out"
          ctaHref="mailto:pmarco@ipm.group?subject=Reach%20Out"
        />

        <section className="section" aria-labelledby="work-examples-heading">
          <h2 id="work-examples-heading">Examples</h2>
          <p className="lead">
            Presentations, research findings, and walkthroughs based on recent work across AI, education, and business.
          </p>
          <div className="module-grid">
            {enabledWorkExamples.map((module) => (
              <ThinkingModule key={module.id} {...module} />
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="cases-heading">
          <h2 id="cases-heading">Case Studies</h2>
          <div className="case-grid">
            {enabledCaseStudies.map((study) => (
              <CaseFragment key={study.id} {...study} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/transcript/:id" element={<TranscriptPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
