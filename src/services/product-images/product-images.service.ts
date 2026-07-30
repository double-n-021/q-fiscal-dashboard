export interface ProductImageDto {
  id: string;
  imagePath: string;
  altText?: string;
  isPrimary: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}
