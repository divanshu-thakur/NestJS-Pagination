export class PaginationDto {
  searchBy?: string = '';
  sortBy?: 'id' | 'name' | 'email' | 'createdAt' = 'name';
  order: 'ASC' | 'DESC' = 'ASC';
  page?: number = 1;
  limit?: number = 10;
} 
