import axios from 'axios';

export const fetchDoorDesign = async (designId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/designs/${designId}`);
    console.log(`Successfully fetched door design with ID: ${designId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching door design:', error.message, error.stack);
    throw error;
  }
};