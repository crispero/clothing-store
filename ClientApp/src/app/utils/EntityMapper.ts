import { ClassType } from "class-transformer/ClassTransformer";
import { plainToClass } from "class-transformer";

export class EntityMapper {
  public static toDomainEntities<DomainEntity>(domainClass: ClassType<DomainEntity>, rawObjects: object[] = []): DomainEntity[] {
    return rawObjects.map(raw => plainToClass(domainClass, raw, { excludeExtraneousValues: true }));
  }

  public static toDomainEntity<DomainEntity>(domainClass: ClassType<DomainEntity>, raw: object): DomainEntity {
    return plainToClass(domainClass, raw, { excludeExtraneousValues: true });
  }
}
