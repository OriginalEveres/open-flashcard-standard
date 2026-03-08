export { validateCard } from './card/schema.js';
export { validateCardSet } from './cardset/schema.js';

export type { ValidationFailure, ValidationIssue, ValidationResult, ValidationSuccess } from './result.js';

export { ERROR_MESSAGES, ValidationErrorCode } from './errors.js';

export { CardSetSchema } from './cardset/schema.js';
export { CardSchema, HexColorSchema } from './card/schema.js';
export {
    ContentSchema,
    ImageContentSchema,
    TextContentSchema,
    VideoContentSchema,
} from './content/schema.js';

export type { Card, CardSet, Content, HexColor, ImageContent, TextContent, VideoContent } from '@open-flashcard/spec';
