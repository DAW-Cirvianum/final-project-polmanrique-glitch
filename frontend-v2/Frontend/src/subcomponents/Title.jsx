/**
 * Componente que mostra un títol i una subtitol
 * @param {string} title 
 * @param {string} subtitle 
 * @returns {JSX.Element}
 */
export default function Title({ title, subtitle }) {
    return (
        <section
            className="text-white shadow-lg bg-primary"
        >
            <div className="container text-center py-5" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
                <h1 className="display-3 fw-bold">
                    {title}
                </h1>
                <p className="lead mt-3 opacity-75">
                    {subtitle}
                </p>
            </div>
        </section>
    )
}
