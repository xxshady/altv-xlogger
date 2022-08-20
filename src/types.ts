export type LogLevel = "info" | "warn" | "error"

export interface IOptions {
  enabled?: boolean
  logLevel?: LogLevel
}
