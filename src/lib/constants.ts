/**
 * Application-wide constants
 */

export const SITE_NAME = 'AdaEhandi'
export const SITE_DESCRIPTION = 'Premium North Indian Catering Services in Delhi NCR'

export const CONTACT = {
  phone: '+91 XXXX XXXXXX',
  email: 'info@adaehandi.com',
  address: 'Delhi NCR, India',
} as const

export const SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  twitter: '',
  youtube: '',
} as const

// Cuisine categories
export const CUISINE_CATEGORIES = ['Punjabi', 'Mughlai', 'Awadhi', 'Chaat', 'Desserts'] as const

// Event types
export const EVENT_TYPES = [
  'Wedding',
  'Corporate',
  'Birthday',
  'Anniversary',
  'Private Party',
] as const

// Dietary options
export const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Jain', 'Halal'] as const
