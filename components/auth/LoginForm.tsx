"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <form className="w-full max-w-[392px]" onSubmit={handleSubmit}>
      <h1 className="font-display text-[30px] font-semibold text-text">Iniciar sesión</h1>
      <p className="mb-7 mt-[6px] text-[15px] text-text-muted">Ingresá para ver el día de hoy.</p>

      <label className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-text-muted" htmlFor="login-email">
        EMAIL
      </label>
      <input
        className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[14px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] focus:border-coral"
        defaultValue="caro@opendaycare.com"
        id="login-email"
        name="email"
        type="email"
      />

      <label className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-text-muted" htmlFor="login-password">
        CONTRASEÑA
      </label>
      <input
        className="mb-2 w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[14px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] focus:border-coral"
        id="login-password"
        name="password"
        placeholder="••••••••"
        type="password"
      />
      <div className="mb-5 text-right">
        <span className="cursor-pointer text-[13.5px] font-bold text-[#c5503a]">¿Olvidaste tu contraseña?</span>
      </div>

      <button className="w-full rounded-[15px] bg-gradient-to-b from-[#f4977e] to-[#ee8164] px-4 py-[15px] text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)]" type="submit">
        Iniciar sesión
      </button>

      <p className="mt-6 text-center text-[14.5px] text-text-muted">
        ¿Te invitó la guardería? <Link className="font-extrabold text-[#c5503a]" href="/activate-account">Activá tu cuenta</Link>
      </p>
    </form>
  );
}
