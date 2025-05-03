import { ApplicationException } from '../../../common/exception/application.exception';
import { ErrorCode } from '../../../common/exception/error-code.enum';

export class ForbiddenAccessException extends ApplicationException {
  constructor() {
    super(ErrorCode.FORBIDDEN_ACCESS);
  }
}
