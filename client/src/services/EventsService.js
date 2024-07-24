import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class EventsService {
  async getAllEvents(eventData) {
    const response = await api.get('api/events')
    logger.log('🎃📡', response.data)
    const events = response.data.map(eventData => new Event(eventData))
    AppState.event = events
  }
}


export const eventsService = new EventsService()
