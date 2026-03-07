import { type Content, type ImageContent, type TextContent, type VideoContent } from '@open-flashcard/spec';
import { z } from 'zod';

export const TextContentSchema = z.object({
    type: z.literal('text'),
    value: z.string().min(1, 'Text value must not be empty'),
}) satisfies z.ZodType<TextContent>;

export const ImageContentSchema = z.object({
    type: z.literal('image'),
    src: z.string().min(1, 'Image src must not be empty'),
    alt: z.string().optional(),
}) satisfies z.ZodType<ImageContent>;

export const VideoContentSchema = z.object({
    type: z.literal('video'),
    url: z
        .string()
        .url('Video url must be a valid URL')
        .startsWith('https://', 'Video url must use https'),
    title: z.string().optional(),
}) satisfies z.ZodType<VideoContent>;

export const ContentSchema = z.discriminatedUnion('type', [
    TextContentSchema,
    ImageContentSchema,
    VideoContentSchema,
]) satisfies z.ZodType<Content>;
