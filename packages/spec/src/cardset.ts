import { Card } from "./card";

/**
 * A named, ordered collection of cards.
 * This is the root object of a `deck.json` file.
 */
export type CardSet = {
    /** Globally unique set identifier. Any non-empty string. UUID v4 and SHA-256 hashes are recommended. */
    id: string;
    /** Display name of the card set. */
    name: string;
    /** Short human-readable description of the set. */
    description?: string;
    /** Creator name or handle. */
    author?: string;
    /** Ordered array of cards. May be empty. */
    cards: Card[];
    /** Free-form tags for the whole set. */
    tags?: string[];
    /** App-specific escape hatch. Any JSON-serializable values are allowed. */
    metadata?: Record<string, unknown>;
};