// src/domain/comment/exception/comment-depth-exceeded.exception.ts
import { ApplicationException } from '../../../common/exception/application.exception';
import { ErrorCode } from '../../../common/exception/error-code.enum';

export class CommentDepthExceededException extends ApplicationException {
  constructor() {
    super(ErrorCode.COMMENT_DEPTH_EXCEEDED);
  }
}
