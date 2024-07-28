import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";



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

  async deleteEventTicket(eventTicketId, userId) {
    const eventTicketDelete = await dbContext.Ticket.findById(eventTicketId)
    if (userId != eventTicketDelete.accountId) throw new Forbidden("No way no how!!!!")
    await eventTicketDelete.deleteOne()
    return `Now you can stay home`
  }
}

export const ticketService = new TicketService();
