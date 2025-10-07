import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export async function fetchProducts(): Promise<string[]> {
  const response = await axios.get("https://skincare-api-psi.vercel.app/api/data");
  const allBrands = response.data.data.map((item: Product) => item.category);
const uniqueBrands = [...new Set(allBrands)];
  return uniqueBrands;
}
export function useProductsQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchProducts,
  });
}
