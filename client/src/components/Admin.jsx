import { useEffect, useState } from "react";
import {
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Squares2X2Icon,
  ArrowDownTrayIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { templateList } from "./templates/templateList";

export default function Admin({ setPage }) {
  const [users, setUsers] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [usage, setUsage] = useState([]);
  const [activity, setActivity] = useState([]);
  const [tab, setTab] = useState("users");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/admin/users").then((r) => r.json()),
      fetch("http://localhost:5000/api/admin/resumes").then((r) => r.json()),
      fetch("http://localhost:5000/api/admin/template-usage").then((r) =>
        r.json()
      ),
      fetch("http://localhost:5000/api/admin/user-activity").then((r) =>
        r.json()
      ),
    ])
      .then(([u, r, t, a]) => {
        setUsers(u);
        setResumes(r);
        setUsage(t);
        setActivity(a);
      })
      .catch(() => alert("Cannot load admin data. Is backend running?"))
      .finally(() => setLoading(false));
  }, []);

  const exportCSV = (rows, filename) => {
    if (!rows.length) return alert("No data to export");

    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((h) => {
            const val = row[h] ?? "";
            return `"${String(val).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "users", label: "Users", Icon: UsersIcon, count: users.length },
    {
      id: "activity",
      label: "User Activity",
      Icon: UsersIcon,
      count: activity.length,
    },
    {
      id: "resumes",
      label: "Resumes",
      Icon: DocumentTextIcon,
      count: resumes.length,
    },
    {
      id: "usage",
      label: "Template Usage",
      Icon: ChartBarIcon,
      count: usage.length,
    },
    {
      id: "templates",
      label: "Templates",
      Icon: Squares2X2Icon,
      count: templateList.length,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of users, resumes, and template usage
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={UsersIcon}
          color="blue"
          label="Total Users"
          value={users.length}
        />
        <StatCard
          icon={DocumentTextIcon}
          color="emerald"
          label="Total Resumes"
          value={resumes.length}
        />
        <StatCard
          icon={ChartBarIcon}
          color="purple"
          label="Templates Used"
          value={usage.length}
        />
        <StatCard
          icon={Squares2X2Icon}
          color="amber"
          label="Available Templates"
          value={templateList.length}
        />
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((t) => {
          const isActive = tab === t.id;
          const Icon = t.Icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-200">
          Loading...
        </div>
      )}

      {!loading && tab === "users" && (
        <TableCard
          title="All Users"
          onExport={() => exportCSV(users, "users")}
        >
          <Table
            head={["ID", "Name", "Email", "Role", "Joined"]}
            body={users.map((u) => [
              u.user_id,
              u.name,
              u.email,
              <RoleBadge role={u.role} key={u.user_id} />,
              new Date(u.created_at).toLocaleDateString(),
            ])}
          />
        </TableCard>
      )}

      {!loading && tab === "activity" && (
        <TableCard
          title="User Activity Report"
          subtitle="Each user and how many resumes they've created"
          onExport={() => exportCSV(activity, "user_activity")}
        >
          <Table
            head={["ID", "Name", "Email", "Role", "Resumes", "Joined"]}
            body={activity.map((u) => [
              u.user_id,
              u.name,
              u.email,
              <RoleBadge role={u.role} key={u.user_id} />,
              <span
                key={`c-${u.user_id}`}
                className="inline-flex items-center justify-center min-w-[2rem] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold text-xs"
              >
                {u.resume_count}
              </span>,
              new Date(u.created_at).toLocaleDateString(),
            ])}
          />
        </TableCard>
      )}

      {!loading && tab === "resumes" && (
        <TableCard
          title="All Resumes"
          onExport={() => exportCSV(resumes, "resumes")}
        >
          <Table
            head={["ID", "Title", "User", "Template", "Created"]}
            body={resumes.map((r) => [
              r.resume_id,
              r.title,
              <div key={`u-${r.resume_id}`}>
                <p className="text-gray-900">{r.user_name}</p>
                <p className="text-xs text-gray-500">{r.user_email}</p>
              </div>,
              <span
                key={`t-${r.resume_id}`}
                className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium"
              >
                {r.template_id}
              </span>,
              new Date(r.created_at).toLocaleDateString(),
            ])}
          />
        </TableCard>
      )}

      {!loading && tab === "usage" && (
        <TableCard
          title="Template Usage Report"
          subtitle="Which templates are used most"
          onExport={() => exportCSV(usage, "template_usage")}
        >
          <Table
            head={["Template ID", "Times Used", "Relative Usage"]}
            body={usage.map((u) => {
              const max = Math.max(...usage.map((x) => x.usage_count));
              const pct = max > 0 ? (u.usage_count / max) * 100 : 0;
              return [
                u.template_id,
                u.usage_count,
                <div
                  key={`bar-${u.template_id}`}
                  className="w-full max-w-xs bg-gray-100 rounded-full h-2"
                >
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>,
              ];
            })}
          />
        </TableCard>
      )}

      {!loading && tab === "templates" && (
        <TableCard
          title="Available Templates"
          subtitle="All templates available in the app"
          onExport={() =>
            exportCSV(
              templateList.map((t) => ({
                id: t.id,
                name: t.name,
                category: t.categoryLabel,
                description: t.description,
              })),
              "templates"
            )
          }
        >
          <Table
            head={["ID", "Name", "Category", "Description"]}
            body={templateList.map((t) => [
              t.id,
              t.name,
              <span
                key={`cat-${t.id}`}
                className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium"
              >
                {t.categoryLabel}
              </span>,
              t.description,
            ])}
          />
        </TableCard>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, color, label, value }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    emerald: "bg-emerald-100 text-emerald-700",
    purple: "bg-purple-100 text-purple-700",
    amber: "bg-amber-100 text-amber-700",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function RoleBadge({ role }) {
  const isAdmin = role === "admin";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
        isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
      }`}
    >
      {isAdmin && <CheckIcon className="w-3 h-3" />}
      {role || "user"}
    </span>
  );
}

function TableCard({ title, subtitle, onExport, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-xs font-semibold transition"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function Table({ head, body }) {
  if (!body.length) {
    return (
      <div className="p-16 text-center text-gray-500">No data available.</div>
    );
  }
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          {head.map((h) => (
            <th
              key={h}
              className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {body.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            {row.map((cell, j) => (
              <td
                key={j}
                className="px-4 py-3 text-sm text-gray-700 align-top"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}