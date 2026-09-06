"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Users, BookOpen, TrendingUp, LogOut, Copy, Check, Download } from "lucide-react";
import { useAppStore, getCompletionPercent } from "@/lib/store";
import { ALL_CHAPTERS, CT_CHAPTERS, AI_CHAPTERS } from "@/data/curriculum";
import { generateClassCsv, downloadCsv } from "@/lib/export";

export default function TeacherDashboard() {
  const router = useRouter();
  const { teacherName, classrooms, getClassStudents, getStudentSnapshot, resetAll } =
    useAppStore();
  // Subscribe component to cross-tab updates
  useAppStore((s) => s.syncRevision);
  const [selectedClassInput, setSelectedClassInput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const classCodes = Object.keys(classrooms);
  const selectedClass =
    selectedClassInput && classrooms[selectedClassInput]
      ? selectedClassInput
      : (classCodes[0] ?? "");

  useEffect(() => {
    if (!teacherName) router.replace("/");
  }, [teacherName, router]);

  if (!teacherName) return null;

  const room = selectedClass ? classrooms[selectedClass] : null;
  const students = selectedClass ? getClassStudents(selectedClass) : [];

  const chapterStats = ALL_CHAPTERS.map((ch) => {
    let completed = 0;
    students.forEach((s) => {
      const snap = getStudentSnapshot(s.id);
      if (snap?.progress[ch.id]?.status === "completed") completed += 1;
    });
    return {
      name: ch.title.length > 18 ? ch.title.slice(0, 16) + "…" : ch.title,
      fullName: ch.title,
      completed,
      total: students.length || 1,
      pct: students.length ? Math.round((completed / students.length) * 100) : 0,
      part: ch.part,
    };
  });

  const avgCompletion =
    students.length > 0
      ? Math.round(
          students.reduce((sum, s) => {
            const snap = getStudentSnapshot(s.id);
            return sum + (snap ? getCompletionPercent(snap.progress) : 0);
          }, 0) / students.length
        )
      : 0;

  function copyCode() {
    if (selectedClass) {
      navigator.clipboard.writeText(selectedClass);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleExportCsv() {
    if (!selectedClass || !room) return;
    const csvData = generateClassCsv(room.name, selectedClass, students, (id) =>
      getStudentSnapshot(id)
    );
    const safeName = room.name.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `CTAI6_${safeName}_${selectedClass}_${new Date().toISOString().slice(0, 10)}.csv`;
    downloadCsv(filename, csvData);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Teacher Dashboard</h1>
            <p className="text-sm text-slate-500">Hello, {teacherName}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetAll();
              router.push("/");
            }}
            className="flex items-center gap-1 text-sm text-slate-500"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {classCodes.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-600">No classes yet. Go back and create one.</p>
            <Link href="/" className="mt-4 inline-block text-teal-600 font-semibold">
              Create a class →
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClassInput(e.target.value)}
                className="rounded-xl border-2 border-slate-200 px-4 py-2 font-medium"
              >
                {classCodes.map((code) => (
                  <option key={code} value={code}>
                    {classrooms[code].name} ({code})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={copyCode}
                className="flex items-center gap-2 rounded-xl bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-200 transition"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {room ? `${room.name} (${selectedClass})` : `Class code: ${selectedClass}`}
              </button>
              {students.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
                  title="Download class roster and chapter progress as CSV"
                >
                  <Download className="h-4 w-4 text-teal-400" /> Export Gradebook (CSV)
                </button>
              )}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <Users className="h-8 w-8 text-violet-500" />
                <p className="mt-2 text-3xl font-bold">{students.length}</p>
                <p className="text-sm text-slate-500">Students enrolled</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <TrendingUp className="h-8 w-8 text-emerald-500" />
                <p className="mt-2 text-3xl font-bold">{avgCompletion}%</p>
                <p className="text-sm text-slate-500">Average completion</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <p className="mt-2 text-3xl font-bold">{ALL_CHAPTERS.length}</p>
                <p className="text-sm text-slate-500">Total chapters</p>
              </div>
            </div>

            <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-800">Chapter completion across class</h2>
              <p className="text-sm text-slate-500">How many students completed each chapter</p>
              <div className="mt-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chapterStats} margin={{ bottom: 60 }}>
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={10} />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      formatter={(v) => [`${v ?? 0} students`, "Completed"]}
                      labelFormatter={(_, payload) =>
                        (payload?.[0]?.payload as { fullName?: string })?.fullName ?? ""
                      }
                    />
                    <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                      {chapterStats.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={
                            entry.part === "ai"
                              ? "#10b981"
                              : entry.part === "ct"
                                ? "#3b82f6"
                                : "#8b5cf6"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="mt-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-800">Student roster</h2>
                  <p className="text-sm text-slate-500">Track student progress, XP, and chapter completions</p>
                </div>
                {students.length > 0 && (
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
                  >
                    <Download className="h-4 w-4 text-teal-400" /> Download Roster (CSV)
                  </button>
                )}
              </div>
              {students.length === 0 ? (
                <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                  No students have joined yet. Share class code <strong>{selectedClass}</strong> with your class.
                  Students must join on this same device/browser for the demo, or use the same browser profile.
                </p>
              ) : (
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3">Student</th>
                        <th className="px-4 py-3">Level</th>
                        <th className="px-4 py-3">XP</th>
                        <th className="px-4 py-3">Progress</th>
                        <th className="px-4 py-3">CT done</th>
                        <th className="px-4 py-3">AI done</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => {
                        const snap = getStudentSnapshot(s.id);
                        const pct = snap ? getCompletionPercent(snap.progress) : 0;
                        const ctDone = CT_CHAPTERS.filter(
                          (c) => snap?.progress[c.id]?.status === "completed"
                        ).length;
                        const aiDone = AI_CHAPTERS.filter(
                          (c) => snap?.progress[c.id]?.status === "completed"
                        ).length;
                        return (
                          <tr key={s.id} className="border-t border-slate-100">
                            <td className="px-4 py-3 font-medium">
                              {s.avatar} {s.name}
                            </td>
                            <td className="px-4 py-3">{s.level}</td>
                            <td className="px-4 py-3">{s.xp}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                                  <div
                                    className="h-full bg-violet-500"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span>{pct}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">{ctDone}/10</td>
                            <td className="px-4 py-3">{aiDone}/4</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-800">Chapter library & answer keys</h2>
                  <p className="text-sm text-slate-500">
                    Browse all chapters with correct answers, logic, and facilitation notes
                  </p>
                </div>
                <Link
                  href="/teacher/chapters"
                  className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-700"
                >
                  Open chapter library →
                </Link>
              </div>
            </section>

            <section className="mt-10 rounded-2xl bg-violet-50 p-6">
              <h3 className="font-bold text-violet-900">Pedagogy reminder (from the handbook)</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-violet-800">
                <li>The process of thinking is more important than the correct answer.</li>
                <li>Use facilitative prompts — guide through discussion, not direct solutions.</li>
                <li>CT Part 1: do activities before harder questions where available.</li>
                <li>AI Part 2: emphasise ethical and responsible use throughout.</li>
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
