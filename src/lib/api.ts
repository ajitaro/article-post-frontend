export type PostStatus = "publish" | "draft" | "trash";

export type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  status: PostStatus;
  created_date: string;
  updated_date: string;
};

export type PostPayload = {
  title: string;
  content: string;
  category: string;
  status: PostStatus;
};

export type MessageResponse = {
  id: number;
  message: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await readError(response);
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function readError(response: Response) {
  try {
    const data = await response.json();
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) {
      return data.detail.map((item: { msg?: string }) => item.msg ?? "Invalid field").join(", ");
    }
    return JSON.stringify(data);
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

export const articleApi = {
  list: (limit = 100, offset = 0) => request<Post[]>(`/article/${limit}/${offset}`),
  get: (id: number) => request<Post>(`/article/${id}`),
  create: (payload: PostPayload) =>
    request<MessageResponse>("/article/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id: number, payload: PostPayload) =>
    request<MessageResponse>(`/article/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  moveToTrash: (id: number) =>
    request<MessageResponse>(`/article/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "trash" satisfies PostStatus }),
    }),
};
