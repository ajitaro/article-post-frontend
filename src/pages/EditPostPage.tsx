import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import PageHeader from "../components/PageHeader";
import PostForm, { type PostFormValues } from "../components/PostForm";
import { articleApi, type PostStatus } from "../lib/api";
import { validatePost } from "../lib/validation";

export default function EditPostPage() {
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.id);
  const [values, setValues] = useState<PostFormValues>({ title: "", content: "", category: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTrashed, setIsTrashed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      setIsTrashed(false);
      setError("");
      try {
        const post = await articleApi.get(postId);
        if (post.status === "trash") {
          setIsTrashed(true);
          setError("Artikel trash tidak bisa diedit.");
          return;
        }
        setValues({ title: post.title, content: post.content, category: post.category });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal mengambil artikel.");
      } finally {
        setIsLoading(false);
      }
    }

    if (Number.isNaN(postId)) {
      setError("ID artikel tidak valid.");
      setIsLoading(false);
      return;
    }

    void loadPost();
  }, [postId]);

  async function handleSubmit(status: PostStatus) {
    const nextErrors = validatePost(values);
    setErrors(nextErrors);
    setError("");
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await articleApi.update(postId, { ...values, status });
      navigate("/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah artikel.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <PageHeader title="Edit Article" description="Ubah title, content, category, lalu pilih publish atau draft." />
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        {error && (
          <div className="mb-5">
            <Alert tone="error">{error}</Alert>
          </div>
        )}
        {isLoading ? (
          <div className="py-12 text-center text-sm font-semibold text-slate-600">Loading artikel...</div>
        ) : !error && !isTrashed ? (
          <PostForm
            values={values}
            errors={errors}
            isSubmitting={isSubmitting}
            onChange={setValues}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="py-12 text-center text-sm font-semibold text-slate-600">Artikel ini tidak bisa diedit.</div>
        )}
      </div>
    </section>
  );
}
