import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class EventsService {

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator')
    return event
  }

  async getAllEvents() {
    const events = await dbContext.Events.find().sort('-createdAr').populate('creator')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator')
    if (event == null) throw new Error(`No event with id ${eventId}`)
    return event
  }


  async editEvent(eventId, userId, eventUpData) {
    const originalEvent = await this.getEventById(eventId)
    if (userId != originalEvent.creatorId) throw new Forbidden('YOU CAN NOT UPDATE A EVENT YOU DID NOT CREATE, BUD')
    originalEvent.description = eventUpData.description || eventUpData.description
    originalEvent.name = eventUpData.name || eventUpData.name
    await originalEvent.save()
    return originalEvent
  }

  async archiveEventById(eventId, userId) {
    const eventToArchive = await this.getEventById(eventId)
    if (userId != eventToArchive.creatorId) throw new Forbidden(`No way man`)

    eventToArchive.isCanceled = !eventToArchive.isCanceled
    await eventToArchive.save()
    return `${eventToArchive.name} was archived successfully`
  }

}



export const eventsService = new EventsService()
