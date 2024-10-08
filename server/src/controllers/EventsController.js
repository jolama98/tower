import { commentsService } from "../services/CommentService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketService } from "../services/TicketService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/comments', this.getCommentsByEventId)
      .get('/:eventId/tickets', this.getEventByTicket)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)

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

  async getEventByTicket(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketService.getEventTickets(eventId)
      response.send(tickets)
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

  async getCommentsByEventId(request, response, next) {
    try {
      const eventId = request.params.eventId
      const comments = await commentsService.getCommentsByEventId(eventId)
      response.send(comments)
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

  async editEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const eventUpData = request.body
      const user = request.userInfo
      const event = await eventsService.editEvent(eventId, user.id, eventUpData)
      response.send(event)
    } catch (error) {
      next(error);
    }
  }

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

  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const message = await eventsService.archiveEventById(eventId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

}
