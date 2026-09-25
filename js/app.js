(() => {
  const PHONE = '221788350606';
  const CART_KEY = 'kokoriko-cart-v2';
  const FORMULA_KEY = 'kokoriko-formula-v2';
  const FORMULA_PRICE = 1500;

  const formatPrice = value => new Intl.NumberFormat('fr-FR').format(value).replace(/\u202f/g, ' ') + ' FCFA';
  const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; } };
  const saveCart = cart => localStorage.setItem(CART_KEY, JSON.stringify(cart));
  const getFormula = () => localStorage.getItem(FORMULA_KEY) === '1';
  const setFormula = on => localStorage.setItem(FORMULA_KEY, on ? '1' : '0');
  const cartCount = cart => cart.reduce((sum, i) => sum + i.qty, 0);
  const cartSubtotal = cart => cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  function initFloatingWhatsApp(){
    if(document.querySelector('.whatsapp-float')) return;
    const link=document.createElement('a');
    link.className='whatsapp-float';
    link.href=`https://wa.me/${PHONE}?text=${encodeURIComponent('Bonjour Kokoriko 👋 Je souhaite avoir des informations.')}`;
    link.target='_blank';
    link.rel='noopener noreferrer';
    link.setAttribute('aria-label','Contacter Kokoriko sur WhatsApp');
    link.innerHTML=`<span class="whatsapp-float-label">Commander sur WhatsApp</span><svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M27.2 4.8A13.36 13.36 0 0 0 17.71.86 13.43 13.43 0 0 0 6.11 21.3L4.8 27.2l6.04-1.23a13.42 13.42 0 0 0 6.82 1.85h.01c7.4 0 13.43-6.02 13.43-13.43 0-3.59-1.4-6.97-3.9-9.59ZM17.67 25.9h-.01a11.12 11.12 0 0 1-5.67-1.55l-.41-.24-3.58.73.76-3.49-.27-.43a11.13 11.13 0 1 1 9.18 4.98Zm6.1-8.34c-.33-.16-1.96-.97-2.26-1.08-.3-.11-.52-.16-.74.16-.22.33-.85 1.08-1.04 1.3-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.63-.97-.87-1.63-1.95-1.82-2.28-.19-.33-.02-.5.14-.67.14-.14.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.79-1.01-2.45-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.29 3.5 5.56 4.91.78.34 1.39.54 1.87.69.79.25 1.5.21 2.07.13.63-.09 1.96-.8 2.23-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38Z"/></svg>`;
    document.body.appendChild(link);
  }

  function updateCartBadges() {
    const count = cartCount(getCart());
    document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = count);
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  }

  function addToCart(name, qty=1) {
    const item = MENU_ITEMS.find(i => i.name === name); if (!item) return;
    const cart = getCart(); const existing = cart.find(i => i.name === name);
    if (existing) existing.qty += qty; else cart.push({name:item.name, price:item.price, category:item.category, qty});
    saveCart(cart); updateCartBadges(); toast(`${name} ajouté au panier`);
  }
  function changeQty(name, delta) {
    const cart = getCart(); const item = cart.find(i => i.name === name); if (!item) return;
    item.qty += delta; if (item.qty <= 0) cart.splice(cart.indexOf(item),1); saveCart(cart); updateCartBadges(); renderCart();
  }
  function removeItem(name){ saveCart(getCart().filter(i=>i.name!==name)); updateCartBadges(); renderCart(); }

  function toast(message){
    let el = document.querySelector('.toast'); if (!el) { el = document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
    el.textContent=message; el.classList.add('is-visible'); clearTimeout(window.__kokToast); window.__kokToast=setTimeout(()=>el.classList.remove('is-visible'),1800);
  }

  function cardHtml(item, featured=false){
    return `<article class="${featured?'product-card':'menu-card'}">
      <div class="product-visual" aria-hidden="true"><span class="tag">${item.category}</span><span class="plate"></span></div>
      <div class="menu-top"><div><span class="category-tag">${item.category}</span><h3>${escapeHtml(item.name)}</h3><p class="menu-desc">${escapeHtml(item.desc)}</p></div><strong class="price">${formatPrice(item.price)}</strong></div>
      <div class="menu-actions"><div class="quantity"><button type="button" data-minus="${escapeAttr(item.name)}" aria-label="Retirer une unité">−</button><span data-qty-for="${escapeAttr(item.name)}">1</span><button type="button" data-plus="${escapeAttr(item.name)}" aria-label="Ajouter une unité">+</button></div><button class="add-btn" type="button" data-add="${escapeAttr(item.name)}">Ajouter</button></div>
    </article>`;
  }

  function renderFeatured(){
    const root=document.querySelector('[data-featured]'); if(!root) return;
    const picks=['Giant','Chicken Burger','Wings (6 pcs)','Frites Cheddar Bacon'].map(n=>MENU_ITEMS.find(i=>i.name===n)).filter(Boolean);
    root.innerHTML=picks.map(i=>cardHtml(i,true)).join('');
  }

  function renderMenu(){
    const grid=document.querySelector('#menu-grid'); if(!grid) return;
    const search=(document.querySelector('#menu-search')?.value||'').trim().toLowerCase();
    const filter=document.querySelector('.filter-btn.is-active')?.dataset.category||'Tous';
    let items=MENU_ITEMS.filter(i => filter==='Tous'||i.category===filter).filter(i => !search || `${i.name} ${i.desc} ${i.category}`.toLowerCase().includes(search));
    grid.innerHTML=items.length?items.map(i=>cardHtml(i)).join(''):`<div class="empty">Aucun produit ne correspond à votre recherche.</div>`;
    const counter=document.querySelector('[data-results-count]'); if(counter) counter.textContent=`${items.length} article${items.length>1?'s':''}`;
    bindInteractive();
  }

  function renderCart(){
    const root=document.querySelector('[data-cart-items]'); if(!root) return;
    const cart=getCart();
    if(!cart.length){ root.innerHTML='<div class="cart-empty"><h2>Votre panier est vide</h2><p>Ajoutez vos favoris depuis la carte pour préparer votre commande.</p><a class="btn btn-primary" href="menu.html">Voir le menu</a></div>'; }
    else root.innerHTML=`<div class="cart-items">${cart.map(item=>`<article class="cart-row"><div><span class="category-tag">${escapeHtml(item.category)}</span><h3>${escapeHtml(item.name)}</h3><p>${formatPrice(item.price)} l’unité</p></div><div class="cart-row-actions"><div class="quantity"><button type="button" data-cart-minus="${escapeAttr(item.name)}">−</button><span>${item.qty}</span><button type="button" data-cart-plus="${escapeAttr(item.name)}">+</button></div><strong class="price">${formatPrice(item.price*item.qty)}</strong><button class="remove-btn" type="button" data-remove="${escapeAttr(item.name)}" aria-label="Supprimer">✕</button></div></article>`).join('')}</div>`;
    const formula=getFormula(); const subtotal=cartSubtotal(cart); const formulaValue=formula?FORMULA_PRICE:0; const total=subtotal+formulaValue;
    const sub=document.querySelector('[data-subtotal]'); if(sub) sub.textContent=formatPrice(subtotal); const f=document.querySelector('[data-formula-price]'); if(f) f.textContent=formula?formatPrice(FORMULA_PRICE):formatPrice(0); const totalEl=document.querySelector('[data-total]'); if(totalEl) totalEl.textContent=formatPrice(total);
    const toggle=document.querySelector('[data-formula]'); if(toggle) toggle.checked=formula;
    bindCartInteractive();
  }

  function buildWhatsApp(){
    const cart=getCart(); if(!cart.length){toast('Votre panier est vide'); return;}
    const formula=getFormula(); const subtotal=cartSubtotal(cart); const total=subtotal+(formula?FORMULA_PRICE:0);
    const name=(document.querySelector('#customer-name')?.value||'').trim(); const note=(document.querySelector('#customer-note')?.value||'').trim();
    let lines=['Bonjour Kokoriko 👋','Je souhaite passer la commande suivante :',''];
    cart.forEach(i=>lines.push(`• ${i.qty} × ${i.name} — ${formatPrice(i.price*i.qty)}`));
    lines.push(''); lines.push(`Sous-total : ${formatPrice(subtotal)}`); if(formula) lines.push(`Formule Frites & Boisson : + ${formatPrice(FORMULA_PRICE)}`); lines.push(`Total : ${formatPrice(total)}`);
    if(name) lines.push(`Nom : ${name}`); if(note) lines.push(`Note : ${note}`); lines.push('','Merci !');
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
  }

  function bindInteractive(){
    document.querySelectorAll('[data-add]').forEach(btn=>btn.onclick=()=>{ const n=btn.dataset.add; const card=btn.closest('article'); const q=Number(card.querySelector(`[data-qty-for="${CSS.escape(n)}"]`)?.textContent||1); addToCart(n,q); });
    document.querySelectorAll('[data-plus]').forEach(btn=>btn.onclick=()=>{ const el=btn.closest('article').querySelector(`[data-qty-for="${CSS.escape(btn.dataset.plus)}"]`); el.textContent=Number(el.textContent)+1; });
    document.querySelectorAll('[data-minus]').forEach(btn=>btn.onclick=()=>{ const el=btn.closest('article').querySelector(`[data-qty-for="${CSS.escape(btn.dataset.minus)}"]`); el.textContent=Math.max(1,Number(el.textContent)-1); });
  }
  function bindCartInteractive(){
    document.querySelectorAll('[data-cart-plus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.cartPlus,1));
    document.querySelectorAll('[data-cart-minus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.cartMinus,-1));
    document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>removeItem(b.dataset.remove));
  }

  function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  const escapeAttr=escapeHtml;

  document.addEventListener('click', e=>{
    const toggle=e.target.closest('[data-menu-toggle]'); if(toggle){ document.querySelector('.mobile-nav')?.classList.toggle('is-open'); }
    const navLink=e.target.closest('.mobile-nav a'); if(navLink){ document.querySelector('.mobile-nav')?.classList.remove('is-open'); }
    const filter=e.target.closest('.filter-btn'); if(filter){ document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('is-active')); filter.classList.add('is-active'); renderMenu(); }
    if(e.target.closest('[data-checkout]')){e.preventDefault();buildWhatsApp();}
  });
  document.addEventListener('input',e=>{ if(e.target.id==='menu-search') renderMenu(); });
  document.addEventListener('change',e=>{if(e.target.matches('[data-formula]')){setFormula(e.target.checked);renderCart();}});

  window.Kokoriko={addToCart,updateCartBadges,renderCart,renderMenu};
  function initBrandExperience(){
    const loader=document.querySelector('[data-site-loader]');
    let seen=false;
    try{seen=sessionStorage.getItem('kokoriko-loader-seen')==='1';}catch{}
    if(loader){
      if(seen){
        loader.classList.add('is-done');
      }else{
        try{sessionStorage.setItem('kokoriko-loader-seen','1');}catch{}
        window.setTimeout(()=>loader.classList.add('is-done'),650);
      }
    }

    const header=document.querySelector('.site-header');
    const updateHeader=()=>{
      if(header) header.classList.toggle('is-scrolled',window.scrollY>12);
    };
    updateHeader();
    window.addEventListener('scroll',updateHeader,{passive:true});

    const revealNodes=document.querySelectorAll('.product-card,.menu-card,.about-card,.contact-card,.cart-card,.cta-banner,.dark-panel');
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if('IntersectionObserver' in window && !reducedMotion){
      const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.style.opacity='1';
            entry.target.style.transform='none';
            observer.unobserve(entry.target);
          }
        });
      },{threshold:.08});
      revealNodes.forEach((el,index)=>{
        el.style.opacity='0';
        el.style.transform='translateY(18px)';
        el.style.transition=`opacity .6s ease ${Math.min(index*25,180)}ms, transform .6s cubic-bezier(.22,.61,.36,1) ${Math.min(index*25,180)}ms, box-shadow .28s ease, border-color .28s ease`;
        observer.observe(el);
      });
    }

    const heroArt=document.querySelector('.hero-art');
    const sun=document.querySelector('.sun-disc');
    if(heroArt && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      heroArt.addEventListener('pointermove',e=>{
        const r=heroArt.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        heroArt.style.setProperty('--mx',`${x*18}px`);
        heroArt.style.setProperty('--my',`${y*14}px`);
        if(sun) sun.style.transform=`translate(${x*10}px,${y*8}px)`;
      });
      heroArt.addEventListener('pointerleave',()=>{
        if(sun) sun.style.transform='';
      });
    }
  }

  document.addEventListener('DOMContentLoaded',()=>{
    initFloatingWhatsApp();
    updateCartBadges(); renderFeatured();
    const filters=document.querySelector('#filters');
    if(filters){ const cats=['Tous',...new Set(MENU_ITEMS.map(i=>i.category))]; filters.innerHTML=cats.map(c=>`<button class="filter-btn${c==='Tous'?' is-active':''}" data-category="${escapeAttr(c)}">${c}</button>`).join(''); }
    renderMenu(); renderCart(); bindInteractive(); initBrandExperience();
  });
})();

if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
