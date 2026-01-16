
/**
 * Componente que mostra un títol i una subtitol
 * @param {string} title 
 * @param {string} subtitle 
 * @returns {JSX.Element}
 */
export default function Title({ title, subtitle }) {
    return (
        <section className="bg-gradient-to-r from-emerald-500 to-lime-600 text-white shadow-lg">
            <div className="max-w-5xl mx-auto px-6 py-28 text-center">
                <h1 className="text-6xl font-extrabold tracking-wide">
                    {title}
                </h1>
                <p className="mt-4 text-xl opacity-90">
                    {subtitle}
                </p>
            </div>
        </section>
    )
}