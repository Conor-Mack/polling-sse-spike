export class HTTPErrror extends Error {
  status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "HTTPErrror";
    this.status = statusCode;
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

export class InvalidDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidDataError";
  }
}
