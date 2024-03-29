import React from 'react';

const QuotationDownloader = ({ quotationId }) => {
    const handleDownload = async () => {
        console.log(`Initiating download for quotation ID: ${quotationId}`);
        try {
            const response = await fetch(`/api/quotation/export/${quotationId}`);
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `quotation-${quotationId}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            console.log(`Successfully downloaded quotation ID: ${quotationId}`);
        } catch (error) {
            console.error(`Failed to download quotation ID: ${quotationId}. Error: ${error.message}`, error);
            alert(`Error downloading quotation: ${error.message}`);
        }
    };

    return <button onClick={handleDownload}>Download Quotation</button>;
};

export default QuotationDownloader;