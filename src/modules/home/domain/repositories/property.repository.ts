import { Property } from "../entities/property";

export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface PropertyRepository {
  getProperties(filters?: PropertyFilters): Promise<Property[]>;
  getPropertyById(id: string): Promise<Property | null>;
}
