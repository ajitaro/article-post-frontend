import type { PostPayload } from "./api";

export type FormErrors = Partial<Record<keyof Omit<PostPayload, "status">, string>>;

export function validatePost(values: Omit<PostPayload, "status">): FormErrors {
  const errors: FormErrors = {};
  const titleLength = values.title.trim().length;
  const contentLength = values.content.trim().length;
  const categoryLength = values.category.trim().length;

  if (titleLength < 20) errors.title = "Title minimal 20 karakter.";
  if (titleLength > 200) errors.title = "Title maksimal 200 karakter.";
  if (contentLength < 200) errors.content = "Content minimal 200 karakter.";
  if (categoryLength < 3) errors.category = "Category minimal 3 karakter.";
  if (categoryLength > 100) errors.category = "Category maksimal 100 karakter.";

  return errors;
}
