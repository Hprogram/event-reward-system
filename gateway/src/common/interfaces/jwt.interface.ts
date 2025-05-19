export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  nickname: string;
}

export interface RequestWithUser extends Request {
  user?: JwtPayload;
}
