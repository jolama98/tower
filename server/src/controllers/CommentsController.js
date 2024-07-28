import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComments)
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

}
