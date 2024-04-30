import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

const bcrypt = require("bcrypt");

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { mobile, password } = body?.data;
  const hostName = body?.hostname;

  if (!mobile || !password || !hostName) {
    return NextResponse.json({
      message: "Incomplete request data",
      status: 400,
    });
  }

  try {
    const user = await prisma.secus.findFirst({
      where: {
        xmobile: mobile,
        zbusiness: {
          xsubdomain: hostName,
        },
      },
      select: {
        xpassword: true,
        xcusid: true,
        xshort: true,
        bizid: true,
        zbusiness: {
          select: {
            bizid: true,
            xdomain: true,
            xsubdomain: true,
            xorg: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 400,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.xpassword);
    if (!isPasswordMatched) {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 400,
      });
    }

    return NextResponse.json({
      message: "Data fetched successfully",
      status: 200,
      data: user,
    });
  } catch (error: any) {
    console.log("User fetching error from api:", error.message);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
