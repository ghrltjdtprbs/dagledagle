// src/common/exception/error-code.enum.ts
export enum ErrorCode {
  DUPLICATE_EMAIL = '이미 가입된 이메일입니다',
  USER_NOT_FOUND = '존재하지 않는 사용자입니다',
  PASSWORD_MISMATCH = '현재 비밀번호가 일치하지 않습니다',
  FORBIDDEN_ACCESS = '권한이 없습니다',
  POST_NOT_FOUND = '존재하지 않는 게시글입니다',
  COMMENT_NOT_FOUND = '존재하지 않는 댓글입니다',
  COMMENT_DEPTH_EXCEEDED = '대댓글은 1단계까지만 허용됩니다.',
}
