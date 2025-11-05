import { computed } from 'vue'

export function useFormatter() {
  const formatPrice = (price: number, currency: string = 'MXN'): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('es-MX').format(num)
  }

  const formatDate = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(d)
  }

  const formatDateTime = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d)
  }

  const calculateDiscount = (price: number, discount: number): number => {
    return price * (1 - discount / 100)
  }

  const formatDiscount = (discount: number): string => {
    return `${discount}% OFF`
  }

  return {
    formatPrice,
    formatNumber,
    formatDate,
    formatDateTime,
    calculateDiscount,
    formatDiscount
  }
}
