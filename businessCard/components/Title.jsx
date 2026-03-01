export default function Title() {
    return (
        <div className="title">
            <div className="name-text">
                <h1>Shwan Amin</h1>
                <h2>Fullstack Developer</h2>
            </div>

            <div className="links">
                <div className="link">
                    <img src="/mail.png" className="linkImg"></img>
                    <p className="linkText">Email</p>
                </div>

                <div className="link">
                    <img src="/git.png" className="linkImg"></img>
                    <p className="linkText">Github</p>
                </div>
            </div>
        </div>
    );
}