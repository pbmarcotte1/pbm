import { b2bDemoFlowCaseStudy } from './b2bDemoFlow';
import { founderInboundCaseStudy } from './founderInbound';

export type CaseStudy = {
  id: string;
  enabled: boolean;
  iconKey: 'conversion' | 'signal';
  iconLabel: string;
  situation: string;
  mistaken_assumption: string;
  actual_issue: string;
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  b2bDemoFlowCaseStudy,
  founderInboundCaseStudy,
];
