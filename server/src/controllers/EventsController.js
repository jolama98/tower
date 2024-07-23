import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
  }



  async createEvent(request, response, next) {
    try {
      const user = request.userInfo
      const eventData = request.body
      eventData.creatorId = user.id
      const event = await eventsService.createEvent(eventData)
      // this is cool boyfriend
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
}
