"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setBusy(false);
    if (res?.ok) window.location.href = callbackUrl;
    else setError("Wrong email or password.");
  }

  return (
    <form onSubmit={submit} className="card-padded w-full max-w-sm space-y-4">
      <div className="text-center mb-2">
        <div className="font-display text-5xl text-gold leading-none">STARK</div>
        <div className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-1">Roofing & Renovation</div>
      </div>
      <div>
        <label className="label">Email</label>
        <input className="input !py-3 !text-base" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="label">Password</label>
        <input className="input !py-3 !text-base" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <div className="text-sm text-rose-300">{error}</div>}
      <button className="btn-primary w-full justify-center !py-3 !text-base" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
