"use client";

import { cloneElement, useEffect, useState, type ReactElement } from "react";

const EMPTY_FORM_VALUES = {
  fullName: "",
  birthDate: "",
  room: "",
  allergies: "",
  medicalNotes: "",
};

export function AddKidDialog({ children }: { children: ReactElement }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(EMPTY_FORM_VALUES);

  function closeDialog() {
    setFormValues(EMPTY_FORM_VALUES);
    setIsOpen(false);
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
              closeDialog();
            }} className="p-5 sm:p-[26px]">
              <label className="mb-[18px] block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">NOMBRE COMPLETO</span>
                <input name="fullName" value={formValues.fullName} onChange={(event) => setFormValues({ ...formValues, fullName: event.target.value })} placeholder="Ej. Martina López" className="w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b]" />
              </label>

              <div className="mb-[18px] grid gap-[18px] sm:grid-cols-2 sm:gap-[14px]">
                <label>
                  <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">FECHA DE NACIMIENTO</span>
                  <input name="birthDate" value={formValues.birthDate} onChange={(event) => setFormValues({ ...formValues, birthDate: event.target.value })} placeholder="dd/mm/aaaa" className="w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b]" />
                </label>

                <label>
                  <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">SALA</span>
                  <select name="room" value={formValues.room} onChange={(event) => setFormValues({ ...formValues, room: event.target.value })} className="w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[13px] text-[15px] font-bold text-text outline-none">
                    <option value="" disabled>Seleccionar sala</option>
                    <option value="Soles">Soles</option>
                    <option value="Lunas">Lunas</option>
                    <option value="Estrellas">Estrellas</option>
                  </select>
                </label>
              </div>

              <label className="mb-[18px] block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">ALERGIAS (ETIQUETAS)</span>
                <input name="allergies" value={formValues.allergies} onChange={(event) => setFormValues({ ...formValues, allergies: event.target.value })} placeholder="Ej. Maní, Lactosa" className="w-full rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b]" />
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">NOTAS MÉDICAS</span>
                <textarea name="medicalNotes" value={formValues.medicalNotes} onChange={(event) => setFormValues({ ...formValues, medicalNotes: event.target.value })} placeholder="Indicaciones, medicación, contactos…" className="min-h-[90px] w-full resize-y rounded-[14px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[13px] text-[15px] leading-[1.5] text-text outline-none placeholder:text-[#b6a99b]" />
              </label>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
