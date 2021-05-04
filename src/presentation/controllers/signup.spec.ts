import { SignupController } from "./signup"

describe('SignupController', () => {
  test('should return 400 status if no name is provided', () => {
    // SUT: system under testing
    const sut = new SignupController()
    const httpRequest = {
      body: {
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
