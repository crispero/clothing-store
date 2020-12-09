import { EntityModel } from "./entity.model";

export interface BrandModel extends EntityModel {
  name: string;
  description: string;
  logoUrl: string;
}
