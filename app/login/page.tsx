import { LoginForm } from "@/components/auth/LoginForm";
import { OpenDayCareLogo } from "@/components/auth/OpenDayCareLogo";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-[#fbf4ec] lg:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#f6a98e] via-[#f2937a] to-[#ec7e62] px-[60px] py-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-[120px] -top-[140px] h-[420px] w-[420px] rounded-full bg-white/[0.12]" />
        <div className="absolute -bottom-[110px] -left-20 h-[300px] w-[300px] rounded-full bg-white/[0.1]" />

        <OpenDayCareLogo showName size="sm" variant="coral" />

        <div className="relative">
          <h1 className="font-display text-[42px] font-semibold leading-[1.12]">El día de cada niño,<br />compartido con su familia.</h1>
          <p className="mt-[18px] max-w-[430px] text-[17px] leading-[1.6] text-white/[0.92]">
            Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar.
          </p>
        </div>

        <p className="relative text-sm text-white/[0.9]">🌿 Guardería Sala Soles</p>
      </section>

      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <LoginForm />
      </section>
    </main>
  );
}
