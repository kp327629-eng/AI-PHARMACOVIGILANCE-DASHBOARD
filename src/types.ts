export interface PatientData {
  patientId: string;
  age: number;
  gender: string;
  weight: number;
  disease: string;
  drugName: string;
  dose: string;
  route: string;
  duration: number; // in days
  symptoms: string;
  medicalHistory: string;
  smoking: string;
  alcohol: string;
  pregnancyStatus: string;
  allergies: string;
  labResults?: string;
}

export interface ModelPerformance {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
}

export interface FeatureImportance {
  feature: string;
  impact: number; // value from -1 to 1 or 0 to 1 representing SHAP value/contribution
}

export interface PredictionResult {
  adrDetected: boolean;
  probability: number; // 0 to 100
  severity: "Low" | "Medium" | "High";
  confidence: number; // 0 to 100
  riskCategory: string;
  possibleReaction: string;
  monitoringAdvice: string;
  selectedModel: string;
  modelComparison: ModelPerformance[];
  shapValues: FeatureImportance[];
}

export interface ADRReport {
  id: string;
  patient: PatientData;
  prediction: PredictionResult;
  createdAt: string;
}

export interface DashboardStats {
  totalReports: number;
  highRiskCases: number;
  mediumRiskCases: number;
  lowRiskCases: number;
  safetyScore: number; // 0 to 100
  mostReportedDrugs: { name: string; count: number }[];
  mostCommonSymptoms: { name: string; count: number }[];
}

export interface SearchFilters {
  query: string;
  drug: string;
  severity: string;
  dateFrom: string;
  dateTo: string;
}
