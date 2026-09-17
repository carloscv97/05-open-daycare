"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";

const EMPTY_FORM_VALUES = {
  fullName: "",
  birthDate: "",
  room: "",
  allergies: "",
  medicalNotes: "",
};

type FieldName = keyof typeof EMPTY_FORM_VALUES;
type FormErrors = Partial<Record<FieldName, string>>;

const BIRTH_DATE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const addKidSchema = z.object({
  fullName: z.string().trim().min(1, "El nombre completo es obligatorio."),
  birthDate: z.string()
    .trim()
    .min(1, "La fecha de nacimiento es obligatoria.")
    .regex(BIRTH_DATE_PATTERN, "Usá el formato dd/mm/aaaa.")
    .refine((value) => {
      const match = BIRTH_DATE_PATTERN.exec(value);
      if (!match) return true;

      const [, day, month, year] = match.map(Number);
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }, "Ingresá una fecha de calendario válida."),
  room: z.string().min(1, "Seleccioná una sala."),
  allergies: z.string(),
  medicalNotes: z.string(),
});

export function AddKidDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(EMPTY_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const dialogRef = useRef<HTMLElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);

  function closeDialog() {
    setFormValues(EMPTY_FORM_VALUES);
    setErrors({});
    setIsOpen(false);
  }

  function openDialog() {
    hasOpenedRef.current = true;
    setIsOpen(true);
  }

  function updateField(field: FieldName, value: string) {
    setFormValues({ ...formValues, [field]: value });
    setErrors((currentErrors) => {
      const remainingErrors = { ...currentErrors };
      delete remainingErrors[field];
      return remainingErrors;
    });
  }

  function handleSubmit() {
    const result = addKidSchema.safeParse(formValues);

    if (result.success) {
      closeDialog();
      return;
    }

    const fieldErrors = z.flattenError(result.error).fieldErrors;
    setErrors({
      fullName: fieldErrors.fullName?.[0],
      birthDate: fieldErrors.birthDate?.[0],
      room: fieldErrors.room?.[0],
    });
  }

  useEffect(() => {
    if (!isOpen) {
      if (hasOpenedRef.current) triggerRef.current?.focus();
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fullNameInputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDialog();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>("button, input, select, textarea, [tabindex]:not([tabindex='-1'])");
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button ref={triggerRef} type="button" onClick={openDialog} aria-haspopup="dialog" aria-expanded={isOpen} className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[14px] bg-gradient-to-b from-[#f4977e] to-[#ee8164] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)] transition hover:brightness-95 hover:shadow-[0_10px_20px_-8px_rgba(238,129,100,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a]">
        <svg aria-hidden="true" className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className="hidden sm:inline">Agregar niño</span>
        <span className="sm:hidden">Agregar</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3f362e]/35 p-4 sm:p-6" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}>
          <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="add-kid-title" className="max-h-full w-full max-w-[520px] overflow-y-auto rounded-[24px] border border-[#ece0d0] bg-[#fbf4ec] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
            <header className="flex items-center justify-between border-b border-[#ece0d0] px-5 py-5 sm:px-[26px]">
              <button type="button" onClick={closeDialog} className="cursor-pointer rounded-md px-1.5 py-1 text-[15px] font-bold text-[#94887b] transition hover:bg-[#f0e6d8] hover:text-[#6e6359] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a]">Cancelar</button>
              <h2 id="add-kid-title" className="font-display text-[18px] font-semibold text-text">Agregar niño</h2>
              <button type="submit" form="add-kid-form" className="cursor-pointer rounded-md px-1.5 py-1 text-[15px] font-extrabold text-coral-dark transition hover:bg-[#fff0eb] hover:text-[#a94230] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a]">Guardar</button>
            </header>

            <form id="add-kid-form" onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }} className="p-5 sm:p-[26px]">
              <label className="mb-[18px] block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">NOMBRE COMPLETO</span>
                <input ref={fullNameInputRef} name="fullName" value={formValues.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Ej. Martina López" aria-describedby={errors.fullName ? "full-name-error" : undefined} aria-invalid={Boolean(errors.fullName)} className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] ${errors.fullName ? "border-coral" : "border-[#eadfd0]"}`} />
                {errors.fullName && <p id="full-name-error" className="mt-1.5 text-[13px] font-bold text-coral-dark">{errors.fullName}</p>}
              </label>

              <div className="mb-[18px] grid gap-[18px] sm:grid-cols-2 sm:gap-[14px]">
                <label>
                  <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">FECHA DE NACIMIENTO</span>
                  <input name="birthDate" value={formValues.birthDate} onChange={(event) => updateField("birthDate", event.target.value)} placeholder="dd/mm/aaaa" aria-describedby={errors.birthDate ? "birth-date-error" : undefined} aria-invalid={Boolean(errors.birthDate)} className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] ${errors.birthDate ? "border-coral" : "border-[#eadfd0]"}`} />
                  {errors.birthDate && <p id="birth-date-error" className="mt-1.5 text-[13px] font-bold text-coral-dark">{errors.birthDate}</p>}
                </label>

                <label>
                  <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">SALA</span>
                  <select name="room" value={formValues.room} onChange={(event) => updateField("room", event.target.value)} aria-describedby={errors.room ? "room-error" : undefined} aria-invalid={Boolean(errors.room)} className={`w-full cursor-pointer rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] font-bold text-text outline-none ${errors.room ? "border-coral" : "border-[#eadfd0]"}`}>
                    <option value="" disabled>Seleccionar sala</option>
                    <option value="Soles">Soles</option>
                    <option value="Lunas">Lunas</option>
                    <option value="Estrellas">Estrellas</option>
                  </select>
                  {errors.room && <p id="room-error" className="mt-1.5 text-[13px] font-bold text-coral-dark">{errors.room}</p>}
                </label>
              </div>

              <label className="mb-[18px] block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">ALERGIAS (ETIQUETAS)</span>
                <input name="allergies" value={formValues.allergies} onChange={(event) => updateField("allergies", event.target.value)} placeholder="Ej. Maní, Lactosa" className="w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b]" />
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">NOTAS MÉDICAS</span>
                <textarea name="medicalNotes" value={formValues.medicalNotes} onChange={(event) => updateField("medicalNotes", event.target.value)} placeholder="Indicaciones, medicación, contactos…" className="min-h-[90px] w-full resize-y rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[13px] text-[15px] leading-[1.5] text-text outline-none placeholder:text-[#b6a99b]" />
              </label>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
