import axios from "axios";
import { Product } from "../types/Product";

export async function fetchProductDetails(id: string | undefined): Promise<Product> {
  const response = await axios.get("https://skincare-api-psi.vercel.app/api/data");
  const products: Product[] = response.data.data;
  const product = products.find((item) => String(item.id) === id);
  if (!product) throw new Error("Product not found");
  return product;
}
