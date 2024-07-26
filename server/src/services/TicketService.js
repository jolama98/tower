import { dbContext } from "../db/DbContext.js";



class TicketService {


  async createTicket(ticketData) {
    const ticketEvent = await dbContext.Ticket.create(ticketData)
    await ticketEvent.populate('profile')
    return ticketEvent
  }

  async getTicketByEventId(accountId) {
    const eventTicket = await dbContext.Ticket.find({ accountId }).populate('event')
    return eventTicket
  }

  async getEventTickets(eventId) {
    const tickets = await dbContext.Ticket.find({ eventId: eventId }).populate('profile')
    return tickets
  }

}

export const ticketService = new TicketService();
