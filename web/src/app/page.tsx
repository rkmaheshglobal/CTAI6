"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Brain, GraduationCap, Sparkles, BookOpen } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { AVATARS } from "@/data/curriculum";

export default function LandingPage() {
  const router = useRouter();
  const { createStudent, createClassroom, classrooms, setRole, student, role, teacherName } =
    useAppStore();

  const [mode, setMode] = useState<"choose" | "student" | "teacher">("choose");
  const [studentName, setStudentName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [teacherNameInput, setTeacherNameInput] = useState("");
  const [className, setClassName] = useState("");
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (student && role === "student") {
      router.replace("/student");
      return;
    }
    if (role === "teacher" && teacherName) {
      router.replace("/teacher");
    }
  }, [hydrated, student, role, teacherName, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center gradient-hero text-white">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if ((student && role === "student") || (role === "teacher" && teacherName)) {
    return (
      <div className="flex min-h-screen items-center justify-center gradient-hero text-white">
        <p className="text-lg font-semibold">Redirecting...</p>
      </div>
    );
  }

  function handleStudentJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!studentName.trim() || !classCode.trim()) return;
    const code = classCode.toUpperCase();
    if (!classrooms[code] && Object.keys(classrooms).length > 0) {
      // Allow joining even if teacher created class in same browser
    }
    createStudent(studentName.trim(), code, avatar);
    router.push("/student");
  }

  function handleTeacherCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!teacherNameInput.trim() || !className.trim()) return;
    const code = createClassroom(className.trim(), teacherNameInput.trim());
    setCreatedCode(code);
  }

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-4xl backdrop-blur">
            🧠
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            CT & AI Learn
          </h1>
          <p className="mt-2 text-lg text-white/90">
            CBSE Class 6 — Computational Thinking & Artificial Intelligence
          </p>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-white/70">
            <BookOpen className="h-4 w-4" /> Based on the official Student Handbook (March 2026)
          </p>
        </motion.div>

        {mode === "choose" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            <button
              type="button"
              onClick={() => setMode("student")}
              className="card-shine group rounded-3xl border-2 border-white/30 p-8 text-left shadow-xl transition hover:scale-[1.02]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-800">I&apos;m a Student</h2>
              <p className="mt-2 text-slate-600">
                Explore CT puzzles, learn AI concepts, earn XP and badges, and build your Thinking Journal.
              </p>
              <span className="mt-4 inline-block font-bold text-violet-600 group-hover:underline">
                Let&apos;s learn! →
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("teacher");
                setMode("teacher");
              }}
              className="card-shine group rounded-3xl border-2 border-white/30 p-8 text-left shadow-xl transition hover:scale-[1.02]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-800">I&apos;m a Teacher</h2>
              <p className="mt-2 text-slate-600">
                Create a class, share a join code, and track student progress across all 14 chapters.
              </p>
              <span className="mt-4 inline-block font-bold text-teal-600 group-hover:underline">
                Open dashboard →
              </span>
            </button>
          </motion.div>
        )}

        {mode === "student" && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleStudentJoin}
            className="card-shine mt-10 rounded-3xl p-8 shadow-xl"
          >
            <button type="button" onClick={() => setMode("choose")} className="text-sm text-violet-600">
              ← Back
            </button>
            <h2 className="mt-2 flex items-center gap-2 text-2xl font-bold text-slate-800">
              <Brain className="h-6 w-6 text-violet-500" /> Join as Student
            </h2>
            <p className="mt-1 text-sm text-slate-500">Ask your teacher for the class code.</p>

            <label className="mt-6 block text-sm font-semibold text-slate-700">Your name</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-violet-400 focus:outline-none"
              placeholder="e.g. Anshu"
              required
            />

            <label className="mt-4 block text-sm font-semibold text-slate-700">Pick your avatar</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  className={`rounded-xl border-2 px-3 py-2 text-2xl ${
                    avatar === a ? "border-violet-500 bg-violet-50" : "border-slate-200"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            <label className="mt-4 block text-sm font-semibold text-slate-700">Class code</label>
            <input
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 uppercase focus:border-violet-400 focus:outline-none"
              placeholder="e.g. MATH-42"
              required
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 text-lg font-bold text-white shadow-lg"
            >
              Start Learning 🚀
            </button>
          </motion.form>
        )}

        {mode === "teacher" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-shine mt-10 rounded-3xl p-8 shadow-xl">
            <button type="button" onClick={() => setMode("choose")} className="text-sm text-teal-600">
              ← Back
            </button>

            {!createdCode ? (
              <form onSubmit={handleTeacherCreate}>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Create Your Class</h2>
                <label className="mt-4 block text-sm font-semibold">Teacher name</label>
                <input
                  value={teacherNameInput}
                  onChange={(e) => setTeacherNameInput(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-teal-400 focus:outline-none"
                  required
                />
                <label className="mt-4 block text-sm font-semibold">Class name</label>
                <input
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-teal-400 focus:outline-none"
                  placeholder="e.g. Class 6A CT-AI"
                  required
                />
                <button
                  type="submit"
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-4 font-bold text-white"
                >
                  Create Class
                </button>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800">Class Created! 🎉</h2>
                <p className="mt-2 text-slate-600">Share this code with your students:</p>
                <p className="mt-4 rounded-2xl bg-teal-100 py-6 text-4xl font-extrabold tracking-widest text-teal-800">
                  {createdCode}
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/teacher")}
                  className="mt-6 rounded-2xl bg-slate-800 px-8 py-3 font-bold text-white"
                >
                  Open Teacher Dashboard
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
