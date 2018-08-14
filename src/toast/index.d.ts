export interface IToastOptions {
  duration?: number
  icon?: string
  className?: string
}

export interface IToastInstance {
  show(message: string, options?: IToastOptions): Promise<any>
  success(message: string, options?: IToastOptions): Promise<any>
  error(message: string, options?: IToastOptions): Promise<any>
  spin(message?: string, options?: IToastOptions): void
  hide(natural?: boolean): void
}

declare const _default: IToastInstance
export default _default
