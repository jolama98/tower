import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";


export class TicketController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.createTicketDelete)
    // .delete('/:albumMemberId', this.deleteAlbumMember)
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

  async createTicketDelete(request, response, next) {
    try {
      const eventTicketId = request.params.ticketId
      const userId = request.userInfo.id
      const message = await ticketService.deleteEventTicket(eventTicketId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  // async deleteAlbumMember(request, response, next) {
  //   try {
  //     const albumMemberId = request.params.albumMemberId
  //     const userId = request.userInfo.id
  //     const message = await albumMemberService.deleteAlbumMember(albumMemberId, userId)
  //     response.send(message)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}
