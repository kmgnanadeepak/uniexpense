import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  process.env.GEMINI_API_URL ||
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export const geminiDiseaseService = async ({ method, imageBuffer, symptoms }) => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt = `
You are an agricultural disease expert. Given either a crop leaf image or textual symptoms, detect the most likely disease and respond in strict JSON only with the following keys:
- detected_disease (string)
- confidence_score (number 0-1)
- severity_level (mild|moderate|severe)
- disease_description (string)
- recommended_treatments (array of { name, type, dosage, notes })
- recommended_products (array of { name, category, formulation })
- required_quantity_per_acre (number, in kg or L)
- estimated_cost (number, in local currency, approximate)
- prevention_steps (string)
- application_guidelines (string)
`;

  const contents = [
    {
      role: 'user',
      parts: [
        { text: prompt },
        {
          text:
            method === 'symptom'
              ? `Farmer provided symptoms: ${symptoms}`
              : 'Farmer uploaded an image of a crop leaf. Analyze it.',
        },
      ],
    },
  ];

  if (method === 'image' && imageBuffer) {
    contents[0].parts.push({
      inline_data: {
        data: imageBuffer.toString('base64'),
        mime_type: 'image/jpeg',
      },
    });
  }

  const { data } = await axios.post(
    `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    { contents },
    { headers: { 'Content-Type': 'application/json' } },
  );

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    const jsonSlice = text.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonSlice);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to parse Gemini response', err);
    throw new Error('Gemini response parsing failed');
  }
};

