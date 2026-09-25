const KOKORIKO_PHONE = '221788350606';
const KOKORIKO_EMAIL = 'kokoriko221@gmail.com';
const CART_KEY = 'kokoriko_cart_v1';

const MENU = [
  {id:'formule-menu',cat:'Formule Menu',name:'Ajout Formule — Frites & Boisson',price:1500,desc:'Ajoute frites & boisson à n’importe quel plat.'},
  {id:'wrap-viande',cat:'Snacks',name:'Wrap Viande',price:3500},
  {id:'wrap-poulet',cat:'Snacks',name:'Wrap Poulet',price:3500},
  {id:'tacos-viande',cat:'Snacks',name:'Tacos Viande',price:2500},
  {id:'tacos-poulet',cat:'Snacks',name:'Tacos Poulet',price:2500},
  {id:'panini-viande',cat:'Snacks',name:'Panini Viande',price:3500},
  {id:'panini-poulet',cat:'Snacks',name:'Panini Poulet',price:3500},
  {id:'hot-dog',cat:'Snacks',name:'Hot Dog',price:3000},
  {id:'cuisse-2',cat:'Poulet',name:'Cuisse de poulet (2 pièces)',price:4000},
  {id:'cuisse-4',cat:'Poulet',name:'Cuisse de poulet (4 pièces)',price:7000},
  {id:'pilon-2',cat:'Poulet',name:'Pilon (2 pièces)',price:2500},
  {id:'pilon-4',cat:'Poulet',name:'Pilon (4 pièces)',price:4000},
  {id:'pilon-6',cat:'Poulet',name:'Pilon (6 pièces)',price:7000},
  {id:'poulet-roti',cat:'Poulet',name:'Poulet Rôti',price:6000},
  {id:'demi-poulet',cat:'Poulet',name:'Demi Poulet',price:3500},
  {id:'wings-6',cat:'Fritures',name:'Wings (6 pièces)',price:3500},
  {id:'wings-9',cat:'Fritures',name:'Wings (9 pièces)',price:5500},
  {id:'wings-bbq-6',cat:'Fritures',name:'Wings Barbecue (6 pièces)',price:4000},
  {id:'wings-bbq-9',cat:'Fritures',name:'Wings Barbecue (9 pièces)',price:6000},
  {id:'tenders-5',cat:'Fritures',name:'Poulet Tenders (5 pièces)',price:4000},
  {id:'nuggets-3',cat:'Fritures',name:'Nuggets (3 pièces)',price:2500},
  {id:'nuggets-6',cat:'Fritures',name:'Nuggets (6 pièces)',price:3500},
  {id:'nuggets-9',cat:'Fritures',name:'Nuggets (9 pièces)',price:5500},
  {id:'giant',cat:'Burgers',name:'Giant',price:3500,desc:'Le géant pour les vrais battants !!'},
  {id:'big-mac',cat:'Burgers',name:'Big Mac',price:3500,desc:'Le classique incontournable !'},
  {id:'double-cheese',cat:'Burgers',name:'Double Cheese Burger',price:3500,desc:'Double steack, Double fromage, Double Plaisir !!'},
  {id:'triple-cheese',cat:'Burgers',name:'Triple Cheese Burger',price:5500,desc:'Triple steack, Triple fromage, Triple gourmandise !!!'},
  {id:'chicken-burger',cat:'Burgers',name:'Chicken Burger',price:3500,desc:'Poulet croustillant, Sauce maison, fraîche et savoureuse'},
  {id:'chicken-thunder',cat:'Burgers',name:'Chicken Thunder',price:4000,desc:'Épicé, croustillant, Intense et irrésistible !'},
  {id:'burger-steack',cat:'Burgers',name:'Burger Steack',price:2500,desc:'Le classique'},
  {id:'menu-enfant',cat:'Burgers',name:'Menu Enfant',price:3500,desc:'Cheese ou Nuggets, Boisson, surprise'},
  {id:'frites',cat:'Accompagnements',name:'Frites',price:1500},
  {id:'alloco',cat:'Accompagnements',name:'Alloco',price:3000},
  {id:'frites-cheddar',cat:'Accompagnements',name:'Frites Cheddar',price:2500},
  {id:'frites-cheddar-bacon',cat:'Accompagnements',name:'Frites Cheddar Bacon',price:3500},
  {id:'frites-patate-douce',cat:'Accompagnements',name:'Frites de patate douce',price:2500},
  {id:'milkshake-vanille',cat:'Boissons & Desserts',name:'Milkshake Vanille',price:2500},
  {id:'milkshake-fraise',cat:'Boissons & Desserts',name:'Milkshake Fraise',price:2500},
  {id:'milkshake-ananas-mangue-coco',cat:'Boissons & Desserts',name:'Milkshake Ananas-Mangue-Coco',price:2500},
  {id:'milkshake-oreo',cat:'Boissons & Desserts',name:'Milkshake Oreo',price:3000},
];

