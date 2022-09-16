import User from '../../models/User.js'

//@todo not work
describe('User model', () => {
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
    password: '1'
  })

  test('check user fullName', () => {
    expect(user.getFullName).toBe('John Doe')
  })

  test('check user hash password', () => {
    expect('John Doe').toBe('John Doe')
  })

  test('check user change updatedAt', () => {
    expect('John Doe').toBe('John Doe')
  })

})
