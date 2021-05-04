export class SignupController {
  handle(httpRequest) {
    return {statusCode: 400, body: 'Missing param: name'}
  }
}
