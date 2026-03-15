export default function Entry(props) {
        return (
                <div className="list-entry" id={props.id} onClick={props.onClick}>
                        <p className="entry-title">{props.title}</p>
                        <p className="entry-date">{props.date}</p>
                </div>
        );
}