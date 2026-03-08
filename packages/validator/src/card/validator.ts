import { type Card } from '@open-flashcard/spec';

import { type ValidationResult, mapIssue } from '../result.js';
import { CardSchema } from './schema.js';

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
