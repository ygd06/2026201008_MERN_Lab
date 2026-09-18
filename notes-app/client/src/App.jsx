import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/notes";

function NoteCard({ note, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(note._id);
    } catch {
      setDeleting(false);
    }
  };

  const formattedDate = new Date(note.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className={`note-card ${deleting ? "deleting" : ""}`}>
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <button
          className="btn-delete"
          onClick={handleDelete}
          disabled={deleting}
          aria-label={`Delete note: ${note.title}`}
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
      <p className="note-content">{note.content}</p>
      <time className="note-date" dateTime={note.createdAt}>
        {formattedDate}
      </time>
    </div>
  );
}

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    axios
      .get(API_BASE)
      .then((res) => setNotes(res.data))
      .catch(() => setError("Failed to load notes. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setFormError("Both title and content are required.");
      return;
    }
    try {
      setSubmitting(true);
      setFormError(null);
      const res = await axios.post(API_BASE, { title: title.trim(), content: content.trim() });
      setNotes((prev) => [res.data, ...prev]);
      setTitle("");
      setContent("");
    } catch (err) {
      setFormError("Failed to save note. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Note.io</h1>
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>Add a New Note</h2>
          <form className="note-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Note heading / subject…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                rows={4}
                placeholder="Write your note here…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={submitting}
              />
            </div>
            {formError && <p className="form-error">{formError}</p>}
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Saving…" : "Add Note"}
            </button>
          </form>
        </section>

        <section className="notes-section">
          <h2>All Notes</h2>
          {loading ? (
            <div className="state-message loading">
              <span className="spinner" />
              Loading notes…
            </div>
          ) : error ? (
            <div className="state-message error">{error}</div>
          ) : notes.length === 0 ? (
            <div className="state-message empty">
              No notes yet — add one above!
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
