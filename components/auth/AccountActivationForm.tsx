"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

export function AccountActivationForm() {
  const router = useRouter();
  const [photoAuthorization, setPhotoAuthorization] = useState(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <form className="w-full max-w-[440px]" onSubmit={handleSubmit}>
      <h1 className="font-display text-[32px] font-semibold leading-[1.15] text-text">Bienvenida a OpenDayCare</h1>
      <p className="mb-[26px] mt-2 text-[15.5px] leading-[1.55] text-text-muted">
        Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta.
      </p>

      <section className="mb-[22px] flex items-center gap-[14px] rounded-2xl border-[1.5px] border-[#eadfd0] bg-white px-4 py-[14px]" aria-label="Invitación">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky font-display text-[19px] font-semibold text-sky-dark">M</span>
        <div>
          <p className="text-[13px] text-text-muted">Te invitaron a seguir a</p>
          <p className="font-display text-[17px] font-semibold text-text">Mateo · Sala Soles</p>
        </div>
      </section>

      <label className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-text-muted" htmlFor="activation-code">
        CÓDIGO DE INVITACIÓN
      </label>
      <input
        className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[14px] font-display text-[18px] font-bold tracking-[3px] text-text outline-none focus:border-coral"
        defaultValue="7K4P9"
        id="activation-code"
        name="code"
      />

      <label className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-text-muted" htmlFor="activation-email">
        EMAIL
      </label>
      <input
        className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[14px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] focus:border-coral"
        defaultValue="lucia.fernandez@gmail.com"
        id="activation-email"
        name="email"
        type="email"
      />

      <label className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-text-muted" htmlFor="activation-password">
        CREAR CONTRASEÑA
      </label>
      <input
        className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#f2a78e] bg-white px-4 py-[14px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] focus:border-coral"
        defaultValue="contraseña"
        id="activation-password"
        name="password"
        type="password"
      />

      <label className="mb-6 flex cursor-pointer items-start gap-3 rounded-[14px] bg-[#fbf1d6] px-4 py-[14px] text-[#8a7234]">
        <input
          checked={photoAuthorization}
          className="mt-1 h-6 w-6 shrink-0 accent-[#5fb97e]"
          name="photo-authorization"
          onChange={(event) => setPhotoAuthorization(event.target.checked)}
          type="checkbox"
        />
        <span className="text-[14px] leading-[1.45]">Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.</span>
      </label>

      <button className="w-full rounded-[15px] bg-gradient-to-b from-[#f4977e] to-[#ee8164] px-4 py-[15px] text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)]" type="submit">
        Activar mi cuenta
      </button>

      <p className="mt-[22px] text-center text-[14.5px] text-text-muted">
        ¿Ya tenés cuenta? <Link className="font-extrabold text-[#c5503a]" href="/login">Iniciar sesión</Link>
      </p>
    </form>
  );
}
