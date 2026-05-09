import DiseaseReport from '../models/DiseaseReport.js';
import { geminiDiseaseService } from '../services/geminiDiseaseService.js';

export const detectDiseaseController = async (req, res, next) => {
  try {
    const { symptoms, lat, lng } = req.body;
    const { file } = req;

    const method = file ? 'image' : 'symptom';

    const geminiResult = await geminiDiseaseService({
      method,
      imageBuffer: file?.buffer,
      symptoms,
    });

    const report = await DiseaseReport.create({
      farmerUid: req.user.uid,
      method,
      inputSummary: method === 'image' ? 'Leaf image upload' : symptoms,
      detectedDisease: geminiResult.detected_disease,
      confidenceScore: geminiResult.confidence_score,
      severityLevel: geminiResult.severity_level,
      diseaseDescription: geminiResult.disease_description,
      recommendedTreatments: geminiResult.recommended_treatments,
      recommendedProducts: geminiResult.recommended_products,
      requiredQuantityPerAcre: geminiResult.required_quantity_per_acre,
      estimatedCost: geminiResult.estimated_cost,
      preventionSteps: geminiResult.prevention_steps,
      applicationGuidelines: geminiResult.application_guidelines,
      location: lat && lng ? { lat, lng } : undefined,
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (err) {
    next(err);
  }
};

