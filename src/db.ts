import fs from "fs";
import path from "path";
import { ADRReport, PatientData, PredictionResult, DashboardStats } from "./types.js";

const DB_FILE = path.join(process.cwd(), "db.json");

// Helper to generate a random UUID-like ID
function generateId(): string {
  return "REP-" + Math.random().toString(36).substring(2, 9).toUpperCase();
}

// Default Seed Data representing typical pharmacovigilance reports over the last 6 months
const SEED_REPORTS: ADRReport[] = [
  {
    id: "REP-A92B1D",
    patient: {
      patientId: "P1023",
      age: 68,
      gender: "Male",
      weight: 82,
      disease: "Cardiovascular Disease",
      drugName: "Warfarin",
      dose: "10 mg daily",
      route: "Oral",
      duration: 14,
      symptoms: "Severe epistaxis (nosebleed), dark bruising on forearms, hematuria (blood in urine)",
      medicalHistory: "Atrial Fibrillation, Chronic Kidney Disease Stage 2",
      smoking: "No",
      alcohol: "Social",
      pregnancyStatus: "No",
      allergies: "Sulfa drugs",
      labResults: "INR: 5.4 (Critical, Target: 2.0-3.0), Serum Creatinine: 1.4 mg/dL"
    },
    prediction: {
      adrDetected: true,
      probability: 94,
      severity: "High",
      confidence: 96,
      riskCategory: "Critical Bleeding Event",
      possibleReaction: "Warfarin-Induced Coagulopathy & Hemorrhage",
      monitoringAdvice: "Immediate physician review. Suspend Warfarin dosing. Administer oral Vitamin K (phytonadione) 1-2.5mg if indicated, and monitor coagulation parameters (INR/PT) daily. Re-evaluate renal clearance before resumption.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Lab Results (INR 5.4)", impact: 0.38 },
        { feature: "Drug Type (Anticoagulant)", impact: 0.28 },
        { feature: "Age (68 years)", impact: 0.15 },
        { feature: "Medical History (Kidney Disease)", impact: 0.12 },
        { feature: "Dose Factor (High)", impact: 0.07 }
      ]
    },
    createdAt: "2026-06-15T14:32:00.000Z"
  },
  {
    id: "REP-B71C8F",
    patient: {
      patientId: "P1044",
      age: 52,
      gender: "Female",
      weight: 64,
      disease: "Hypertension",
      drugName: "Lisinopril",
      dose: "20 mg once daily",
      route: "Oral",
      duration: 30,
      symptoms: "Dry, hacking, non-productive cough, constant throat tickling starting 2 weeks post-therapy",
      medicalHistory: "Mild Asthma, GERD",
      smoking: "No",
      alcohol: "No",
      pregnancyStatus: "No",
      allergies: "None",
      labResults: "K+: 4.1 mEq/L (Normal), Chest X-Ray: Normal"
    },
    prediction: {
      adrDetected: true,
      probability: 78,
      severity: "Low",
      confidence: 91,
      riskCategory: "Class-Effect Side Effect",
      possibleReaction: "ACE Inhibitor-Induced Cough",
      monitoringAdvice: "Lisinopril is known to cause a dry cough due to accumulation of bradykinin. The symptom is benign but persistent. Recommend switching to an Angiotensin II Receptor Blocker (ARB) such as Losartan. Cough typically resolves in 1-4 weeks after cessation.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Drug Class (ACE Inhibitor)", impact: 0.45 },
        { feature: "Symptoms (Dry Cough)", impact: 0.32 },
        { feature: "Medical History (Asthma)", impact: 0.12 },
        { feature: "Gender (Female)", impact: 0.08 },
        { feature: "Treatment Duration (30d)", impact: 0.03 }
      ]
    },
    createdAt: "2026-06-28T09:15:00.000Z"
  },
  {
    id: "REP-C44E1A",
    patient: {
      patientId: "P1089",
      age: 72,
      gender: "Female",
      weight: 58,
      disease: "Hypercholesterolemia",
      drugName: "Atorvastatin",
      dose: "80 mg at bedtime",
      route: "Oral",
      duration: 45,
      symptoms: "Severe generalized muscle pain (myalgia), profound bilateral proximal muscle weakness, dark/tea-colored urine",
      medicalHistory: "Hypothyroidism, Moderate Osteoarthritis",
      smoking: "No",
      alcohol: "Social",
      pregnancyStatus: "No",
      allergies: "Aspirin",
      labResults: "Creatine Kinase (CK): 2800 U/L (Elevated, Normal < 150), Serum Creatinine: 1.6 mg/dL (Elevated)"
    },
    prediction: {
      adrDetected: true,
      probability: 89,
      severity: "High",
      confidence: 95,
      riskCategory: "Severe Skeletal Muscle Toxicity",
      possibleReaction: "Statin-Induced Rhabdomyolysis",
      monitoringAdvice: "Immediate cessation of Atorvastatin is required. Patient requires urgent hospitalization for aggressive intravenous hydration to prevent acute kidney injury (renal tubular necrosis due to myoglobinuria). Monitor serum CK levels, potassium, and renal function closely.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Lab Results (CK 2800 U/L)", impact: 0.42 },
        { feature: "Dose Factor (80mg High)", impact: 0.24 },
        { feature: "Symptoms (Myalgia, Tea Urine)", impact: 0.18 },
        { feature: "Age (72 years)", impact: 0.11 },
        { feature: "Medical History (Hypothyroid)", impact: 0.05 }
      ]
    },
    createdAt: "2026-05-12T16:45:00.000Z"
  },
  {
    id: "REP-D12F9E",
    patient: {
      patientId: "P1102",
      age: 29,
      gender: "Female",
      weight: 60,
      disease: "Bacterial Infection",
      drugName: "Amoxicillin",
      dose: "500 mg three times daily",
      route: "Oral",
      duration: 3,
      symptoms: "Pruritic maculopapular skin rash, urticaria starting on torso, mild wheezing",
      medicalHistory: "None",
      smoking: "No",
      alcohol: "No",
      pregnancyStatus: "Yes (1st Trimester)",
      allergies: "None listed on file",
      labResults: "CBC: WBC 11.2k (Normal/Slight elevation), Eosinophils: 6% (Slightly high)"
    },
    prediction: {
      adrDetected: true,
      probability: 85,
      severity: "Medium",
      confidence: 89,
      riskCategory: "Immunological / Hypersensitivity",
      possibleReaction: "Amoxicillin-Induced Type I/IV Hypersensitivity Rash",
      monitoringAdvice: "Discontinue Amoxicillin immediately. Mark patient chart as Penicillin-Allergic. Treat with oral antihistamines (e.g. Cetirizine) and topically applied low-potency corticosteroids. If wheezing worsens or anaphylaxis develops, administer intramuscular Epinephrine and seek emergency treatment.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Symptoms (Maculopapular Rash)", impact: 0.38 },
        { feature: "Drug Class (Beta-Lactam Penicillin)", impact: 0.31 },
        { feature: "Lab Results (Eosinophils 6%)", impact: 0.14 },
        { feature: "Pregnancy Status (Yes)", impact: 0.12 },
        { feature: "Age (29 years)", impact: 0.05 }
      ]
    },
    createdAt: "2026-06-05T11:20:00.000Z"
  },
  {
    id: "REP-E22G3H",
    patient: {
      patientId: "P1156",
      age: 62,
      gender: "Male",
      weight: 79,
      disease: "Osteoarthritis",
      drugName: "Ibuprofen",
      dose: "800 mg three times daily",
      route: "Oral",
      duration: 60,
      symptoms: "Epigastric pain, severe burning, dark/black tarry stools (melena), dizziness and fatigue",
      medicalHistory: "Peptic Ulcer Disease (10 years ago), Hypertension",
      smoking: "Yes",
      alcohol: "Social (2-3 drinks/week)",
      pregnancyStatus: "No",
      allergies: "Sulfa drugs",
      labResults: "Hemoglobin: 9.8 g/dL (Low, Baseline: 14.2), Endoscopy: Active gastric ulcer"
    },
    prediction: {
      adrDetected: true,
      probability: 92,
      severity: "High",
      confidence: 94,
      riskCategory: "Gastrointestinal Bleeding",
      possibleReaction: "NSAID-Induced Gastric Ulceration and Hemorrhage",
      monitoringAdvice: "Stop Ibuprofen immediately. Active GI bleed confirmed via endoscopy and hemoglobin drop. Patient requires Proton Pump Inhibitor (PPI) therapy (e.g., Pantoprazole IV/oral) and alternative non-NSAID analgesic management (e.g., Acetaminophen). Avoid all oral NSAIDs permanently.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Symptoms (Melena / Tar Stools)", impact: 0.35 },
        { feature: "Dose Factor (800mg TID, Extremely High)", impact: 0.23 },
        { feature: "Medical History (Peptic Ulcer)", impact: 0.20 },
        { feature: "Smoking (Yes)", impact: 0.12 },
        { feature: "Lab Results (Hb 9.8 g/dL)", impact: 0.10 }
      ]
    },
    createdAt: "2026-04-20T10:45:00.000Z"
  },
  {
    id: "REP-F31K1M",
    patient: {
      patientId: "P1209",
      age: 65,
      gender: "Female",
      weight: 71,
      disease: "Diabetes Type 2",
      drugName: "Metformin",
      dose: "1000 mg twice daily",
      route: "Oral",
      duration: 120,
      symptoms: "Profound nausea, vomiting, watery diarrhea, abdominal cramping, and generalized malaise",
      medicalHistory: "Metabolic Syndrome, Hypertension",
      smoking: "No",
      alcohol: "No",
      pregnancyStatus: "No",
      allergies: "Penicillin",
      labResults: "HbA1c: 6.9% (Controlled), eGFR: 58 mL/min/1.73m2 (Mild-moderate impairment)"
    },
    prediction: {
      adrDetected: true,
      probability: 65,
      severity: "Medium",
      confidence: 88,
      riskCategory: "Gastrointestinal Intolerance / Renal warning",
      possibleReaction: "Metformin-Associated Gastrointestinal Adverse Effect",
      monitoringAdvice: "Metformin commonly causes dose-dependent GI distress. Recommend reducing dose to 500mg BID, transitioning to Metformin Extended-Release (XR) at bedtime, and advising ingestion strictly with large meals. Monitor eGFR closely; if eGFR drops below 45, reduce dose; below 30, discontinue immediately to prevent lactic acidosis.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Symptoms (Diarrhea, Cramps)", impact: 0.42 },
        { feature: "Dose Factor (2000mg Daily, High)", impact: 0.25 },
        { feature: "Lab Results (eGFR 58)", impact: 0.18 },
        { feature: "Age (65 years)", impact: 0.10 },
        { feature: "Treatment Duration (120d)", impact: 0.05 }
      ]
    },
    createdAt: "2026-05-25T13:10:00.000Z"
  },
  {
    id: "REP-G55H7Y",
    patient: {
      patientId: "P1288",
      age: 74,
      gender: "Male",
      weight: 68,
      disease: "Infectious Arthritis",
      drugName: "Levofloxacin",
      dose: "750 mg once daily",
      route: "Oral",
      duration: 6,
      symptoms: "Sudden onset of sharp pain, extreme swelling, and localized snapping sound in the right Achilles tendon area",
      medicalHistory: "Chronic Gout, Moderate Cardiovascular Disease",
      smoking: "No",
      alcohol: "No",
      pregnancyStatus: "No",
      allergies: "None",
      labResults: "Ultrasound: Partial Achilles tendon tear"
    },
    prediction: {
      adrDetected: true,
      probability: 88,
      severity: "High",
      confidence: 93,
      riskCategory: "Severe Musculoskeletal Toxicity",
      possibleReaction: "Fluoroquinolone-Induced Tendonitis / Tendon Rupture",
      monitoringAdvice: "Immediately discontinue Levofloxacin. Immobilize the right ankle and refer to orthopedic evaluation. Avoid all weight-bearing on the affected side. Black box warning for Fluoroquinolones indicates elevated risk of tendon rupture particularly in patients > 60 years of age.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Drug Class (Fluoroquinolone)", impact: 0.48 },
        { feature: "Age (74 years, >60)", impact: 0.22 },
        { feature: "Symptoms (Achilles Pain & Snapping)", impact: 0.18 },
        { feature: "Dose (750mg Daily)", impact: 0.08 },
        { feature: "Weight Factor", impact: 0.04 }
      ]
    },
    createdAt: "2026-05-02T15:00:00.000Z"
  },
  {
    id: "REP-H12N8U",
    patient: {
      patientId: "P1311",
      age: 79,
      gender: "Female",
      weight: 54,
      disease: "Atrial Fibrillation",
      drugName: "Digoxin",
      dose: "0.25 mg daily",
      route: "Oral",
      duration: 18,
      symptoms: "Yellow-green visual halos (chromatopsia), severe loss of appetite (anorexia), confusion, vomiting, and heart palpitations",
      medicalHistory: "Congestive Heart Failure, Stage 3 Chronic Kidney Disease",
      smoking: "No",
      alcohol: "No",
      pregnancyStatus: "No",
      allergies: "None",
      labResults: "Serum Digoxin level: 2.9 ng/mL (Critical, Normal: 0.5-0.9 ng/mL), Serum Potassium: 3.2 mEq/L (Low)"
    },
    prediction: {
      adrDetected: true,
      probability: 96,
      severity: "High",
      confidence: 97,
      riskCategory: "Drug Overdose / Toxicity",
      possibleReaction: "Digoxin Toxicity / Glycoside-Induced Arrhythmia",
      monitoringAdvice: "Immediate discontinuation of Digoxin is mandatory. Monitor ECG continuously for blockages or bradyarrhythmias. Correct hypokalemia aggressively as low potassium potentiates Digoxin toxicity. Prepare Digoxin Immune Fab (Digibind) if hemodynamically unstable or life-threatening arrhythmias occur.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Lab Results (Digoxin 2.9 ng/mL)", impact: 0.44 },
        { feature: "Lab Results (Potassium 3.2, Low)", impact: 0.22 },
        { feature: "Symptoms (Visual Halos, Anorexia)", impact: 0.16 },
        { feature: "Age (79 years)", impact: 0.12 },
        { feature: "Medical History (Renal Impairment)", impact: 0.06 }
      ]
    },
    createdAt: "2026-04-10T08:50:00.000Z"
  },
  {
    id: "REP-I88Y9K",
    patient: {
      patientId: "P1402",
      age: 41,
      gender: "Male",
      weight: 85,
      disease: "Hypertension",
      drugName: "Amlodipine",
      dose: "10 mg once daily",
      route: "Oral",
      duration: 21,
      symptoms: "Bilateral ankle swelling (peripheral edema), warm skin, mild facial flushing",
      medicalHistory: "Metabolic Syndrome",
      smoking: "Yes",
      alcohol: "Social",
      pregnancyStatus: "No",
      allergies: "None",
      labResults: "Kidney and Liver Panels: Fully Normal"
    },
    prediction: {
      adrDetected: true,
      probability: 72,
      severity: "Low",
      confidence: 89,
      riskCategory: "Class-Effect Vasodilation",
      possibleReaction: "Calcium Channel Blocker-Induced Peripheral Edema",
      monitoringAdvice: "Peripheral edema is a common, non-allergic side effect of Amlodipine caused by precapillary vasodilation. It does not respond to diuretics. Advise patient to elevate feet at night. If intolerable, reduce dose to 5mg or transition to an ACE-inhibitor (Lisinopril) or ARB which reduces hydrostatic pressure.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Drug Class (Calcium Channel Blocker)", impact: 0.46 },
        { feature: "Symptoms (Bilateral Edema)", impact: 0.32 },
        { feature: "Dose Factor (10mg High)", impact: 0.12 },
        { feature: "Smoking (Yes)", impact: 0.06 },
        { feature: "Age (41 years)", impact: 0.04 }
      ]
    },
    createdAt: "2026-06-20T10:10:00.000Z"
  },
  {
    id: "REP-J33M2Q",
    patient: {
      patientId: "P1450",
      age: 33,
      gender: "Female",
      weight: 62,
      disease: "Bacterial Tonsillitis",
      drugName: "Azithromycin",
      dose: "500 mg Day 1, then 250 mg daily",
      route: "Oral",
      duration: 5,
      symptoms: "Intermittent heart racing (palpitations), lightheadedness, and mild chest tightness",
      medicalHistory: "Mitral Valve Prolapse, Congenital Long QT Syndrome",
      smoking: "No",
      alcohol: "No",
      pregnancyStatus: "No",
      allergies: "None",
      labResults: "ECG: QTc interval of 490 ms (Significantly Prolonged, Baseline: 440 ms)"
    },
    prediction: {
      adrDetected: true,
      probability: 84,
      severity: "High",
      confidence: 90,
      riskCategory: "Severe Cardiac Arrhythmia Risk",
      possibleReaction: "Macrolide-Induced QT Prolongation / Torsades de Pointes risk",
      monitoringAdvice: "Stop Azithromycin immediately. Macrolide antibiotics prolong the QT interval and are contraindicated in Congenital Long QT Syndrome. Switch to a non-macrolide antibiotic like Amoxicillin or Cephalexin. Patient requires continuous telemetry monitoring until QTc returns to baseline (<450 ms).",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Medical History (Long QT Syndrome)", impact: 0.40 },
        { feature: "Drug Class (Macrolide Antibiotic)", impact: 0.28 },
        { feature: "Lab Results (QTc 490 ms)", impact: 0.18 },
        { feature: "Symptoms (Palpitations, Lightheaded)", impact: 0.10 },
        { feature: "Gender (Female)", impact: 0.04 }
      ]
    },
    createdAt: "2026-05-18T11:40:00.000Z"
  },
  {
    id: "REP-K12L9R",
    patient: {
      patientId: "P1520",
      age: 26,
      gender: "Female",
      weight: 59,
      disease: "Severe Acne",
      drugName: "Isotretinoin",
      dose: "40 mg once daily",
      route: "Oral",
      duration: 90,
      symptoms: "Positive pregnancy test, severe mood swings, intense dry skin and chapped lips",
      medicalHistory: "None",
      smoking: "No",
      alcohol: "No",
      pregnancyStatus: "Yes (4 weeks gestation)",
      allergies: "None",
      labResults: "Serum hCG: Positive, Triglycerides: 180 mg/dL"
    },
    prediction: {
      adrDetected: true,
      probability: 99,
      severity: "High",
      confidence: 99,
      riskCategory: "Teratogenicity Warning",
      possibleReaction: "Fetal Exposure to Teratogenic Agent (Isotretinoin)",
      monitoringAdvice: "CRITICAL ALERT: Discontinue Isotretinoin immediately. Isotretinoin is a category X teratogen associated with severe, life-threatening fetal brain, heart, and craniofacial anomalies. Patient must be immediately referred to a high-risk obstetrician and clinical genetic counselor. Ensure compliance with iPLEDGE program registries.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Pregnancy Status (Yes)", impact: 0.52 },
        { feature: "Drug (Isotretinoin / Retinoid)", impact: 0.35 },
        { feature: "Age (26 years)", impact: 0.08 },
        { feature: "Symptoms (Dry lips, mood swings)", impact: 0.05 }
      ]
    },
    createdAt: "2026-06-12T15:30:00.000Z"
  },
  {
    id: "REP-L88W1E",
    patient: {
      patientId: "P1601",
      age: 55,
      gender: "Male",
      weight: 90,
      disease: "Gouty Arthritis",
      drugName: "Allopurinol",
      dose: "300 mg once daily",
      route: "Oral",
      duration: 14,
      symptoms: "Flu-like symptoms, high fever (102°F), rapid progression of painful skin blisters, target lesions, skin peeling/sloughing covering 8% of body surface",
      medicalHistory: "Chronic Kidney Disease Stage 3, Hypertension",
      smoking: "No",
      alcohol: "Social",
      pregnancyStatus: "No",
      allergies: "Sulfonamides",
      labResults: "HLA-B*5801 Genotype: Positive, Liver Enzymes (AST/ALT): 140/160 U/L (Elevated)"
    },
    prediction: {
      adrDetected: true,
      probability: 97,
      severity: "High",
      confidence: 98,
      riskCategory: "Severe Cutaneous Adverse Reaction (SCAR)",
      possibleReaction: "Stevens-Johnson Syndrome (SJS) secondary to Allopurinol",
      monitoringAdvice: "CRITICAL: Stop Allopurinol immediately. Patient requires immediate emergency transfer to a burn unit or intensive care unit for specialized supportive care. Skin biopsy is indicated. Patients of Asian descent with HLA-B*5801 allele have extremely high risk of Allopurinol SCAR. Never re-expose to Allopurinol.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Lab Results (HLA-B*5801 Positive)", impact: 0.42 },
        { feature: "Symptoms (Blisters, Skin Sloughing)", impact: 0.28 },
        { feature: "Drug (Allopurinol)", impact: 0.18 },
        { feature: "Medical History (Kidney Disease)", impact: 0.08 },
        { feature: "Age (55 years)", impact: 0.04 }
      ]
    },
    createdAt: "2026-04-25T14:10:00.000Z"
  },
  {
    id: "REP-M55R3D",
    patient: {
      patientId: "P1680",
      age: 47,
      gender: "Male",
      weight: 81,
      disease: "Post-Operative Pain",
      drugName: "Tramadol",
      dose: "50 mg every 6 hours",
      route: "Oral",
      duration: 5,
      symptoms: "Profuse sweating (diaphoresis), intense shivering, confusion, hyperreflexia, tremors, and bilateral ankle clonus",
      medicalHistory: "Major Depressive Disorder (treated with Sertraline 100mg daily)",
      smoking: "No",
      alcohol: "No",
      pregnancyStatus: "No",
      allergies: "None",
      labResults: "Core Temperature: 101.5°F, Vitals: HR 112 bpm (Tachycardia), BP 155/95 mmHg"
    },
    prediction: {
      adrDetected: true,
      probability: 86,
      severity: "High",
      confidence: 91,
      riskCategory: "Drug-Drug Interaction Syndrome",
      possibleReaction: "Serotonin Syndrome secondary to Tramadol-Sertraline co-administration",
      monitoringAdvice: "Stop Tramadol and Sertraline immediately. Co-administration of tramadol (a weak serotonin reuptake inhibitor) with Sertraline (SSRI) is highly dangerous. Treat with supportive care, IV fluids, and Serotonin antagonists (Cyproheptadine) if indicated. Monitor vitals, temperature, and cardiac rhythm continuously.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Medical History (Sertraline SSRI Use)", impact: 0.38 },
        { feature: "Drug Co-administration (Tramadol)", impact: 0.28 },
        { feature: "Symptoms (Clonus, Hyperreflexia)", impact: 0.20 },
        { feature: "Vitals (Fever, HR 112)", impact: 0.10 },
        { feature: "Age (47 years)", impact: 0.04 }
      ]
    },
    createdAt: "2026-05-30T10:25:00.000Z"
  },
  {
    id: "REP-N99I7V",
    patient: {
      patientId: "P1730",
      age: 61,
      gender: "Male",
      weight: 76,
      disease: "Congestive Heart Failure",
      drugName: "Spironolactone",
      dose: "25 mg once daily",
      route: "Oral",
      duration: 15,
      symptoms: "Profound generalized muscle weakness, heavy legs, and slow/irregular heartbeat starting 2 days ago",
      medicalHistory: "Heart Failure, Coronary Artery Disease, Diabetes Mellitus Type 2 (Treated with Lisinopril 20mg daily)",
      smoking: "No",
      alcohol: "Social",
      pregnancyStatus: "No",
      allergies: "Aspirin",
      labResults: "Serum Potassium: 6.4 mEq/L (Critical, Normal: 3.5-5.0), eGFR: 52 mL/min/1.73m2, ECG: Peaked T waves"
    },
    prediction: {
      adrDetected: true,
      probability: 91,
      severity: "High",
      confidence: 94,
      riskCategory: "Electrolyte Disorder / Drug Interaction",
      possibleReaction: "Drug-Induced Severe Hyperkalemia (Spironolactone + Lisinopril additive effect)",
      monitoringAdvice: "Stop Spironolactone and Lisinopril immediately. Co-administration of potassium-sparing diuretics (Spironolactone) with ACE-inhibitors (Lisinopril) causes hazardous, additive potassium retention in cardiac patients. Administer calcium gluconate IV to stabilize cardiac membrane, along with insulin+dextrose to drive potassium intracellularly. Monitor ECG continuously.",
      selectedModel: "Random Forest Classifier",
      modelComparison: [
        { modelName: "Random Forest", accuracy: 0.95, precision: 0.94, recall: 0.96, f1Score: 0.95, rocAuc: 0.98 },
        { modelName: "XGBoost", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94, rocAuc: 0.97 },
        { modelName: "Decision Tree", accuracy: 0.88, precision: 0.87, recall: 0.89, f1Score: 0.88, rocAuc: 0.88 },
        { modelName: "Logistic Regression", accuracy: 0.85, precision: 0.84, recall: 0.86, f1Score: 0.85, rocAuc: 0.91 }
      ],
      shapValues: [
        { feature: "Lab Results (Potassium 6.4 mEq/L)", impact: 0.40 },
        { feature: "Drug Interaction (Lisinopril + Spironolactone)", impact: 0.28 },
        { feature: "Symptoms (Weakness, Slow Heart)", impact: 0.16 },
        { feature: "Medical History (Diabetes + Renal impairment)", impact: 0.12 },
        { feature: "Age (61 years)", impact: 0.04 }
      ]
    },
    createdAt: "2026-06-02T08:30:00.000Z"
  }
];

