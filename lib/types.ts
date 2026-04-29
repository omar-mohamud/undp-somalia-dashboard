export type DonorType =
  | "DAC"
  | "GCC"
  | "Vertical_Fund"
  | "MPTF"
  | "IFI"
  | "Multilateral"
  | "PrivateSector"
  | "Foundation"
  | "UN_Agency"
  | "Other";

export type StageCode = "A" | "B" | "C" | "D";

export type Stage = {
  code: StageCode;
  label: string;
  fullLabel: string;
  probability: number;
  order: number;
  description: string;
};

export type Portfolio = {
  id: string;
  code: string;
  name: string;
  annualTarget: number;
};

export type Opportunity = {
  id: string;
  donorId: string;
  donorName: string;
  donorAlias: string;
  donorType: DonorType;
  donorCountry: string | null;
  portfolioId: string;
  portfolioCode: string;
  portfolioName: string | null;
  programme: string;
  stage: StageCode;
  stageLabel: string;
  pipelineTotal: number;
  target2026: number;
  target2026Adj: number;
  target2027: number;
  target2027Adj: number;
  reportDate: string;
};

export type Donor = {
  id: string;
  name: string;
  type: DonorType;
  country: string | null;
  opportunityCount: number;
  pipelineTotal: number;
  target2026Adj: number;
  target2027Adj: number;
  cashReceived: number;
  stages: Partial<Record<StageCode, number>>;
};

export type Cash = {
  id: string;
  donorId: string;
  portfolioId: string | null;
  donorAlias: string;
  donorCountry: string | null;
  programme: string | null;
  agreementAmount: number;
  cashReceived: number;
  date: string | null;
  year: number;
  quarter: number;
  status: string;
  fundType: string | null;
};

export type DeliveryRow = {
  portfolioId: string;
  portfolio: string | null;
  year: number;
  annualTarget: number;
  totalBudget: number;
  totalExpenditure: number;
  budgetBalance: number;
  pctDeliveryBudget: number;
  pctDeliveryAnnualTarget: number;
};

export type QuarterlyTarget = {
  portfolioId: string;
  portfolio: string;
  q1Actual: number;
  q2Target: number;
  q3Target: number;
  q4Target: number;
  annualTarget: number;
};

export type Kpi = { indicator: string; value: number; unit: string };

export type Totals = {
  pipelineTotal: number;
  target2026Adj: number;
  target2027Adj: number;
  cashReceived2025: number;
  cashReceived2026: number;
  opportunityCount: number;
  donorCountWithOpps: number;
  donorCountTotal: number;
  deliveryAnnualTarget: number;
  deliveryTotalBudget: number;
  deliveryTotalExpenditure: number;
  deliveryPctVsTarget: number;
  deliveryPctVsBudget: number;
};

export type DashboardData = {
  meta: {
    asOfDate: string;
    lastUpdated: string;
    reportDate: string;
    schemaVersion: string;
  };
  totals: Totals;
  donors: Donor[];
  donorTypeCounts: { type: DonorType; count: number }[];
  portfolios: Portfolio[];
  stages: Stage[];
  opportunities: Opportunity[];
  cash: Cash[];
  deliveryByPortfolio: DeliveryRow[];
  quarterlyTargets: QuarterlyTarget[];
  kpis: Record<string, Kpi[]>;
  pipelineByStage: { stage: StageCode; label: string; value: number; count: number; order: number }[];
  pipelineByDonorType: { type: DonorType; value: number; count: number; donorCount: number }[];
  pipelineByPortfolio: { portfolioCode: string; value: number; count: number }[];
};

export const DONOR_TYPE_LABEL: Record<DonorType, string> = {
  DAC: "DAC Countries",
  GCC: "GCC Partners",
  Vertical_Fund: "Vertical Funds",
  MPTF: "Pooled Funds / MPTF",
  IFI: "Multilateral Banks",
  Multilateral: "Multilateral",
  PrivateSector: "Private Sector",
  Foundation: "Foundations",
  UN_Agency: "UN Agencies",
  Other: "Other",
};

export const DONOR_TYPE_SHORT: Record<DonorType, string> = {
  DAC: "DAC",
  GCC: "GCC",
  Vertical_Fund: "Vertical",
  MPTF: "MPTF",
  IFI: "IFI",
  Multilateral: "Multi",
  PrivateSector: "Private",
  Foundation: "Foundation",
  UN_Agency: "UN",
  Other: "Other",
};

export const DONOR_TYPE_COLOR: Record<DonorType, string> = {
  Vertical_Fund: "#0468A0",
  DAC: "#006EB5",
  GCC: "#3F8FC9",
  MPTF: "#0A1628",
  IFI: "#7DB1DC",
  Multilateral: "#9CC0DF",
  PrivateSector: "#475569",
  Foundation: "#94A3B8",
  UN_Agency: "#64748B",
  Other: "#CBD5E1",
};

export const STAGE_COLOR: Record<StageCode, string> = {
  A: "#006EB5",
  B: "#3F8FC9",
  C: "#7DB1DC",
  D: "#C7D9E8",
};

export const PORTFOLIO_COLOR: Record<string, string> = {
  RCC: "#0468A0",
  ERID: "#3F8FC9",
  TG: "#475569",
};
