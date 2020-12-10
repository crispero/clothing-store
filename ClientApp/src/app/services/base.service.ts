import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Id } from "../models/id";
import { IWithId } from "../models/IWithId";

@Injectable({
  providedIn: "root"
})
export class BaseService<TDto extends IWithId> {
  private readonly apiUrl: string = "https://localhost:5001/";
  protected readonly serviceUrl: string = `${this.apiUrl}${this.resourceName}`;

  constructor(
    protected readonly http: HttpClient,
    @Inject(String) protected readonly resourceName: string,
  ) {
  }

  getAll(): Promise<TDto[]> {
    return this.http.get<TDto[]>(this.serviceUrl).toPromise();
  }

  getById(id: Id): Promise<TDto> {
    const url = this.getServiceUrlWithId(id);
    return this.http.get<TDto>(url).toPromise();
  }

  create(createDto: Partial<TDto>): Promise<TDto> {
    return this.http.post<TDto>(this.serviceUrl, createDto).toPromise();
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
    return `${this.serviceUrl}/${id}`;
  }
}
