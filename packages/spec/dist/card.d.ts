import { Content } from "./content.js";
/**
 * A CSS hex color string.
 * Accepts shorthand (`#fff`) and full (`#ffffff`) formats, case-insensitive.
 * @pattern ^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$
 */
export type HexColor = `#${string}`;
/**
 * A single flashcard with a front and a back.
 * Both faces are ordered arrays of Content items — mixing types is allowed.
 */
export type Card = {
    /** Globally unique card identifier. Any non-empty string. UUID v4 and SHA-256 hashes are recommended. */
    id: string;
    /** Front face: one or more content items (question, prompt, image, etc.). */
    front: Content[];
    /** Background color of the front face. Must be a hex color string, e.g. `#fff` or `#1a1a1a`. */
    frontBackground?: HexColor;
    /** Back face: one or more content items (answer, translation, etc.). */
    back: Content[];
    /** Background color of the back face. Must be a hex color string, e.g. `#fff` or `#1a1a1a`. */
    backBackground?: HexColor;
    /** Free-form tags for filtering and organisation. */
    tags?: string[];
    /** App-specific escape hatch. Any JSON-serializable values are allowed. */
    metadata?: Record<string, unknown>;
};
//# sourceMappingURL=card.d.ts.map