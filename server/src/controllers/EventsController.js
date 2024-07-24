import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('/:eventId', this.getEventById)
      .get('', this.getAllEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      // .put('/:eventId', this.editEvent);
      .delete('/:eventId', this.archiveEventById)
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

  async getAllEvents(request, response, next) {
    try {
      const events = await eventsService.getAllEvents()
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const event = await eventsService.getEventById(eventId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  // async editEvent(request, response, next) {
  //   try {
  //     const eventId = request.params.eventId;
  //     const updatedData = request.body;
  //     const user = request.userInfo;
  //     const event = await eventsService.editEvent(eventId, updatedData, user.id);
  //     response.send(event);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async archiveEventById(request, response, next) {
    try {
      const user = request.userInfo
      const eventId = request.params.eventId
      const message = await eventsService.archiveEventById(eventId, user.id)
      request.send(message);
    } catch (error) {
      next(error)
    }
  }

}
