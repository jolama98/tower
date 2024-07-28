import { AppState } from "../AppState.js";
import { EventTicketHolderProfile, AlbumMemberAlbum } from "../models/EventGoer.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TicketService {

  async getTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    const newTicket = new EventTicketHolderProfile(response.data)
    AppState.eventTicketHolderProfiles.push(newTicket)
    AppState.activeEvent.ticketCount++
  }

  async getEventGoers(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    const getEventGoers = response.data.map(eventGoersData => new EventTicketHolderProfile(eventGoersData))
    AppState.eventPictures = getEventGoers
  }


  async getAccountEventTicket() {
    const response = await api.get('account/tickets')
    logger.log('🎫 🎫 🎫 🎫 🎫', response.data)
    const eventGoersProfiles = response.data.map(eventGoersData => new AlbumMemberAlbum(eventGoersData))
    AppState.accountEvents = eventGoersProfiles
  }

  // async getAccountAlbumMemberAlbums() {
  //   const response = await api.get('account/collaborators')
  //   logger.log('👺🤠📡', response.data)
  //   const albumMemberAlbums = response.data.map(albumMemberData => new AlbumMemberAlbum(albumMemberData))
  //   AppState.accountAlbums = albumMemberAlbums
  // }
}


export const ticketService = new TicketService();
