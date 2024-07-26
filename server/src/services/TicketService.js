import { dbContext } from "../db/DbContext.js";



class TicketService {


  async createTicket(ticketData) {
    const ticketEvent = await dbContext.Ticket.create(ticketData)
    await ticketEvent.populate('profile')
    return ticketEvent
  }

  async getTicketByEventId(accountId) {
    //                                              {accountId: '668f0c3398d7a494b5eff57e'}
    // FIXME make sure you are populating the correct virtual. This test expects profile information to be attahced to the request (profile or event)
    const eventTicket = await dbContext.Ticket.find({ accountId }).populate('profile')
    return eventTicket
  }
}

export const ticketService = new TicketService();
