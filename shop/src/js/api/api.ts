export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}
export const Catagories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export interface IProductPerCatagory {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export async function getProducts(): Promise<IProduct[]> {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
}

export async function getProductsByCatagory(
  catagory: string,
): Promise<IProductPerCatagory[]> {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${catagory}`,
  );
  const data = await response.json();
  return data;
}

export async function getProductById(id: number): Promise<IProduct> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();
  return data;
}
