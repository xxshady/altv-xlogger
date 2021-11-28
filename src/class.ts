import alt from 'alt-shared'
import { checkEnabled } from './decorators'
import type { ILogger, IOptions } from './types'
import { LogLevel } from './enums'
import { format } from './utils/util-format'

export default class Logger implements ILogger {
  /**
   * rgb color: (0, 255, 255)
   */
  public static readonly startLogColor = '~cl~'
  public static readonly nodeCyanColor = '\x1b[36m'
  public static readonly nodeWhiteColor = '\x1b[37m'

  public name: string
  public enabled = true
  public logLevel = LogLevel.Info
  public readonly moreInfo: (...args: any[]) => void

  private constructor(name: string, options?: IOptions) {
    this.name = name

    if (options) this.applyOptions(options)

    this.log = this.log.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)

    this.moreInfo = alt.isServer
      ? this.moreInfoServer.bind(this)
      : this.moreInfoClient.bind(this)
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

  @checkEnabled(LogLevel.Info)
  public moreInfoServer (...args: any[]): void {
    const date = new Date()
    
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()    

    console.log(
      `[${formatDateUnit(hour)}:${formatDateUnit(minute)}:${formatDateUnit(second)}]`,
      `${Logger.nodeCyanColor}[${this.name}]${Logger.nodeWhiteColor}`, ...args
    )

    function formatDateUnit (unit: number): string | number {
      return unit >= 10 ? unit : `0${unit}`
    }
  }

  @checkEnabled(LogLevel.Info)
  public moreInfoClient (...args: any[]): void {
    alt.log(`${Logger.startLogColor}[${this.name}]~w~`, ...args.map(a => format(a)))
  }
}