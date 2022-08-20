import alt from 'alt-shared'
import { checkEnabled } from './decorators'
import type { IOptions, LogLevel } from './types'

export class Logger {
  /**
   * rgb color: (0, 255, 255)
   */
  public static readonly startLogColor = '~cl~'

  public name: string
  public enabled = true
  public logLevel: LogLevel = "info"

  constructor(name: string, options?: IOptions) {
    this.name = name

    if (options) this.applyOptions(options)

    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)
  }

  private applyOptions(options: IOptions): void {
    const {
      logLevel = this.logLevel,
      enabled = this.enabled
    } = options
    this.logLevel = logLevel
    this.enabled = enabled
  }

  @checkEnabled("info")
  public info(...args: any[]): void {
    this._info(args)
  }

  /**
   * Is the same as {@link info}, except it doesn't checks for {@link logLevel}
   */
  public infoUnchecked(...args: any[]): void {
    this._info(args)
  }

  @checkEnabled("warn")
  public warn(...args: any[]): void {
    alt.logWarning(`[${this.name}]`, ...args)
  }

  @checkEnabled("error")
  public error(...args: any[]): void {
    if (args[0] instanceof Error) {
      args[0] = args[0].stack
    }
    alt.logError(`[${this.name}]`, ...args)
  }

  private _info (args: any[]): void {
    alt.log(`${Logger.startLogColor}[${this.name}]~w~`, ...args)
  }
}
