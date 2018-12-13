export interface PagedDataBaseDto {
  all?: boolean;
  count?: number;
  page?: number;
  sort_by?: string;
  sort_dir?: 'asc' | 'desc';
}
