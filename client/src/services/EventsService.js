import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class EventsService {

  setActiveEvent(event) {
    AppState.activeEvent = event
  }

  async createEvent(eventData) {
    const response = await api.post('api/events', eventData)
    const newEvent = new Event(response.data)
    AppState.events.unshift(newEvent)
    return newEvent
  }

  async getEventById(eventId) {
    AppState.activeEvent = null
    const response = await api.get(`api/events/${eventId}`)

    const event = new Event(response.data)
    AppState.activeEvent = event
  }


  async getAllEvents() {
    const response = await api.get('api/events')

    const events = response.data.map(eventData => new Event(eventData))
    AppState.events = events
  }


  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    const eventCancel = AppState.activeEvent.isCanceled
    AppState.activeEvent.isCanceled = true

    // AppState.accountAlbums.splice(albumMemberIndexToRemove, 1)
  }

}


export const eventsService = new EventsService()




