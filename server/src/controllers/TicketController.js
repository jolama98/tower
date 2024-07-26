import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";


export class TicketController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
  }

  async createTicket(request, response, next) {
    try {
      const user = request.userInfo
      const eventTicketData = request.body
      eventTicketData.accountId = user.id
      const eventTicket = await ticketService.createTicket(eventTicketData)
      response.send(eventTicket)
    } catch (error) {
      next(error)
    }
  }




}
