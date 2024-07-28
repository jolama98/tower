import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class CommentsService {
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }

  async createComments(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async deleteComment(commentId, userId) {
    const commentToArchive = await dbContext.Comments.findById(commentId)
    if (userId != commentToArchive.creatorId) throw new Forbidden("")
    await commentToArchive.deleteOne()
    return `whoop whoop`
  }

  // async deleteEventTicket(eventTicketId, userId) {
  //   const eventTicketDelete = await dbContext.Ticket.findById(eventTicketId)
  //   if (userId != eventTicketDelete.accountId) throw new Forbidden("No way no how!!!!")
  //   await eventTicketDelete.deleteOne()
  //   return `Now you can stay home`
  // }
}

export const commentsService = new CommentsService()

