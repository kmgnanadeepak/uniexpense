import mongoose from '../config/db.js';

const DiseaseReportSchema = new mongoose.Schema(
  {
    farmerUid: { type: String, required: true },
    method: { type: String, enum: ['image', 'symptom'], required: true },
    inputSummary: { type: String },
    detectedDisease: { type: String },
    confidenceScore: { type: Number },
    severityLevel: { type: String },
    diseaseDescription: { type: String },
    recommendedTreatments: { type: Array },
    recommendedProducts: { type: Array },
    requiredQuantityPerAcre: { type: Number },
    estimatedCost: { type: Number },
    preventionSteps: { type: String },
    applicationGuidelines: { type: String },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true },
);

const DiseaseReport = mongoose.model('DiseaseReport', DiseaseReportSchema);

export default DiseaseReport;

