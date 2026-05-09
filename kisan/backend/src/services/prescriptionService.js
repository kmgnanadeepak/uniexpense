import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  process.env.GEMINI_API_URL ||
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const PRESCRIPTION_DIR = process.env.PRESCRIPTION_DIR || path.join(process.cwd(), 'prescriptions');

if (!fs.existsSync(PRESCRIPTION_DIR)) {
  fs.mkdirSync(PRESCRIPTION_DIR, { recursive: true });
}

export const prescriptionService = async (diseaseReport) => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt = `
You are an agronomist. Generate a structured agricultural treatment prescription as rich, human-readable text.
Base it on this disease intelligence JSON:
${JSON.stringify(diseaseReport, null, 2)}

The prescription must cover:
- Step-by-step treatment instructions
- Chemical/organic dosage calculations
- Safety instructions
- Weather-based application recommendation
- Estimated recovery timeline
- Estimated treatment cost (reuse existing cost if provided)

Respond with clear headings and bullet points in plain text (no JSON).
`;

  const { data } = await axios.post(
    `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    },
    { headers: { 'Content-Type': 'application/json' } },
  );

  const prescriptionText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No prescription generated.';

  const pdfFilename = `prescription-${diseaseReport._id || Date.now()}.pdf`;
  const pdfPath = path.join(PRESCRIPTION_DIR, pdfFilename);

  const doc = new PDFDocument({ margin: 40 });
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  doc.fontSize(20).text('KisanSetu Agricultural Treatment Prescription', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Detected disease: ${diseaseReport.detectedDisease || 'N/A'}`);
  doc.moveDown();
  doc.fontSize(11).text(prescriptionText, { align: 'left' });

  doc.end();

  await new Promise((resolve) => {
    stream.on('finish', resolve);
  });

  const estimatedCost = diseaseReport.estimatedCost || diseaseReport.estimated_cost || null;
  const recoveryTimeline = 'Typically 7-21 days depending on crop and adherence.';

  const pdfUrlBase = process.env.PRESCRIPTION_PUBLIC_BASE_URL || '';

  return {
    prescriptionText,
    pdfUrl: pdfUrlBase ? `${pdfUrlBase}/${pdfFilename}` : pdfPath,
    estimatedCost,
    recoveryTimeline,
  };
};

