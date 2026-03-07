import { type Card, type HexColor } from '@open-flashcard/spec';
import { z } from 'zod';

import { ContentSchema } from './content.js';

// z.string().regex() infers as `string`, which doesn't satisfy the `#${string}`
// template literal type from spec. z.custom<HexColor>() carries the exact type through.
export const HexColorSchema = z.custom<HexColor>(
    val => typeof val === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val),
    { message: 'Must be a valid hex color, e.g. #fff or #1a1a1a' },
);

export const CardSchema = z.object({
    id: z.string().min(1, 'Card id must not be empty'),
    front: z.array(ContentSchema).min(1, 'Front face must contain at least one content item'),
    frontBackground: HexColorSchema.optional(),
    back: z.array(ContentSchema).min(1, 'Back face must contain at least one content item'),
    backBackground: HexColorSchema.optional(),
    tags: z.array(z.string()).optional(),
    metadata: z.record(z.unknown()).optional(),
}) satisfies z.ZodType<Card>;
