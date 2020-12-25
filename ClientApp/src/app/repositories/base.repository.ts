import { BaseService } from "../services/base.service";
import { Id } from "../models/id";
import { ClientException } from "../utils/client-exception";

export abstract class BaseRepository<
  TEntity,
  TDto,
  TService extends BaseService<TDto>> {

  protected service: TService;

  protected constructor(service: TService) {
    this.service = service;
  }

  async getAll(): Promise<TEntity[]> {
    try {
      const items: TDto[] = await this.service.getAll();
      return this.toEntities(items);
    } catch (e) {
      throw new ClientException("can't get all items");
    }
  }

  async getById(id: Id): Promise<TEntity> {
    try {
      const item: TDto = await this.service.getById(id);
      return this.toEntity(item);
    } catch (e) {
      throw new ClientException("can't get item with id: " + id);
    }
  }

  async getByIds(ids: Id[]): Promise<TEntity[]> {
    try {
      const items: TDto[] = await this.service.getByIds(ids);
      return this.toEntities(items);
    } catch (e) {
      throw new ClientException("can't get item with ids: " + ids);
    }
  }

  async create(data: Partial<TDto>): Promise<TEntity> {
    try {
      const item: TDto = await this.service.create(data);
      return this.toEntity(item);
    } catch (e) {
      throw new ClientException("can't create item");
    }
  }

  async update(id: Id, data: Partial<TDto>): Promise<TEntity> {
    try {
      const item: TDto = await this.service.update(id, data);
      return this.toEntity(item);
    } catch (e) {
      throw new ClientException("can't update item with id: " + id);
    }
  }

  async delete(id: Id): Promise<boolean> {
    try {
      return this.service.delete(id);
    } catch (e) {
      return false;
    }
  }

  protected abstract toEntity(data: TDto): TEntity;

  protected abstract toEntities(data: TDto[]): TEntity[];
}
