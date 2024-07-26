import { AppState } from "../AppState.js";
import { EventGoerTicket } from "../models/EventGoer.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TicketService {

  async getTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    logger.log(response.data)
    const newTicket = new EventGoerTicket(response.data)
    AppState.eventGoers.push(newTicket)
    AppState.activeEvent.ticketCount++
  }
}


export const ticketService = new TicketService();
