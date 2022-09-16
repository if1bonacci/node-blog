import AuthService from '../../services/AuthService.js'
// jest.mock('../../models/User')

//@todo not work
describe('AuthService', () => {
  const authService = new AuthService()
  //
  test('success auth', async () => {
    try {
      // let result = await authService.authenticateUser('te@re.com', 123, ()=>{});
      // console.log(result)
    } catch (e) {
      console.log(e)
    }

  })

})
