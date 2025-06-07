export class Admin {

  static parse(json: any): Admin {
    return new Admin(
      json['error'],
      json['fieldsOptionsTypes'],
      json['config'],
    );
  }

  constructor(public readonly error: any,
              public readonly fieldsOptionsTypes: any,
              public readonly config: any,

  ) {}
}
