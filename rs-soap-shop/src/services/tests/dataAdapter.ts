import { dataAdapter } from '../handleRegistration'
import { RegistrationData } from '../../lib/interfaces'

const data: RegistrationData = {
  firstName: 'A',
  secondName: 'B',
  email: 'q@q.com',
  password: 'qqq',
  date: '10-12-1950',
  billingAddress: {
    country: 'Italy',
    city: 'qqq',
    street: 'qqq',
    house: 'qqq',
    postalCode: '12345',
    isDefault: true
  },
  shippingAddress: {
    country: 'Germany',
    city: 'qqq',
    street: 'qqq',
    house: 'qqq',
    postalCode: '12345',
    isDefault: true
  }
}

it('returns proper data', () => {
  dataAdapter(data)
  expect(data.shippingAddress.country).toEqual('IT')
  expect(data.billingAddress.country).toEqual('DE')
})
