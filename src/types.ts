import type { LogLevel } from './enums'

export interface ILogger {
  name: string
  enabled: boolean
  logLevel: LogLevel
  log(...args: any[]): void
  error(...args: any[]): void
  warn(...args: any[]): void
}

export interface IOptions {
  enabled?: ILogger['enabled']
  logLevel?: ILogger['logLevel']
}