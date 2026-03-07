import { z } from 'zod';

export const TextContentSchema = z.object({
    type: z.literal('text'),
    value: z.string().min(1, 'Text value must not be empty'),
});

export const ImageContentSchema = z.object({
    type: z.literal('image'),
    src: z.string().min(1, 'Image src must not be empty'),
    alt: z.string().optional(),
});

export const VideoContentSchema = z.object({
    type: z.literal('video'),
    url: z
        .string()
        .url('Video url must be a valid URL')
        .startsWith('https://', 'Video url must use https'),
    title: z.string().optional(),
});

export const ContentSchema = z.discriminatedUnion('type', [
    TextContentSchema,
    ImageContentSchema,
    VideoContentSchema,
]);

export type TextContent = z.infer<typeof TextContentSchema>;
export type ImageContent = z.infer<typeof ImageContentSchema>;
export type VideoContent = z.infer<typeof VideoContentSchema>;
export type Content = z.infer<typeof ContentSchema>;
