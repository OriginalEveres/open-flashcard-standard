// Validate functions
export { validateCard, validateCardSet } from './validate.js';

// Result types
export type { ValidationFailure, ValidationResult, ValidationSuccess } from './validate.js';

// Schemas — for consumers who want to compose or extend validation
export { CardSetSchema } from './schemas/cardset.js';
export { CardSchema, HexColorSchema } from './schemas/card.js';
export {
    ContentSchema,
    ImageContentSchema,
    TextContentSchema,
    VideoContentSchema,
} from './schemas/content.js';

// Inferred types
export type { CardSet } from './schemas/cardset.js';
export type { Card, HexColor } from './schemas/card.js';
export type { Content, ImageContent, TextContent, VideoContent } from './schemas/content.js';
