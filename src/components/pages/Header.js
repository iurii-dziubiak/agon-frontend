const Header = () => {
    return (
        <div>
            <header className="mdc-top-app-bar--fixed">
                <div className="mdc-top-app-bar__row">
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                                aria-label="Open navigation menu">menu
                        </button>
                        <span className="mdc-top-app-bar__title">Agon</span>
                    </section>
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                        <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                                aria-label="Options">more_vert
                        </button>
                    </section>
                </div>
            </header>
        </div>
    );
};

export default Header;