"use server";

import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from "../lib/definitions";
import { redirect } from "next/navigation";
import { createSession } from "../lib/session";
import { headers } from "next/headers";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 3. Insert the user into the database or call an Auth Library's API
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-host");
  const response = await fetch(process.env.ROOT_URL + "/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: validatedFields.data,
      hostname: hostname,
    }),
  });

  const responsedata = await response.json();
  if (!responsedata || responsedata.status !== 200) {
    return {
      code: 404,
      message: responsedata.message,
    };
  }

  // 3. Create user session
  await createSession(
    responsedata?.data?.xcusid,
    responsedata?.data?.xshort,
    responsedata?.data?.bizid
  );

  // 4. Redirect user
  if (response.ok) {
    redirect("/dashboard");
  } else {
    return {
      code: 500,
      message: "Something went wrong",
    };
  }
}

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    mobile: formData.get("mobile"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-host");

  // const { email, password } = validatedFields.data;
  const response = await fetch(process.env.ROOT_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: validatedFields.data,
      hostname: hostname,
    }),
  });

  const responsedata = await response.json();
  if (!responsedata || responsedata.status !== 200) {
    return {
      code: 404,
      message: responsedata.message,
    };
  }

  await createSession(
    responsedata?.data?.xcusid,
    responsedata?.data?.xshort,
    responsedata?.data?.bizid
  );
  // 5. Redirect user
  if (response.ok) {
    redirect("/dashboard");
  } else {
    return {
      code: 500,
      message: "Something went wrong",
    };
  }
}
