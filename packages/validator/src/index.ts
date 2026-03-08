export { validateCard, validateCardSet } from './validate.js';

export type { ValidationFailure, ValidationIssue, ValidationResult, ValidationSuccess } from './validate.js';

export { ERROR_MESSAGES, ValidationErrorCode } from './errors.js';

export { CardSetSchema } from './schemas/cardset.js';
export { CardSchema, HexColorSchema } from './schemas/card.js';
export {
    ContentSchema,
    ImageContentSchema,
    TextContentSchema,
    VideoContentSchema,
} from './schemas/content.js';

export type { Card, CardSet, Content, HexColor, ImageContent, TextContent, VideoContent } from '@open-flashcard/spec';
