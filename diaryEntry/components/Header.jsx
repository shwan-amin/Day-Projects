import reactLogo from "../src/assets/react.svg";

export default function Header({ onCreateEntry }) {
    return (
        <header>
            <h1>
                <img src={reactLogo} alt="React logo" className="header-react-logo" />
                Reactive Diary
            </h1>

            <button id="create-entry-btn" onClick={onCreateEntry}>Create Entry</button>
        </header>
    );
}