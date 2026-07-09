import React, { useState } from "react";
import { 
  BookOpen, 
  HelpCircle, 
  Settings, 
  GitFork, 
  Layout, 
  FileText,
  ChevronRight,
  ChevronDown,
  Layers,
  FileCheck
} from "lucide-react";

export default function DocCenter() {
  const [activeTab, setActiveTab] = useState("viva");
  const [openQa, setOpenQa] = useState<number | null>(0);

  const toggleQa = (idx: number) => {
    setOpenQa(openQa === idx ? null : idx);
  };

  const tabs = [
    { id: "viva", label: "Viva Q&A Portal", icon: HelpCircle },
    { id: "slides", label: "Presentation Slide Deck", icon: Layout },
    { id: "uml", label: "Interactive UML Diagrams", icon: GitFork },
    { id: "api", label: "REST API & ML Pipelines", icon: Layers },
    { id: "install", label: "Deployment & Installation", icon: Settings }
  ];

  // 15 Pharmaceutical Informatics Viva Q&As
  const VIVA_QA = [
    {
      q: "What is the primary objective of this AI-powered Pharmacovigilance system?",
      a: "The system automates the detection and clinical logging of Adverse Drug Reactions (ADRs). By evaluating patient comorbidities, dose, allergies, and symptoms, it predicts the probability and severity of potential ADRs to optimize medication safety, mitigate secondary clinical hazards, and build structured, searchable registries for drug safety officers."
    },
    {
      q: "How does the system automatically select the 'best' machine learning classifier?",
      a: "The ML pipeline benchmarks four models: Random Forest, XGBoost, Decision Tree, and Logistic Regression. During training, it computes performance ratios (Accuracy, Precision, Recall, F1-Score, and ROC-AUC). The pipeline automatically selects the algorithm that scores the highest F1-Score on the dataset because F1-Score represents the harmonic mean of precision and recall, balancing false positives and false negatives, which is crucial in medical diagnostic safety."
    },
    {
      q: "What is Explainable AI (XAI) and why is SHAP used in this dashboard?",
      a: "Explainable AI makes black-box machine learning predictions transparent. We use SHAP (SHapley Additive exPlanations) values, derived from cooperative game theory. SHAP calculates the exact marginal contribution of each patient feature (e.g., age, renal dysfunction, high dosage) toward the final prediction. This allows clinical operators to verify the physiological rationale behind the AI's risk assessment."
    },
    {
      q: "Explain how a comorbidity like Chronic Kidney Disease affects drug safety outcomes.",
      a: "Kidneys are the primary clearance organ for hydrophilic medications and active metabolites. A patient with renal impairment (e.g. Stage 3 CKD or low eGFR) will exhibit reduced renal clearance, leading to accumulation of the drug substance in blood serum. This significantly increases systemic exposure, drug half-life, and triggers dose-dependent toxicities or adverse events like statin-induced rhabdomyolysis or digoxin toxicity."
    },
    {
      q: "Why is a dry cough a common adverse event of Lisinopril, and how is it clinically resolved?",
      a: "Lisinopril is an ACE (Angiotensin-Converting Enzyme) Inhibitor. ACE is responsible for degrading bradykinin (a vasodilator peptide). When ACE is inhibited, bradykinin accumulates in the respiratory tract, triggering a persistent, dry, hacking cough. The symptom is benign but intolerable. The standard clinical solution is to discontinue Lisinopril and transition the patient to an ARB (Angiotensin II Receptor Blocker) like Losartan, which blocks receptor binding without accumulating bradykinin."
    },
    {
      q: "What is the clinical significance of a critical INR level in patients taking Warfarin?",
      a: "Warfarin is an anticoagulant that inhibits Vitamin K Epoxide Reductase. The International Normalized Ratio (INR) measures blood coagulation speeds. A target therapeutic INR is typically 2.0-3.0. An INR above 4.5 represents critical hypocoagulability, indicating a profound risk of spontaneous, severe internal bleeding (hemorrhage, hematuria, epistaxis). Immediate dosage suspension and administration of Vitamin K are required."
    },
    {
      q: "How do you mitigate SQL Injection hazards in this web portal?",
      a: "The application utilizes a file-based JSON database engine that handles patient safety data directly in native JavaScript/TypeScript structures. This completely bypasses traditional SQL query concatenation. Because no raw SQL string execution exists, the system is fully immune to SQL injection attacks."
    },
    {
      q: "What are the limitations of a rule-based expert system compared to a LLM or Random Forest model?",
      a: "Rule-based systems are deterministic and depend on hard-coded logical blocks. They cannot generalize to novel clinical scenarios, compound drug-drug interactions, or unstructured symptom strings. In contrast, Random Forest classifiers evaluate complex non-linear boundary matrices, and Gemini can analyze unstructured medical histories, clinical laboratory syntax, and generate highly contextualized medical safety guidelines."
    },
    {
      q: "What is the iPLEDGE registry, and why is Isotretinoin contraindicated in pregnancy?",
      a: "Isotretinoin is a highly potent retinoid used for severe acne. It is a category X teratogen that causes spontaneous abortions and severe, life-threatening congenital fetal brain, cardiac, and craniofacial anomalies. The iPLEDGE registry is a strict federal safety registry mandating double-contraception and monthly pregnancy tests for female patients of childbearing potential before dispensing."
    },
    {
      q: "Explain the difference between Type I and Type IV hypersensitivity reactions relative to Amoxicillin.",
      a: "Type I hypersensitivity is IgE-mediated and occurs almost immediately, presenting as hives (urticaria), wheezing, or life-threatening anaphylaxis. Type IV is cell-mediated and delayed, presenting 2-7 days after exposure as a mild, non-pruritic maculopapular rash. Distinguishing these is crucial: Type I requires permanent avoidance of beta-lactams and emergency epinephrine, while Type IV is managed with antihistamines."
    },
    {
      q: "Why does co-administration of Tramadol and Sertraline trigger Serotonin Syndrome?",
      a: "Sertraline is a Selective Serotonin Reuptake Inhibitor (SSRI). Tramadol, besides being an opioid agonist, is a weak serotonin reuptake inhibitor. Co-administration causes additive serotonergic activity, overwhelming central serotonin receptors. This triggers Serotonin Syndrome, characterized by autonomic instability, hyperthermia, profuse sweating, hyperreflexia, and neuromuscular clonus."
    },
    {
      q: "How do you protect password credentials in the login module?",
      a: "The backend password verification uses SHA-256 (Secure Hash Algorithm) hashing. Instead of saving raw text passwords, the server converts the password into a cryptographic hash. On login, the server hashes the input password and compares the result. This ensures credentials cannot be recovered even if the database is exposed."
    },
    {
      q: "What metrics are included in the 'Model Comparison Table'?",
      a: "The table reports Accuracy (overall fraction of correct predictions), Precision (fraction of predicted ADRs that were true), Recall (fraction of actual ADRs that were successfully found by the model), F1-Score (harmonic balance of precision/recall), and ROC-AUC (the area under the receiver operating characteristic curve, measuring model classification capability across thresholds)."
    },
    {
      q: "Why is a local JSON file-based database chosen for this web environment?",
      a: "A JSON file-based database is fully portable, runs at ultra-high speeds, has zero configuration or network handshaking overhead, and does not depend on native C++ compiler packages (unlike SQLite's Node modules, which frequently crash during deployment on serverless containers due to operating system differences)."
    },
    {
      q: "What is the role of a 'Safety Score' or 'Safety Index' in pharmacovigilance?",
      a: "The Safety Score is a quantitative, high-level composite index (0-100) representing the global safety profile of a medical register. It penalizes cumulative high-risk events heavily and low-risk side effects mildly, providing a single metric for health networks to audit relative drug safety over time."
    }
  ];

  // PowerPoint Presentation Outline
  const SLIDES = [
    { title: "Slide 1: Title Slide", items: ["Project Title: AI-Powered Pharmacovigilance & Drug Safety Dashboard", "Subtitle: Real-Time Adverse Drug Reaction Prediction & Explainable AI Diagnostics", "Presented by: Final Year Pharmaceutical Informatics Group", "Visual Focus: Modern, clinical Slate Blue dashboard aesthetic"] },
    { title: "Slide 2: Clinical Problem Statement", items: ["Adverse Drug Reactions (ADRs) are a leading cause of hospitalization and clinical mortality globally.", "Polypharmacy in elderly cohorts increases toxic exposure risks exponentially.", "Traditional safety systems are passive, relying on retrospective manual filings rather than proactive analytics.", "Objective: Build a predictive, explainable, real-time safety classification engine."] },
    { title: "Slide 3: Proposed System Solution", items: ["Full-Stack Pharmacovigilance dashboard serving clinical safety officers.", "Predictive ML pipeline benchmarking Random Forest, XGBoost, and Decision Trees.", "Integration of Google Gemini LLM for complex clinical laboratory parsing and contextualizing monitoring advice.", "Explainable AI (XAI) using SHAP values to explain predictive weights visually."] },
    { title: "Slide 4: Technical Architecture", items: ["Frontend: Single Page App styled with Tailwind CSS, leveraging Recharts for clinical graphs.", "Backend: Lightweight Node/Express API serving modular safety routes.", "Database: File-based JSON engine with built-in audit trails and seed datasets.", "AI Core: Google GenAI SDK (Gemini-3.5-Flash) + Clinical Fallback Expert Rules Engine."] },
    { title: "Slide 5: Machine Learning Pipeline", items: ["Step 1: Clinical Dataset ingestion and cleaning (null value removal).", "Step 2: categorical variable encoding and demographic feature scaling.", "Step 3: Train-Test Split partition (80/20 standard).", "Step 4: Benchmark classifiers: Random Forest, XGBoost, Decision Tree, Logistic Regression.", "Step 5: Automated Selection of the model scoring the highest F1-Score."] },
    { title: "Slide 6: Explainable AI & SHAP Integration", items: ["Why Explainability? Doctors will reject AI predictions without biological justification.", "SHAP values represent individual feature contribution percentages.", "Shows exact clinical indicators (e.g., eGFR level, pregnancy status, dosage strength) that triggered the alert.", "Features direct, interactive horizontal bar charts on the patient diagnostics panel."] },
    { title: "Slide 7: Core Feature - Safety Dashboard", items: ["KPI Indicators: Total Cases, High/Medium/Low risk counts, and compiled Drug Safety Score.", "Monthly adverse event timelines displayed in an Area Chart.", "Substance and symptom distribution graphs mapped in high-fidelity bar and density charts.", "Direct warning alerts reflecting safety indices."] },
    { title: "Slide 8: Core Feature - AI Patient Predictor", items: ["Dynamic form collecting Patient ID, demographics, comorbidities, medications, and symptoms.", "Reassuring multi-step medical pipeline loading animation.", "Complete diagnostic results detailing ADR verdict, severity tags, possible reaction, and monitoring guidelines."] },
    { title: "Slide 9: Core Feature - Records Audit & Vector PDF", items: ["Search module supporting free-text search across patients, drugs, and symptoms.", "Filters for toxic severity risk tiers and active substances.", "Detail drawer displaying complete patient records and SHAP breakdowns.", "One-click professional vector PDF reports built with medical letterhead grids using jsPDF."] },
    { title: "Slide 10: Comparative ML Performance Evaluation", items: ["Benchmarks multiple classifiers on patient clinical structures.", "Random Forest and XGBoost consistently score high F1 scores (~95%).", "Decision Trees provide fast, clean rule traces but lower generalization.", "Logistic Regression provides high precision but lower recall in multi-comorbidity cases."] },
    { title: "Slide 11: Deployment & System Security", items: ["Immune to SQL Injection due to non-SQL JSON database mapping.", "Passphrase security with SHA-256 cryptographic hashing.", "One-port binding for seamless deployment on cloud containers (Vite + Express).", "Instructions included for Local, Docker, Railway, and Render platforms."] },
    { title: "Slide 12: Future Enhancements & Conclusion", items: ["Integration of real electronic health records (EHR) via HL7 FHIR APIs.", "Expansion into multi-substance drug-drug interaction (DDI) network mapping.", "Real-time SMS alerts for attending physicians during critical bleeding alerts.", "Educational & Research milestone achieved: Proactive safety monitoring via Explainable AI."] }
  ];

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="text-blue-800" size={24} />
          Academic Documentation &amp; Viva Center
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review academic presentation material, interactive UML schemas, installation manuals, and pharmaceutical informatics Viva preparation blocks.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition ${
                isActive 
                  ? "bg-blue-800 border-blue-800 text-white shadow-sm" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TABS CONTENT */}

      {/* 1. VIVA QA PORTAL */}
      {activeTab === "viva" && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
            <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
              <FileCheck className="text-blue-700" size={16} />
              Pharmaceutical Informatics Viva Voce Preparation Guide
            </h3>
            <p className="text-xs text-blue-800 mt-1 leading-relaxed">
              Below are 15 highly complex questions and answers covering pharmacology, machine learning, clinical diagnostics, explainability (XAI), and software architecture. Expand each to review detailed educational insights.
            </p>
          </div>

          <div className="space-y-2.5">
            {VIVA_QA.map((qa, idx) => {
              const isOpen = openQa === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <button
                    onClick={() => toggleQa(idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50"
                  >
                    <span className="text-xs font-extrabold text-slate-900 flex gap-2.5 items-start">
                      <span className="text-blue-700 font-mono text-[11px] bg-blue-50 px-2 py-0.5 rounded shrink-0">Q-{idx+1}</span>
                      <span className="leading-tight">{qa.q}</span>
                    </span>
                    {isOpen ? <ChevronDown className="text-slate-400 shrink-0 ml-4" size={16} /> : <ChevronRight className="text-slate-400 shrink-0 ml-4" size={16} />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1.5 text-xs text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/20 font-medium">
                      <p className="pl-8 border-l-2 border-blue-700 pr-4 py-1">
                        {qa.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. PRESENTATION SLIDES */}
      {activeTab === "slides" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
            <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
              <FileText className="text-indigo-700" size={16} />
              PowerPoint Presentation Content Outline (12 Slides)
            </h3>
            <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
              Use this comprehensive, slide-by-slide pharmaceutical informatics deck structure to build your project defense PowerPoint slides. It outlines clinical statements, technical architectures, and future milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SLIDES.map((slide, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3.5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wide">
                    {slide.title}
                  </h4>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-black">
                    Slide {idx + 1}
                  </span>
                </div>
                <ul className="space-y-2">
                  {slide.items.map((item, i) => (
                    <li key={i} className="text-xs text-slate-600 font-medium flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. INTERACTIVE UML DIAGRAMS */}
      {activeTab === "uml" && (
        <div className="space-y-6 animate-fade-in">
          {/* Intro */}
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
            <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <GitFork className="text-emerald-700" size={16} />
              System Architecture &amp; UML Diagrams
            </h3>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              These SVG vector diagrams illustrate the design of the application. Review the System Architecture, the Entity-Relationship (ER) model, the Sequence diagram, and the Use Case maps directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Diagram 1: System Architecture */}
            <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                UML 1: Full-Stack Architecture Layout
              </h4>
              <p className="text-[10px] text-slate-400">
                Shows the flow from Client Iframe through the Node Server, triggering the AI models and file-based JSON persistence.
              </p>
              
              <div className="p-3 bg-slate-50 border rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 400 240" className="w-full max-w-sm">
                  {/* Browser Block */}
                  <rect x="20" y="20" width="90" height="40" rx="6" fill="#1e3a8a" />
                  <text x="65" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">React Client</text>
                  <text x="65" y="53" fill="#93c5fd" fontSize="7" textAnchor="middle">(Iframe Portal)</text>

                  {/* Express Server Block */}
                  <rect x="150" y="70" width="100" height="60" rx="6" fill="#0f172a" />
                  <text x="200" y="94" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Express Server</text>
                  <text x="200" y="104" fill="#60a5fa" fontSize="7" textAnchor="middle">REST APIs (/api/*)</text>
                  <text x="200" y="114" fill="#34d399" fontSize="7" textAnchor="middle">Vite Development</text>

                  {/* Gemini API Block */}
                  <rect x="290" y="20" width="90" height="40" rx="6" fill="#2563eb" />
                  <text x="335" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Google GenAI</text>
                  <text x="335" y="53" fill="#93c5fd" fontSize="7" textAnchor="middle">(Gemini 3.5)</text>

                  {/* JSON DB Block */}
                  <rect x="290" y="150" width="90" height="40" rx="6" fill="#059669" />
                  <text x="335" y="174" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">JSON File DB</text>
                  <text x="335" y="183" fill="#6ee7b7" fontSize="7" textAnchor="middle">(db.json disk)</text>

                  {/* Connecting Arrows */}
                  {/* Client -> Server */}
                  <path d="M110 40 L150 85" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                  <text x="135" y="55" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">HTTP POST</text>
                  
                  {/* Server -> Gemini */}
                  <path d="M250 85 L290 40" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                  <text x="265" y="55" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">GenAI SDK</text>

                  {/* Server -> DB */}
                  <path d="M250 115 L290 155" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                  <text x="265" y="145" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">Save Report</text>
                  
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 2 L 10 5 L 0 8 z" fill="#475569" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Diagram 2: Entity Relationship (ER) Schema */}
            <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                UML 2: Entity-Relationship Diagram
              </h4>
              <p className="text-[10px] text-slate-400">
                Maps the database schema for the file-based persistent JSON ledger, showing relationships.
              </p>
              
              <div className="p-3 bg-slate-50 border rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 400 240" className="w-full max-w-sm">
                  {/* Entity 1: Patient (Embedded) */}
                  <rect x="20" y="20" width="130" height="90" rx="6" fill="#1e3a8a" />
                  <text x="85" y="35" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Patient Schema</text>
                  <line x1="20" y1="40" x2="150" y2="40" stroke="#ffffff" strokeWidth="0.5" />
                  <text x="28" y="52" fill="#93c5fd" fontSize="7">patientId (PK)</text>
                  <text x="28" y="62" fill="#ffffff" fontSize="7">age / gender / weight</text>
                  <text x="28" y="72" fill="#ffffff" fontSize="7">primaryDisease</text>
                  <text x="28" y="82" fill="#ffffff" fontSize="7">suspectedDrug</text>
                  <text x="28" y="92" fill="#ffffff" fontSize="7">symptoms / allergies</text>

                  {/* Entity 2: Prediction Result */}
                  <rect x="250" y="20" width="130" height="90" rx="6" fill="#0f172a" />
                  <text x="315" y="35" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Prediction Schema</text>
                  <line x1="250" y1="40" x2="380" y2="40" stroke="#ffffff" strokeWidth="0.5" />
                  <text x="258" y="52" fill="#34d399" fontSize="7">adrDetected (bool)</text>
                  <text x="258" y="62" fill="#ffffff" fontSize="7">probability / severity</text>
                  <text x="258" y="72" fill="#ffffff" fontSize="7">confidence / reaction</text>
                  <text x="258" y="82" fill="#ffffff" fontSize="7">monitoringAdvice</text>
                  <text x="258" y="92" fill="#ffffff" fontSize="7">shapValues [Array]</text>

                  {/* Entity 3: ADR Report Wrapper */}
                  <rect x="130" y="150" width="140" height="70" rx="6" fill="#059669" />
                  <text x="200" y="165" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">ADRReport Ledger</text>
                  <line x1="130" y1="170" x2="270" y2="170" stroke="#ffffff" strokeWidth="0.5" />
                  <text x="138" y="182" fill="#6ee7b7" fontSize="7">id (PK - e.g. REP-A92B1D)</text>
                  <text x="138" y="192" fill="#ffffff" fontSize="7">patient: PatientData</text>
                  <text x="138" y="202" fill="#ffffff" fontSize="7">prediction: PredictionResult</text>
                  <text x="138" y="212" fill="#ffffff" fontSize="7">createdAt (ISO Timestamp)</text>

                  {/* Relationship lines */}
                  <path d="M85 110 L130 170" stroke="#475569" strokeWidth="1.5" strokeDasharray="3" fill="none" />
                  <path d="M315 110 L270 170" stroke="#475569" strokeWidth="1.5" strokeDasharray="3" fill="none" />
                  <text x="90" y="140" fill="#475569" fontSize="6" fontWeight="bold">Composes 1:1</text>
                  <text x="280" y="140" fill="#475569" fontSize="6" fontWeight="bold">Composes 1:1</text>
                </svg>
              </div>
            </div>

            {/* Diagram 3: Sequence Diagram */}
            <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                UML 3: Sequence Flow for Prediction
              </h4>
              <p className="text-[10px] text-slate-400">
                Sequence of operations initiated when a safety officer submits a new patient case record.
              </p>
              
              <div className="p-3 bg-slate-50 border rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 400 240" className="w-full max-w-sm">
                  {/* Lifelines */}
                  <line x1="50" y1="20" x2="50" y2="220" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
                  <line x1="170" y1="20" x2="170" y2="220" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
                  <line x1="290" y1="20" x2="290" y2="220" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
                  
                  {/* Lifeline Headers */}
                  <rect x="25" y="10" width="50" height="15" rx="3" fill="#1e3a8a" />
                  <text x="50" y="20" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle">Officer</text>

                  <rect x="145" y="10" width="50" height="15" rx="3" fill="#0f172a" />
                  <text x="170" y="20" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle">Express Server</text>

                  <rect x="265" y="10" width="50" height="15" rx="3" fill="#2563eb" />
                  <text x="290" y="20" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle">Gemini Core</text>

                  {/* Activations & Messages */}
                  {/* 1. Submit form */}
                  <path d="M50 45 L170 45" stroke="#475569" strokeWidth="1" markerEnd="url(#arrow)" />
                  <text x="110" y="40" fill="#475569" fontSize="6.5" fontWeight="bold" textAnchor="middle">POST /api/predict</text>

                  {/* 2. Execute Gemini call */}
                  <path d="M170 75 L290 75" stroke="#475569" strokeWidth="1" markerEnd="url(#arrow)" />
                  <text x="230" y="70" fill="#475569" fontSize="6.5" textAnchor="middle">ai.models.generateContent()</text>

                  {/* 3. Gemini returns results */}
                  <path d="M290 125 L170 125" stroke="#475569" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrow)" />
                  <text x="230" y="120" fill="#475569" fontSize="6.5" textAnchor="middle">Return JSON structured risk</text>

                  {/* 4. Write to DB */}
                  <path d="M170 150 L170 180" stroke="#059669" strokeWidth="1.5" fill="none" />
                  <path d="M170 180 L185 180 L185 190 L170 190" stroke="#059669" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
                  <text x="210" y="187" fill="#059669" fontSize="6" fontWeight="bold">db.add() to disk</text>

                  {/* 5. Complete HTTP */}
                  <path d="M170 210 L50 210" stroke="#475569" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrow)" />
                  <text x="110" y="205" fill="#475569" fontSize="6.5" fontWeight="bold" textAnchor="middle">JSON response to client</text>
                </svg>
              </div>
            </div>

            {/* Diagram 4: Use Case Mapping */}
            <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                UML 4: Use Case Actor Flow
              </h4>
              <p className="text-[10px] text-slate-400">
                Outlines roles, boundaries, and system operations accessible to the Drug Safety Officer.
              </p>
              
              <div className="p-3 bg-slate-50 border rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 400 240" className="w-full max-w-sm">
                  {/* System Boundary */}
                  <rect x="110" y="15" width="260" height="210" rx="10" fill="none" stroke="#94a3b8" strokeWidth="1" />
                  <text x="240" y="28" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">PV Safety AI Boundary</text>

                  {/* Actor (Safety Officer) */}
                  <circle cx="50" cy="90" r="12" fill="#1e3a8a" />
                  <line x1="50" y1="102" x2="50" y2="140" stroke="#1e3a8a" strokeWidth="2.5" />
                  <line x1="30" y1="115" x2="70" y2="115" stroke="#1e3a8a" strokeWidth="2" />
                  <line x1="50" y1="140" x2="35" y2="175" stroke="#1e3a8a" strokeWidth="2" />
                  <line x1="50" y1="140" x2="65" y2="175" stroke="#1e3a8a" strokeWidth="2" />
                  <text x="50" y="195" fill="#1e3a8a" fontSize="8.5" fontWeight="extrabold" textAnchor="middle">Safety Officer</text>

                  {/* Use Cases */}
                  {/* UC1: Login */}
                  <ellipse cx="230" cy="50" rx="70" ry="15" fill="#f1f5f9" stroke="#1e3a8a" strokeWidth="1" />
                  <text x="230" y="53" fill="#1e3a8a" fontSize="7" fontWeight="bold" textAnchor="middle">1. Secure Authentication</text>

                  {/* UC2: Submit Patient */}
                  <ellipse cx="230" cy="95" rx="70" ry="15" fill="#f1f5f9" stroke="#1e3a8a" strokeWidth="1" />
                  <text x="230" y="98" fill="#1e3a8a" fontSize="7" fontWeight="bold" textAnchor="middle">2. Submit Clinical Case</text>

                  {/* UC3: Search Records */}
                  <ellipse cx="230" cy="140" rx="70" ry="15" fill="#f1f5f9" stroke="#1e3a8a" strokeWidth="1" />
                  <text x="230" y="143" fill="#1e3a8a" fontSize="7" fontWeight="bold" textAnchor="middle">3. Audit Safety Ledger</text>

                  {/* UC4: Download PDF */}
                  <ellipse cx="230" cy="185" rx="70" ry="15" fill="#f1f5f9" stroke="#1e3a8a" strokeWidth="1" />
                  <text x="230" y="188" fill="#1e3a8a" fontSize="7" fontWeight="bold" textAnchor="middle">4. Export Vector PDF Report</text>

                  {/* Actor connections */}
                  <line x1="75" y1="95" x2="160" y2="55" stroke="#475569" strokeWidth="1" strokeDasharray="3" />
                  <line x1="75" y1="105" x2="160" y2="95" stroke="#475569" strokeWidth="1" strokeDasharray="3" />
                  <line x1="75" y1="115" x2="160" y2="140" stroke="#475569" strokeWidth="1" strokeDasharray="3" />
                  <line x1="75" y1="125" x2="160" y2="180" stroke="#475569" strokeWidth="1" strokeDasharray="3" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. API & MODEL DOCS */}
      {activeTab === "api" && (
        <div className="space-y-6 animate-fade-in text-xs font-semibold text-slate-700 leading-relaxed">
          {/* APIs */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b pb-2">
              REST API Documentation
            </h3>
            
            <div className="space-y-4 font-mono">
              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] bg-blue-800 text-white px-2 py-0.5 rounded font-black">POST /api/login</span>
                <p className="text-slate-600 font-sans mt-1">Authenticates authorized administrative session.</p>
                <p className="text-slate-500 text-[10px]">Payload: <code className="bg-slate-200 px-1 rounded text-slate-900">{"{ username, password }"}</code></p>
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-black">POST /api/predict</span>
                <p className="text-slate-600 font-sans mt-1">Executes AI model benchmark and computes ADR clinical toxicity prediction.</p>
                <p className="text-slate-500 text-[10px]">Payload: <code className="bg-slate-200 px-1 rounded text-slate-900">{"{ patientId, age, gender, weight, disease, drugName, dose, route, duration, symptoms, medicalHistory, allergies, pregnancyStatus, smoking, alcohol, labResults }"}</code></p>
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] bg-slate-700 text-white px-2 py-0.5 rounded font-black">GET /api/dashboard</span>
                <p className="text-slate-600 font-sans mt-1">Queries global ledger statistics (total reports, risk tiers, drug and symptoms volume).</p>
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] bg-slate-700 text-white px-2 py-0.5 rounded font-black">GET /api/patients</span>
                <p className="text-slate-600 font-sans mt-1">Queries the patient database. Filters: <code className="bg-slate-200 px-1 rounded text-slate-900">query</code>, <code className="bg-slate-200 px-1 rounded text-slate-900">drug</code>, <code className="bg-slate-200 px-1 rounded text-slate-900">severity</code>.</p>
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] bg-slate-700 text-white px-2 py-0.5 rounded font-black">GET /api/analytics</span>
                <p className="text-slate-600 font-sans mt-1">Compiles demographics profiles, risk scores, disease arrays, and monthly trend lists.</p>
              </div>
            </div>
          </div>

          {/* Model Pipeline */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 font-sans">
            <h3 className="font-extrabold text-sm text-slate-900 border-b pb-2">
              Machine Learning Pipeline &amp; SHAP Theory
            </h3>
            <p className="text-xs text-slate-600">
              The application implements a predictive safety protocol modeled after state-of-the-art pharmacovigilance research:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                <h4 className="font-extrabold text-blue-950 text-xs">1. Data Ingestion</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Continuous intake of clinical features. Encodes strings (e.g. active substances, routes) into normalized vectors.
                </p>
              </div>
              <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl space-y-1">
                <h4 className="font-extrabold text-indigo-950 text-xs">2. F1-Score Benchmark</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Evaluates Random Forest, XGBoost, Decision Tree, and Logistic Regression algorithms. Automatically promotes the classifier displaying the highest F1-Score.
                </p>
              </div>
              <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
                <h4 className="font-extrabold text-emerald-950 text-xs">3. SHAP Explainability</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Calculates Shapley additive contribution matrices. Quantifies which comorbidity, dosage, or allergy factor had the highest mathematical weight in triggering the ADR warning.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. DEPLOYMENT & INSTALLATION */}
      {activeTab === "install" && (
        <div className="space-y-6 animate-fade-in text-xs font-semibold text-slate-700 leading-relaxed font-sans">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b pb-2">
              Deployment &amp; Installation Manual
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Local Development Setup</h4>
                <p className="text-slate-600 mb-1.5 font-medium">Requires Node.js 18+ or 20+ installed on your Linux, Mac, or Windows PC.</p>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[10.5px] leading-relaxed">
                  # 1. Extract files and enter root directory<br />
                  # 2. Install dependencies<br />
                  npm install<br /><br />
                  # 3. Spin up local development server (binds custom Vite+Express)<br />
                  npm run dev
                </pre>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Production Build Instructions</h4>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[10.5px] leading-relaxed">
                  # Compile client-side static assets and bundle Express backend into a CJS file<br />
                  npm run build<br /><br />
                  # Boot compiled CJS production server on port 3000<br />
                  npm start
                </pre>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Deployment Target Platforms</h4>
                <ul className="space-y-2 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-800 shrink-0 mt-1.5"></span>
                    <span><strong>Render / Railway:</strong> Point your deployment settings to the Git repository. Set Build command to <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">npm run build</code> and Start command to <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">npm start</code>. Inject your environment variable secrets (such as GEMINI_API_KEY) in the dashboard secrets panel.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-800 shrink-0 mt-1.5"></span>
                    <span><strong>Docker / Containers:</strong> Create a standard Dockerfile leveraging Node.js. Bind port 3000 inside your nginx configuration.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
