import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFilesUpload, uploadedFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files, e.g., upload to a server
    const updatedFiles = [...uploadedFiles, ...acceptedFiles];
    onFilesUpload(updatedFiles);
  }, [onFilesUpload, uploadedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      <p className='text-white'>{isDragActive ? 'Drop the files here ...' : 'Drag and drop some files here, or click to select files'}</p>
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #eee',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default FileUpload;
