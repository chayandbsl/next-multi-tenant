export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1 className="text-black text-3xl font-semibold">
        Welcome to multi tenant app
      </h1> */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome to Multi-Tenant Apppp
          </h1>
          <p className="text-lg text-gray-600 text-center mb-6">
            The ultimate solution for managing multiple tenants efficiently
          </p>
          {/* <div className="flex space-x-4">
            <Link href="/login">
              <p className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold transition duration-300">
                Login
              </p>
            </Link>
            <Link href="/signup">
              <p className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md font-semibold transition duration-300">
                Sign Up
              </p>
            </Link>
          </div> */}
        </div>
      </div>
    </main>
  );
}
