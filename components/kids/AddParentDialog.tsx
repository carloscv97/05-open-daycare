'use client';

import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

const EMPTY_FORM_VALUES = {
  parentName: '',
  email: '',
  relation: '',
};

type FieldName = keyof typeof EMPTY_FORM_VALUES;
type FormErrors = Partial<Record<FieldName, string>>;

const addParentSchema = z.object({
  parentName: z.string().trim().min(1, 'El nombre del padre o madre es obligatorio.'),
  email: z
    .string()
    .trim()
    .min(1, 'El email es obligatorio.')
    .email('Ingresá un email válido.'),
  relation: z
    .string()
    .refine(
      value => ['mother', 'father', 'guardian'].includes(value),
      'Seleccioná un parentesco.',
    ),
});

type AddParentDialogProps = {
  kidName: string;
};

export function AddParentDialog({ kidName }: AddParentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(EMPTY_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const dialogRef = useRef<HTMLElement>(null);
  const parentNameInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);

  function closeDialog() {
    setFormValues(EMPTY_FORM_VALUES);
    setErrors({});
    setIsOpen(false);
  }

  function updateField(field: FieldName, value: string) {
    setFormValues({ ...formValues, [field]: value });
    setErrors(currentErrors => {
      const remainingErrors = { ...currentErrors };
      delete remainingErrors[field];
      return remainingErrors;
    });
  }

  function handleSubmit() {
    const result = addParentSchema.safeParse(formValues);

    if (result.success) {
      closeDialog();
      return;
    }

    const fieldErrors = z.flattenError(result.error).fieldErrors;
    setErrors({
      parentName: fieldErrors.parentName?.[0],
      email: fieldErrors.email?.[0],
      relation: fieldErrors.relation?.[0],
    });
  }

  function openDialog() {
    hasOpenedRef.current = true;
    setIsOpen(true);
  }

  useEffect(() => {
    if (!isOpen) {
      const focusFrame = hasOpenedRef.current
        ? window.requestAnimationFrame(() => triggerRef.current?.focus())
        : undefined;

      return () => {
        if (focusFrame !== undefined) window.cancelAnimationFrame(focusFrame);
      };
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    parentNameInputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeDialog();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button, input, select, textarea, [tabindex]:not([tabindex='-1'])",
      );
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

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="group flex cursor-pointer items-center gap-3 pt-2 text-left outline-none"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#d8cbba] text-[#b0a290] transition group-hover:border-[#c5503a] group-hover:bg-[#fff0eb] group-hover:text-[#c5503a] group-focus-visible:border-[#c5503a] group-focus-visible:bg-[#fff0eb] group-focus-visible:text-[#c5503a]">
          <svg
            aria-hidden="true"
            className="h-[18px] w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span className="text-[14.5px] font-extrabold text-[#c5503a] transition group-hover:text-[#a94230] group-focus-visible:text-[#a94230]">
          Vincular otro padre
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#3f362e]/35 p-4 sm:p-6"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-parent-title"
            className="max-h-full w-full max-w-[480px] overflow-y-auto rounded-[24px] border border-[#ece0d0] bg-[#fbf4ec] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]"
          >
            <header className="flex items-center justify-between border-b border-[#ece0d0] px-5 py-5 sm:px-[26px]">
              <div>
                <h2
                  id="add-parent-title"
                  className="font-display text-[18px] font-semibold text-text"
                >
                  Vincular padre
                </h2>
                <p className="text-[13px] text-[#a89a8b]">a {kidName}</p>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Cerrar diálogo"
                className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] bg-[#f0e6d8] text-[#94887b] transition hover:bg-[#e5d5c3] hover:text-[#6e6359] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a]"
              >
                <svg
                  aria-hidden="true"
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            </header>

            <form
              noValidate
              onSubmit={event => {
                event.preventDefault();
                handleSubmit();
              }}
              className="p-5 sm:p-[26px]"
            >
              <div className="mb-5 flex gap-[11px] rounded-[14px] bg-[#e3ecfb] px-4 py-[13px]">
                <svg
                  aria-hidden="true"
                  className="mt-px h-5 w-5 shrink-0 text-[#4e72c8]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <p className="text-[13.5px] leading-[1.45] text-[#3f5694]">
                  Le enviaremos un correo con un código para que active su cuenta. Solo
                  verá el feed de {kidName}.
                </p>
              </div>

              <label className="mb-[18px] block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">
                  NOMBRE DEL PADRE/MADRE
                </span>
                <input
                  ref={parentNameInputRef}
                  name="parentName"
                  value={formValues.parentName}
                  onChange={event => updateField('parentName', event.target.value)}
                  placeholder="Ej. Diego Fernández"
                  aria-describedby={errors.parentName ? 'parent-name-error' : undefined}
                  aria-invalid={Boolean(errors.parentName)}
                  className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] ${errors.parentName ? 'border-coral' : 'border-[#eadfd0]'}`}
                />
                {errors.parentName && (
                  <p
                    id="parent-name-error"
                    className="mt-1.5 text-[13px] font-bold text-coral-dark"
                  >
                    {errors.parentName}
                  </p>
                )}
              </label>

              <label className="mb-[18px] block">
                <span className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">
                  EMAIL
                </span>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={event => updateField('email', event.target.value)}
                  placeholder="correo@ejemplo.com"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={Boolean(errors.email)}
                  className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-text outline-none placeholder:text-[#b6a99b] ${errors.email ? 'border-coral' : 'border-[#eadfd0]'}`}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1.5 text-[13px] font-bold text-coral-dark"
                  >
                    {errors.email}
                  </p>
                )}
              </label>

              <fieldset
                aria-describedby={errors.relation ? 'relation-error' : undefined}
                className="mb-5"
              >
                <legend className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887b]">
                  PARENTESCO
                </legend>
                <div className="flex gap-[9px]">
                  <button
                    type="button"
                    onClick={() => updateField('relation', 'mother')}
                    aria-pressed={formValues.relation === 'mother'}
                    className={`flex-1 cursor-pointer rounded-full border-[1.5px] py-[11px] text-[14px] font-extrabold transition hover:border-[#9fb8ec] hover:bg-[#e4ebfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e72c8] ${formValues.relation === 'mother' ? 'border-[#9fb8ec] bg-[#ccd8f4] text-[#4e72c8]' : 'border-[#ece0d0] bg-[#fffdf9] text-[#6e6359]'}`}
                  >
                    Mamá
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('relation', 'father')}
                    aria-pressed={formValues.relation === 'father'}
                    className={`flex-1 cursor-pointer rounded-full border-[1.5px] py-[11px] text-[14px] font-extrabold transition hover:border-[#9fb8ec] hover:bg-[#e4ebfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e72c8] ${formValues.relation === 'father' ? 'border-[#9fb8ec] bg-[#ccd8f4] text-[#4e72c8]' : 'border-[#ece0d0] bg-[#fffdf9] text-[#6e6359]'}`}
                  >
                    Papá
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('relation', 'guardian')}
                    aria-pressed={formValues.relation === 'guardian'}
                    className={`flex-1 cursor-pointer rounded-full border-[1.5px] py-[11px] text-[14px] font-extrabold transition hover:border-[#9fb8ec] hover:bg-[#e4ebfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e72c8] ${formValues.relation === 'guardian' ? 'border-[#9fb8ec] bg-[#ccd8f4] text-[#4e72c8]' : 'border-[#ece0d0] bg-[#fffdf9] text-[#6e6359]'}`}
                  >
                    Tutor/a
                  </button>
                </div>
                {errors.relation && (
                  <p
                    id="relation-error"
                    className="mt-1.5 text-[13px] font-bold text-coral-dark"
                  >
                    {errors.relation}
                  </p>
                )}
              </fieldset>

              <div className="mb-5 rounded-[16px] border-[1.5px] border-dashed border-[#e6d08a] bg-[#fbf1d6] p-[18px] text-center">
                <p className="mb-2 text-[12px] font-extrabold tracking-[0.7px] text-[#a88526]">
                  CÓDIGO DE INVITACIÓN
                </p>
                <p className="font-display text-[34px] font-semibold tracking-[7px] text-[#8a7234]">
                  7K4P9
                </p>
                <p className="mt-1.5 text-[13px] text-[#a88526]">Vence en 7 días</p>
              </div>

              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-[14px] bg-gradient-to-b from-[#f4977e] to-[#ee8164] py-[14px] text-[15.5px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] transition hover:brightness-95 hover:shadow-[0_12px_24px_-8px_rgba(238,129,100,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5503a]"
              >
                <svg
                  aria-hidden="true"
                  className="h-[19px] w-[19px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4z" />
                  <path d="M22 2 11 13" />
                </svg>
                Enviar invitación
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
