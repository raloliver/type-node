import {HttpRequest, HttpResponse} from '../services/http.service'

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const response: HttpResponse = {
      statusCode: 200,
      body: {}
    }
    if (!httpRequest.body.name) {
      return {statusCode: 400, body: new Error('Missing param: name')}
    }

    if (!httpRequest.body.email) {
      return {statusCode: 400, body: new Error('Missing param: email')}
    }

    return response
  }
}
