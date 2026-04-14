import * as z from 'zod'

export  const defaultValue = {
    email: "",
    password: ""
}
export const LoginSchema = z.object({
    email: z.email({ error: "invalid email " }),
    password: z.string().nonempty({ error: "password requierd" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "password is wrong")
});
export type LoginPayloadType = z.infer<typeof LoginSchema>