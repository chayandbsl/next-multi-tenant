import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateUserCode } from "@/app/[domain]/helper";

const bcrypt = require("bcrypt");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, mobile, password } = body?.data;
  const hostName = body?.hostname;

  if (!email || !password || !mobile || !hostName) {
    return NextResponse.json({
      message: "Incomplete request data",
      status: 400,
    });
  }

  try {
    const domainDetail = await prisma.zbusiness.findFirst({
      where: {
        xdomain: hostName,
      },
      select: {
        bizid: true,
        xdomain: true,
        xsubdomain: true,
      },
    });

    if (!domainDetail) {
      return NextResponse.json({
        message: "Not registered this domain",
        status: 400,
      });
    }

    const user = await prisma.secus.findFirst({
      where: {
        xmobile: mobile,
        bizid: domainDetail.bizid,
      },
    });
    if (user) {
      return NextResponse.json({
        message: "Mobile already exists",
        status: 400,
      });
    }
    if (user) {
      return NextResponse.json({
        message: "Mobile already exists",
        status: 400,
      });
    }

    const lastUserCode = await prisma.secus.findFirst({
      orderBy: [
        {
          xcus: "desc",
        },
        {
          xcusid: "desc",
        },
      ],
      where: {
        bizid: domainDetail.bizid,
      },
      take: 1,
      select: {
        xcus: true,
      },
    });

    const hashPassword = await bcrypt.hash(password, 10);
    const userCode = await generateUserCode(lastUserCode?.xcus);
    const createUser = await prisma.secus.create({
      data: {
        xcus: userCode,
        xshort: name,
        bizid: domainDetail.bizid,
        xmobile: mobile,
        zemail: email,
        xemail: email,
        xpassword: hashPassword,
        xemp: "",
      },
    });

    if (!createUser) {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 400,
      });
    }

    return NextResponse.json({
      message: "User created successfully",
      status: 200,
      data: createUser,
    });
  } catch (error: any) {
    console.log("User creating error from api:", error.message);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
