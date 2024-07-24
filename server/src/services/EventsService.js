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
  async archiveEventById(eventId, userId) {
    const eventToArchive = await this.getEventById(eventId)
    if (userId != eventToArchive.creatorId) throw new Forbidden(`No way man`)

    eventToArchive.isCanceled = !eventToArchive.isCanceled
    await eventToArchive.save()
    return `${eventToArchive.name} was archived successfully`
  }

  // async archiveAlbumById(albumId, userId) {
  //   const albumToArchive = await this.getAlbumById(albumId)
  //   if (userId != albumToArchive.creatorId) throw new Forbidden(`You shall not pass!, this is not yours!`)

  //   // await albumToArchive.deleteOne()
  //   // return `Deleted ${albumToArchive.title}`
  //   // albumToArchive.archived = true
  //   albumToArchive.archived = !albumToArchive.archived // flips the bool
  //   await albumToArchive.save()
  //   return `${albumToArchive.title} was archived`
  // }

}



export const eventsService = new EventsService()
