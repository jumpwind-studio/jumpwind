export function seo(params: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string | string[];
}) {
  const tags = [
    { title: params.title },
    { name: "description", content: params.description },
    {
      name: "keywords",
      content: Array.isArray(params.keywords)
        ? params.keywords.join(", ")
        : params.keywords,
    },
    { name: "twitter:title", content: params.title },
    { name: "twitter:description", content: params.description },
    { name: "twitter:creator", content: "@jumpwind" },
    { name: "twitter:site", content: "@jumpwind" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: params.title },
    { name: "og:description", content: params.description },
    ...(params.image
      ? [
          { name: "twitter:image", content: params.image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "og:image", content: params.image },
        ]
      : []),
  ];

  return tags;
}
