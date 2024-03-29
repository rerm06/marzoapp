import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MeshNormalMaterial, BoxGeometry, Mesh } from 'three';
import { fetchDoorDesign } from '../services/doorDesignService';
import ArDoorViewer from './ArDoorViewer'; // Import the AR viewer component

const DoorDesignViewer = ({ designId }) => {
  const [doorDesign, setDoorDesign] = useState(null);
  const [viewMode, setViewMode] = useState('3D'); // '3D' or 'AR'

  useEffect(() => {
    const loadDesign = async () => {
      try {
        const design = await fetchDoorDesign(designId);
        setDoorDesign(design);
        console.log(`Design ${designId} loaded successfully.`);
      } catch (error) {
        console.error('Failed to load design:', error.message, error.stack);
      }
    };
    loadDesign();
  }, [designId]);

  // Placeholder for door design visualization logic
  const DoorDesignModel = () => {
    // Assuming doorDesign.designParams contains dimensions for the door
    const { width, height, depth } = doorDesign.designParams || { width: 2, height: 3, depth: 0.1 };
    return (
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshNormalMaterial />
      </mesh>
    );
  };

  return (
    <div>
      {viewMode === '3D' && doorDesign ? (
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Suspense fallback={<div>Loading...</div>}>
            <DoorDesignModel />
          </Suspense>
          <OrbitControls />
        </Canvas>
      ) : viewMode === 'AR' ? (
        <ArDoorViewer designId={designId} />
      ) : (
        <div>Loading design...</div>
      )}
      <button onClick={() => setViewMode(viewMode === '3D' ? 'AR' : '3D')}>
        Switch to {viewMode === '3D' ? 'AR View' : '3D View'}
      </button>
    </div>
  );
};

export default DoorDesignViewer;