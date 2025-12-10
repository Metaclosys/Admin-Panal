import slugify from "./slugify";

export function getShopSlug(shop) {
  const base = slugify(shop?.name || "") || "shop";

  if (!shop) {
    return base;
  }

  if (shop.slug && typeof shop.slug === "string") {
    return slugify(shop.slug);
  }

  return base;
}

export default getShopSlug;
