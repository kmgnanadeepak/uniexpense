import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const MAPS_API_KEY = process.env.MAPS_API_KEY;
const MAPS_PLACES_BASE =
  process.env.MAPS_PLACES_BASE ||
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

export const locationService = async ({ lat, lng, recommendedProducts }) => {
  if (!MAPS_API_KEY) {
    throw new Error('MAPS_API_KEY is not configured');
  }

  if (!lat || !lng) {
    throw new Error('Latitude and longitude are required');
  }

  const types = [
    'agriculture',
    'store',
    'shopping_mall',
    'hardware_store',
  ];

  const radius = 15000;

  const url = `${MAPS_PLACES_BASE}?location=${lat},${lng}&radius=${radius}&key=${MAPS_API_KEY}&keyword=agro+fertilizer+seed+pesticide`;

  const { data } = await axios.get(url);

  const shops = (data.results || []).map((place) => ({
    name: place.name,
    address: place.vicinity,
    location: place.geometry?.location,
    rating: place.rating,
    userRatingsTotal: place.user_ratings_total,
    placeId: place.place_id,
    distanceMeters: place.distance_meters,
    phone: null,
    mapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
    matchedProducts: recommendedProducts || [],
  }));

  return { shops };
};

