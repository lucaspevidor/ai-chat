"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);

  const {status} = useSession();

  useEffect(() => {
    if (status === "authenticated")
      redirect("/");
  }, [status]);

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== cPassword) {
      setError("Passwords doesn't match");
      return;
    }

    if (name === "" || email === "" || password === "")
    {
      setError("Invalid information");
      return;
    }

    let response;
    try {
      response = await axios.post("/api/user", {email, password, name});
      if (response.status === 200)
        await signIn("credentials", {
          email, password,
          redirect: true,
          callbackUrl: "/"
        });
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      }
    }
  }

  useEffect(() => {
    setValid(name !== "" && email !== "" && password !== "" && password === cPassword);
  }, [name, email, password, cPassword]);

  return (
    <div className="flex h-full w-full justify-center items-center bg-slate-50">
      <form onSubmit={submitForm} className="flex flex-col justify-center items-center bg-white px-5 py-10 ring-1 ring-neutral-300 gap-2 rounded-lg shadow-2xl shadow-black/20 min-w-[20rem] min-h-[30rem]">
        {
          status === "loading" ?
            <span className="">Please wait...</span> :
            <>
              <label className="text-sm self-start" htmlFor="nameInput">Name</label>
              <Input id="nameInput" type="text" value={name} onChange={e => setName(e.target.value)} />
              <label className="text-sm self-start" htmlFor="emailInput">Email</label>
              <Input id="emailInput" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <label className="text-sm self-start" htmlFor="passInput">Password</label>
              <Input id="passInput" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
              <label className="text-sm self-start" htmlFor="cPassInput">Confirm password</label>
              <Input id="cPassInput" type="password" value={cPassword} onChange={e => setCPassword(e.target.value)}/>
              <Button className="mt-10 w-full" type="submit" disabled={!valid}>Sign Up</Button>
              {error !== "" && <div className="text-red-500 self-end">{error}</div>}
              <Link className="self-center text-sm text-blue-500 mt-2" href={"/api/auth/signIn"}>Sign in</Link>
            </>
        }
      </form>
    </div>
  );
};

export default SignUp;
