import {
  Image as Unpic,
  type ImageProps as UnpicImageProps,
  Source as UnpicSource,
  type SourceProps as UnpicSourceProps,
} from "@unpic/solid";

type ImageProps = UnpicImageProps;

/**
 * Image component.
 *
 * @link https://unpic.pics/img/solid/#image-props
 */
export function Image(props: ImageProps) {
  return <Unpic data-slot="image" {...props} />;
}

type SourceProps = UnpicSourceProps;

/**
 * Image source component.
 *
 * @link https://unpic.pics/img/solid/#source-props
 */
export function Source(props: SourceProps) {
  return <UnpicSource data-slot="source" {...props} />;
}
