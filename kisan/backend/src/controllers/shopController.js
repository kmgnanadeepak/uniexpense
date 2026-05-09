import { locationService } from '../services/locationService.js';
import DiseaseReport from '../models/DiseaseReport.js';

export const getNearbyShopsController = async (req, res, next) => {
  try {
    const { lat, lng, diseaseReportId } = req.query;

    let report;
    if (diseaseReportId) {
      report = await DiseaseReport.findById(diseaseReportId);
    }

    const result = await locationService({
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      recommendedProducts: report?.recommendedProducts || [],
    });

    return res.json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
};

