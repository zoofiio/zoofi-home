import { useEffect, useState, type CSSProperties } from "react";
import { LiquidityMetric } from "./LiquidityMetric";
import { ProcessAnimation } from "./ProcessAnimation";
import { ArrowIcon } from "./ArrowIcon";
import "./landing.css";

const brandAssets = `${import.meta.env.BASE_URL}images/zoo-brand/`;

const backers = [
  ["BINANCE", "01-BINANCE.svg"],
  ["OKX", "02-OKX.svg"],
  ["Bitrise Capital", "03-Bitrise Capital.svg"],
  ["Signum Capital", "04-Signum Capital.svg"],
  ["Certick Ventures", "05-Certick Ventures.svg"],
  ["TOP", "06-TOP.svg"],
  ["CGV Funds", "07-CGV Funds.svg"],
  ["Cryptomeria", "08-Cryptomeria.svg"],
  ["CMS Holdings", "09-CMS Holdings.svg"],
  ["Big Brain Holdings", "10-Big Brain Holdings.svg"],
  ["DefinanceX", "11-DefinanceX.svg"],
  ["Pragma Ventures", "12-Pragma Ventures.svg"],
  ["HG Ventures", "13-HG Ventures.svg"],
  ["YBB Capital", "14-YBB Capital.svg"],
  ["0xVentures", "15-0xVentures.svg"],
  ["Aquarius Financials", "16-Aquarius Financials.svg"],
  ["Dorahacks", "17-Dorahacks.svg"],
];

const products = [
  {
    code: "LNT",
    name: "Node Assets",
    copy: "Bring node assets and their future rewards into onchain markets.",
  },
  {
    code: "LVT",
    name: "Token Allocations",
    copy: "Bring scheduled token allocations into onchain markets.",
  },
  {
    code: "LAR",
    name: "Accounts Receivable",
    copy: "Bring business receivables and future payments into onchain markets.",
  },
  {
    code: "ZSTOCK",
    name: "ZSTOCK",
    copy: "Onchain tokens for shares that will be delivered later or cannot yet be resold.",
  },
];

const steps = [
  ["01", "Define", "Establish the assets, holder rights, and settlement terms of a vault.", "define"],
  ["02", "Tokenize", "Receive tokens representing the future rights defined by that vault.", "tokenize"],
  ["03", "Trade or hold", "Trade where markets are available, or hold for future redemption.", "trade"],
  ["04", "Redeem", "Redeem or claim the underlying assets under the vault’s terms.", "redeem"],
];

