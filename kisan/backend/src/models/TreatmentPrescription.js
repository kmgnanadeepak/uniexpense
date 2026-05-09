import mongoose from '../config/db.js';

const TreatmentPrescriptionSchema = new mongoose.Schema(
  {
    farmerUid: { type: String, required: true },
    diseaseReport: { type: mongoose.Schema.Types.ObjectId, ref: 'DiseaseReport', required: true },
    prescriptionText: { type: String, required: true },
    pdfUrl: { type: String },
    estimatedCost: { type: Number },
    recoveryTimeline: { type: String },
  },
  { timestamps: true },
);

const TreatmentPrescription = mongoose.model('TreatmentPrescription', TreatmentPrescriptionSchema);

export default TreatmentPrescription;

