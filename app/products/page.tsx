import type { Metadata } from "next";

import { ProductsBrowser } from "@/components/products/products-browser";

export const metadata: Metadata = {
  title: "Products | TechChoice"
};

export default function ProductsPage() {
  return <ProductsBrowser />;
}
