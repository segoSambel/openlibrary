import {z, ZodType} from "zod";

export class BookValidation {

    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        category: z.string().min(1).max(100),
        cover: z.string().min(1).max(255),
        overview: z.string().min(1),
        isbn: z.string().min(1).max(20),
        publicationYear: z.string().length(4),
        publisherId: z.string().uuid(),
        authorId: z.string().uuid()
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(100).optional(),
        category: z.string().min(1).max(100).optional(),
        cover: z.string().min(1).max(255).optional(),
        overview: z.string().min(1).optional(),
        isbn: z.string().min(1).max(20).optional(),
        publicationYear: z.string().length(4).optional(),
        publisherId: z.string().uuid().optional(),
        authorId: z.string().uuid().optional()
    });
}
