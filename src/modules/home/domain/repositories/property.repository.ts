import { Property } from "../entities/Property";

export interface PropertyRepository {
  getProperties(): Promise<Property[]>;
}
