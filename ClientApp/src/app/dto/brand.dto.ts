import { IWithId } from "../utils/IWithId";

export interface IBrandDto extends IWithId {
  name: string;
  description: string;
  logoUrl: string;
}
