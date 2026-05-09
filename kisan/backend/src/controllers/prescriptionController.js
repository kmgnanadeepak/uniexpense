import TreatmentPrescription from '../models/TreatmentPrescription.js';
import DiseaseReport from '../models/DiseaseReport.js';
import { prescriptionService } from '../services/prescriptionService.js';

export const generatePrescriptionController = async (req, res, next) => {
  try {
    const { diseaseReportId } = req.body;

    const report = await DiseaseReport.findById(diseaseReportId);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Disease report not found' });
    }

    const { prescriptionText, pdfUrl, estimatedCost, recoveryTimeline } = await prescriptionService(
      report.toObject(),
    );

    const prescription = await TreatmentPrescription.create({
      farmerUid: req.user.uid,
      diseaseReport: report._id,
      prescriptionText,
      pdfUrl,
      estimatedCost,
      recoveryTimeline,
    });

    return res.status(201).json({ success: true, data: prescription });
  } catch (err) {
    return next(err);
  }
};

