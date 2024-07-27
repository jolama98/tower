import { AppState } from "../AppState.js";
import { EventTicketHolderProfile } from "../models/EventGoer.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TicketService {

  async getTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    logger.log(response.data)
    const newTicket = new EventTicketHolderProfile(response.data)
    AppState.eventTicketHolderProfiles.push(newTicket)
    AppState.activeEvent.ticketCount++
  }



  async getEventGoers(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    const eventGoersProfiles = response.data.map(eventGoersData => new EventTicketHolderProfile(eventGoersData))
    AppState.eventTicketHolderProfiles = eventGoersProfiles
  }


  // async getAlbumMembersForAlbum(albumId) {
  //   const response = await api.get(`api/albums/${albumId}/collaborators`)
  //   logger.log('👺👺📡', response.data)
  //   const albumMemberProfiles = response.data.map(albumMemberData => new AlbumMemberProfile(albumMemberData))
  //   AppState.albumProfiles = albumMemberProfiles
  // }
}


export const ticketService = new TicketService();
