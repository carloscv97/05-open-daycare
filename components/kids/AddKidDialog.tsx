"use client";

import { cloneElement, useEffect, useState, type ReactElement } from "react";

const EMPTY_FORM_VALUES = {
  fullName: "",
  birthDate: "",
  room: "",
  allergies: "",
  medicalNotes: "",
};

type FieldName = keyof typeof EMPTY_FORM_VALUES;
type FormErrors = Partial<Record<FieldName, string>>;

function getBirthDateError(birthDate: string) {
  if (!birthDate.trim()) return "La fecha de nacimiento es obligatoria.";

  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(birthDate);
  if (!match) return "Usá el formato dd/mm/aaaa.";

  const [, day, month, year] = match.map(Number);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return "Ingresá una fecha de calendario válida.";
  }
}

export function AddKidDialog({ children }: { children: ReactElement }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(EMPTY_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});

  function closeDialog() {
    setFormValues(EMPTY_FORM_VALUES);
    setErrors({});
    setIsOpen(false);
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
    const nextErrors: FormErrors = {};

    if (!formValues.fullName.trim()) nextErrors.fullName = "El nombre completo es obligatorio.";
    if (!formValues.room) nextErrors.room = "Seleccioná una sala.";

    const birthDateError = getBirthDateError(formValues.birthDate);
    if (birthDateError) nextErrors.birthDate = birthDateError;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) closeDialog();
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDialog();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {cloneElement(children, { onClick: () => setIsOpen(true) })}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3f362e]/35 p-4 sm:p-6" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}>
          <section aria-labelledby="add-kid-title" className="max-h-full w-full max-w-[520px] overflow-y-auto rounded-[24px] border border-[#ece0d0] bg-[#fbf4ec] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
            <header className="flex items-center justify-between border-b border-[#ece0d0] px-5 py-5 sm:px-[26px]">
              <button type="button" onClick={closeDialog} className="text-[15px] font-bold text-[#94887b]">Cancelar</button>
              <h2 id="add-kid-title" className="font-display text-[18px] font-semibold text-text">Agregar niño</h2>
              <button type="submit" form="add-kid-form" className="text-[15px] font-extrabold text-coral-dark">Guardar</button>
            </header>

            <form id="add-kid-form" onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }} className="p-5 sm:p-[26px]">
              <label className="mb-[18px] block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">NOMBRE COMPLETO</span>
                <input name="fullName" value={formValues.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Ej. Martina López" aria-describedby={errors.fullName ? "full-name-error" : undefined} aria-invalid={Boolean(errors.fullName)} className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] ${errors.fullName ? "border-coral" : "border-[#eadfd0]"}`} />
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
                  <select name="room" value={formValues.room} onChange={(event) => updateField("room", event.target.value)} aria-describedby={errors.room ? "room-error" : undefined} aria-invalid={Boolean(errors.room)} className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] font-bold text-text outline-none ${errors.room ? "border-coral" : "border-[#eadfd0]"}`}>
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
