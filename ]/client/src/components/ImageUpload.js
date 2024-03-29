import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
    const [selectedFiles, setSelectedFiles] = useState([]); // Cambiado a un array para soportar múltiples archivos
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileSelect = (event) => {
        setSelectedFiles([...event.target.files]); // Almacenar todos los archivos seleccionados
    };

    const handleUpload = async () => {
        const formData = new FormData();
        // Añadir cada archivo seleccionado a formData
        selectedFiles.forEach((file, index) => {
            formData.append(`designImages[${index}]`, file);
        });

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/designs/upload-images`, // Asegúrate de que esta ruta coincida con tu backend
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Images uploaded successfully:', response.data);
            setUploadStatus('Images uploaded successfully.');
        } catch (error) {
            console.error('Error uploading images:', error.response?.data?.message || error.message, error.stack);
            setUploadStatus('Error uploading images. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Images</h2>
            <input type="file" onChange={handleFileSelect} accept="image/*" multiple /> {/* Habilitar selección múltiple */}
            <button onClick={handleUpload}>Upload</button>
            <p>{uploadStatus}</p>
        </div>
    );
}

export default ImageUpload;
