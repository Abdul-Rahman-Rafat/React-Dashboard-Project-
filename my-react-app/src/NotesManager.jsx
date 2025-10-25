import React, { useState, useEffect } from "react";

const priorities = ["important", "normal", "delayed"];

export default function NotesManager() {
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState(priorities[1]);
  const [notes, setNotes] = useState([]);

  // ✅ تحميل الملاحظات من LocalStorage عند فتح الصفحة
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  // ✅ حفظ الملاحظات في LocalStorage كل ما تتغير
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!note) return;
    setNotes([
      ...notes,
      { id: Date.now(), text: note, priority },
    ]);
    setNote("");
    setPriority(priorities[1]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const changePriority = (id, newPriority) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, priority: newPriority } : n
      )
    );
  };

  return (
    <div className="bg-white rounded shadow p-4 card">
      <h2 className="text-xl font-bold mb-2">📒 الملاحظات</h2>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="اكتب ملاحظة"
          className="border p-2 rounded w-full"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()} // ✅ دعم زر Enter
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button
          onClick={addNote}
          className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
        >
          إضافة
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {priorities.map((p) => (
          <div key={p}>
            <h3 className="font-bold text-lg mb-1 capitalize">{p}</h3>
            <ul>
              {notes
                .filter((n) => n.priority === p)
                .map((n) => (
                  <li
                    key={n.id}
                    className={`flex items-center justify-between border-b py-2 px-3 rounded ${
                      n.priority === "important"
                        ? "bg-red-100"
                        : n.priority === "delayed"
                        ? "bg-yellow-100"
                        : "bg-green-100"
                    }`}
                  >
                    <span>{n.text}</span>
                    <div className="flex gap-2 items-center">
                      <select
                        value={n.priority}
                        onChange={(e) =>
                          changePriority(n.id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-xs"
                      >
                        {priorities.map((pp) => (
                          <option key={pp} value={pp}>
                            {pp}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => deleteNote(n.id)}
                        className="text-red-500 px-2 hover:underline"
                      >
                        حذف
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
