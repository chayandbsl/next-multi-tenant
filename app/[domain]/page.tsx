import Link from "next/link";
import { getSession } from "@/app/[domain]/lib/session";

export default async function ProductDetail({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params?.domain);
  const session = await getSession();

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-black  text-3xl font-semibold">
        Welcome to subdomain {domain}
      </h1>

      <div className="flex space-x-4 mt-5">
        {session ? (
          <>
            <Link href="/dashboard">
              <p className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold transition duration-300">
                Dashboard
              </p>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <p className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md font-semibold transition duration-300">
              Sign In
            </p>
          </Link>
        )}
      </div>
    </main>
  );
}