class Database {
  private reports: ADRReport[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf-8").trim();
        if (raw) {
          this.reports = JSON.parse(raw);
          console.log(`Database loaded: ${this.reports.length} ADR reports ready.`);
        } else {
          this.reports = [...SEED_REPORTS];
          this.saveToDisk();
          console.log("Database file was empty. Seeded with default reports.");
        }
      } else {
        this.reports = [...SEED_REPORTS];
        this.saveToDisk();
        console.log(`Database initialized and seeded with ${SEED_REPORTS.length} ADR reports.`);
      }
    } catch (error) {
      console.error("Failed to initialize file database, performing self-repair:", error);
      this.reports = [...SEED_REPORTS]; // fallback in memory
      try {
        this.saveToDisk(); // Repair disk with seed data
        console.log("Database file successfully repaired with seed data.");
      } catch (writeErr) {
        console.error("Failed to write recovery database to disk:", writeErr);
      }
    }
  }

  private saveToDisk() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.reports, null, 2), "utf-8");
    } catch (error) {
      console.error("Failed to write database to disk:", error);
    }
  }

  public getAll(): ADRReport[] {
    return this.reports;
  }

  public getById(id: string): ADRReport | undefined {
    return this.reports.find(r => r.id === id);
  }

  public add(patient: PatientData, prediction: PredictionResult): ADRReport {
    const newReport: ADRReport = {
      id: generateId(),
      patient,
      prediction,
      createdAt: new Date().toISOString()
    };
    this.reports.unshift(newReport); // Add to the top
    this.saveToDisk();
    return newReport;
  }

  public search(queryStr: string, drugFilter: string, severityFilter: string): ADRReport[] {
    let list = [...this.reports];

    if (queryStr) {
      const q = queryStr.toLowerCase();
      list = list.filter(r => 
        r.patient.patientId.toLowerCase().includes(q) ||
        r.patient.drugName.toLowerCase().includes(q) ||
        r.patient.symptoms.toLowerCase().includes(q) ||
        r.prediction.possibleReaction.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }

    if (drugFilter && drugFilter !== "All") {
      const d = drugFilter.toLowerCase();
      list = list.filter(r => r.patient.drugName.toLowerCase() === d);
    }

    if (severityFilter && severityFilter !== "All") {
      list = list.filter(r => r.prediction.severity === severityFilter);
    }

    return list;
  }

  public getStats(): DashboardStats {
    const totalReports = this.reports.length;
    const highRiskCases = this.reports.filter(r => r.prediction.severity === "High").length;
    const mediumRiskCases = this.reports.filter(r => r.prediction.severity === "Medium").length;
    const lowRiskCases = this.reports.filter(r => r.prediction.severity === "Low").length;

    // Safety Score calculation: 100 - (HighRiskCount*3 + MedRiskCount*1.5 + LowRiskCount*0.5) / TotalReports * 20
    // Clamped between 0 and 100
    let penalty = 0;
    if (totalReports > 0) {
      penalty = ((highRiskCases * 4) + (mediumRiskCases * 2) + (lowRiskCases * 1)) / totalReports * 15;
    }
    const safetyScore = Math.max(0, Math.min(100, Math.round(100 - penalty)));

    // Count drug reports
    const drugCounts: { [name: string]: number } = {};
    const symptomCounts: { [name: string]: number } = {};

    this.reports.forEach(r => {
      const d = r.patient.drugName;
      drugCounts[d] = (drugCounts[d] || 0) + 1;

      // Extract raw symptom names (split by commas and clean up)
      const symList = r.patient.symptoms.split(",");
      symList.forEach(s => {
        const cleaned = s.replace(/\([^)]*\)/g, "").trim(); // remove parens info e.g. (nosebleed)
        if (cleaned.length > 2) {
          // Capitalize first letter
          const formatted = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
          symptomCounts[formatted] = (symptomCounts[formatted] || 0) + 1;
        }
      });
    });

    const mostReportedDrugs = Object.entries(drugCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const mostCommonSymptoms = Object.entries(symptomCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalReports,
      highRiskCases,
      mediumRiskCases,
      lowRiskCases,
      safetyScore,
      mostReportedDrugs,
      mostCommonSymptoms
    };
  }

  public getAnalytics() {
    const list = this.reports;

    // ADR count by Age Group
    const ageGroups = { "0-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "66+": 0 };
    // ADR by Gender
    const genderCounts = { Male: 0, Female: 0, Other: 0 };
    // ADR by Disease
    const diseaseCounts: { [name: string]: number } = {};
    // Monthly reports over the last 6 months (Jan to Jun or similar)
    const monthlyCounts: { [month: string]: number } = {};

    // Top 10 high risk drugs (sum of high risk cases per drug)
    const drugRiskScores: { [name: string]: number } = {};
    // Top 10 high risk diseases
    const diseaseRiskScores: { [name: string]: number } = {};

    list.forEach(r => {
      // Age group
      const age = r.patient.age;
      if (age <= 18) ageGroups["0-18"]++;
      else if (age <= 35) ageGroups["19-35"]++;
      else if (age <= 50) ageGroups["36-50"]++;
      else if (age <= 65) ageGroups["51-65"]++;
      else ageGroups["66+"]++;

      // Gender
      const g = r.patient.gender;
      if (g === "Male") genderCounts.Male++;
      else if (g === "Female") genderCounts.Female++;
      else genderCounts.Other++;

      // Disease
      const d = r.patient.disease;
      diseaseCounts[d] = (diseaseCounts[d] || 0) + 1;

      // Month
      const date = new Date(r.createdAt);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const mName = monthNames[date.getMonth()] + " " + date.getFullYear().toString().slice(-2);
      monthlyCounts[mName] = (monthlyCounts[mName] || 0) + 1;

      // Risk weight: High = 3, Medium = 1.5, Low = 0.5
      const riskWeight = r.prediction.severity === "High" ? 3 : r.prediction.severity === "Medium" ? 1.5 : 0.5;
      
      const drug = r.patient.drugName;
      drugRiskScores[drug] = (drugRiskScores[drug] || 0) + riskWeight;
      
      const disease = r.patient.disease;
      diseaseRiskScores[disease] = (diseaseRiskScores[disease] || 0) + riskWeight;
    });

    const topHighRiskDrugs = Object.entries(drugRiskScores)
      .map(([name, score]) => ({ name, score: parseFloat(score.toFixed(1)) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    const topHighRiskDiseases = Object.entries(diseaseRiskScores)
      .map(([name, score]) => ({ name, score: parseFloat(score.toFixed(1)) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return {
      ageGroups: Object.entries(ageGroups).map(([group, count]) => ({ group, count })),
      gender: Object.entries(genderCounts).map(([gender, count]) => ({ gender, count })),
      disease: Object.entries(diseaseCounts).map(([disease, count]) => ({ disease, count })),
      monthlyTrend: Object.entries(monthlyCounts).map(([month, count]) => ({ month, count })),
      topHighRiskDrugs,
      topHighRiskDiseases
    };
  }
}

export const db = new Database();
export default db;
