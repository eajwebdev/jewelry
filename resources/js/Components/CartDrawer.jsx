import { Minus, Plus, X } from 'lucide-react';

export default function CartDrawer({ open, items, onClose, onQty }) {
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    return (
        <>
            <button className={`drawer-scrim ${open ? 'is-open' : ''}`} onClick={onClose} aria-label="Close cart" />
            <aside className={`cart-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
                <div className="cart-drawer__header">
                    <div><span className="kicker">Your selection</span><h2>Shopping Bag</h2></div>
                    <button className="icon-button" onClick={onClose} aria-label="Close cart"><X size={20} /></button>
                </div>
                <div className="cart-drawer__body">
                    {items.length === 0 ? (
                        <div className="cart-empty"><p>Your bag is waiting for something timeless.</p><a href="#shop" onClick={onClose}>Discover the collection</a></div>
                    ) : items.map((item) => (
                        <article className="cart-line" key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3><p>{item.material}</p><strong>₱{item.price.toLocaleString()}</strong>
                                <div className="qty-control">
                                    <button onClick={() => onQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => onQty(item.id, 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="cart-drawer__footer">
                    <div><span>Subtotal</span><strong>₱{total.toLocaleString()}</strong></div>
                    <button className="button button--gold button--wide" disabled={!items.length}>Proceed to Checkout</button>
                    <small>Taxes and delivery are calculated at checkout.</small>
                </div>
            </aside>
        </>
    );
}
