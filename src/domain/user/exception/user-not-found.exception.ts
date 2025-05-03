import { ApplicationException } from '../../../common/exception/application.exception';
import { ErrorCode } from '../../../common/exception/error-code.enum';

export class UserNotFoundException extends ApplicationException {
  constructor() {
    super(ErrorCode.USER_NOT_FOUND);
  }
}
