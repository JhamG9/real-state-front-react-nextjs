import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import {
    ArrowBackIos as ArrowBackIcon,
    ArrowForwardIos as ArrowForwardIcon,
} from "@mui/icons-material";

interface SliderRealStateProps {
    propertyImages: string[];
}

export const SliderRealState = ({ propertyImages }: SliderRealStateProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? propertyImages.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === propertyImages.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <Box sx={{ position: 'relative', mb: 3 }}>
            <Box
                component="img"
                src={propertyImages[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1} de la propiedad`}
                sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 2
                }}
            />

            {propertyImages.length > 1 && (
                <>
                    <IconButton
                        onClick={handlePrevImage}
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleNextImage}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                        }}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </>
            )}

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    typography: 'caption'
                }}
            >
                {currentImageIndex + 1} / {propertyImages.length}
            </Box>
        </Box>
    )
}
