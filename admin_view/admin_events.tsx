// File location: admin_view/admin_events.tsx
"use client";

import {
  Pencil,
  Plus,
  Trash2,
  Syringe,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Users,
  Pill,
  Ambulance,
  X,
} from "lucide-react";
import { useState, type ComponentType } from "react";

type IconKey = "syringe" | "heart" | "stethoscope" | "shield" | "users" | "pill" | "ambulance";
type CardStatus = "Scheduled" | "Rescheduled" | "Cancelled";

interface Card {
  id: string;
  title: string;
  schedule: string;
  icon: IconKey;
  titleColor: string;
  status: CardStatus;
}

const ICONS: Record<IconKey, ComponentType<{ size?: number }>> = {
  syringe: Syringe,
  heart: HeartPulse,
  stethoscope: Stethoscope,
  shield: ShieldCheck,
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

const STATUS_BADGE: Record<CardStatus, string> = {
  Scheduled: "hidden", // no badge needed for the normal/default state
  Rescheduled: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

const initialEvents: Card[] = [
  { id: "e1", title: "Anti-Rabies Vacination", schedule: "March 29, 2026 | Sunday\n7:00am to 9:00am", icon: "syringe", titleColor: "text-emerald-600", status: "Scheduled" },
  { id: "e2", title: "Blood Donation Program", schedule: "March 30, 2026 | Monday\n3:00pm to 5:00pm", icon: "heart", titleColor: "text-red-600", status: "Scheduled" },
  { id: "e3", title: "Mental Health Screening", schedule: "March 31, 2026 | Tuesday\n3:00pm to 5:00pm", icon: "heart", titleColor: "text-violet-400", status: "Scheduled" },
];

const initialServices: Card[] = [
  { id: "s1", title: "Basic Consultation", schedule: "Every Monday", icon: "stethoscope", titleColor: "text-emerald-600", status: "Scheduled" },
  { id: "s2", title: "Disease Control & Prevention", schedule: "Wednesday - Friday", icon: "shield", titleColor: "text-emerald-600", status: "Scheduled" },
  { id: "s3", title: "Family Planning & Reproductive Health", schedule: "Every Thursday", icon: "users", titleColor: "text-emerald-600", status: "Scheduled" },
  { id: "s4", title: "Immunization & Vaccination", schedule: "Wednesday - Friday", icon: "pill", titleColor: "text-emerald-600", status: "Scheduled" },
  { id: "s5", title: "Maternal & Child Care", schedule: "Every Tuesday", icon: "heart", titleColor: "text-emerald-600", status: "Scheduled" },
  { id: "s6", title: "Dental Care", schedule: "Every Friday", icon: "ambulance", titleColor: "text-emerald-600", status: "Scheduled" },
];

export default function AdminEvents() {
  const [events, setEvents] = useState<Card[]>(initialEvents);
  const [services, setServices] = useState<Card[]>(initialServices);

  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [addOpen, setAddOpen] = useState(false);
  const [addSection, setAddSection] = useState<"event" | "service">("event");
  const [form, setForm] = useState({ title: "", schedule: "", icon: "heart" as IconKey });

  // Per-card edit (title / schedule / status)
  const [editingCard, setEditingCard] = useState<{ section: "event" | "service"; card: Card } | null>(null);
  const [editForm, setEditForm] = useState({ title: "", schedule: "", status: "Scheduled" as CardStatus });

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
      status: "Scheduled",
    };
    // TODO: call your create API here, e.g. POST /api/admin/events or /api/admin/services
    if (addSection === "event") setEvents((prev) => [...prev, card]);
    else setServices((prev) => [...prev, card]);
    setAddOpen(false);
  }

  function openEditCard(section: "event" | "service", card: Card) {
    setEditingCard({ section, card });
    setEditForm({ title: card.title, schedule: card.schedule, status: card.status });
  }

  function submitEditCard() {
    if (!editingCard) return;
    const { section, card } = editingCard;
    const updated: Card = { ...card, title: editForm.title, schedule: editForm.schedule, status: editForm.status };

    // TODO: call your update API here, e.g.
    // await fetch(`/api/admin/${section}s/${card.id}`, { method: "PATCH", body: JSON.stringify(updated) });
    if (section === "event") {
      setEvents((prev) => prev.map((c) => (c.id === card.id ? updated : c)));
    } else {
      setServices((prev) => prev.map((c) => (c.id === card.id ? updated : c)));
    }
    setEditingCard(null);
  }

  function renderCard(card: Card, section: "event" | "service") {
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

        {!editMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEditCard(section, card);
            }}
            title="Edit details"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <Pencil size={14} />
          </button>
        )}

        {card.status !== "Scheduled" && (
          <span className={`absolute left-5 top-5 -translate-y-8 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_BADGE[card.status]}`}>
            {card.status}
          </span>
        )}

        <div className="flex items-center gap-4">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${ICON_TONE[card.icon]}`}>
            <Icon size={26} />
          </div>
          <div className="min-w-0">
            <h3 className={`font-poppins text-lg font-extrabold leading-tight ${card.titleColor}`}>{card.title}</h3>
            <p className="mt-1 whitespace-pre-line text-[11px] font-medium text-slate-500">{card.schedule}</p>
            {card.status !== "Scheduled" && (
              <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_BADGE[card.status]}`}>
                {card.status}
              </span>
            )}
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
            <h1 className="font-poppins text-[32px] font-bold text-[#1d1d1d]">Public Health Events &amp; Services</h1>
            <p className="mt-1 text-sm font-medium text-slate-500">Community welfare programs and health campaigns</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setEditMode((v) => !v); setSelected(new Set()); }}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                editMode ? "border-slate-800 bg-slate-800 text-white" : "border-slate-300 text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Pencil size={16} />
              {editMode ? "Done" : "Select / Delete"}
            </button>

            <button
              onClick={() => openAdd("event")}
              className="flex items-center gap-2 rounded-full border border-sky-300 bg-white px-5 py-2.5 text-sm font-bold text-sky-500 hover:bg-sky-50"
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
            Select mode: tap a card to select it, then press Delete. Click Done when finished.
          </p>
        )}
        {!editMode && (
          <p className="mb-4 text-center text-xs font-semibold text-slate-400">
            Click the pencil icon on a card to edit its date, time, or status (e.g. mark it Cancelled or Rescheduled).
          </p>
        )}

        <h2 className="mb-5 text-center font-poppins text-2xl font-extrabold text-slate-700">Event</h2>
        <div className="mb-10 grid gap-5 md:grid-cols-3">{events.map((c) => renderCard(c, "event"))}</div>

        <h2 className="mb-5 text-center font-poppins text-2xl font-extrabold text-slate-700">Services</h2>
        <div className="grid gap-5 md:grid-cols-3">{services.map((c) => renderCard(c, "service"))}</div>
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

            <button onClick={submitAdd} className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-bold text-white hover:bg-sky-600">
              Add {addSection === "event" ? "Event" : "Service"}
            </button>
          </div>
        </div>
      )}

      {editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                Edit {editingCard.section === "event" ? "Event" : "Service"}
              </h3>
              <button onClick={() => setEditingCard(null)} className="text-slate-400">
                <X size={20} />
              </button>
            </div>

            <label className="mb-1 block text-xs font-semibold text-slate-500">Title</label>
            <input
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="mb-3 w-full rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-800 outline-none"
            />

            <label className="mb-1 block text-xs font-semibold text-slate-500">Schedule / Date &amp; Time</label>
            <textarea
              value={editForm.schedule}
              onChange={(e) => setEditForm({ ...editForm, schedule: e.target.value })}
              rows={2}
              placeholder={"e.g. April 5, 2026 | Sunday\n8:00am to 10:00am"}
              className="mb-3 w-full rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-800 outline-none"
            />

            <label className="mb-1 block text-xs font-semibold text-slate-500">Status</label>
            <div className="mb-5 flex gap-2">
              {(["Scheduled", "Rescheduled", "Cancelled"] as CardStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setEditForm({ ...editForm, status: s })}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs font-bold ${
                    editForm.status === s
                      ? s === "Cancelled"
                        ? "border-red-400 bg-red-50 text-red-600"
                        : s === "Rescheduled"
                        ? "border-amber-400 bg-amber-50 text-amber-600"
                        : "border-emerald-400 bg-emerald-50 text-emerald-600"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button onClick={submitEditCard} className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-bold text-white hover:bg-sky-600">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}