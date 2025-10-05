"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiPropertyRepository } from "../infrastructure/repositories/apiPropertyRepository";
import { Property } from "../domain/entities/property";
import { PropertyFilters as PropertyFiltersType } from "../domain/repositories/property.repository";
import { Card as PropertyCard } from "./components/Card";
import { Box, Typography } from "@mui/material";
import { ModalRealState } from "./components/ModalRealState";
import { PropertyFilters } from "./components/PropertyFilters";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000000000);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { control, watch, setValue } = useForm<PropertyFiltersType>({
    defaultValues: {
      name: searchParams.get('name') || '',
      address: searchParams.get('address') || '',
      minPrice: Number(searchParams.get('minPrice')) || 0,
      maxPrice: Number(searchParams.get('maxPrice')) || 1000000000,
    }
  });

  const watchedValues = watch();

  // Cargar propiedades iniciales
  useEffect(() => {
    const initialFilters: PropertyFiltersType = {
      name: searchParams.get('name') || undefined,
      address: searchParams.get('address') || undefined,
      minPrice: Number(searchParams.get('minPrice')) || undefined,
      maxPrice: Number(searchParams.get('maxPrice')) || undefined,
    };
    getProperties(initialFilters);
  }, []); const getProperties = async (filters?: PropertyFiltersType) => {
    setLoading(true);
    try {
      const apiPropertyRepository = new ApiPropertyRepository();
      const properties = await apiPropertyRepository.getProperties(filters);
      setProperties(properties);

      // Establecer el precio máximo basado en todas las propiedades (sin filtros) solo la primera vez
      if (!maxPrice || maxPrice === 1000000000) {
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
  const updateUrlParams = (filters: PropertyFiltersType) => {
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filters: PropertyFiltersType = {
        name: watchedValues.name?.trim() || undefined,
        address: watchedValues.address?.trim() || undefined,
        minPrice: watchedValues.minPrice && watchedValues.minPrice > 0 ? watchedValues.minPrice : undefined,
        maxPrice: watchedValues.maxPrice && watchedValues.maxPrice < maxPrice ? watchedValues.maxPrice : undefined,
      };

      updateUrlParams(filters);
      getProperties(filters);
    }, 800);

    return () => clearTimeout(timeoutId);
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
      <PropertyFilters
        control={control}
        watchedValues={watchedValues}
        maxPrice={maxPrice}
        loading={loading}
        propertiesCount={properties.length}
      />

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
