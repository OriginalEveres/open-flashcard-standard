import { type Card, type CardSet } from '@open-flashcard/spec';
import { type ZodIssue } from 'zod';

import { ERROR_MESSAGES, ValidationErrorCode } from './errors.js';
import { CardSchema } from './schemas/card.js';
import { CardSetSchema } from './schemas/cardset.js';

export type ValidationIssue = {
    code: ValidationErrorCode;
    path: (string | number)[];
    message: string;
};

export type ValidationSuccess<T> = {
    success: true;
    data: T;
};

export type ValidationFailure = {
    success: false;
    issues: ValidationIssue[];
};

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

const ERROR_CODE_VALUES = new Set<string>(Object.values(ValidationErrorCode));

function mapIssue(issue: ZodIssue): ValidationIssue {
    if (ERROR_CODE_VALUES.has(issue.message)) {
        const code = issue.message as ValidationErrorCode;

        return {
            code,
            path: issue.path,
            message: ERROR_MESSAGES[code],
        };
    }

    return {
        code: ValidationErrorCode.INVALID_TYPE,
        path: issue.path,
        message: issue.message,
    };
}

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
