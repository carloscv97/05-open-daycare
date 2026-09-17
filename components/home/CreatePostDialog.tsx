"use client";

import { useState, type RefObject } from "react";

type CreatePostDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
};

const RECIPIENTS = [
  { id: "mateo", label: "Mateo", initial: "M", avatarClassName: "bg-[#a9d9e8] text-[#1f7a93]" },
  { id: "sofia", label: "Sofía", initial: "S", avatarClassName: "bg-[#f4b8cc] text-[#c44a7a]" },
  { id: "benjamin", label: "Benjamín", initial: "B", avatarClassName: "bg-[#b9dec4] text-[#3e8b62]" },
] as const;

const POST_TYPES = [
  { id: "food", label: "Comida", className: "bg-[#9a7b1e] text-white" },
  { id: "nap", label: "Siesta", className: "bg-[#e7dcf6] text-[#7b5fc0]" },
  { id: "activity", label: "Actividad", className: "bg-[#2e89a6] text-white" },
  { id: "achievement", label: "Logro", className: "bg-[#cfebd8] text-[#3e9b6c]" },
  { id: "mood", label: "Ánimo", className: "bg-[#f9d2de] text-[#c56486]" },
  { id: "photo", label: "Foto", className: "bg-[#fbd8cc] text-[#d9684a]" },
  { id: "announcement", label: "Anuncio", className: "bg-[#ccd8f4] text-[#4e72c8]" },
] as const;

type RecipientId = (typeof RECIPIENTS)[number]["id"];
type PostType = (typeof POST_TYPES)[number]["id"];

export function CreatePostDialog({ isOpen, onClose }: CreatePostDialogProps) {
  const [recipients, setRecipients] = useState<RecipientId[] | "room">([]);
  const [postType, setPostType] = useState<PostType | null>(null);
  const [description, setDescription] = useState("");

  function closeDialog() {
    setRecipients([]);
    setPostType(null);
    setDescription("");
    onClose();
  }

  function toggleRecipient(recipientId: RecipientId) {
    setRecipients((currentRecipients) => {
      if (currentRecipients === "room") return [recipientId];

      return currentRecipients.includes(recipientId)
        ? currentRecipients.filter((id) => id !== recipientId)
        : [...currentRecipients, recipientId];
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3f362e]/35 p-4 sm:p-6">
      <section className="max-h-full w-full max-w-[580px] overflow-y-auto rounded-[24px] border border-[#ece0d0] bg-[#fbf4ec] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        <header className="flex items-center justify-between border-b border-[#ece0d0] px-5 py-5 sm:px-[26px]">
          <button type="button" onClick={closeDialog} className="cursor-pointer rounded-md px-1.5 py-1 text-[15px] font-bold text-[#94887b] transition hover:bg-[#f0e6d8] hover:text-[#6e6359] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a]">
            Cancelar
          </button>
          <h2 className="font-display text-[18px] font-semibold text-text">Nueva publicación</h2>
          <button type="button" className="cursor-pointer rounded-md px-1.5 py-1 text-[15px] font-extrabold text-coral-dark transition hover:bg-[#fff0eb] hover:text-[#a94230] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a]">
            Publicar
          </button>
        </header>

        <div className="p-5 sm:p-[26px]">
          <fieldset className="mb-[22px]">
            <legend className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">PARA</legend>
            <div className="flex flex-wrap gap-[9px]">
              {RECIPIENTS.map((recipient) => (
                <button key={recipient.id} type="button" onClick={() => toggleRecipient(recipient.id)} aria-pressed={Array.isArray(recipients) && recipients.includes(recipient.id)} className={`flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] py-1 pl-1 pr-3.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a] ${Array.isArray(recipients) && recipients.includes(recipient.id) ? "border-[#3f362e] bg-[#3f362e] text-white" : "border-[#ece0d0] bg-[#fffdf9] text-[#6e6359] hover:border-[#cbb89f]"}`}>
                  <span className={`flex h-[26px] w-[26px] items-center justify-center rounded-full font-display text-[13px] font-semibold ${recipient.avatarClassName}`}>{recipient.initial}</span>
                  {recipient.label}
                </button>
              ))}
              <button type="button" onClick={() => setRecipients("room")} aria-pressed={recipients === "room"} className={`cursor-pointer rounded-full border-[1.5px] px-4 py-1.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a] ${recipients === "room" ? "border-[#3f362e] bg-[#3f362e] text-white" : "border-[#ece0d0] bg-[#fffdf9] text-[#6e6359] hover:border-[#cbb89f]"}`}>
                Toda la sala
              </button>
            </div>
          </fieldset>

          <fieldset className="mb-[22px]">
            <legend className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">TIPO</legend>
            <div className="flex flex-wrap gap-[9px]">
              {POST_TYPES.map((typeOption) => (
                <button key={typeOption.id} type="button" onClick={() => setPostType(typeOption.id)} aria-pressed={typeOption.id === postType} className={`cursor-pointer rounded-full px-4 py-2 text-[13.5px] font-extrabold transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a] ${typeOption.id === postType ? "ring-2 ring-[#3f362e] ring-offset-2" : ""} ${typeOption.className}`}>
                  {typeOption.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="mb-[22px] block">
            <span className="mb-2.5 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">DESCRIPCIÓN</span>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Contá cómo le fue hoy…" className="min-h-[120px] w-full resize-y rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[13px] text-[15px] leading-[1.5] text-text outline-none placeholder:text-[#b6a99b] focus:border-[#cbb89f]" />
          </label>

          <section aria-labelledby="photos-heading">
            <h3 id="photos-heading" className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">FOTOS</h3>
            <div className="flex gap-3">
              <div className="flex h-24 w-24 items-center justify-center rounded-[14px] border border-[#ece0d0] bg-[#f4ece1] text-[#cbb89f]">
                <svg aria-hidden="true" className="h-[26px] w-[26px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
                </svg>
              </div>
              <button type="button" className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[14px] border-[1.5px] border-dashed border-[#dbcdba] bg-[#f4ece1] text-[12px] text-[#b0a290] transition hover:bg-[#eee3d5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a]">
                <svg aria-hidden="true" className="h-[22px] w-[22px] text-[#c5503a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Agregar
              </button>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
