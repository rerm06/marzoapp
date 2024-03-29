import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await axios.post('/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Document uploaded successfully', response.data);
      alert('Document uploaded successfully');
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default DocumentUpload;