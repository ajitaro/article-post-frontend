import { FilePlus2, LayoutDashboard, Newspaper } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { to: "/posts", label: "All Posts", icon: LayoutDashboard },
  { to: "/posts/new", label: "Add New", icon: FilePlus2 },
  { to: "/preview", label: "Preview", icon: Newspaper },
];

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Sharing Vision</p>
          <h1 className="mt-2 text-2xl font-bold text-ink">Article CMS</h1>
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition",
                  isActive ? "bg-blue-50 text-brand" : "text-slate-600 hover:bg-slate-100 hover:text-ink",
                ].join(" ")
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Sharing Vision</p>
              <p className="text-lg font-bold text-ink">Article CMS</p>
            </div>
            <nav className="flex gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  aria-label={item.label}
                  className={({ isActive }) =>
                    [
                      "rounded-md p-2 transition",
                      isActive ? "bg-blue-50 text-brand" : "text-slate-500 hover:bg-slate-100",
                    ].join(" ")
                  }
                >
                  <item.icon className="h-5 w-5" />
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
