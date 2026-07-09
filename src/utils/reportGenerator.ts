import { jsPDF } from "jspdf";
import { ADRReport } from "../types.js";

export function generatePDFReport(report: ADRReport): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const { id, patient, prediction, createdAt } = report;
  const dateStr = new Date(createdAt).toLocaleString();

  // Color Palette (Clinical theme: Slate Blue)
  const primaryColor = [28, 55, 103]; // #1c3767
  const secondaryColor = [71, 85, 105]; // #475569
  const textDark = [30, 41, 59]; // #1e293b
  const bgLight = [248, 250, 252]; // #f8fafc
  const lineLight = [226, 232, 240]; // #e2e8f0

  // Risk Color Scheme
  let riskColor = [34, 197, 94]; // Green (Low)
  if (prediction.severity === "High") {
    riskColor = [220, 38, 38]; // Red (High)
  } else if (prediction.severity === "Medium") {
    riskColor = [217, 119, 6]; // Orange (Medium)
  }

  // --- Page 1: Header / Clinical Review Letterhead ---
  
  // Header Background Accent
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, "F");

  // Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("PHARMACOVIGILANCE SAFETY REPORT", 14, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("AI-POWERED CLINICAL ADVERSE DRUG REACTION (ADR) ANALYSIS", 14, 27);
  doc.text(`CONFIDENTIAL  |  REPORT ID: ${id}`, 14, 34);

  // Institution / Verification Notice
  doc.setFontSize(8);
  doc.text("EDUCATIONAL & RESEARCH USE ONLY", 150, 20, { align: "right" });
  doc.text("NOT FOR CLINICAL DIAGNOSIS", 150, 25, { align: "right" });

  // Reset text color
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  // Document Info
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Generated On:", 14, 50);
  doc.setFont("helvetica", "normal");
  doc.text(dateStr, 42, 50);

  doc.setFont("helvetica", "bold");
  doc.text("System Operator:", 14, 55);
  doc.setFont("helvetica", "normal");
  doc.text("Senior Drug Safety Officer (AI-PV Engine v1.2)", 48, 55);

  doc.setFont("helvetica", "bold");
  doc.text("Methodology:", 14, 60);
  doc.setFont("helvetica", "normal");
  doc.text(`Explainable ML (${prediction.selectedModel}) + SHAP Diagnostics`, 42, 60);

  // Line Divider
  doc.setDrawColor(lineLight[0], lineLight[1], lineLight[2]);
  doc.setLineWidth(0.5);
  doc.line(14, 65, 196, 65);

  // --- Section 1: Patient Profile ---
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(14, 70, 182, 45, "F");
  doc.rect(14, 70, 182, 45, "D");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("I. PATIENT CLINICAL PROFILE", 18, 76);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Patient ID:", 18, 83);
  doc.text("Age / Gender:", 18, 89);
  doc.text("Weight:", 18, 95);
  doc.text("Pregnancy Status:", 18, 101);
  doc.text("Known Allergies:", 18, 107);

  doc.setFont("helvetica", "normal");
  doc.text(patient.patientId, 48, 83);
  doc.text(`${patient.age} Years  /  ${patient.gender}`, 48, 89);
  doc.text(`${patient.weight} kg`, 48, 95);
  doc.text(patient.pregnancyStatus, 48, 101);
  doc.text(patient.allergies || "No Known Drug Allergies (NKDA)", 48, 107);

  doc.setFont("helvetica", "bold");
  doc.text("Primary Disease:", 110, 83);
  doc.text("Medical History:", 110, 89);
  doc.text("Smoking / Alcohol:", 110, 101);

  doc.setFont("helvetica", "normal");
  doc.text(patient.disease, 138, 83);
  
  // Wrap medical history text
  const historyLines = doc.splitTextToSize(patient.medicalHistory || "None declared", 50);
  doc.text(historyLines, 138, 89);
  
  doc.text(`${patient.smoking}  /  ${patient.alcohol}`, 142, 101);

  // --- Section 2: Suspected Medication ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("II. SUSPECTED MEDICATION & EXPOSURE", 14, 123);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  // Table header for drug details
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(14, 126, 182, 7, "F");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("SUSPECTED DRUG", 18, 131);
  doc.text("DOSAGE", 70, 131);
  doc.text("ROUTE", 110, 131);
  doc.text("DURATION OF USE", 150, 131);

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(14, 133, 182, 12, "F");
  doc.rect(14, 133, 182, 12, "D");

  doc.setFont("helvetica", "bold");
  doc.text(patient.drugName, 18, 140);
  doc.setFont("helvetica", "normal");
  doc.text(patient.dose, 70, 140);
  doc.text(patient.route, 110, 140);
  doc.text(`${patient.duration} Days`, 150, 140);

  // --- Section 3: Adverse Symptoms & Lab Results ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("III. CLINICAL MANIFESTATIONS & INVESTIGATIONS", 14, 154);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Reported Symptoms:", 14, 160);
  doc.setFont("helvetica", "normal");
  const symptomsLines = doc.splitTextToSize(patient.symptoms, 182);
  doc.text(symptomsLines, 14, 165);

  const symptomOffset = symptomsLines.length * 4.5 + 166;

  doc.setFont("helvetica", "bold");
  doc.text("Laboratory & Diagnostic Findings:", 14, symptomOffset);
  doc.setFont("helvetica", "normal");
  const labLines = doc.splitTextToSize(patient.labResults || "No auxiliary laboratory results recorded.", 182);
  doc.text(labLines, 14, symptomOffset + 5);

  const labOffset = labLines.length * 4.5 + symptomOffset + 6;

  // Draw horizontal line
  doc.line(14, labOffset, 196, labOffset);

  // --- Section 4: AI Prediction Verdict ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("IV. AI PREDICTIVE SAFETY ASSESSMENT", 14, labOffset + 8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  // Main predictive badge card
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(14, labOffset + 11, 182, 38, "F");
  doc.rect(14, labOffset + 11, 182, 38, "D");

  // Severity color block
  doc.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.rect(14, labOffset + 11, 6, 38, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("ADR DETECTION VERDICT:", 25, labOffset + 17);
  
  doc.setFontSize(13);
  doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.text(prediction.adrDetected ? "ADR DETECTED / CONFIRMED" : "ADR UNLIKELY / RULLED OUT", 25, labOffset + 23);
  
  doc.setFontSize(9.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont("helvetica", "bold");
  doc.text("Risk Probability:", 25, labOffset + 30);
  doc.setFont("helvetica", "normal");
  doc.text(`${prediction.probability}%`, 58, labOffset + 30);

  doc.setFont("helvetica", "bold");
  doc.text("Clinical Severity:", 25, labOffset + 35);
  doc.setFont("helvetica", "normal");
  doc.text(`${prediction.severity} Risk`, 58, labOffset + 35);

  doc.setFont("helvetica", "bold");
  doc.text("AI Model Confidence:", 25, labOffset + 40);
  doc.setFont("helvetica", "normal");
  doc.text(`${prediction.confidence}%`, 62, labOffset + 40);

  // Right hand side of prediction block
  doc.setFont("helvetica", "bold");
  doc.text("Classified Hazard:", 110, labOffset + 17);
  doc.setFont("helvetica", "normal");
  doc.text(prediction.riskCategory, 142, labOffset + 17);

  doc.setFont("helvetica", "bold");
  doc.text("Adverse Diagnosis:", 110, labOffset + 23);
  doc.setFont("helvetica", "normal");
  const reactionLines = doc.splitTextToSize(prediction.possibleReaction, 50);
  doc.text(reactionLines, 142, labOffset + 23);

  // Footer note on educational constraint
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  doc.text("This report was compiled using an automated machine learning classification protocol. The conclusions are for", 14, 280);
  doc.text("academic study and pharmacovigilance logging only, and do not constitute an authorized clinical intervention.", 14, 283);
  doc.text("Page 1 of 2", 196, 280, { align: "right" });

  // --- Page 2: Explainable AI (SHAP) & Recommendations ---
  doc.addPage();

  // Header banner page 2
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`PHARMACOVIGILANCE EXPLAINABILITY REPORT - ID: ${id}`, 14, 10);
  doc.text("PAGE 2", 196, 10, { align: "right" });

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  // --- Section 5: Explainable AI / SHAP ---
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("V. EXPLAINABLE AI (XAI) DIAGNOSTIC PATTERN", 14, 27);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const shapIntro = "SHAP (SHapley Additive exPlanations) values represent the mathematical weight of each clinical feature. Features with positive impacts directly pushed the AI prediction toward the 'ADR Detected' classification, with the magnitude representing relative feature importance.";
  doc.text(doc.splitTextToSize(shapIntro, 182), 14, 32);

  // Draw a bar chart for SHAP values
  let chartY = 46;
  doc.setFont("helvetica", "bold");
  doc.text("Top Patient Risk Contributors (SHAP Value Contribution):", 14, chartY);
  chartY += 6;

  prediction.shapValues.forEach((shap) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    // Print feature label
    doc.text(shap.feature, 14, chartY + 4);

    // Draw background bar
    doc.setFillColor(241, 245, 249);
    doc.rect(75, chartY, 110, 5, "F");

    // Draw active SHAP bar
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    const barWidth = Math.round(shap.impact * 110);
    doc.rect(75, chartY, barWidth, 5, "F");

    // Print impact text
    doc.text(`+${(shap.impact * 100).toFixed(0)}%`, 188, chartY + 4);

    chartY += 9;
  });

  // --- Section 6: AI Model Performance ---
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("VI. CLASSIFIER MODEL BENCHMARKING (F1-SCORE SELECTION)", 14, chartY + 5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text("The safety system benchmarked four machine learning models. The optimal algorithm was chosen based on the F1-Score:", 14, chartY + 11);

  // Draw benchmark table headers
  let tableY = chartY + 15;
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(14, tableY, 182, 6, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("ALGORITHM", 18, tableY + 4.5);
  doc.text("ACCURACY", 68, tableY + 4.5);
  doc.text("PRECISION", 100, tableY + 4.5);
  doc.text("RECALL", 132, tableY + 4.5);
  doc.text("F1-SCORE", 164, tableY + 4.5);

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  prediction.modelComparison.forEach((m) => {
    tableY += 6;
    const isSelected = m.modelName === "Random Forest"; // Random Forest default selected
    
    if (isSelected) {
      doc.setFillColor(239, 246, 255); // Highlight selected
      doc.rect(14, tableY, 182, 6, "F");
      doc.setFont("helvetica", "bold");
    } else {
      doc.setFont("helvetica", "normal");
    }
    
    doc.rect(14, tableY, 182, 6, "D");
    doc.text(m.modelName + (isSelected ? " (Selected)" : ""), 18, tableY + 4.5);
    doc.text(`${(m.accuracy * 100).toFixed(1)}%`, 68, tableY + 4.5);
    doc.text(`${(m.precision * 100).toFixed(1)}%`, 100, tableY + 4.5);
    doc.text(`${(m.recall * 100).toFixed(1)}%`, 132, tableY + 4.5);
    doc.text(`${(m.f1Score * 100).toFixed(1)}%`, 164, tableY + 4.5);
  });

  // --- Section 7: Safety Recommendations & Clinical Plan ---
  let recY = tableY + 15;
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("VII. CLINICAL PHARMACOVIGILANCE DIRECTIVES", 14, recY);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(14, recY + 3, 182, 38, "F");
  doc.rect(14, recY + 3, 182, 38, "D");

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("AUTOMATED SAFETY ADVICE:", 20, recY + 9);
  
  doc.setFont("helvetica", "normal");
  const adviceLines = doc.splitTextToSize(prediction.monitoringAdvice, 172);
  doc.text(adviceLines, 20, recY + 15);

  // Signatures
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Sign-off Security Audit:", 14, recY + 54);
  
  doc.setLineWidth(0.3);
  doc.line(14, recY + 68, 70, recY + 68);
  doc.line(126, recY + 68, 182, recY + 68);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.text("DRUG SAFETY ADVISOR (ELECTRONIC SIGN)", 14, recY + 72);
  doc.text("DATE CERTIFIED", 126, recY + 72);
  doc.text(dateStr, 126, recY + 66);

  // Footer educational notice
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  doc.text("This report is generated for academic and simulation purposes only. Model coefficients and metrics represent", 14, 280);
  doc.text("educational benchmark weights and are not peer-reviewed clinical data. Consult local toxicological resources.", 14, 283);
  doc.text("Page 2 of 2", 196, 280, { align: "right" });

  // Save the PDF
  doc.save(`ADR-Safety-Report-${id}.pdf`);
}
