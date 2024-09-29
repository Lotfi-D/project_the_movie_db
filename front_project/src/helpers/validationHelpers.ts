import { helpers } from '@vuelidate/validators';


const alphaNumWithSpacesRegex = (value: string) => {
  const regex = /^[A-Za-z0-9\s]+$/
  return regex.test(value)
} 

export const alphaNumWithSpaces = helpers.withMessage('The message can only contain alphanumeric characters', alphaNumWithSpacesRegex)