const categoryMeta = {
  'Snacks':'Pour attaquer doucement… ou pas.',
  'Poulet':'Le cœur du show Kokoriko.',
  'Fritures':'Croustillant garanti dans l’esprit.',
  'Burgers':'Des burgers qui ne font pas semblant.',
  'Accompagnements':'À partager, sauf si tu ne veux pas.',
  'Boissons & Desserts':'La dernière bouchée mérite sa place.',
  'Formule Menu':'Le petit upgrade qui change tout.'
};

const featuredIds = ['wings-6','chicken-thunder','giant','wrap-poulet'];

function formatFCFA(value){ return new Intl.NumberFormat('fr-FR').format(value).replace(/\u202f/g,' ') + ' FCFA'; }
function getCart(){ try{return JSON.parse(localStorage.getItem(CART_KEY)) || [];}catch{return [];} }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartUI(); }
function findItem(id){return MENU.find(item=>item.id===id);}
function cartCount(cart=getCart()){return cart.reduce((s,i)=>s+i.qty,0);}
function cartTotal(cart=getCart()){return cart.reduce((s,i)=>s+(findItem(i.id)?.price || 0)*i.qty,0);}
function addToCart(id, qty=1){const cart=getCart();const hit=cart.find(x=>x.id===id);if(hit) hit.qty += qty; else cart.push({id,qty});saveCart(cart);showToast('Ajouté au panier');}
function setQty(id, qty){const cart=getCart().filter(x=>x.id!==id || qty>0);const row=cart.find(x=>x.id===id);if(row) row.qty=qty;saveCart(cart);}
function removeFromCart(id){saveCart(getCart().filter(x=>x.id!==id));}
function clearCart(){saveCart([]);}
function itemVisual(item){const iconByCat={'Snacks':'🌯','Poulet':'🍗','Fritures':'🍗','Burgers':'🍔','Accompagnements':'🍟','Boissons & Desserts':'🥤','Formule Menu':'✨'};return iconByCat[item.cat]||'🍽️';}

function productCard(item){
  return `<article class="product-card reveal"><div class="product-visual"><span class="product-emoji">${itemVisual(item)}</span><span class="product-cat">${item.cat}</span><span class="product-burst">K</span></div><div class="product-body"><div class="product-title"><h3>${item.name}</h3><strong>${formatFCFA(item.price)}</strong></div>${item.desc?`<p>${item.desc}</p>`:''}<button class="btn btn-small btn-primary" type="button" data-add="${item.id}">Ajouter <span>＋</span></button></div></article>`;
}

function menuRows(items){
  const groups = [...new Set(items.map(x=>x.cat))];
  if(!items.length) return `<div class="no-results"><span>🍗</span><h3>Aucun résultat</h3><p>Essaie un autre mot-clé.</p></div>`;
  return groups.map(cat=>`<section class="menu-group" data-category="${cat}"><div class="menu-group-head"><div><span class="eyebrow">${cat}</span><h2>${categoryMeta[cat]||''}</h2></div><span class="menu-count">${items.filter(x=>x.cat===cat).length} choix</span></div><div class="menu-items">${items.filter(x=>x.cat===cat).map(item=>`<div class="menu-row"><div class="menu-row-main"><div class="mini-plate">${itemVisual(item)}</div><div><h3>${item.name}</h3>${item.desc?`<p>${item.desc}</p>`:''}</div></div><div class="menu-row-buy"><strong>${formatFCFA(item.price)}</strong><button class="round-add" type="button" data-add="${item.id}" aria-label="Ajouter ${item.name}">+</button></div></div>`).join('')}</div></section>`).join('');
}

function cartItemHtml(row, compact=false){
  const item=findItem(row.id); if(!item) return '';
  return `<div class="cart-line"><div class="mini-plate">${itemVisual(item)}</div><div class="cart-line-main"><strong>${item.name}</strong><span>${formatFCFA(item.price)} / unité</span><div class="qty"><button data-qty="${item.id}" data-step="-1" type="button">−</button><b>${row.qty}</b><button data-qty="${item.id}" data-step="1" type="button">+</button></div></div><div class="cart-line-total"><strong>${formatFCFA(item.price*row.qty)}</strong><button type="button" data-remove="${item.id}" class="remove-link">Supprimer</button></div></div>`;
}

function updateCartUI(){
  const cart=getCart();
  document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=cartCount(cart));
  document.querySelectorAll('[data-cart-total]').forEach(el=>el.textContent=formatFCFA(cartTotal(cart)));
  const compact=document.querySelector('[data-cart-items]');
  if(compact) compact.innerHTML=cart.length?cart.map(row=>cartItemHtml(row,true)).join(''):`<div class="drawer-empty">Ton panier t'attend 🍗</div>`;
  const full=document.querySelector('[data-full-cart-items]');
  const empty=document.querySelector('[data-empty-cart]');
  if(full) full.innerHTML=cart.length?cart.map(row=>cartItemHtml(row,false)).join(''):'';
  if(empty) empty.hidden=cart.length>0;
}

