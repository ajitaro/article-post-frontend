import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Alert from "../components/Alert";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { articleApi, type Post } from "../lib/api";

const PAGE_SIZE = 5;

export default function PreviewPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      setError("");
      try {
        const data = await articleApi.list(100, 0);
        setPosts(data.filter((post) => post.status === "publish"));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal mengambil artikel publish.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadPosts();
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const visiblePosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [page, posts]);

  return (
    <section>
      <PageHeader title="Preview" description="Tampilan daftar blog untuk artikel yang sudah publish." />

      <div className="space-y-4">
        {error && <Alert tone="error">{error}</Alert>}
        {isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white px-5 py-12 text-center shadow-soft">
            <p className="text-sm font-semibold text-slate-600">Loading preview...</p>
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <p className="text-sm font-semibold text-slate-700">Belum ada artikel publish.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {visiblePosts.map((post) => (
                <article key={post.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={post.status} />
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-ink">{post.title}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{post.content}</p>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <span className="text-sm font-semibold text-slate-600">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
