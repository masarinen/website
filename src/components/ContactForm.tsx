"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  limits,
  subjectFromParam,
  subjects,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";
import { company } from "@/content/site";
import { ArrowRight, CheckIcon, MailIcon } from "./Icons";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

/** null = okänt (kontrolleras), true = skickas via servern, false = ej aktiverat */
type Enabled = boolean | null;

const fieldOrder: (keyof ContactInput)[] = ["name", "email", "subject", "message"];

function mailtoHref(v: ContactInput) {
  const subject = `${v.subject || "Förfrågan"} – ${v.name}`.trim();
  const body = `${v.message}\n\n${v.name}\n${v.email}`;
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const params = useSearchParams();
  const initialSubject = subjectFromParam[params.get("amne") ?? ""] ?? "";
  const [values, setValues] = useState<ContactInput>({
    name: "",
    email: "",
    subject: initialSubject,
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [enabled, setEnabled] = useState<Enabled>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/contact", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d: { enabled?: boolean }) => !cancelled && setEnabled(Boolean(d.enabled)))
      .catch(() => !cancelled && setEnabled(false));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status.kind === "sent" || status.kind === "error") statusRef.current?.focus();
  }, [status]);

  function update<K extends keyof ContactInput>(key: K, value: string) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors((e) => ({ ...e, [key]: validateContact(next)[key] }));
  }

  function blur(key: keyof ContactInput) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateContact(values)[key] }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Formuläret är inte kopplat till e-post ännu – öppna besökarens e-postprogram.
    if (enabled === false) {
      window.location.href = mailtoHref(values);
      return;
    }

    setStatus({ kind: "sending" });
    const website = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        message?: string;
        errors?: ContactErrors;
      };

      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        return;
      }
      if (data.error === "not_configured") {
        setEnabled(false);
        setStatus({ kind: "idle" });
        return;
      }
      if (data.error === "validation" && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
        return;
      }
      setStatus({
        kind: "error",
        message: data.message ?? "Meddelandet kunde inte skickas just nu.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Det gick inte att nå servern. Kontrollera din anslutning och försök igen.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-line bg-bone p-8 focus:outline-none sm:p-10"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-success text-ivory">
          <CheckIcon className="size-5" />
        </span>
        <h2 className="mt-6 text-[2rem]">Tack för ert meddelande</h2>
        <p className="mt-3 text-muted">
          Vi har tagit emot er förfrågan och återkommer till {values.email}. Brådskar det går det bra att
          ringa oss på{" "}
          <a href={company.phone.href} className="link-underline text-navy">
            {company.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const inputBase =
    "mt-2 block w-full rounded-none border bg-ivory px-4 py-3.5 text-[1rem] text-ink placeholder:text-muted/70 transition-colors focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-leather";
  const fieldClass = (key: keyof ContactInput) =>
    `${inputBase} ${errors[key] ? "border-error" : "border-line hover:border-muted/60"}`;
  const describedBy = (key: keyof ContactInput, extra?: string) =>
    [errors[key] ? `${id}-${key}-error` : null, extra].filter(Boolean).join(" ") || undefined;
  const errorText = (key: keyof ContactInput) =>
    errors[key] ? (
      <p id={`${id}-${key}-error`} className="mt-2 text-[0.875rem] text-error">
        {errors[key]}
      </p>
    ) : null;

  const errorCount = Object.values(errors).filter(Boolean).length;
  const sending = status.kind === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id}-info`} className="space-y-6">
      <div id={`${id}-info`} aria-live="polite">
        {enabled === false && (
          <div className="flex gap-4 border border-line bg-bone p-5 text-[0.9375rem]">
            <MailIcon className="mt-0.5 size-5 shrink-0 text-leather" />
            <p className="text-muted">
              <strong className="font-medium text-navy">Formuläret skickar inte meddelanden direkt ännu.</strong>{" "}
              När du klickar på knappen öppnas ditt e-postprogram med meddelandet ifyllt till {company.email}.
              Du kan också ringa oss på {company.phone.display}.
            </p>
          </div>
        )}
      </div>

      {errorCount > 0 && (
        <p role="alert" className="text-[0.9375rem] text-error">
          {errorCount === 1 ? "Ett fält behöver" : `${errorCount} fält behöver`} kompletteras innan meddelandet
          kan skickas.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-[0.875rem] font-medium text-navy">
            Namn <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={limits.name}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={fieldClass("name")}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-[0.875rem] font-medium text-navy">
            E-post <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={limits.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClass("email")}
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-subject`} className="text-[0.875rem] font-medium text-navy">
          Ämne <span aria-hidden="true">*</span>
        </label>
        <select
          id={`${id}-subject`}
          name="subject"
          required
          value={values.subject}
          onChange={(e) => {
            update("subject", e.target.value);
            setTouched((t) => ({ ...t, subject: true }));
            setErrors((er) => ({ ...er, subject: undefined }));
          }}
          onBlur={() => blur("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          className={`${fieldClass("subject")} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2317222f' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-12`}
        >
          <option value="" disabled>
            Välj ämne
          </option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errorText("subject")}
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="text-[0.875rem] font-medium text-navy">
          Meddelande <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={7}
          maxLength={limits.message}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", `${id}-message-hint`)}
          className={`${fieldClass("message")} resize-y`}
          placeholder="Beskriv gärna vad väskan ska innehålla, hur den ska användas och ungefärligt antal."
        />
        {errorText("message")}
        <p id={`${id}-message-hint`} className="mt-2 text-[0.8125rem] text-muted">
          {values.message.length} / {limits.message} tecken
        </p>
      </div>

      {/* Honungsfälla – dold för besökare och skärmläsare */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Lämna tomt</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border border-error/40 bg-error/5 p-5 text-[0.9375rem] focus:outline-none"
        >
          <p className="font-medium text-error">{status.message}</p>
          <p className="mt-1 text-muted">
            Försök igen, eller kontakta oss direkt på{" "}
            <a href={`mailto:${company.email}`} className="link-underline text-navy">
              {company.email}
            </a>{" "}
            eller {company.phone.display}.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8125rem] text-muted">
          <span aria-hidden="true">*</span> Obligatoriska fält. Uppgifterna används endast för att besvara
          er förfrågan.
        </p>
        <button
          type="submit"
          disabled={sending || enabled === null}
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full border border-navy bg-navy px-7 py-3 text-[0.9375rem] font-medium tracking-wide text-ivory transition-colors hover:bg-navy-soft disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? (
            <>
              <span
                className="size-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory"
                aria-hidden="true"
              />
              Skickar…
            </>
          ) : enabled === false ? (
            <>
              Skapa e-post
              <MailIcon className="size-4" />
            </>
          ) : (
            <>
              Skicka meddelande
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
