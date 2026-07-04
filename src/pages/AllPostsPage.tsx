import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import PageHeader from "../components/PageHeader";
import PostTable from "../components/PostTable";
import { articleApi, type Post, type PostStatus } from "../lib/api";

const tabs: Array<{ label: string; status: PostStatus }> = [
  { label: "Published", status: "publish" },
  { label: "Drafts", status: "draft" },
  { label: "Trashed", status: "trash" },
];

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeStatus, setActiveStatus] = useState<PostStatus>("publish");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [trashingId, setTrashingId] = useState<number | null>(null);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await articleApi.list(100, 0);
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengambil artikel.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  const filteredPosts = useMemo(() => posts.filter((post) => post.status === activeStatus), [activeStatus, posts]);

  async function handleTrash(post: Post) {
    setTrashingId(post.id);
    setError("");
    setMessage("");
    try {
      await articleApi.moveToTrash(post.id);
      setPosts((current) => current.map((item) => (item.id === post.id ? { ...item, status: "trash" } : item)));
      setMessage(`"${post.title}" dipindahkan ke Trashed.`);
      setActiveStatus("trash");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memindahkan artikel ke trash.");
    } finally {
      setTrashingId(null);
    }
  }

  return (
    <section>
      <PageHeader
        title="All Posts"
        description="Kelola artikel berdasarkan status publish, draft, dan trash."
        action={
          <Link
            to="/posts/new"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add New
          </Link>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const count = posts.filter((post) => post.status === tab.status).length;
          const isActive = activeStatus === tab.status;
          return (
            <button
              key={tab.status}
              type="button"
              onClick={() => setActiveStatus(tab.status)}
              className={[
                "focus-ring rounded-lg px-4 py-2 text-sm font-bold transition",
                isActive ? "bg-ink text-white shadow-soft" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
              ].join(" ")}
            >
              {tab.label} <span className="ml-1 opacity-75">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {message && <Alert tone="success">{message}</Alert>}
        {error && <Alert tone="error">{error}</Alert>}
        {isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white px-5 py-12 text-center shadow-soft">
            <p className="text-sm font-semibold text-slate-600">Loading artikel...</p>
          </div>
        ) : (
          <PostTable posts={filteredPosts} onTrash={handleTrash} trashDisabled={trashingId !== null} />
        )}
      </div>
    </section>
  );
}
