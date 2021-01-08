import { Injectable } from "@angular/core";
import { Id } from "../models/id";

@Injectable({
  providedIn: "root"
})
export class EntityUtils {
  replaceOrPushEntity<T>(list: T[], entity: T, field: keyof T): void {
    const entityIndex = this.getEntityIndex(list, entity, field);
    if (entityIndex !== -1) {
      list[entityIndex] = entity;
    } else {
      list.push(entity);
    }
  }

  deleteEntity<T>(list: T[], id: any, field: keyof T): void {
    const entityIndex = this.getEntityIndexWithId(list, id, field);
    if (entityIndex !== -1) {
      list.splice(entityIndex, 1);
    }
  }

  private getEntityIndex<T>(list: T[], entity: T, field: keyof T) {
    return list.findIndex(
      (entityInList: T) => entityInList[field] === entity[field],
    );
  }

  private getEntityIndexWithId<T>(list: T[], id: any, field: keyof T) {
    return list.findIndex(
      (entityInList: T) => entityInList[field] === id,
    );
  }
}
