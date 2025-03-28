import React from "react";
import { IconButton } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const FileDownloadButton = ({ fileId }: { fileId: string }) => {
  const downloadFile = async () => {
    // const url = `https://lmadev.cerebra-consulting.com/entellitrak/api/endpoints/case/getFileById?id=${fileId}`;
    const url = `http://localhost:3030/api/download-file/${fileId}`;
    

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'downloaded-file';

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) filename = match[1];
      }

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleDownload = () => {
    // Attempt to set the JSESSIONID cookie (will only work if HttpOnly is NOT set)
    document.cookie = "JSESSIONID=C01A30373B8B7C6A5E1B5ED2959035A9; path=/; domain=cerebra-consulting.com";

    // Create and click a download link
    const link = document.createElement("a");
    link.href = `http://localhost:3030/api/download-file/${fileId}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <IconButton color="primary" onClick={handleDownload}>
      <DescriptionIcon />
    </IconButton>
  );
};

export default FileDownloadButton;