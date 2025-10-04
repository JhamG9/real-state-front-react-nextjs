import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { LocationOn, CalendarToday, MoreVert } from "@mui/icons-material";
import { Property } from "../../domain/entities/property";

interface CardProps {
  property: Property;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ property, onClick }) => {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <MuiCard
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.16)",
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{
            height: 200,
            objectFit: "cover",
          }}
          image={property.images[0]}
          alt={property.name}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: "#2c3e50",
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {property.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LocationOn sx={{ color: "#e74c3c", fontSize: 18, mr: 0.5 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {property.address}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#27ae60",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {formatPrice(property.price)}
          </Typography>

          <Chip
            icon={<CalendarToday sx={{ fontSize: 16 }} />}
            label={property.year}
            size="small"
            sx={{
              backgroundColor: "#f8f9fa",
              color: "#6c757d",
              "& .MuiChip-icon": {
                color: "#6c757d",
              },
            }}
          />
        </Box>

        <Chip
          label={`Código: ${property.codeInternal}`}
          size="small"
          variant="outlined"
          sx={{
            borderColor: "#e9ecef",
            color: "#6c757d",
            fontSize: "0.75rem",
          }}
        />
      </CardContent>
    </MuiCard>
  );
};
