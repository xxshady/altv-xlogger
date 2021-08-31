import type { ILogger } from './types'
import type { LogLevel } from './enums'

export const checkEnabled = (logType: LogLevel) => {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): void {
    const originalMethod = descriptor.value
    descriptor.value = function (this: ILogger, ...args: any[]): void {
      if (!this.enabled) return
      if (logType < this.logLevel) return
      originalMethod.apply(this, args)
    }
  }
}