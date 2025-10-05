import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Box, Typography, TextField, Card, CardContent, Slider } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { PropertyFilters as PropertyFiltersType } from '../../domain/repositories/property.repository';
import { formatPrice } from '../../../../shared/utils';

interface PropertyFiltersProps {
    control: Control<PropertyFiltersType>;
    watchedValues: PropertyFiltersType;
    maxPrice: number;
    loading: boolean;
    propertiesCount: number;
}

export const PropertyFilters = ({
    control,
    watchedValues,
    maxPrice,
    loading,
    propertiesCount
}: PropertyFiltersProps) => {
    return (
        <Card sx={{ mt: 4, mb: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FilterList sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="h2">
                        Filtros de Búsqueda
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Buscar por nombre"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
                                    }}
                                    placeholder="Ej: Casa moderna"
                                />
                            )}
                        />

                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Buscar por dirección"
                                    variant="outlined"
                                    placeholder="Ej: Bogotá, Chapinero"
                                />
                            )}
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Rango de Precios
                        </Typography>
                        <Box sx={{ px: 2 }}>
                            <Controller
                                name="minPrice"
                                control={control}
                                render={({ field: minPriceField }) => (
                                    <Controller
                                        name="maxPrice"
                                        control={control}
                                        render={({ field: maxPriceField }) => (
                                            <Slider
                                                value={[minPriceField.value || 0, maxPriceField.value || maxPrice]}
                                                onChange={(_, newValue) => {
                                                    const [min, max] = newValue as number[];
                                                    minPriceField.onChange(min);
                                                    maxPriceField.onChange(max);
                                                }}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={maxPrice}
                                                step={1000000}
                                                valueLabelFormat={(value) => formatPrice(value)}
                                                sx={{ mt: 2 }}
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {formatPrice(watchedValues.minPrice || 0)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatPrice(watchedValues.maxPrice || maxPrice)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary">
                        {loading ? 'Cargando...' : `Mostrando ${propertiesCount} propiedades`}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PropertyFilters;