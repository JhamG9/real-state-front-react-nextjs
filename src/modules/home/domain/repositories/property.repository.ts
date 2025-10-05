import { Property } from "../entities/property";

export interface PropertyRepository {
  getProperties(): Promise<Property[]>;
  getPropertyById(id: string): Promise<Property | null>;
}
