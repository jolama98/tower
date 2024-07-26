import { Account } from "./Account.js"

export class EventGoer {
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
  }
}

export class EventGoerTicket extends EventGoer {
  constructor(data) {
    super(data)
    this.profile = new Account(data.profile)
  }
}



