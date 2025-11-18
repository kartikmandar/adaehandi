/**
 * Utility functions for AdaEhandi
 */

/**
 * Format price in Indian Rupees
 * @example formatPrice(1000) => "₹1,000"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format Indian phone number
 * @example formatPhone("9876543210") => "+91 98765 43210"
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  return phone
}

/**
 * Create URL-friendly slug
 * @example slugify("Dal Makhani") => "dal-makhani"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Merge Tailwind CSS class names
 * Simple utility - will enhance with clsx/tailwind-merge later
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
