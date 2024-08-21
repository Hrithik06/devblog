import React, { useRef, useState } from 'react';
import { Button } from '../index';
const CoverImageUpload = ({ onFileSelect, imageId }) => {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onFileSelect(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the default file input
            />
            <Button
                className="bg-white shadow-lg border-2 border-gray-300"
                type="button"
                onClick={handleClick}
            >
                Select Cover Image
            </Button>
            {preview && !imageId && (
                <img
                    src={preview}
                    alt="Cover Preview"
                    style={{ width: '384px', height: 'auto' }}
                />
            )}
        </div>
    );
};

export default CoverImageUpload;
