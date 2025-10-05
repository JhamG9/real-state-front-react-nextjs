import React from 'react'
import { Owner } from '../../domain/entities/property';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

interface OwnerPropertyProps {
    owner: Owner;
}

export const OwnerProperty = ({ owner }: OwnerPropertyProps) => {

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    return (
        <Box sx={{ flex: 1 }}>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                        Propietario
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {owner?.photo && (
                            <Box
                                component="img"
                                src={owner.photo}
                                alt={owner.name}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    mr: 1
                                }}
                            />
                        )}
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {owner?.name}
                            </Typography>
                            {owner?.address && (
                                <Typography variant="body2">
                                    Dirección: {owner?.address}
                                </Typography>
                            )}
                            {owner?.birthday && (
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Fecha Nacimiento: {formatDate(new Date(owner?.birthday))}
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        Contactar Propietario
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}
