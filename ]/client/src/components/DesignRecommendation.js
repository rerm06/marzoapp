import React, { useState } from 'react';
import axios from 'axios';

const DesignRecommendation = () => {
  const [userPreferences, setUserPreferences] = useState([]);
  const [recommendedDesigns, setRecommendedDesigns] = useState([]);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRecommendation = async () => {
    const formData = new FormData();
    formData.append('designImage', image);
    formData.append('userPreferences', new Blob([JSON.stringify(userPreferences)], { type: "application/json" }));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/designs/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRecommendedDesigns(response.data.recommendedDesigns);
      console.log('Recommendations and image analysis fetched successfully.');
    } catch (error) {
      console.error('Error getting recommendations and analyzing image:', error.response.data.message, error.stack);
      alert('Failed to get recommendations and analyze image. Please try again.');
    }
  };

  const handlePreferenceChange = (e) => {
    setUserPreferences([...userPreferences, e.target.value]);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <input type="text" onChange={handlePreferenceChange} placeholder="Enter your preference" />
      <button onClick={handleRecommendation}>Get Recommendations</button>
      <div>
        {recommendedDesigns.length > 0 ? (
          recommendedDesigns.map((design, index) => (
            <div key={index}>
              {/* Render recommended designs */}
              Design: {design.label}
            </div>
          ))
        ) : (
          <p>No recommendations available. Set preferences, upload an image, and click 'Get Recommendations'.</p>
        )}
      </div>
    </div>
  );
};

export default DesignRecommendation;