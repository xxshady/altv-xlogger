import alt from 'alt-shared'
import { Logger } from './class'
import type { IOptions } from './types'

export const createLogger = (name: string, options?: IOptions): Logger => {
  return new Logger(name, options)
}
