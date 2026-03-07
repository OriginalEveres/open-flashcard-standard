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

// Types — re-exported from @open-flashcard/spec for convenience
export type { Card, CardSet, Content, HexColor, ImageContent, TextContent, VideoContent } from '@open-flashcard/spec';
