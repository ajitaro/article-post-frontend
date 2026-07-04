import type { PostStatus } from "../lib/api";

const labels: Record<PostStatus, string> = {
  publish: "Published",
  draft: "Draft",
  trash: "Trashed",
};

const styles: Record<PostStatus, string> = {
  publish: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  draft: "bg-amber-50 text-amber-700 ring-amber-200",
  trash: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
