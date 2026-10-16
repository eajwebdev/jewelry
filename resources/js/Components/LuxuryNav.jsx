import { useEffect, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';

const links = [
    ['Home', '#home'],
    ['Rings', '#signature'],
    ['Necklaces', '#collections'],
    ['Earrings', '#collections'],
    ['Bracelets', '#collections'],
    ['Collections', '#shop'],
    ['Our Story', '#story'],
];

export default function LuxuryNav({
    cartCount = 0,
    wishlistCount = 0,
    onCartOpen,
    onSearchOpen,
    onWishlistOpen,
}) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const nextScrolled = window.scrollY > window.innerHeight * 0.7;
            setScrolled((current) => current === nextScrolled ? current : nextScrolled);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!open) return undefined;
        const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [open]);

    return (
        <header className={`luxury-nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
            <a href="#home" className="brand-lockup" aria-label="SR Crown Jewls home">
                <img src="/assets/crown-jewels-gold-monogram.png" alt="SR Crown Jewls" />
            </a>
            <nav className="luxury-nav__links" aria-label="Primary navigation">
                {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            </nav>
            <div className="luxury-nav__tools">
                <button className="icon-button" aria-label="Search" onClick={onSearchOpen}><Search size={17} strokeWidth={1.35} /></button>
                <a className="icon-button account-button" href="#consultation" aria-label="Private client services"><UserRound size={17} strokeWidth={1.35} /></a>
                <button className="icon-button count-button" aria-label={`Wishlist, ${wishlistCount} saved`} onClick={onWishlistOpen}>
                    <Heart size={17} strokeWidth={1.35} />
                    {wishlistCount > 0 && <span>{wishlistCount}</span>}
                </button>
                <button className="icon-button count-button" aria-label={`Open shopping bag, ${cartCount} items`} onClick={onCartOpen}>
                    <ShoppingBag size={17} strokeWidth={1.35} />
                    {cartCount > 0 && <span>{cartCount}</span>}
                </button>
                <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={20} strokeWidth={1.4} /></button>
            </div>

            <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
                <button className="mobile-menu__close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} /></button>
                <img src="/assets/crown-jewels-gold-monogram.png" alt="SR Crown Jewls" />
                <nav aria-label="Mobile navigation">
                    {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
                </nav>
                <div className="mobile-menu__tools">
                    <button onClick={() => { setOpen(false); onSearchOpen(); }}><Search size={16} /> Search</button>
                    <button onClick={() => { setOpen(false); onWishlistOpen(); }}><Heart size={16} /> Saved</button>
                    <button onClick={() => { setOpen(false); onCartOpen(); }}><ShoppingBag size={16} /> Bag ({cartCount})</button>
                </div>
            </div>
        </header>
    );
}
