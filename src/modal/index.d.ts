export interface IModalAlertOptions {
  title?: string
  okText?: string
  okHref?: string
  className?: string
}

export interface IModalConfirmOptions extends IModalAlertOptions {
  cancelText?: string
  cancelHref?: string
}

export interface IModalInstance {
  alert (message: string, options?: IModalAlertOptions): Promise<1 | void>
  confirm (message: string, options?: IModalConfirmOptions): Promise<0 | 1 | void>
  hide (payload: any): void
}

declare const _default: IModalInstance

export default _default
