import { Account } from "./Account.js"
import { Event } from "./Event.js"

export class TicketEvent {
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
  }
}
export class EventTicketHolderProfile extends TicketEvent {
  constructor(data) {
    super(data)
    this.profile = new Account(data.profile)
  }
}

export class AlbumMemberAlbum extends TicketEvent {
  constructor(data) {
    super(data)
    this.event = new Event(data.event)
  }
}
