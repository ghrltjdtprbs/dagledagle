import { ApplicationException } from '../../../common/exception/application.exception';
import { ErrorCode } from '../../../common/exception/error-code.enum';

export class CommentNotFoundException extends ApplicationException {
  constructor() {
    super(ErrorCode.COMMENT_NOT_FOUND);
  }
}
