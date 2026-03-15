import { useEffect, useState } from "react";

export default function MainPanel({ entry, onSaveEntry }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftTitle, setDraftTitle] = useState("");
    const [draftText, setDraftText] = useState("");

    useEffect(() => {
        if (!entry) {
            setIsEditing(false);
            setDraftTitle("");
            setDraftText("");
            return;
        }

        setIsEditing(false);
        setDraftTitle(entry.title ?? "");
        setDraftText(entry.text ?? "");
    }, [entry]);

    function handleStartEdit() {
        if (!entry) return;
        setDraftTitle(entry.title ?? "");
        setDraftText(entry.text ?? "");
        setIsEditing(true);
    }

    function handleCancelEdit() {
        if (!entry) return;
        setDraftTitle(entry.title ?? "");
        setDraftText(entry.text ?? "");
        setIsEditing(false);
    }

    function handleSaveEdit() {
        if (!entry) return;

        onSaveEntry({
            ...entry,
            title: draftTitle.trim() || "Untitled entry",
            text: draftText,
        });
        setIsEditing(false);
    }

    return (
        <section className="main">
            {!entry ? (
                <p className="main-entry-placeholder">Select an entry from the sidebar to view or edit.</p>
            ) : (
                <>
                    <div className="main-entry-header-row">
                        {isEditing ? (
                            <input
                                className="main-entry-title-input"
                                value={draftTitle}
                                onChange={(e) => setDraftTitle(e.target.value)}
                                placeholder="Entry title"
                            />
                        ) : (
                            <h2 className="main-entry-title">{entry.title}</h2>
                        )}
                        <div className="main-entry-actions">
                            {!isEditing ? (
                                <button className="main-btn edit" onClick={handleStartEdit}>Edit</button>
                            ) : (
                                <>
                                    <button className="main-btn save" onClick={handleSaveEdit}>Save</button>
                                    <button className="main-btn cancel" onClick={handleCancelEdit}>Cancel</button>
                                </>
                            )}
                        </div>
                    </div>

                    <h3 className="main-entry-date">{entry.date}</h3>

                    {isEditing ? (
                        <textarea
                            className="main-entry-editor"
                            value={draftText}
                            onChange={(e) => setDraftText(e.target.value)}
                            placeholder="Write your entry here..."
                        />
                    ) : (
                        <div className="main-entry-text-box">
                            <p className="main-entry-text">{entry.text || "No content yet. Click Edit to start writing."}</p>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}