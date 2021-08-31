import alt from 'alt-shared'
import Logger from './class'
import { LogLevel } from './enums'
import type { ILogger, IOptions } from './types'

export default function (name: string, options: IOptions = { }): ILogger {
  const {
    enabled = true,
    logLevel = alt.debug ? LogLevel.Info : LogLevel.Warn,
  } = options
  return Logger.create(name, { enabled, logLevel })
}
