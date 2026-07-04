import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import PageHeader from "../components/PageHeader";
import PostForm, { type PostFormValues } from "../components/PostForm";
import { articleApi, type PostStatus } from "../lib/api";
import { validatePost } from "../lib/validation";

const initialValues: PostFormValues = {
  title: "",
  content: "",
  category: "",
};

export default function AddPostPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(status: PostStatus) {
    const nextErrors = validatePost(values);
    setErrors(nextErrors);
    setError("");
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await articleApi.create({ ...values, status });
      navigate("/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan artikel.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <PageHeader title="Add New" description="Tulis artikel baru lalu simpan sebagai publish atau draft." />
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="mb-5">{error && <Alert tone="error">{error}</Alert>}</div>
        <PostForm
          values={values}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={setValues}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
