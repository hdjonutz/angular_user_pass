export interface IExpires {
  expires: number;
}
export enum EMessages {
  OK = 'OK',
  ERROR = 'ERROR',
}

export interface IMessages {
  message: EMessages.OK | EMessages.ERROR;
}
export interface IGranted {
  granted: boolean;
}
export interface IToken {
  token: string;
}

export class User {
  static parse(json: any): User {
    return new User(
      json['user'],
      json['uuid'],
      json['pass'],
      );
  }

  constructor(// public readonly id: any,
              public readonly user: string,
              public readonly uuid: string,
              public readonly pass?: string,
  ) {}
}
