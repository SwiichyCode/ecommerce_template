import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import Header from "@/modules/Shop/components/Header";
import ProductList from "@/modules/Shop/components/ProductList";
import ShoppingCart from "@/modules/Shop/components/ShoppingCart";

export default async function ShopPage() {
  const session = await getServerAuthSession();
  const products = await db.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <>
      <Header session={session} />
      <ShoppingCart session={session} />
      <ProductList products={products} />
    </>
  );
}
