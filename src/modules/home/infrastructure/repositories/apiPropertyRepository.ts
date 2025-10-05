import { PropertyRepository } from "../../domain/repositories/property.repository";
import { createHttpClient } from "../../../../shared/services/httpClient";
import { Property } from "../../domain/entities/property";

export class ApiPropertyRepository implements PropertyRepository {
  private httpClient = createHttpClient("http://localhost:5189");

  async getProperties(): Promise<Property[]> {
    return await this.httpClient.get<Property[]>("/api/property");
  }

  async getPropertyById(id: string): Promise<Property | null> {
    return await this.httpClient.get<Property | null>(`/api/property/${id}`);
  }
}
