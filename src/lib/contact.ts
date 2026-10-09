/**
 * Validering för kontaktformuläret. Delas mellan webbläsaren och servern så
 * att samma regler gäller på båda ställena.
 */

export const subjects = [
  "Specialbeställning",
  "Fråga om sortimentet",
  "Reparation",
  "Övrigt",
] as const;

export const subjectFromParam: Record<string, (typeof subjects)[number]> = {
  specialbestallning: "Specialbeställning",
  sortiment: "Fråga om sortimentet",
  reparation: "Reparation",
};

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const limits = { name: 100, email: 200, message: 5000, messageMin: 10 } as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (name.length < 2) errors.name = "Ange ditt namn.";
  else if (name.length > limits.name) errors.name = `Namnet får vara högst ${limits.name} tecken.`;

  if (!email) errors.email = "Ange din e-postadress.";
  else if (email.length > limits.email || !emailPattern.test(email))
    errors.email = "Ange en giltig e-postadress, till exempel namn@foretag.se.";

  if (!subjects.includes(input.subject as (typeof subjects)[number])) errors.subject = "Välj ett ämne.";

  if (message.length < limits.messageMin)
    errors.message = `Skriv ett meddelande på minst ${limits.messageMin} tecken.`;
  else if (message.length > limits.message)
    errors.message = `Meddelandet får vara högst ${limits.message} tecken.`;

  return errors;
}
