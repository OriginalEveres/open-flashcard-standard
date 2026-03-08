export enum ValidationErrorCode {
    // Content
    TEXT_VALUE_EMPTY = 'TEXT_VALUE_EMPTY',
    IMAGE_SRC_EMPTY = 'IMAGE_SRC_EMPTY',
    VIDEO_URL_INVALID = 'VIDEO_URL_INVALID',
    VIDEO_URL_NOT_HTTPS = 'VIDEO_URL_NOT_HTTPS',
    CONTENT_TYPE_INVALID = 'CONTENT_TYPE_INVALID',

    // Card
    CARD_ID_EMPTY = 'CARD_ID_EMPTY',
    CARD_FRONT_EMPTY = 'CARD_FRONT_EMPTY',
    CARD_BACK_EMPTY = 'CARD_BACK_EMPTY',
    CARD_BACKGROUND_INVALID = 'CARD_BACKGROUND_INVALID',
    CARD_ID_DUPLICATED = 'CARD_ID_DUPLICATED',

    // CardSet
    CARDSET_ID_EMPTY = 'CARDSET_ID_EMPTY',
    CARDSET_NAME_EMPTY = 'CARDSET_NAME_EMPTY',

    // Catch-all for Zod structural errors (wrong type, missing field, etc.)
    INVALID_TYPE = 'INVALID_TYPE',
}

export const ERROR_MESSAGES: Record<ValidationErrorCode, string> = {
    [ValidationErrorCode.TEXT_VALUE_EMPTY]: 'Text value must not be empty',
    [ValidationErrorCode.IMAGE_SRC_EMPTY]: 'Image src must not be empty',
    [ValidationErrorCode.VIDEO_URL_INVALID]: 'Video url must be a valid URL',
    [ValidationErrorCode.VIDEO_URL_NOT_HTTPS]: 'Video url must use https',
    [ValidationErrorCode.CONTENT_TYPE_INVALID]: 'Invalid content type',
    [ValidationErrorCode.CARD_ID_EMPTY]: 'Card id must not be empty',
    [ValidationErrorCode.CARD_FRONT_EMPTY]: 'Front face must contain at least one content item',
    [ValidationErrorCode.CARD_BACK_EMPTY]: 'Back face must contain at least one content item',
    [ValidationErrorCode.CARD_BACKGROUND_INVALID]: 'Must be a valid hex color, e.g. #fff or #1a1a1a',
    [ValidationErrorCode.CARD_ID_DUPLICATED]: 'Duplicate card id within the set',
    [ValidationErrorCode.CARDSET_ID_EMPTY]: 'CardSet id must not be empty',
    [ValidationErrorCode.CARDSET_NAME_EMPTY]: 'CardSet name must not be empty',
    [ValidationErrorCode.INVALID_TYPE]: 'Value has an invalid type',
};
