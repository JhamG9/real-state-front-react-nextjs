'use client';
import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import {
    Close as CloseIcon,
} from "@mui/icons-material";
import { ApiPropertyRepository } from "../../infrastructure/repositories/apiPropertyRepository";
import { Property } from "../../domain/entities/property";
import { SliderRealState } from "./SliderRealState";
import { HistoryTransactionsRealState } from "./HistoryTransactionsRealState";
import { OwnerProperty } from "./OwnerProperty";
import { PropertyInformation } from "./PropertyInformation";

interface ModalRealStateProps {
    open: boolean;
    onClose: () => void;
    propertyId: string | null;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: 800 },
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 34,
    overflow: 'auto',
    p: 3,
};

export const ModalRealState = ({ open, onClose, propertyId }: ModalRealStateProps) => {
    const [property, setProperty] = useState<Property | null>();
    const [propertyImages, setPropertyImages] = useState<string[]>([]);

    useEffect(() => {
        if (propertyId) {
            getDetailProperty(propertyId);
        }
    }, [propertyId]);

    const getDetailProperty = async (id: string) => {
        const apiPropertyRepository = new ApiPropertyRepository();
        const property = await apiPropertyRepository.getPropertyById(id);
        setProperty(property);
        setPropertyImages(property?.images || []);
    }

    if (!property) {
        return (
            <Modal open={open} onClose={onClose} sx={{ border: 0, borderRadius: '5px' }}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" textAlign="center">
                        No hay detalles de la propiedad disponibles.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button onClick={onClose} variant="contained">
                            Cerrar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        );
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        Detalles de la Propiedad
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: 'grey.500' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Slider images */}
                <SliderRealState propertyImages={propertyImages} />


                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
                    {/* Property Data */}
                    {property && <PropertyInformation property={property} />}

                    {/* Owner Data */}
                    {property.owner && <OwnerProperty owner={property.owner} />}
                </Box>

                {/* History transactions */}
                <HistoryTransactionsRealState transactions={property?.propertyTraces ?? []} />

                {/* Buttons actions */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                    <Button onClick={onClose} variant="outlined">
                        Cerrar
                    </Button>
                    <Button variant="contained" color="primary">
                        Contactar para más información
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
