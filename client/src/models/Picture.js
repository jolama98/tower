import { Account } from "./Account.js"


export class Picture {
  constructor(data) {
    this.body = data.body
    this.id = data.id
    this.eventId = data.eventId
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = new Account(data.creator)
  }
}
