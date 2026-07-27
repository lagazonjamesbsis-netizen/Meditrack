"use client";

import {
  Pencil,
  Plus,
  Trash2,
  Syringe,
  HeartPulse,
  Stethoscope,
  ShieldPlus,
  Users,
  Pill,
  Ambulance,
  X,
} from "lucide-react";
import { useState, type ComponentType } from "react";

type IconKey = "syringe" | "heart" | "stethoscope" | "shield" | "users" | "pill" | "ambulance";

interface Card {
  id: string;
  title: string;
  schedule: string;
  icon: IconKey;
  titleColor: string;
}

const ICONS: Record<IconKey, ComponentType<{ size?: number }>> = {
  syringe: Syringe,
  heart: HeartPulse,
  stethoscope: Stethoscope,
  shield: ShieldPlus,
  users: Users,
  pill: Pill,
  ambulance: Ambulance,
};

const ICON_TONE: Record<IconKey, string> = {
  syringe: "bg-amber-50 text-amber-600",
  heart: "bg-rose-50 text-rose-600",
  stethoscope: "bg-sky-50 text-sky-600",
  shield: "bg-cyan-50 text-cyan-600",
  users: "bg-violet-50 text-violet-600",
  pill: "bg-cyan-50 text-cyan-600",
  ambulance: "bg-orange-50 text-orange-600",
};

const initialEvents: Card[] = [
  { id: "e1", title: "Anti-Rabies Vacination", schedule: "March 29, 2026 | Sunday\n7:00am to 9:00am", icon: "syringe", titleColor: "text-emerald-600" },
  { id: "e2", title: "Blood Donation Program", schedule: "March 30, 2026 | Monday\n3:00pm to 5:00pm", icon: "heart", titleColor: "text-red-600" },
  { id: "e3", title: "Mental Health Screening", schedule: "March 31, 2026 | Tuesday\n3:00pm to 5:00pm", icon: "heart", titleColor: "text-violet-400" },
];

const initialServices: Card[] = [
  { id: "s1", title: "Basic Consultation", schedule: "Every Monday", icon: "stethoscope", titleColor: "text-emerald-600" },
  { id: "s2", title: "Disease Control & Prevention", schedule: "Wednesday - Friday", icon: "shield", titleColor: "text-emerald-600" },
  { id: "s3", title: "Family Planning & Reproductive Health", schedule: "Every Thursday", icon: "users", titleColor: "text-emerald-600" },
  { id: "s4", title: "Immunization & Vaccination", schedule: "Wednesday - Friday", icon: "pill", titleColor: "text-emerald-600" },
  { id: "s5", title: "Maternal & Child Care", schedule: "Every Tuesday", icon: "heart", titleColor: "text-emerald-600" },
  { id: "s6", title: "Dental Care", schedule: "Every Friday", icon: "ambulance", titleColor: "text-emerald-600" },
];

