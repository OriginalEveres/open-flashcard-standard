import { type CardSet } from '@open-flashcard/spec';
import { z } from 'zod';

import { CardSchema } from './card.js';

export const CardSetSchema = z
    .object({
        id: z.string().min(1, 'CardSet id must not be empty'),
        name: z.string().min(1, 'CardSet name must not be empty'),
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
                    message: `Duplicate card id "${card.id}"`,
                    path: ['cards', index, 'id'],
                });
            }

            seen.add(card.id);
        }
    }) satisfies z.ZodType<CardSet>;
