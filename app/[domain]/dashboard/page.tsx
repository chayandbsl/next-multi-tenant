import { getSession, logout } from "../lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import products from "@/public/data/products.json";

interface Session {
  userName: string;
  bizid: number;
}

export default async function Dashboard() {
  const session: Session | null = await getSession();
  if (!session) {
    redirect("/login");
  }

  const filterProducts = products.filter(
    (product) => product.bizid === session?.bizid
  );

  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex space-x-4 mt-5">
        <h1 className="text-black  text-3xl font-semibold">
          Welcome to {session?.userName}
        </h1>
      </div>

      {session ? (
        <>
          <div className="flex items-center mt-6">
            <Link href="/" className="mr-3">
              <button
                type="submit"
                className=" bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold transition duration-300"
              >
                Home
              </button>
            </Link>
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/login");
              }}
            >
              <button
                type="submit"
                className=" bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold transition duration-300"
              >
                Logout
              </button>
            </form>
          </div>
        </>
      ) : (
        <Link href="/login">
          <p className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md font-semibold transition duration-300">
            Sign In
          </p>
        </Link>
      )}

      <section className="py-16 px-4 sm:px-8 lg:px-16 xl:px-32">
        {filterProducts.length > 0 ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterProducts.map((product: any, index: number) => (
              <Link
                href={product.slug}
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={400}
                    layout="responsive"
                  />
                  {product.new && (
                    <div className="absolute top-0 right-0 bg-gray-800 text-white px-4 py-2 m-4 rounded-full font-semibold">
                      New
                    </div>
                  )}
                </div>
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price}</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xl text-red-600">
            No products found for this subdomain.
          </p>
        )}
      </section>
    </main>
  );
}
