import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(
  userId: string,
  userName: string,
  bizid: string
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId,
    userName,
    bizid,
    expiresAt,
  });

  cookies().set("session", session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<any | null> {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

// export async function updateSession(request: NextRequest) {
//   const session = cookies().get("session")?.value;
//   if (!session) return;

//   // Refresh the token
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 10 * 1000);
//   const res = NextResponse.next();
//   res.cookies.set("session", session, {
//     httpOnly: true,
//     secure: true,
//     expires: await encrypt(parsed),
//     sameSite: "lax",
//     path: "/",
//   });
// }

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}
