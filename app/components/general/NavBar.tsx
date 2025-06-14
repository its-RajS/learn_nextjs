import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function NavBar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="py-3 flex items-center justify-between ">
      <div className="flex items-center gap-4 justify-center ">
        <Link href={"/"} className="pr-4">
          <h1 className="text-blue-500 text-3xl font-semibold ">Bloggie</h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6  ">
          <Link
            className="text-lg font-medium hover:text-blue-300 transition-colors "
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="text-lg font-medium hover:text-blue-300 transition-colors"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <Button variant={"outline"}>{user.given_name}</Button>
          <LogoutLink className={buttonVariants({ variant: "outline" })}>
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4 ">
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>
            SignUp
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
