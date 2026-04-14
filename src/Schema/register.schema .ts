import * as z from 'zod'
import { da } from 'zod/v4/locales'

export const defaultValue = {

    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""

}
export const RegisterSchema = z.object({
    name: z.string().nonempty('name is required').min(3, 'min length 3 char').max(15, 'max length is 15 char'),
    email: z.email({ error: "invalid email " }),
    password: z.string().nonempty({ error: "password requierd" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "password is wrong")
    , rePassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'invalid password'),
    phone: z.string().nonempty("phone is required").regex(/^01[0125][0-9]{8}$/, "invalid egypt phone number")

}).refine((data) => {
    if (data.password == data.rePassword) {
        return true
    }
    return false
}, { error: "password are not match", path: ["rePassword"] })
export type RegisterPayloadType = z.infer<typeof RegisterSchema>