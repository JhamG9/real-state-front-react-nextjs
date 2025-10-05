import React from 'react'
import { Property } from '../../domain/entities/property';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
    Home as HomeIcon,
} from "@mui/icons-material";

interface PropertyInformacionProps {
    property: Property;
}

export const PropertyInformation = ({ property }: PropertyInformacionProps) => {

    const formatCurrency = (amount: number | undefined) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount || 0);
    };

    return (
        <Box sx={{ flex: 1 }}>
            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6" component="h3">
                            Información de la Propiedad
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Dirección: {property.address}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Box sx={{ minWidth: 150 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Código Interno
                                </Typography>
                                <Typography variant="body1">
                                    {property.codeInternal}
                                </Typography>
                            </Box>
                            <Box sx={{ minWidth: 150 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Año de construcción
                                </Typography>
                                <Typography variant="body1">
                                    {property.year || 'No especificado'}
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Precio
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                {formatCurrency(property.price)}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
