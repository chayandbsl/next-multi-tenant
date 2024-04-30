"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signup } from "../actions/auth";

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();

  return (
    <>
      {state?.code && (
        <p className="text-black bg-red-300 w-full p-2 rounded-md">
          {state?.message}
        </p>
      )}
      <form className="mt-4" action={action}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="name"
            placeholder="Enter your username"
          />
          {state?.errors?.name && (
            <p className="text-red-500">{state.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile
          </label>
          <input
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mobile"
            type="mobile"
            name="mobile"
            placeholder="Enter your mobile"
          />
          {state?.errors?.mobile && (
            <p className="text-red-500">{state.errors.mobile}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />

          {state?.errors?.password && (
            <div>
              <p className="text-red-500">Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error} className="text-red-500">
                    - {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {pending ? "Submitting..." : "Sign up"}
          </button>
        </div>
      </form>
    </>
  );
}
