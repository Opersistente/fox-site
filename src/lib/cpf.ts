/** Remove tudo que não for dígito. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Formata um CPF (11 dígitos) como 000.000.000-00. */
export function formatCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function checkDigit(digits: string, length: number): number {
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += Number(digits[i]) * (length + 1 - i);
  }
  const rest = (sum * 10) % 11;
  return rest === 10 ? 0 : rest;
}

/** Valida um CPF pelo algoritmo padrão de dígitos verificadores (módulo 11). */
export function isValidCpf(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 11) return false;
  // Rejeita sequências repetidas (000.000.000-00, 111.111.111-11, etc.), que passam
  // no cálculo do dígito verificador mas nunca são CPFs válidos na prática.
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const firstDigit = checkDigit(digits, 9);
  if (firstDigit !== Number(digits[9])) return false;

  const secondDigit = checkDigit(digits, 10);
  if (secondDigit !== Number(digits[10])) return false;

  return true;
}

/** Formata um telefone brasileiro como (00) 00000-0000 ou (00) 0000-0000. */
export function formatPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}
