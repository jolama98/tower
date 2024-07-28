import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComments)
      .delete('/:commentId', this.deleteComment)
  }

  async createComments(request, response, next) {
    try {
      const user = request.userInfo
      const commentData = request.body
      commentData.creatorId = user.id
      const comment = await commentsService.createComments(commentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(request, response, next) {
    try {
      const user = request.userInfo
      const commentId = request.params.commentId
      const message = await commentsService.deleteComment(commentId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  // async archiveAlbumById(request, response, next) {
  //   try {
  //     const user = request.userInfo
  //     const albumId = request.params.albumId
  //     const message = await albumsService.archiveAlbumById(albumId, user.id)
  //     response.send(message)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
