export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never }

export type ActionError = {
  code: string
  message: string
  details?: unknown
}
