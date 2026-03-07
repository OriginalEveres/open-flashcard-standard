/** Plain text or Markdown content. */
export type TextContent = {
    type: "text";
    /** Plain text or Markdown string. */
    value: string;
};

/**
 * Static image, animated GIF, or any image format the host app supports.
 * `src` is either:
 *   - a filename relative to the `media/` folder inside a .fcpkg bundle, or
 *   - an absolute `https://` URL.
 */
export type ImageContent = {
    type: "image";
    src: string;
    /** Accessibility description of the image. */
    alt?: string;
};

/**
 * Embeddable video via URL (YouTube, Vimeo, etc.).
 * Autoplay behaviour and controls are left to the host app.
 */
export type VideoContent = {
    type: "video";
    /** Absolute `https://` URL to the video. */
    url: string;
    /** Accessible title for the embedded player. */
    title?: string;
};

/** Union of all supported content types for a card face. */
export type Content = TextContent | ImageContent | VideoContent;