import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityModel } from "../models/entity.model";
import { Id } from "../models/id";

@Injectable({
  providedIn: "root"
})
export class BaseService<TEntity extends EntityModel> {
  private readonly apiUrl: string = "https://localhost:5051/";
  protected readonly serviceUrl: string = `${this.apiUrl}${this.resourceName}`;

  constructor(
    protected readonly http: HttpClient,
    @Inject(String) protected readonly resourceName: string,
  ) {
  }

  getAll(): Promise<TEntity[]> {
    return this.http.get<TEntity[]>(this.serviceUrl).toPromise();
  }

  getById(id: Id): Promise<TEntity> {
    return this.http.get<TEntity>(`${this.serviceUrl}/${id}`).toPromise();
  }

  create(createDto: Partial<TEntity>): Promise<TEntity> {
    return this.http.post<TEntity>(this.serviceUrl, createDto).toPromise();
  }

  update(updateDto: Partial<TEntity>): Promise<TEntity> {
    return this.http.patch<TEntity>(this.serviceUrl, updateDto).toPromise();
  }

  delete(id: Id): Promise<boolean> {
    return this.http.delete<boolean>(`${this.serviceUrl}/${id}`).toPromise();
  }
}
