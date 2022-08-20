import { Logger } from './class'
import type { LogLevel } from './types'

const LogLevelNumber: Record<LogLevel, number> = {
  info: 0,
  warn: 1,
  error: 2
}

export const checkEnabled = (logType: LogLevel) => {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): void {
    const originalMethod = descriptor.value
    descriptor.value = function (this: Logger, ...args: any[]): void {
      if (!this.enabled) return
      if (LogLevelNumber[logType] < LogLevelNumber[this.logLevel]) return
      
      originalMethod.apply(this, args)
    }
  }
}
