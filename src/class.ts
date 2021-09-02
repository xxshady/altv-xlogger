import alt from 'alt-shared'
import { checkEnabled } from './decorators'
import type { ILogger, IOptions } from './types'
import { LogLevel } from './enums'

export default class Logger implements ILogger {
  /**
   * rgb color: (0, 255, 255)
   */
  public static readonly startLogColor = '~cl~'
  public name: string
  public enabled = true
  public logLevel = LogLevel.Info

  private constructor(name: string, options?: IOptions) {
    this.name = name

    if (options) this.applyOptions(options)

    this.log = this.log.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)
  }

  public static create(name: string, options: IOptions): ILogger {
    return new Logger(name, options)
  }

  private applyOptions(options: IOptions): void {
    const {
      logLevel = this.logLevel,
      enabled = this.enabled
    } = options
    this.logLevel = logLevel
    this.enabled = enabled
  }

  @checkEnabled(LogLevel.Info)
  public log(...args: any[]): void {
    alt.log(`${Logger.startLogColor}[${this.name}]~w~`, ...args)
  }

  @checkEnabled(LogLevel.Warn)
  public warn(...args: any[]): void {
    alt.logWarning(`[${this.name}]`, ...args)
  }

  @checkEnabled(LogLevel.Error)
  public error(...args: any[]): void {
    if (args[0] instanceof Error) {
      args[0] = args[0].stack
    }
    alt.logError(`[${this.name}]`, ...args)
  }
}