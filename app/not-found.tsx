export default function NotFound() {
  return (
    <main className="container">
      <section className="card hero">
        <h2>Página no encontrada</h2>
        <p>Vuelve al inicio para entrar al chat.</p>
        <div className="ctaRow">
          <a className="btn btnPrimary" href="/">
            Ir al inicio
          </a>
          <a className="btn btnGhost" href="/chat">
            Ir al chat
          </a>
        </div>
      </section>
    </main>
  );
}
