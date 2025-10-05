"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiPropertyRepository } from "../infrastructure/repositories/apiPropertyRepository";
import { Property } from "../domain/entities/property";
import { PropertyFilters } from "../domain/repositories/property.repository";
import { Card as PropertyCard } from "./components/Card";
import { Box, Typography, TextField, Card, CardContent, Slider } from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import { ModalRealState } from "./components/ModalRealState";
import { formatPrice } from "../../../shared/utils";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000000000);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { control, watch, setValue } = useForm<PropertyFilters>({
    defaultValues: {
      name: searchParams.get('name') || '',
      address: searchParams.get('address') || '',
      minPrice: Number(searchParams.get('minPrice')) || 0,
      maxPrice: Number(searchParams.get('maxPrice')) || 1000000000,
    }
  });
  
  const watchedValues = watch();
  useEffect(() => {
    const initialFilters: PropertyFilters = {
      name: searchParams.get('name') || undefined,
      address: searchParams.get('address') || undefined,
      minPrice: Number(searchParams.get('minPrice')) || undefined,
      maxPrice: Number(searchParams.get('maxPrice')) || undefined,
    };
    getProperties(initialFilters);
  }, []);

  const getProperties = async (filters?: PropertyFilters) => {
    setLoading(true);
    try {
      const apiPropertyRepository = new ApiPropertyRepository();
      const properties = await apiPropertyRepository.getProperties(filters);
      setProperties(properties);
      
      // Establecer el precio máximo basado en todas las propiedades (sin filtros) solo la primera vez
      if (!maxPrice || maxPrice === 10000000000000) {
        const allProperties = await apiPropertyRepository.getProperties();
        if (allProperties.length > 0) {
          const maxPriceFound = Math.max(...allProperties.map(p => p.price || 0));
          setMaxPrice(maxPriceFound);
          if (!searchParams.get('maxPrice')) {
            setValue('maxPrice', maxPriceFound);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (property: Property) => {
    setSelectedPropertyId(property.idProperty);
    setIsModalOpen(true);
  };

  // Actualizar URL con query parameters
  const updateUrlParams = (filters: PropertyFilters) => {
    const params = new URLSearchParams();
    
    if (filters.name?.trim()) {
      params.set('name', filters.name);
    }
    if (filters.address?.trim()) {
      params.set('address', filters.address);
    }
    if (filters.minPrice && filters.minPrice > 0) {
      params.set('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice && filters.maxPrice < maxPrice) {
      params.set('maxPrice', filters.maxPrice.toString());
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '/';
    router.push(newUrl, { scroll: false });
  };

  // Efecto para cargar propiedades cuando cambian los filtros
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filters: PropertyFilters = {
        name: watchedValues.name?.trim() || undefined,
        address: watchedValues.address?.trim() || undefined,
        minPrice: watchedValues.minPrice && watchedValues.minPrice > 0 ? watchedValues.minPrice : undefined,
        maxPrice: watchedValues.maxPrice && watchedValues.maxPrice < maxPrice ? watchedValues.maxPrice : undefined,
      };
      
      updateUrlParams(filters);
      getProperties(filters);
    }, 800); // Debounce de 500ms
    
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValues.name, watchedValues.address, watchedValues.minPrice, watchedValues.maxPrice]);

  return (
    <Box sx={{ padding: 4, maxWidth: 1200, margin: '0 auto', lineHeight: '20px' }}>
      <Box sx={{ textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Vive el Lujo: Propiedades Exclusivas a tu Alcance
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Descubre una cuidada selección de bienes raíces de alta gama, diseñados para quienes buscan elegancia, confort y exclusividad en cada detalle.
        </Typography>
      </Box>

      {/* Filtros */}
      <Card sx={{ mt: 4, mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterList sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Filtros de Búsqueda
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Filtros de texto */}
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
            
            {/* Filtro por rango de precios */}
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
          
          {/* Mostrar cantidad de resultados */}
          <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              {loading ? 'Cargando...' : `Mostrando ${properties.length} propiedades`}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          marginTop: 4,
          justifyContent: {
            xs: "center",
            md: "center",
            lg: "flex-start",
          },
          "@media (min-width:1164px)": {
            justifyContent: "flex-start",
          },
        }}
      >
        {properties.map((property: Property) => (
          <PropertyCard key={property.idProperty} property={property} onClick={() => handleCardClick(property)} />
        ))}
      </Box>

      {isModalOpen && selectedPropertyId && (
        <ModalRealState open={isModalOpen} onClose={() => setIsModalOpen(false)} propertyId={selectedPropertyId} />
      )}
    </Box>
  );
}
