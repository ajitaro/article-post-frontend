import type { PostPayload, PostStatus } from "../lib/api";
import type { FormErrors } from "../lib/validation";

export type PostFormValues = Omit<PostPayload, "status">;

type PostFormProps = {
  values: PostFormValues;
  errors: FormErrors;
  isSubmitting: boolean;
  onChange: (values: PostFormValues) => void;
  onSubmit: (status: PostStatus) => void;
};

export default function PostForm({ values, errors, isSubmitting, onChange, onSubmit }: PostFormProps) {
  const update = (field: keyof PostFormValues, value: string) => onChange({ ...values, [field]: value });

  return (
    <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
      <Field label="Title" error={errors.title} hint={`${values.title.trim().length}/200`}>
        <input
          className="focus-ring w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-ink shadow-sm"
          value={values.title}
          onChange={(event) => update("title", event.target.value)}
          placeholder="Judul artikel minimal 20 karakter"
        />
      </Field>

      <Field label="Content" error={errors.content} hint={`${values.content.trim().length} karakter`}>
        <textarea
          className="focus-ring min-h-64 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-ink shadow-sm"
          value={values.content}
          onChange={(event) => update("content", event.target.value)}
          placeholder="Isi artikel minimal 200 karakter"
        />
      </Field>

      <Field label="Category" error={errors.category}>
        <input
          className="focus-ring w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-ink shadow-sm"
          value={values.category}
          onChange={(event) => update("category", event.target.value)}
          placeholder="Contoh: Technology"
        />
      </Field>

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onSubmit("publish")}
          className="focus-ring inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Publish
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onSubmit("draft")}
          className="focus-ring inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Draft
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-ink">{label}</span>
        {hint && <span className="text-xs font-medium text-slate-500">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-2 text-sm font-medium text-rose-600">{error}</p>}
    </label>
  );
}
