import { BaseService } from "../services/base.service";
import { Id } from "../models/id";
import { ClientException } from "../utils/client-exception";
import { MatSnackBar } from "@angular/material/snack-bar";

export abstract class BaseRepository<
  TEntity,
  TDto,
  TService extends BaseService<TDto>> {

  protected service: TService;

  protected constructor(service: TService, private snackBar: MatSnackBar) {
    this.service = service;
  }

  async getAll(): Promise<TEntity[]> {
    try {
      const items: TDto[] = await this.service.getAll();
      return this.toEntities(items);
    } catch (e) {
      this.openSnackBar(e?.error?.message);
      throw new ClientException("can't get all items");
    }
  }

  async getById(id: Id): Promise<TEntity> {
    try {
      const item: TDto = await this.service.getById(id);
      return this.toEntity(item);
    } catch (e) {
      this.openSnackBar(e?.error?.message);
      throw new ClientException("can't get item with id: " + id);
    }
  }

  async getByIds(ids: Id[]): Promise<TEntity[]> {
    try {
      const items: TDto[] = await this.service.getByIds(ids);
      return this.toEntities(items);
    } catch (e) {
      this.openSnackBar(e?.error?.message);
      throw new ClientException("can't get item with ids: " + ids);
    }
  }

  async create(data: Partial<TDto>): Promise<TEntity> {
    try {
      const item: TDto = await this.service.create(data);
      return this.toEntity(item);
    } catch (e) {
      this.openSnackBar(e?.error?.message);
      throw new ClientException("can't create item");
    }
  }

  async update(id: Id, data: Partial<TDto>): Promise<TEntity> {
    try {
      const item: TDto = await this.service.update(id, data);
      return this.toEntity(item);
    } catch (e) {
      this.openSnackBar(e?.error?.message);
      throw new ClientException("can't update item with id: " + id);
    }
  }

  async delete(id: Id): Promise<boolean> {
    try {
      return this.service.delete(id);
    } catch (e) {
      this.openSnackBar(e?.error?.message);
      return false;
    }
  }

  protected abstract toEntity(data: TDto): TEntity;

  protected abstract toEntities(data: TDto[]): TEntity[];

  protected openSnackBar(message?: string) {
    message && this.snackBar.open(message, "", {
      duration: 5000,
    });
  }
}
