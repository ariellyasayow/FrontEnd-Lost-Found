function normalizePhoneNumber(value: string) {
  const digitsOnly = value.replace(/\D/g, '');

  if (digitsOnly.startsWith('0')) {
    return `62${digitsOnly.slice(1)}`;
  }

  return digitsOnly;
}

export function createWhatsAppLink(phoneNumber: string, message?: string) {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);
  const text = message ? `?text=${encodeURIComponent(message)}` : '';

  return `https://wa.me/${normalizedPhone}${text}`;
}
