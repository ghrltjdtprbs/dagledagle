import { ApplicationException } from '../../../common/exception/application.exception';
import { ErrorCode } from '../../../common/exception/error-code.enum';

export class PasswordMismatchException extends ApplicationException {
  constructor() {
    super(ErrorCode.PASSWORD_MISMATCH);
  }
}
