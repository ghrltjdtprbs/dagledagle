import { ApplicationException } from '../../../common/exception/application.exception';
import { ErrorCode } from '../../../common/exception/error-code.enum';

export class DuplicateEmailException extends ApplicationException {
  constructor() {
    super(ErrorCode.DUPLICATE_EMAIL);
  }
}
