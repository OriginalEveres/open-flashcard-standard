import { type ZodIssue } from 'zod';

import { CardSchema, type Card } from './schemas/card.js';
import { CardSetSchema, type CardSet } from './schemas/cardset.js';

export type ValidationSuccess<T> = {
    success: true;
    data: T;
};

export type ValidationFailure = {
    success: false;
    error: string;
    issues: ZodIssue[];
};

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

export function validateCardSet(input: unknown): ValidationResult<CardSet> {
    const result = CardSetSchema.safeParse(input);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return {
        success: false,
        error: 'Invalid CardSet',
        issues: result.error.issues,
    };
}

export function validateCard(input: unknown): ValidationResult<Card> {
    const result = CardSchema.safeParse(input);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return {
        success: false,
        error: 'Invalid Card',
        issues: result.error.issues,
    };
}
