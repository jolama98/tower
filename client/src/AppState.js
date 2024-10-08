import { reactive } from 'vue'
import { Event } from './models/Event.js'
import { EventTicketHolderProfile, AlbumMemberAlbum } from './models/EventGoer.js'
import { Picture } from './models/Picture.js'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Event[]} */
  events: [],
  /** @type {Event} */
  activeEvent: null,

  /** @type {Picture[]} */
  eventPictures: [],

  /** @type {EventTicketHolderProfile[]} */
  eventTicketHolderProfiles: [],

  /** @type {AlbumMemberAlbum[]} */
  accountEvents: []
})
