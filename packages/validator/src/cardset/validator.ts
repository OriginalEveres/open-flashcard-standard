import { type CardSet } from '@open-flashcard/spec';

import { type ValidationResult, mapIssue } from '../result.js';
import { CardSetSchema } from './schema.js';

export function validateCardSet(input: unknown): ValidationResult<CardSet> {
    const result = CardSetSchema.safeParse(input);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return {
        success: false,
        issues: result.error.issues.map(mapIssue),
    };
}
