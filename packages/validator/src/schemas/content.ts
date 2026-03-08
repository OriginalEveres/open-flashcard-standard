import { type Content, type ImageContent, type TextContent, type VideoContent } from '@open-flashcard/spec';
import { z } from 'zod';

import { ValidationErrorCode } from '../errors.js';

export const TextContentSchema = z.object({
    type: z.literal('text'),
    value: z.string().min(1, ValidationErrorCode.TEXT_VALUE_EMPTY),
}) satisfies z.ZodType<TextContent>;

export const ImageContentSchema = z.object({
    type: z.literal('image'),
    src: z.string().min(1, ValidationErrorCode.IMAGE_SRC_EMPTY),
    alt: z.string().optional(),
}) satisfies z.ZodType<ImageContent>;

export const VideoContentSchema = z.object({
    type: z.literal('video'),
    url: z
        .string()
        .url(ValidationErrorCode.VIDEO_URL_INVALID)
        .startsWith('https://', ValidationErrorCode.VIDEO_URL_NOT_HTTPS),
    title: z.string().optional(),
}) satisfies z.ZodType<VideoContent>;

export const ContentSchema = z.discriminatedUnion('type', [
    TextContentSchema,
    ImageContentSchema,
    VideoContentSchema,
]) satisfies z.ZodType<Content>;
