import { type CardSet } from '@open-flashcard/spec';
import { z } from 'zod';

import { CardSchema } from '../card/schema.js';
import { ValidationErrorCode } from '../errors.js';

export const CardSetSchema = z
    .object({
        id: z.string().min(1, ValidationErrorCode.CARDSET_ID_EMPTY),
        name: z.string().min(1, ValidationErrorCode.CARDSET_NAME_EMPTY),
        description: z.string().optional(),
        author: z.string().optional(),
        cards: z.array(CardSchema),
        tags: z.array(z.string()).optional(),
        metadata: z.record(z.unknown()).optional(),
    })
    .superRefine((data, ctx) => {
        const seen = new Set<string>();

        for (const [index, card] of data.cards.entries()) {
            if (seen.has(card.id)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: ValidationErrorCode.CARD_ID_DUPLICATED,
                    path: ['cards', index, 'id'],
                });
            }

            seen.add(card.id);
        }
    }) satisfies z.ZodType<CardSet>;