export default function AdminEvents() {
  const [events, setEvents] = useState<Card[]>(initialEvents);
  const [services, setServices] = useState<Card[]>(initialServices);

  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [addOpen, setAddOpen] = useState(false);
  const [addSection, setAddSection] = useState<"event" | "service">("event");
  const [form, setForm] = useState({ title: "", schedule: "", icon: "heart" as IconKey });

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleDeleteSelected() {
    if (selected.size === 0) return;
    if (!confirm(`Remove ${selected.size} item(s)?`)) return;
    // TODO: call your delete API here, e.g. DELETE /api/admin/events/:id for each id
    setEvents((prev) => prev.filter((c) => !selected.has(c.id)));
    setServices((prev) => prev.filter((c) => !selected.has(c.id)));
    setSelected(new Set());
  }

  function openAdd(section: "event" | "service") {
    setAddSection(section);
    setForm({ title: "", schedule: "", icon: "heart" });
    setAddOpen(true);
  }

  function submitAdd() {
    if (!form.title.trim()) return;
    const card: Card = {
      id: `${addSection}-${Date.now()}`,
      title: form.title,
      schedule: form.schedule || "TBA",
      icon: form.icon,
      titleColor: "text-emerald-600",
    };
    // TODO: call your create API here, e.g. POST /api/admin/events or /api/admin/services
    if (addSection === "event") setEvents((prev) => [...prev, card]);
    else setServices((prev) => [...prev, card]);
    setAddOpen(false);
  }

  function renderCard(card: Card) {
    const Icon = ICONS[card.icon];
    const isSelected = selected.has(card.id);
    return (
      <article
        key={card.id}
        onClick={() => editMode && toggleSelect(card.id)}
        className={`relative rounded-2xl border bg-white p-5 transition ${editMode ? "cursor-pointer" : ""} ${
          isSelected ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"
        }`}
      >
        {editMode && (
          <div
            className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded border-2 ${
              isSelected ? "border-red-500 bg-red-500 text-white" : "border-slate-300"
            }`}
          >
            {isSelected && <X size={12} />}
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${ICON_TONE[card.icon]}`}>
            <Icon size={26} />
          </div>
          <div className="min-w-0">
            <h3 className={`font-poppins text-xl font-extrabold leading-tight ${card.titleColor}`}>{card.title}</h3>
            <p className="mt-1 whitespace-pre-line text-sm font-medium text-slate-500">{card.schedule}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="flex-1">
      <div className="px-12 pt-5 pb-12">
        <div className="flex flex-wrap items-start justify-between gap-4 my-[14px]">
          <div>
            <h1 className="font-poppins text-[32px] font-extrabold text-[#1d1d1d]">Public Health Events &amp; Services</h1>
            <p className="mt-1 text-base font-medium text-slate-500">Community welfare programs and health campaigns</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setEditMode((v) => !v); setSelected(new Set()); }}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                editMode ? "border-slate-800 bg-slate-800 text-white" : "border-slate-300 text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Pencil size={16} />
              {editMode ? "Done" : "Edit"}
            </button>

            <button
              onClick={() => openAdd("event")}
              className="flex items-center gap-2 rounded-full border border-[#4E69D3] bg-white px-5 py-2.5 text-sm font-bold text-[#4E69D3] hover:bg-[#EEF0FB]"
            >
              <Plus size={16} />
              Add
            </button>

            <button
              onClick={handleDeleteSelected}
              disabled={selected.size === 0}
              className="flex items-center gap-2 rounded-full border border-red-300 bg-white px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={16} />
              Delete{selected.size > 0 ? ` (${selected.size})` : ""}
            </button>
          </div>
        </div>

        {editMode && (
          <p className="mb-4 text-center text-xs font-semibold text-slate-400">
            Edit mode: tap a card to select it, then press Delete. Click Done when finished.
          </p>
        )}

        <h2 className="mb-5 text-center font-poppins text-2xl font-extrabold text-slate-700">Event</h2>
        <div className="mb-10 grid gap-5 md:grid-cols-3">{events.map(renderCard)}</div>

        <h2 className="mb-5 text-center font-poppins text-2xl font-extrabold text-slate-700">Services</h2>
        <div className="grid gap-5 md:grid-cols-3">{services.map(renderCard)}</div>
      </div>

      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Add {addSection === "event" ? "Event" : "Service"}</h3>
              <button onClick={() => setAddOpen(false)} className="text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="mb-3 flex gap-2">
              {(["event", "service"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setAddSection(s)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${
                    addSection === s ? "border-sky-400 bg-sky-50 text-sky-600" : "border-slate-200 text-slate-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <label className="mb-1 block text-xs font-semibold text-slate-500">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Nutrition Workshop"
              className="mb-3 w-full rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-800 outline-none"
            />

            <label className="mb-1 block text-xs font-semibold text-slate-500">Schedule / Date</label>
            <input
              value={form.schedule}
              onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              placeholder="e.g. Every Friday"
              className="mb-3 w-full rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-800 outline-none"
            />

            <label className="mb-1 block text-xs font-semibold text-slate-500">Icon</label>
            <div className="mb-5 flex flex-wrap gap-2">
              {(Object.keys(ICONS) as IconKey[]).map((key) => {
                const Icon = ICONS[key];
                return (
                  <button
                    key={key}
                    onClick={() => setForm({ ...form, icon: key })}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                      form.icon === key ? "border-sky-400 bg-sky-50 text-sky-600" : "border-slate-200 text-slate-500"
                    }`}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>

            <button onClick={submitAdd} className="w-full rounded-lg bg-[#4E69D3] py-2.5 text-sm font-bold text-white hover:bg-[#3D56B8]">
              Add {addSection === "event" ? "Event" : "Service"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}