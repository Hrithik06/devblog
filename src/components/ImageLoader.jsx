import React, { useEffect, useState } from 'react';
import appwriteFileService from '../appwrite/file';
import imageSkeleton from '../assets/image-skeleton.svg';
const ImageLoader = ({ quality, alt, className, id, width, height }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
        setHasError(false);
    };

    const handleImageError = () => {
        setIsLoaded(false);
        setHasError(true);
    };
    useEffect(() => {
        localStorage.setItem(
            'id',
            appwriteFileService.getFilePreview(id, {
                quality: quality,
                width: width,
                height: height,
            }),
        );
    }, [id]);
    return (
        <div className="w-full">
            {!isLoaded && !hasError && (
                <div
                    className={`${className} animate-pulse dark:bg-gray-500 bg-gray-300 py-4 2xl:w-[896px] 2xl:h-[502px] xl:w-[720px] xl:h-[400px] flex items-center justify-center`}
                >
                    <img
                        src={imageSkeleton}
                        alt=""
                        // className="max-w-full max-h-full "
                    />
                </div>
            )}
            {hasError && <p>Failed to load image.</p>}
            <img
                src={appwriteFileService.getFilePreview(id, {
                    quality: quality,
                    width: width,
                    height: height,
                })}
                alt={alt}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`${isLoaded ? 'block ' : 'hidden'} ${className} duration-500`}
            />
        </div>
    );
};

export default ImageLoader;
