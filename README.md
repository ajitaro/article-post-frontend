# Sharing Vision Frontend

Dashboard React untuk mengelola artikel Sharing Vision. Stack: React, TypeScript, Vite, Tailwind CSS, React Router, dan Lucide icons.

## Prasyarat

- Node.js 22+
- npm
- API backend berjalan dan dapat diakses dari browser.

## Setup

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Frontend berjalan di:

```text
http://localhost:5173
```

## Konfigurasi API

Default API base URL adalah:

```text
http://127.0.0.1:8000
```

Jika perlu mengganti URL backend, buat file `.env` di root project:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Fitur

- `All Posts`: tabs Published, Drafts, dan Trashed.
- `Add New`: form Title, Content, Category dengan tombol Publish dan Draft.
- `Edit Article`: ubah data artikel, lalu simpan sebagai Publish atau Draft.
- `Preview`: daftar artikel publish dengan pagination.
- Trash action memakai `PATCH /article/{id}` dan mengubah status ke `trash`.

## Validasi Form

- `title`: minimal 20 karakter, maksimal 200 karakter.
- `content`: minimal 200 karakter.
- `category`: minimal 3 karakter, maksimal 100 karakter.

## Scripts

```bash
npm run dev
```

Menjalankan Vite development server.

```bash
npm run build
```

Menjalankan TypeScript check dan production build.

```bash
npm run preview
```

Menjalankan preview hasil production build.

## Catatan CORS

Backend sudah diizinkan menerima request dari:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `http://localhost:4173`
- `http://127.0.0.1:4173`

Jika frontend dibuka dari IP LAN atau domain deploy, tambahkan origin persis ke konfigurasi CORS backend, misalnya:

```env
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://192.168.1.10:5173
```
