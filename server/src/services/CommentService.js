import { dbContext } from "../db/DbContext.js";

class CommentsService {



  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }

  // async getAlbumPictures(albumId) {
  //   const pictures = await dbContext.Pictures.find({ albumId: albumId }).populate('creator')
  //   return pictures
  // }

  async createComments(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }
}

export const commentsService = new CommentsService()

