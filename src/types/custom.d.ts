declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.gif";
declare module "*.svg";
declare module '*.css';
export interface Product {
  id: number;
  name: string;
  description: string;
  size: string;
  price: number;
  isBestseller?: boolean;
  isNewFormula?: boolean;
  isNightMasque?: boolean;
  imageUrl: string;
}