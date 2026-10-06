"use client";
import { ButtonText } from "@/components/ui/button/button-text";
// ---------------------------------------------------------------------------
// ContactForm: the "Start a project" card (Figma node 585:1535). Client
// Component: it checks the fields before sending, shows the errors in the
// Design System's Error state, and sends through the `sendInquiry` Server
// Action (actions.ts) with React's useActionState.
//
// Why onSubmit + startTransition instead of <form action={...}>: React
// clears a form after every `action` submission, even one that comes back
// with errors, which would wipe what the person typed. Sending from
// onSubmit keeps their input; the form is cleared only after a success.
//
// The chips are real checkboxes (services) and radios (budget), so their
// values arrive in the same FormData as the text fields.
//
// After a successful send the "Thank you" shows as a toast (contact-toast.tsx);
// the line next to the submit button only shows errors.
// ---------------------------------------------------------------------------
import { startTransition, useActionState, useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ChoiceChip } from "@/components/ui/choice-chip";
import { TextField } from "@/components/ui/text-field";
import { FIELD_HINT_ERROR, FIELD_LABEL } from "@/components/ui/text-field";
import { TextareaField } from "@/components/ui/textarea-field";
import type { ContactChipGroup, ContactFormContent, InquiryField, InquiryState } from "@/types/contact";
import { sendInquiry } from "./actions";
import {
  FIELD_ORDER,
  HONEYPOT_FIELD,
  LIMITS,
  readInquiry,
  validateInquiry,
  type InquiryErrors,
} from "./validation";
import { AnimatedText } from "@/components/ui/animated-text";
import { ContactToast } from "./contact-toast";

const INITIAL_STATE: InquiryState = { status: "idle" };
const INVALID_MESSAGE = "A few fields need a look.";
const TOAST_TITLE = "Thank you!";

export function ContactForm({ content }: { content: ContactFormContent }) {
  const [state, dispatch, pending] = useActionState(sendInquiry, INITIAL_STATE);
  // Errors found in the browser. `null` means "show the server's instead".
  const [clientErrors, setClientErrors] = useState<InquiryErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errors: InquiryErrors = clientErrors ?? state.fieldErrors ?? {};
  const hasClientErrors = clientErrors !== null && Object.keys(clientErrors).length > 0;
  const statusMessage = hasClientErrors ? INVALID_MESSAGE : state.status === "error" ? state.message : undefined;
  // The toast shows the latest successful send until it is closed. `state`
  // is a new object on every send, so a second success opens it again.
  const [dismissed, setDismissed] = useState<InquiryState | null>(null);
  const toastOpen = state.status === "success" && dismissed !== state;
  const closeToast = useCallback(() => setDismissed(state), [state]);

  // Clear the form once an inquiry has gone through.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  function focusFirstError(found: InquiryErrors) {
    const first = FIELD_ORDER.find((field) => found[field]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const found = validateInquiry(readInquiry(formData));
    if (Object.keys(found).length > 0) {
      setClientErrors(found);
      focusFirstError(found);
      return;
    }
    setClientErrors(null);
    startTransition(() => dispatch(formData));
  }

  // Typing in (or clicking) a field that has an error clears that error.
  function handleChange(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name as InquiryField;
    if (!errors[name]) return;
    const rest = { ...errors };
    delete rest[name];
    setClientErrors(rest);
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      aria-labelledby="contact-form-title"
      className="relative flex min-w-0 flex-1 flex-col gap-10 rounded-2xl bg-surface-primary p-5 md:p-8 xl:p-12"
      data-figma-node="585:1535"
    >
      <div className="flex flex-col gap-2">
        <h2 id="contact-form-title" className="font-sans text-heading-3 text-text-primary">
          <AnimatedText>
            {content.title}
          </AnimatedText>
        </h2>
        <p className="font-sans text-body-md text-text-secondary"><AnimatedText>{content.subtitle}</AnimatedText></p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="contact-field-grid grid gap-6 md:grid-cols-2">
          <TextField
            id="contact-name"
            name="name"
            label={content.name.label}
            placeholder={content.name.placeholder}
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            error={errors.name}
          />
          <TextField
            id="contact-company"
            name="company"
            label={content.company.label}
            placeholder={content.company.placeholder}
            autoComplete="organization"
            maxLength={LIMITS.company}
            error={errors.company}
          />
          <div className="contact-field-divider" aria-hidden="true" />
          <TextField
            id="contact-email"
            name="email"
            type="email"
            label={content.email.label}
            placeholder={content.email.placeholder}
            autoComplete="email"
            maxLength={LIMITS.email}
            required
            error={errors.email}
          />
          <TextField
            id="contact-phone"
            name="phone"
            type="tel"
            label={content.phone.label}
            placeholder={content.phone.placeholder}
            autoComplete="tel"
            maxLength={LIMITS.phone}
            error={errors.phone}
          />
        </div>

        <ChipGroup id="contact-services" name="services" type="checkbox" group={content.services} error={errors.services} />
        <ChipGroup id="contact-budget" name="budget" type="radio" group={content.budget} error={errors.budget} />

        <TextareaField
          id="contact-details"
          name="details"
          label={content.details.label}
          placeholder={content.details.placeholder}
          maxLength={LIMITS.details}
          required
          error={errors.details}
        />
      </div>

      {/* Honeypot: off screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className="button-sweep button-sweep--primary inline-flex h-[var(--button-size-lg-height)] items-center justify-center gap-[var(--button-gap)] whitespace-nowrap rounded-lg bg-button-primary-bg px-[var(--button-size-lg-padding-x)] font-mono text-label-md text-button-primary-text transition-colors hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed disabled:cursor-wait disabled:opacity-70"
        >
          <ButtonText text={pending ? content.pendingLabel : content.submitLabel} />
        </button>
        <p role="status" aria-live="polite" className="font-sans text-body-sm text-text-error">
          {pending ? "" : (statusMessage ?? "")}
        </p>
      </div>
      {toastOpen && <ContactToast title={TOAST_TITLE} message={state.message ?? ""} onClose={closeToast} />}
    </form>
  );
}

interface ChipGroupProps {
  id: string;
  name: InquiryField;
  type: "checkbox" | "radio";
  group: ContactChipGroup;
  error?: string;
}

/** A labelled row of chips (Figma "Chip Group": Label/SM, 12px gap, 8px between chips). */
function ChipGroup({ id, name, type, group, error }: ChipGroupProps) {
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  return (
    <div
      role={type === "radio" ? "radiogroup" : "group"}
      aria-labelledby={labelId}
      aria-describedby={error ? errorId : undefined}
      className="contact-chip-group flex flex-col gap-3"
    >
      <p id={labelId} className={FIELD_LABEL}>
        {group.label}
      </p>
      <div className="flex flex-wrap gap-2">
        {group.options.map((option) => (
          <ChoiceChip
            key={option.value}
            type={type}
            name={name}
            value={option.value}
            label={option.label}
            className="contact-choice-chip"
            aria-invalid={error ? true : undefined}
          />
        ))}
      </div>
      {error && (
        <p id={errorId} className={FIELD_HINT_ERROR}>
          {error}
        </p>
      )}
    </div>
  );
}
