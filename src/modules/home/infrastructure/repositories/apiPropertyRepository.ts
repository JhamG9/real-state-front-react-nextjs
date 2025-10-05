import { PropertyRepository, PropertyFilters } from "../../domain/repositories/property.repository";
import { createHttpClient } from "../../../../shared/services/httpClient";
import { Property } from "../../domain/entities/property";

export class ApiPropertyRepository implements PropertyRepository {
  private httpClient = createHttpClient("http://localhost:5189");

  async getProperties(filters?: PropertyFilters): Promise<Property[]> {
    const queryParams = new URLSearchParams();
    
    if (filters?.name) {
      queryParams.append('name', filters.name);
    }
    if (filters?.address) {
      queryParams.append('address', filters.address);
    }
    if (filters?.minPrice !== undefined) {
      queryParams.append('minPrice', filters.minPrice.toString());
    }
    if (filters?.maxPrice !== undefined) {
      queryParams.append('maxPrice', filters.maxPrice.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/property?${queryString}` : "/api/property";
    
    return await this.httpClient.get<Property[]>(endpoint);
  }

  async getPropertyById(id: string): Promise<Property | null> {
    return await this.httpClient.get<Property | null>(`/api/property/${id}`);
  }
}
