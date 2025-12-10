export function slugify(value = "") {
  if (!value) {
    return "shop";
  }

  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "shop";
}

export default slugify;
