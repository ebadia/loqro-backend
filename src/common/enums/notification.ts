import { NotificationEnum } from './notification-enum'

export class Notification {
  type: NotificationEnum
  payload: any

  constructor(type: NotificationEnum, payload: any) {
    this.type = type
    this.payload = payload
  }
}
