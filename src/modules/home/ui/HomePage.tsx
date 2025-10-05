"use client";
import { useEffect, useState } from "react";
import { ApiPropertyRepository } from "../infrastructure/repositories/apiPropertyRepository";
import { Property } from "../domain/entities/property";
import { Card } from "./components/Card";
import { Box, Typography } from "@mui/material";
import { ModalRealState } from "./components/ModalRealState";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    const apiPropertyRepository = new ApiPropertyRepository();
    const properties = await apiPropertyRepository.getProperties();
    setProperties(properties);
  };

  const handleCardClick = (property: Property) => {
    setSelectedPropertyId(property.idProperty);
    setIsModalOpen(true);
  }

  return (
    <Box sx={{ padding: 4, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Vive el Lujo: Propiedades Exclusivas a tu Alcance
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Descubre una cuidada selección de bienes raíces de alta gama, diseñados para quienes buscan elegancia, confort y exclusividad en cada detalle.
        </Typography>
      </Box>

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
          <Card key={property.idProperty} property={property} onClick={() => handleCardClick(property)} />
        ))}
      </Box>

      {isModalOpen && selectedPropertyId && (

        <ModalRealState open={isModalOpen} onClose={() => setIsModalOpen(false)} propertyId={selectedPropertyId} />

      )}
    </Box>
  );
}
