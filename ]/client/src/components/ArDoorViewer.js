import React from 'react';

const ArDoorViewer = ({ designId }) => {
    return (
        <a-scene embedded arjs='sourceType: webcam; debugUIEnabled: false;'>
            <a-marker preset="hiro">
                <a-entity
                    gltf-model={`https://example.com/models/${designId}.gltf`} // Actual base URL for GLTF models
                    scale="0.05 0.05 0.05"
                    position="0 0 0"
                    rotation="-90 0 0"
                    onError={(e) => {
                        console.error("Error loading GLTF model:", e.message, e.stack);
                    }}>
                </a-entity>
            </a-marker>
            <a-entity camera></a-entity>
        </a-scene>
    );
};

export default ArDoorViewer;