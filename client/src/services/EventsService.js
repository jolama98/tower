import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class EventsService {

  async createEvent(eventData) {
    const response = await api.post('api/events', eventData)
    logger.log('🎃📡', response.data)
    const newEvent = new Event(response.data)
    AppState.events.unshift(newEvent)
    return newEvent
  }

  async getAllEvents() {
    const response = await api.get('api/events')
    logger.log('🎃📡', response.data)
    const events = response.data.map(eventData => new Event(eventData))
    AppState.events = events
  }
}


export const eventsService = new EventsService()




