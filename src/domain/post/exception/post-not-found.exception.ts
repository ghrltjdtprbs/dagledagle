import { ApplicationException } from '../../../common/exception/application.exception';
import { ErrorCode } from '../../../common/exception/error-code.enum';

export class PostNotFoundException extends ApplicationException {
  constructor() {
    super(ErrorCode.POST_NOT_FOUND);
  }
}
