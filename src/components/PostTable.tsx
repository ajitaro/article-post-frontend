import { Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Post } from "../lib/api";
import StatusBadge from "./StatusBadge";

type PostTableProps = {
  posts: Post[];
  onTrash: (post: Post) => void;
  trashDisabled?: boolean;
};

export default function PostTable({ posts, onTrash, trashDisabled }: PostTableProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
        <p className="text-sm font-semibold text-slate-700">Belum ada artikel di tab ini.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="max-w-md px-4 py-4 text-sm font-semibold text-ink">{post.title}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{post.category}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={post.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {post.status === "trash" ? (
                      <button
                        type="button"
                        aria-label={`Edit disabled for ${post.title}`}
                        title="Trashed article cannot be edited"
                        disabled
                        className="focus-ring rounded-md border border-slate-200 bg-white p-2 text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    ) : (
                      <Link
                        to={`/posts/${post.id}/edit`}
                        aria-label={`Edit ${post.title}`}
                        title="Edit"
                        className="focus-ring rounded-md border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-brand"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                    )}
                    <button
                      type="button"
                      aria-label={`Trash ${post.title}`}
                      title="Trash"
                      disabled={trashDisabled || post.status === "trash"}
                      onClick={() => onTrash(post)}
                      className={`focus-ring rounded-md border border-slate-200 bg-white p-2 text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 ${
                        post.status === "trash" ? "" : "hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                      }`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">{children}</th>;
}
