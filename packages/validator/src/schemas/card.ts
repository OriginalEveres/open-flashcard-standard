import { z } from 'zod';

import { ContentSchema } from './content.js';

export const HexColorSchema = z
    .string()
    .regex(
        /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        'Must be a valid hex color, e.g. #fff or #1a1a1a',
    );

export const CardSchema = z.object({
    id: z.string().min(1, 'Card id must not be empty'),
    front: z.array(ContentSchema).min(1, 'Front face must contain at least one content item'),
    frontBackground: HexColorSchema.optional(),
    back: z.array(ContentSchema).min(1, 'Back face must contain at least one content item'),
    backBackground: HexColorSchema.optional(),
    tags: z.array(z.string()).optional(),
    metadata: z.record(z.unknown()).optional(),
});

export type HexColor = z.infer<typeof HexColorSchema>;
export type Card = z.infer<typeof CardSchema>;
