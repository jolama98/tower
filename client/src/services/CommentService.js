
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js"



class CommentService {
  async getEventComments(eventId) {
    AppState.eventPictures = []
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log('🎃👏', response.data)
    const comments = response.data.map(commentData => new Picture(commentData))
    AppState.eventPictures = comments
  }

  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('🤳🤳🤳🤳🤳🤳', response.data)
    const newComment = new Picture(response.data)
    AppState.eventPictures.push(newComment)
  }

  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log(response.data)
    const commentToRemove = AppState.eventPictures.findIndex(ctr => ctr.id == commentId)
    AppState.eventPictures.splice(commentToRemove, 1)
  }



  // async deleteAlbumMember(accountEventId) {
  //   const response = await api.delete(`api/tickets/${accountEventId}`)
  //   logger.log('Tick, tick, BOOOMMMM', response.data)
  //   const eventToRemove = AppState.accountEvents.findIndex(rte => rte.id == accountEventId)
  //   AppState.accountEvents.splice(eventToRemove, 1)

  // }
}


export const commentService = new CommentService()
