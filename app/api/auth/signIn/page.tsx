"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = useSearchParams().get("error");

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/"
    });
  }

  return (
    <div className="flex h-full w-full justify-center items-center bg-slate-50">
      <form onSubmit={submitForm} className="flex flex-col bg-white px-5 py-10 ring-1 ring-neutral-300 gap-2 rounded-lg shadow-2xl shadow-black/20">
        <label htmlFor="emailInput">Email</label>
        <Input id="emailInput" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="passInput">Password</label>
        <Input id="passInput" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <Button className="mt-10" type="submit">Sign In</Button>
        {error && <div className="text-red-500 self-end">Invalid credentials</div>}
        <Link className="self-center text-sm text-blue-500 mt-2" href={"/api/auth/signUp"}>Sign up</Link>
      </form>
    </div>
  );
};

export default Login;
