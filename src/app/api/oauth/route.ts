import PatientModel from "@/db/models/Patients";
import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

const client = new OAuth2Client();

export async function POST(req: NextRequest) {
    const { googleToken } = await req.json()
    // console.log(googleToken);

    try {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
        });
        const payload = ticket.getPayload()!;


        type RegisType = {
            nik: string;
            name: string;
            email: string;
            password: string;
            birthDate: string;
            address: string;
            phoneNumber: string;
        }

        // kalo nik nya sama dengan google id, maka nik nya belum diupdate
        const regis = {
            nik: payload.sub,
            name: payload.name,
            email: payload.email,
            password: process.env.PASS_OAUTH,
            birthDate: "          ",
            address: "          ",
            phoneNumber: "          "
        }

        let user = await PatientModel.findByEmail(payload.email!);

        if (!user) {
            await PatientModel.create(regis as RegisType);
            user = await PatientModel.findByEmail(payload.email!);

            const _id = user!._id.toString();
            const token: string = signToken({ _id, role: "patients" });
            // console.logconsole.log(token, "token oauth ==========");
            cookies().set("Authorization", `Bearer ${token}`);

            return NextResponse.json(
                { access_token: token },
                { status: 200 },
            )
        } 


        const _id = user!._id.toString();
        const token: string = signToken({ _id, role: "patients"});
        // console.log(token, "token oauth ==========");

        cookies().set("Authorization", `Bearer ${token}`);

        return NextResponse.json(
            { access_token: token },
            { status: 200 },
        )

    } catch (error: any) {
        // console.log(error);

        return NextResponse.json(
            { message: "Error" },
            { status: 400 },
        )
    }
}