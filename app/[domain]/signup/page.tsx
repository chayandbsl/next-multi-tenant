import { SignupForm } from "../ui/signup-form";

const RegisterPage = ({ params }: { params: { domain: string } }) => {
  const domain = decodeURIComponent(params?.domain);
  return (
    <main className="min-h-screen p-24 mb-2">
      <h1 className="text-black  text-3xl font-semibold text-center mb-5">
        Register {domain}
      </h1>

      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <div className="px-6 py-4">
          <SignupForm />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
