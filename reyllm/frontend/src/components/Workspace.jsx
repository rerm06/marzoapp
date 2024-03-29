import React from "react";
import DocumentUpload from "./DocumentUpload";

function Workspace() {
  console.log("Rendering Workspace component");
  return (
    <div>
      <h2>This is the Workspace component.</h2>
      <DocumentUpload />
    </div>
  );
}

export default Workspace;