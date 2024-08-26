import {z, ZodType} from "zod";

export class PublisherValidation {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        location: z.string().min(1).max(100)
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid(),
        name: z.string().min(1).max(100),
        location: z.string().min(1).max(100)
    });

}
