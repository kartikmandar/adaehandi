/**
 * Global type definitions for AdaEhandi
 * Add shared types, interfaces, and type utilities here
 */

// Common utility types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined

// API response wrapper
export interface ApiResponse<T> {
  data: T
  error?: string
  success: boolean
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Common props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Will add more types as we build
