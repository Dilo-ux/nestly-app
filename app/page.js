export default function Home() {
  return (
    <div className="container">
      <nav>
        <div className="logo">Nestly</div>
        <div className="nav-links">
          <a href="#">For landlords</a>
          <a href="#">For tenants</a>
          <a href="#">Sign in</a>
        </div>
      </nav>

      <section className="hero">
        <h1>The trusted rental operating system for Nigeria</h1>
        <p>
          Discover verified properties, message landlords directly, sign leases,
          and pay rent safely — all in one place. No more agent fees for a
          listing that doesn&apos;t exist.
        </p>
        <a href="#" className="btn">Find a rental</a>
        <a href="#" className="btn btn-outline">List your property</a>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Verified listings</h3>
          <p>
            Every property is checked — GPS location, real photos, a video
            walkthrough, and a verified landlord identity before it ever goes live.
          </p>
        </div>
        <div className="feature-card">
          <h3>Safe payments</h3>
          <p>
            Rent moves through a secure, licensed payment partner — with automatic
            receipts and a full history you can always look back on.
          </p>
        </div>
        <div className="feature-card">
          <h3>Everything after move-in</h3>
          <p>
            Track your lease, request maintenance, and manage renewals — no more
            WhatsApp threads and lost paperwork.
          </p>
        </div>
      </section>

      <footer>
        &copy; 2026 Nestly. Built for Nigeria&apos;s rental market.
      </footer>
    </div>
  );
}
