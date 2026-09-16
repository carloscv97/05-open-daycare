import { AccountActivationForm } from "@/components/auth/AccountActivationForm";
import { OpenDayCareLogo } from "@/components/auth/OpenDayCareLogo";

export default function ActivateAccountPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbf4ec] px-5 py-10 sm:px-10">
      <div className="w-full max-w-[440px]">
        <div className="mb-[22px]">
          <OpenDayCareLogo />
        </div>
        <AccountActivationForm />
      </div>
    </main>
  );
}
