import { LoginForm } from "../ui/login-form";

const LoginPage = ({ params }: { params: { domain: string } }) => {
  const domain = decodeURIComponent(params?.domain);

  return (
    <main className="min-h-screen p-24 mb-2">
      <h1 className="text-black  text-3xl font-semibold text-center mb-5">
        Login {domain}
      </h1>

      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <div className="px-6 py-4">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
