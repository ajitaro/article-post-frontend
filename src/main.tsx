import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AddPostPage from "./pages/AddPostPage";
import AllPostsPage from "./pages/AllPostsPage";
import EditPostPage from "./pages/EditPostPage";
import PreviewPage from "./pages/PreviewPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<AllPostsPage />} />
          <Route path="/posts/new" element={<AddPostPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
