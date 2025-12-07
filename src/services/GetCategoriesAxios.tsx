// src/services/GetCategoriesAxios.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export async function fetchProducts(): Promise<string[]> {
  // جلب البيانات من الـ API
  const response = await axios.get<{ data: Product[] }>(
    "https://68f278b4b36f9750deecbed2.mockapi.io/data/api/products"
  );

  // استخراج الفئات من response.data.data
  const allBrands = response.data.data.map((item: Product) => item.category);

  // إزالة التكرارات
  const uniqueBrands = [...new Set(allBrands)];

  return uniqueBrands;
}

export function useProductsQuery() {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchProducts,
  });
}
