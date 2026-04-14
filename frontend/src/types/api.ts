// Matches backend DATA_API_RULES.md mandatory response format:
// { success, data, errors, meta }
export interface ApiResponse<T> {
  success: boolean
  data: T | null
  errors: string[]
  meta: Record<string, unknown> | null
}
