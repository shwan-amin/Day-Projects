import Entry from "../components/Entry.jsx";

export default function Sidebar({ entries, entryClick }) {
    return (
        <section className="search-bar-div">
            <input id="search-bar-input"></input>

            <div className="entries-list-div">
                {!entries.length && <p>Create your first entry!</p>}

                {entries.map((entry) => (
                    <Entry
                        key={entry.id}
                        id={entry.id}
                        title={entry.title}
                        date={entry.date}
                        onClick={() => entryClick(entry.id)}
                    />
                ))}
            </div>
        </section>
    );
}