function initHome(){const el=document.querySelector('[data-featured]');if(el) el.innerHTML=featuredIds.map(id=>findItem(id)).filter(Boolean).map(productCard).join('');}
function initMenu(){
  const chips=document.querySelector('[data-category-chips]'); const search=document.querySelector('#menu-search'); const list=document.querySelector('#menu-list');
  if(!chips||!search||!list)return;
  const cats=['Tous',...Object.keys(categoryMeta)];
  let active='Tous';
  chips.innerHTML=cats.map(c=>`<button class="chip ${c==='Tous'?'is-active':''}" type="button" data-cat="${c}">${c}</button>`).join('');
  function render(){
    const term=search.value.trim().toLowerCase();
    const filtered=MENU.filter(item=>(active==='Tous'||item.cat===active)&&(!term||`${item.name} ${item.desc||''} ${item.cat}`.toLowerCase().includes(term)));
    list.innerHTML=menuRows(filtered);
    observeReveal();
  }
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;active=b.dataset.cat;chips.querySelectorAll('.chip').forEach(x=>x.classList.toggle('is-active',x===b));render();});
  search.addEventListener('input',render); render();
}

function openCart(){const d=document.querySelector('[data-cart-drawer]');if(!d)return;d.classList.add('is-open');d.setAttribute('aria-hidden','false');document.body.classList.add('drawer-open');}
function closeCart(){const d=document.querySelector('[data-cart-drawer]');if(!d)return;d.classList.remove('is-open');d.setAttribute('aria-hidden','true');document.body.classList.remove('drawer-open');}
function showToast(message){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);}t.textContent=message;t.classList.add('is-visible');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('is-visible'),1700);}
function orderText(){
  const cart=getCart();
  const name=document.querySelector('#customer-name')?.value.trim()||'';
  const phone=document.querySelector('#customer-phone')?.value.trim()||'';
  const address=document.querySelector('#customer-address')?.value.trim()||'';
  const note=document.querySelector('#customer-note')?.value.trim()||'';
  const lines=cart.map((row,i)=>{const item=findItem(row.id); return `${i+1}. ${item.name} × ${row.qty} = ${formatFCFA(item.price*row.qty)}`;}).join('\n');
  return `Bonjour Kokoriko 👋\n\nJe souhaite passer cette commande :\n${lines}\n\nTotal : ${formatFCFA(cartTotal(cart))}\n\nNom : ${name||'À préciser'}\nTéléphone : ${phone||'À préciser'}\nLieu / adresse : ${address||'À préciser'}\nNote : ${note||'Aucune'}\n\nMerci !`;
}
function sendWhatsApp(){
  if(!getCart().length){showToast('Ton panier est vide');return;}
  window.open(`https://wa.me/${KOKORIKO_PHONE}?text=${encodeURIComponent(orderText())}`,'_blank','noopener');
}
function sendEmail(){
  if(!getCart().length){showToast('Ton panier est vide');return;}
  location.href=`mailto:${KOKORIKO_EMAIL}?subject=${encodeURIComponent('Commande Kokoriko')}&body=${encodeURIComponent(orderText())}`;
}

function bindGlobal(){
  updateCartUI();
  document.addEventListener('click',e=>{
    const add=e.target.closest('[data-add]'); if(add){addToCart(add.dataset.add); return;}
    const qty=e.target.closest('[data-qty]'); if(qty){const row=getCart().find(x=>x.id===qty.dataset.qty); if(row) setQty(row.id,row.qty+Number(qty.dataset.step)); return;}
    const rm=e.target.closest('[data-remove]'); if(rm){removeFromCart(rm.dataset.remove); return;}
    if(e.target.closest('[data-close-cart]')){closeCart(); return;}
    if(e.target.closest('[data-clear-cart]')){clearCart(); return;}
    if(e.target.closest('[data-whatsapp-order]')){sendWhatsApp(); return;}
    if(e.target.closest('[data-email-order]')){e.preventDefault();sendEmail();return;}
  });
  window.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart();});
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
}

function observeReveal(){
  const els=document.querySelectorAll('.reveal:not(.is-visible)');
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}})},{threshold:.08});
  els.forEach(el=>observer.observe(el));
}

function ensureLogoFallback(){
  document.querySelectorAll('.brand-mark').forEach(mark=>{const img=mark.querySelector('img');if(img)img.addEventListener('error',()=>mark.classList.add('no-logo'));});
}

document.addEventListener('DOMContentLoaded',()=>{
  bindGlobal();
  initHome();
  initMenu();
  observeReveal();
  ensureLogoFallback();
});
