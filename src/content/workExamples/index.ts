import { demandSignalModule } from './demandSignal';
import { fromContentExampleModule } from './fromContentExample';
import { pricingProblemModule } from './pricingProblem';
import { aiNeedsYourUnwrittenRulesFirstCompressedModule } from './ai-needs-your-unwritten-rules-first-compressed';

export type WorkExampleContent = {
  id: string;
  enabled: boolean;
  title: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  transcriptFileUrl?: string;
  transcript: string[];
  insights: string[];
  applications: string[];
};

export const workExamples: WorkExampleContent[] = [
  pricingProblemModule,
  demandSignalModule,
  fromContentExampleModule,
  aiNeedsYourUnwrittenRulesFirstCompressedModule,
];