export function ZooLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const appUrl = "https://app.zoofi.io";
  const docsUrl = "https://docs.zoofi.io";
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="zoo-page">
      <a className="zoo-skip-link" href="#main-content">Skip to content</a>
      <header className="zoo-header">
        <a className="zoo-brand" href="#top" aria-label="Zoo Finance home" onClick={closeMenu}>
          <img src={`${brandAssets}logo.svg`} alt="Zoo Finance" />
          <span>FINANCE</span>
        </a>
        <button
          className={`zoo-menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="landing-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i />
          <i />
        </button>
        <nav id="landing-navigation" className={`zoo-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a href="#products" onClick={closeMenu}>Products</a>
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#backers" onClick={closeMenu}>Backers</a>
          <a href={docsUrl} onClick={closeMenu}>Docs <span className="zoo-external"><ArrowIcon /></span></a>
          <a className="zoo-nav-cta" href={appUrl} onClick={closeMenu}>Launch App <span><ArrowIcon /></span></a>
        </nav>
      </header>

      <section className="zoo-hero" id="top">
        <div className="zoo-hero-copy" id="main-content" tabIndex={-1}>
          <p className="zoo-kicker"><span className="zoo-pulse" /> FUTURE RIGHTS. PRESENT VALUE.</p>
          <h1>A market for<br /><em>future</em> value.</h1>
          <p className="zoo-hero-description">
            Discover, price, and trade rights to future assets and cash flows—all onchain.
          </p>
          <div className="zoo-hero-actions">
            <a className="zoo-button zoo-button-lime" href={appUrl}>
              Launch App <span className="zoo-arrow"><ArrowIcon /></span>
            </a>
            <a className="zoo-text-link" href={docsUrl}>
              Read Docs <span><ArrowIcon /></span>
            </a>
          </div>
        </div>
        <div className="zoo-hero-art" aria-label="Future asset rights represented by tradable onchain tokens" role="img">
          <div className="zoo-art-orbit orbit-one" />
          <div className="zoo-art-orbit orbit-two" />
          <div className="zoo-art-cross cross-a" />
          <div className="zoo-art-cross cross-b" />
          <div className="zoo-art-caption"><span>FUTURE RIGHTS</span><span>PRESENT VALUE</span></div>
          <div className="zoo-art-input">
            <div className="zoo-doc-icon"><span /><span /><span /></div>
            <div><small>FUTURE CLAIM</small><strong>Asset / rights</strong></div>
            <b className="zoo-lock">⌑</b>
          </div>
          <div className="zoo-art-path"><span /><span /><span /><span /><span /></div>
          <div className="zoo-art-core">
            <div className="zoo-core-ring" />
            <img src={`${brandAssets}logo.svg`} alt="" />
            <small>PROTOCOL</small>
          </div>
          <div className="zoo-art-output">
            <span className="zoo-token-glyph">Z</span>
            <div><small>ONCHAIN TOKEN</small><strong>Tradable value</strong></div>
            <b><ArrowIcon /></b>
          </div>
          <div className="zoo-art-footnote">VALUE, GIVEN ROOM TO MOVE.</div>
        </div>
        <div className="zoo-hero-bottom"><span>ASSETS WITH A FUTURE</span><span>BUILT FOR WHAT’S NEXT <b><ArrowIcon direction="down" /></b></span></div>
      </section>

      <section className="zoo-liquidity" aria-labelledby="zoo-liquidity-title">
        <div className="zoo-metric-label">
          <span className="zoo-section-index">01 / PROTOCOL SNAPSHOT</span>
          <h2 id="zoo-liquidity-title">Protocol Value (TVL)</h2>
          <p>A USD estimate of protocol value covered by DefiLlama.</p>
        </div>
        <LiquidityMetric />
      </section>

      <section className="zoo-products zoo-section" id="products">
        <div className="zoo-section-heading">
          <div><span className="zoo-section-index">02 / PRODUCT SUITE</span><h2>Our Products<span className="zoo-heading-dot">.</span></h2></div>
          <p>Different assets.<br className="zoo-desktop-break" /> One market for future value.</p>
        </div>
        <div className="zoo-product-grid">
          {products.map((product) => (
            <article className="zoo-product-card" key={product.code} aria-labelledby={`product-${product.code.toLowerCase()}`}>
              <div className="zoo-product-top"><span>{product.code}</span></div>
              <div className="zoo-product-emblem" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {product.code === "LNT" ? <>
                    <path d="M32 22V12M23 37l-9 6m27-6 9 6" />
                    <path d="m32 22 12 7v14l-12 7-12-7V29l12-7Z" />
                    <path d="m20 29 12 7 12-7M32 36v14" />
                    <circle cx="32" cy="8" r="4" /><circle cx="10" cy="46" r="4" /><circle cx="54" cy="46" r="4" />
                  </> : product.code === "LVT" ? <>
                    <circle cx="32" cy="33" r="23" />
                    <path d="M14 20a23 23 0 0 1 36 0M14 46a23 23 0 0 0 36 0" opacity=".35" />
                    <rect x="23" y="29" width="18" height="16" rx="4" />
                    <path d="M27 29v-6a5 5 0 0 1 10 0v6M32 36v3" />
                  </> : product.code === "ZSTOCK" ? <>
                    <rect x="11" y="12" width="42" height="40" rx="7" />
                    <path d="M18 43h28M21 36l9-9 7 5 9-13m-7 0h7v7" />
                    <path d="M21 47v-4m9 4V36m7 11V39m9 8V32" opacity=".4" />
                  </> : <>
                    <path d="M17 8h22l9 9v36a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z" />
                    <path d="M38 8v11h10M23 27h15M23 34h10" />
                    <path d="M24 46h17m-6-6 6 6-6 6" />
                  </>}
                </svg>
              </div>
              <div className="zoo-product-title">
                <h3 id={`product-${product.code.toLowerCase()}`}>{product.name}</h3>
              </div>
              <p>{product.copy}</p>
              <div className="zoo-card-line" />
            </article>
          ))}
        </div>
        <div className="zoo-product-foot">
          <a href={appUrl} className="zoo-product-link">Explore Vaults <span aria-hidden="true"><ArrowIcon /></span></a>
        </div>
      </section>

      <section className="zoo-process" id="how-it-works">
        <div className="zoo-process-head">
          <span className="zoo-section-index">03 / A SHARED PATH</span>
          <h2>Future rights.<br /><em>Onchain assets.</em></h2>
          <p>Vaults define the rights. Tokens represent them. Markets determine their present value.</p>
        </div>
        <div className="zoo-steps">
          {steps.map(([number, title, copy, image], index) => (
            <article className="zoo-step" key={number}>
              <div className="zoo-step-top">
                <span>{number}</span>
                <ProcessAnimation step={image} />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
              {index < steps.length - 1 && <div className="zoo-step-connector" aria-hidden="true"><ArrowIcon direction="right" /></div>}
            </article>
          ))}
        </div>
      </section>

      <section className="zoo-backers zoo-section" id="backers">
        <div className="zoo-section-heading">
          <div><span className="zoo-section-index">04 / OUR NETWORK</span><h2>Investors <span>&amp;</span><br className="zoo-mobile-break" /> Backers<span className="zoo-heading-dot">.</span></h2></div>
          <p>Supported by people who believe<br className="zoo-desktop-break" /> in a more liquid future.</p>
        </div>
        <div
          id="zoo-backer-row"
          className="zoo-backer-carousel"
          style={{ "--zoo-backer-count": backers.length } as CSSProperties}
          tabIndex={0}
          role="region"
          aria-label="Investor and backer logos"
        >
          <div className="zoo-backer-track">
            {[0, 1].map(copy => (
              <ul className="zoo-backer-group" key={copy} aria-hidden={copy === 1 || undefined}>
                {backers.map(([name, file]) => (
                  <li className="zoo-backer-logo" key={name}>
                    <img src={`${brandAssets}${encodeURIComponent(file)}`} alt="" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section className="zoo-final-cta">
        <div className="zoo-cta-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="zoo-cta-content">
          <span className="zoo-section-index">YOUR ASSETS HAVE A NEXT CHAPTER</span>
          <h2>The future has value.<br /><em>Give it a market.</em></h2>
          <p>Explore future assets and cash flows on Zoo.</p>
          <a className="zoo-button zoo-button-dark" href={appUrl}>Launch App <span className="zoo-arrow"><ArrowIcon /></span></a>
        </div>
        <div className="zoo-cta-side">MOVE<br />WITH<br />VALUE<span><ArrowIcon /></span></div>
      </section>

      <footer className="zoo-footer">
        <div className="zoo-footer-top">
          <a className="zoo-brand zoo-footer-brand" href="#top" aria-label="Zoo Finance home">
            <img src={`${brandAssets}logo.svg`} alt="Zoo Finance" /><span>FINANCE</span>
          </a>
          <p>A market for<br />future value.</p>
          <div className="zoo-footer-links">
            <a href="#products">Products</a><a href="#how-it-works">How it works</a><a href="#backers">Backers</a>
            <a href={docsUrl}>Docs <ArrowIcon /></a>
            <a href="https://x.com/ZooFinanceIO" target="_blank" rel="noopener noreferrer">X <ArrowIcon /></a>
          </div>
        </div>
        <div className="zoo-footer-bottom"><span>© 2026 ZOO FINANCE</span><span>Digital assets involve risk. Review each vault’s terms before participating.</span><a href="#top">BACK TO TOP <ArrowIcon direction="up" /></a></div>
      </footer>
    </main>
  );
}

export default ZooLanding;
