import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { ArrowRight, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import CinematicHero from '../Components/CinematicHero';
import LuxuryNav from '../Components/LuxuryNav';
import CartDrawer from '../Components/CartDrawer';

const products = [
    { id: 1, name: 'Oval Halo Signature Ring', material: '18K Gold · Brilliant-cut stones', price: 39800, image: '/assets/lucky-ring-front.png', tag: 'Signature' },
    { id: 2, name: 'Lumière Oval Ring', material: '18K Gold · Oval halo setting', price: 42600, image: '/assets/lucky-ring-side.png', tag: 'New' },
    { id: 3, name: 'Éclat Pendant Necklace', material: 'White gold · Oval drop pendant', price: 28500, image: '/assets/film-necklace.jpg', tag: 'Bestseller' },
    { id: 4, name: 'Radiance Evening Necklace', material: 'White gold · Graduated stones', price: 49900, image: '/assets/film-portrait.jpg', tag: 'Limited' },
    { id: 5, name: 'Halo Promise Ring', material: '18K Gold · Pavé shoulders', price: 36800, image: '/assets/film-ring.jpg', tag: 'Loved' },
    { id: 6, name: 'Maison Oval Ring', material: '18K Gold · Halo setting', price: 45200, image: '/assets/lucky-ring-front.png', tag: 'Atelier' },
];

const categories = [
    { name: 'Rings', line: 'Symbols of Forever', image: '/assets/lucky-ring-front.png', href: '#signature' },
    { name: 'Necklaces', line: 'Made to Be Remembered', image: '/assets/film-necklace.jpg', href: '#shop' },
    { name: 'Earrings', line: 'The Finishing Detail', image: '/assets/film-portrait.jpg', href: '#moments' },
    { name: 'Bracelets', line: 'Modern Icons', image: '/assets/film-ring.jpg', href: '#consultation' },
];

export default function Home() {
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [savedOnly, setSavedOnly] = useState(false);

    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
    const visibleProducts = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch = !normalizedQuery
                || `${product.name} ${product.material}`.toLowerCase().includes(normalizedQuery);
            const matchesSaved = !savedOnly || favorites.includes(product.id);
            return matchesSearch && matchesSaved;
        });
    }, [favorites, savedOnly, searchQuery]);

    const addToCart = (product) => {
        setCart((current) => {
            const exists = current.find((item) => item.id === product.id);
            if (exists) {
                return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...current, { ...product, qty: 1 }];
        });
        setCartOpen(true);
    };

    const changeQty = (id, delta) => {
        setCart((current) => current
            .map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
            .filter((item) => item.qty > 0));
    };

    const toggleFavorite = (id) => {
        setFavorites((current) => current.includes(id)
            ? current.filter((favoriteId) => favoriteId !== id)
            : [...current, id]);
    };

    const openSavedPieces = () => {
        setSavedOnly(true);
        document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main>
            <Head title="SR Crown Jewls" />
            <LuxuryNav
                cartCount={cartCount}
                wishlistCount={favorites.length}
                onCartOpen={() => setCartOpen(true)}
                onSearchOpen={() => setSearchOpen(true)}
                onWishlistOpen={openSavedPieces}
            />
            <CinematicHero />

            <section className="editorial-intro section-pad" aria-labelledby="discover-title">
                <div className="editorial-intro__rule" />
                <p className="kicker">The Collections</p>
                <h2 id="discover-title">Discover<br /><em>Your Story.</em></h2>
                <p className="editorial-intro__body">From quiet signatures to pieces made for the room, discover jewelry composed around the moments that become yours alone.</p>
            </section>

            <section className="category-grid" id="collections" aria-label="Jewelry collections">
                {categories.map((category, index) => (
                    <a href={category.href} className={`category-card category-card--${index + 1}`} key={category.name}>
                        <img src={category.image} alt="" loading="lazy" />
                        <div className="category-card__shade" />
                        <div className="category-card__content">
                            <span>0{index + 1}</span>
                            <div><h3>{category.name}</h3><p>{category.line}</p></div>
                            <ArrowRight size={20} strokeWidth={1.2} />
                        </div>
                    </a>
                ))}
            </section>

            <section className="shop section-pad" id="shop" aria-labelledby="shop-title">
                <div className="section-heading">
                    <div><p className="kicker">Curated for You</p><h2 id="shop-title">Our Most-Loved <em>Pieces</em></h2></div>
                    <div className="section-heading__aside">
                        <span className="section-heading__count">{String(visibleProducts.length).padStart(2, '0')} pieces</span>
                        <p>A considered edit of signature forms, made to be worn now and remembered later.</p>
                        {(savedOnly || searchQuery) && (
                            <button
                                className="filter-clear"
                                onClick={() => { setSavedOnly(false); setSearchQuery(''); }}
                            >
                                Show all pieces
                            </button>
                        )}
                    </div>
                </div>
                {visibleProducts.length ? (
                    <div className="product-grid">
                        {visibleProducts.map((product) => (
                            <article className="product-card" key={product.id}>
                                <div className="product-card__media">
                                    <a className="product-card__image" href={product.id === 1 ? '#signature' : '#consultation'} aria-label={`View ${product.name}`}>
                                        <img src={product.image} alt={product.name} loading="lazy" />
                                        <span className="product-tag">{product.tag}</span>
                                    </a>
                                    <button
                                        className={`favorite-button ${favorites.includes(product.id) ? 'is-active' : ''}`}
                                        aria-label={favorites.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                                        aria-pressed={favorites.includes(product.id)}
                                        onClick={() => toggleFavorite(product.id)}
                                    ><Heart size={18} strokeWidth={1.4} /></button>
                                    <button className="quick-add" onClick={() => addToCart(product)}>Add to Bag</button>
                                </div>
                                <div className="product-card__info">
                                    <div><h3>{product.name}</h3><p>{product.material}</p></div>
                                    <strong>₱{product.price.toLocaleString()}</strong>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-results">
                        <p>No pieces match this selection yet.</p>
                        <button className="text-link" onClick={() => { setSavedOnly(false); setSearchQuery(''); }}>Explore the full collection <ArrowRight size={16} /></button>
                    </div>
                )}
            </section>

            <section className="signature section-pad" id="signature" aria-labelledby="signature-title">
                <div className="signature__visual">
                    <div className="signature__image signature__image--main"><img src="/assets/lucky-ring-front.png" alt="SR Crown Jewls oval halo signature ring" loading="lazy" /></div>
                    <div className="signature__image signature__image--detail"><img src="/assets/lucky-ring-side.png" alt="Side view of the oval halo ring" loading="lazy" /></div>
                    <span className="signature__number" aria-hidden="true">01</span>
                </div>
                <div className="signature__copy">
                    <p className="kicker">The Signature Piece</p>
                    <h2 id="signature-title">The Oval<br /><em>Halo</em></h2>
                    <p>A radiant oval centre framed by a brilliant halo, designed to capture light from every angle.</p>
                    <dl>
                        <div><dt>Setting</dt><dd>Oval halo</dd></div>
                        <div><dt>Metal</dt><dd>18K gold tone</dd></div>
                        <div><dt>Character</dt><dd>Timeless · Luminous</dd></div>
                    </dl>
                    <a href="#consultation" className="text-link">Discover the piece <ArrowRight size={16} /></a>
                </div>
            </section>

            <section className="craft-story" id="story" aria-labelledby="craft-title">
                <div className="craft-story__image"><img src="/assets/film-ring.jpg" alt="Oval halo ring craftsmanship detail" loading="lazy" /></div>
                <div className="craft-story__content">
                    <p className="kicker">Our Craft</p>
                    <h2 id="craft-title">Beauty lives<br />in the <em>details.</em></h2>
                    <p>From proportion to polish, each piece is considered as a complete composition. Refinement lives in the details you notice slowly and remember completely.</p>
                    <div className="craft-points">
                        <div><Sparkles size={19} strokeWidth={1.3} /><span>Considered brilliance</span></div>
                        <div><ShieldCheck size={19} strokeWidth={1.3} /><span>Quality-focused finishing</span></div>
                        <div><Heart size={19} strokeWidth={1.3} /><span>Designed for meaningful moments</span></div>
                    </div>
                </div>
            </section>

            <section className="moments-editorial" id="moments" aria-labelledby="moments-title">
                <div className="moments-editorial__copy">
                    <p className="kicker">Made for Your Moments</p>
                    <h2 id="moments-title">Not only for<br /><em>the occasion.</em></h2>
                    <p>The jewelry you choose becomes part of how the moment is remembered—worn for the celebration, then carried into every day after.</p>
                    <a className="text-link" href="#consultation">Begin your story <ArrowRight size={16} /></a>
                </div>
                <div className="moments-editorial__image">
                    <img src="/assets/film-necklace.jpg" alt="SR Crown Jewls necklace worn for an evening portrait" loading="lazy" />
                    <span>SR Crown Jewls / Campaign 01</span>
                </div>
            </section>

            <section className="consultation" id="consultation" aria-labelledby="consultation-title">
                <img src="/assets/film-portrait.jpg" alt="Woman wearing SR Crown Jewls" loading="lazy" />
                <div className="consultation__shade" />
                <div className="consultation__copy">
                    <p className="kicker">Private Consultation</p>
                    <h2 id="consultation-title">Find a piece<br />that feels <em>like you.</em></h2>
                    <p>For proposals, gifts and milestone pieces, a private consultation offers a more personal way to discover SR Crown Jewls.</p>
                    <div>
                        <a href="mailto:hello@luckyjewelry.com?subject=Private%20consultation" className="button button--gold">Book a Consultation</a>
                        <a href="#shop" className="button button--ghost">Shop Collection</a>
                    </div>
                </div>
            </section>

            <footer className="site-footer">
                <div className="site-footer__brand"><img src="/assets/crown-jewels-gold-monogram.png" alt="SR Crown Jewls" /><p>Elegance · Luxury · Timeless</p></div>
                <div className="site-footer__links">
                    <div><h4>Shop</h4><a href="#signature">Rings</a><a href="#collections">Necklaces</a><a href="#shop">Collections</a></div>
                    <div><h4>About</h4><a href="#story">Our Story</a><a href="#story">Craftsmanship</a><a href="#consultation">Contact</a></div>
                    <div><h4>Care</h4><a href="#consultation">Shipping & Returns</a><a href="#consultation">Size Guide</a><a href="#consultation">Jewelry Care</a></div>
                </div>
                <div className="site-footer__newsletter">
                    <p className="kicker">Stay Connected</p><h3>Private notes from SR Crown Jewls.</h3>
                    <form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Email address" /><button aria-label="Subscribe"><ArrowRight size={18} /></button></form>
                </div>
                <div className="site-footer__bottom"><span>© {new Date().getFullYear()} SR Crown Jewls.</span><span>Elegance, composed in every detail.</span></div>
            </footer>

            <div className={`search-panel ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen}>
                <button className="search-panel__scrim" aria-label="Close search" onClick={() => setSearchOpen(false)} />
                <div className="search-panel__dialog" role="dialog" aria-modal="true" aria-label="Search jewelry">
                    <div className="search-panel__top"><span className="kicker">Search the Collection</span><button onClick={() => setSearchOpen(false)} aria-label="Close search">Close</button></div>
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Ring, necklace, material…"
                        autoFocus={searchOpen}
                    />
                    <button className="button button--gold" onClick={() => {
                        setSavedOnly(false);
                        setSearchOpen(false);
                        document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
                    }}>View Results</button>
                </div>
            </div>

            <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={changeQty} />
        </main>
    );
}
