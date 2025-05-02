// src/common/exception/application.exception.ts
export class ApplicationException extends Error {
    constructor(public readonly code: number, public readonly message: string) {
      super(message);
    }
  }
  
  