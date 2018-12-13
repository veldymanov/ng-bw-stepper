import { ResourceType } from '../enums/resource-type.enum';

export interface FileDto {
  download_url: string;
  extension: string;
  filename: string;
  id: number;
  public_id: string;
  thumb_url: string;
  type: ResourceType;
  url: string;
}
