import { getSession } from "../lib/session";
import products from "@/public/data/products.json";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const product = products.find(
    (product) => product.bizid === session?.bizid && product.slug === slug
  );

  if (!product) {
    return (
      <p className="text-xl text-red-600">
        No products found for this subdomain.
      </p>
    );
  }
  return (
    <main className="flex flex-col items-center justify-between">
      <section className="py-16 px-4 sm:px-8 lg:px-16 xl:px-32">
        <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          <Image
            src={product?.image}
            alt={product?.name}
            width={600}
            height={400}
            layout="responsive"
          />
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {product?.name}
            </h2>
            <p className="text-gray-600">{product?.description}</p>
            <p className="text-gray-700 font-bold">Price: ${product?.price}</p>
            {product?.new && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                New
              </span>
            )}
            <p className="mt-4">Domain: {product?.domain}</p>
            <p>Subdomain: {product?.subdomain}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
