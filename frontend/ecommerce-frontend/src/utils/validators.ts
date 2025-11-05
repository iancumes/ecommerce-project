/**
 * Valida si un email tiene el formato correcto
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida si un teléfono tiene el formato correcto (México)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+52)?[\s\-]?(\d{2,3})[\s\-]?(\d{3,4})[\s\-]?(\d{4})$/
  return phoneRegex.test(phone)
}

/**
 * Valida si un código postal es válido (México)
 */
export const isValidPostalCode = (postalCode: string): boolean => {
  const postalCodeRegex = /^\d{5}$/
  return postalCodeRegex.test(postalCode)
}

/**
 * Valida si una tarjeta de crédito tiene el formato correcto
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '')
  const cardRegex = /^\d{13,19}$/
  return cardRegex.test(cleaned)
}

/**
 * Valida si un CVV tiene el formato correcto
 */
export const isValidCVV = (cvv: string): boolean => {
  const cvvRegex = /^\d{3,4}$/
  return cvvRegex.test(cvv)
}

/**
 * Valida longitud mínima de un campo
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength
}

/**
 * Valida que un campo no esté vacío
 */
export const isRequired = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  return true
}

/**
 * Valida que un número esté en un rango
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}
