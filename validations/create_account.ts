import * as yup from "yup"

export const contactFormSchema = yup.object({
  email: yup.string().email().required(),

})
