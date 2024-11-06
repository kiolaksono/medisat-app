import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "@/app/patients/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Alert from "@/components/Alert";
import OauthButton from "@/components/OauthButton";

export default function Login() {
  const Cookie = cookies().get("Authorization")?.value;

  if (Cookie) redirect("/patients");

  return (
    <>
      <Alert />
      <div className="p-10">
        <form action={login}>
          <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Masukkan alamat email anda"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>

            <div className="flex flex-wrap gap-10 items-center">
                <Button variant="auth">Log In</Button>
                <p>Belum punya akun? Silahkan daftarkan diri anda<Link className="text-blue-600" href={"/patients/auth/register"}> disini</Link></p>
            </div>
        </form>
        <OauthButton />
      </div>
    </>
  );
}
