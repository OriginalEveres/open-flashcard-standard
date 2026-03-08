import { type Card, type HexColor } from '@open-flashcard/spec';
import { z } from 'zod';

import { ContentSchema } from '../content/schema.js';
import { ValidationErrorCode } from '../errors.js';
import { type ValidationResult, mapIssue } from '../result.js';

// z.string().regex() infers as `string`, which doesn't satisfy the `#${string}`
// template literal type from spec. z.custom<HexColor>() carries the exact type through.
export const HexColorSchema = z.custom<HexColor>(
    val => typeof val === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val),
    { message: ValidationErrorCode.CARD_BACKGROUND_INVALID },
);

export const CardSchema = z.object({
    id: z.string().min(1, ValidationErrorCode.CARD_ID_EMPTY),
    front: z.array(ContentSchema).min(1, ValidationErrorCode.CARD_FRONT_EMPTY),
    frontBackground: HexColorSchema.optional(),
    back: z.array(ContentSchema).min(1, ValidationErrorCode.CARD_BACK_EMPTY),
    backBackground: HexColorSchema.optional(),
    tags: z.array(z.string()).optional(),
    metadata: z.record(z.unknown()).optional(),
}) satisfies z.ZodType<Card>;

export function validateCard(input: unknown): ValidationResult<Card> {
    const result = CardSchema.safeParse(input);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return {
        success: false,
        issues: result.error.issues.map(mapIssue),
    };
}
