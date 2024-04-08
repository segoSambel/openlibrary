import {z, ZodType} from "zod";

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1).max(100),
        address: z.string().min(1),
        phone: z.string().min(1).max(20),
    })

}
