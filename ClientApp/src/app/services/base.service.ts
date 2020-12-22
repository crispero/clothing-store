import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Id } from "../models/id";
import { IWithId } from "../utils/IWithId";
import { SERVICE_URL } from "../app-injection-tokens";

@Injectable({
  providedIn: "root"
})
export class BaseService<TDto extends IWithId> {
  protected readonly apiUrl: string;

  constructor(
    protected readonly http: HttpClient,
    @Inject(SERVICE_URL) protected readonly serviceUrl: string,
    @Inject(String) protected readonly resourceName: string,
  ) {
    this.apiUrl = `${this.serviceUrl}${this.resourceName}`;
  }

  getAll(): Promise<TDto[]> {
    return this.http.get<TDto[]>(this.apiUrl).toPromise();
  }

  getById(id: Id): Promise<TDto> {
    const url = this.getServiceUrlWithId(id);
    return this.http.get<TDto>(url).toPromise();
  }

  create(createDto: Partial<TDto>): Promise<TDto> {
    return this.http.post<TDto>(this.apiUrl, createDto).toPromise();
  }

  update(id: Id, updateDto: Partial<TDto>): Promise<TDto> {
    const url = this.getServiceUrlWithId(id);
    return this.http.patch<TDto>(url, updateDto).toPromise();
  }

  delete(id: Id): Promise<boolean> {
    const url = this.getServiceUrlWithId(id);
    return this.http.delete<boolean>(url).toPromise();
  }

  protected getServiceUrlWithId(id: Id): string {
    return `${this.apiUrl}/${id}`;
  }
}
