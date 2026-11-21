/* ===== EDIT ME ===== */
const WHATSAPP="2349137226167"; // country code + number, no + or spaces
const FORM_ENDPOINT=""; // optional: Formspree/other URL. Empty = send enquiry via WhatsApp
const PRODUCTS=[
["Farm-Fresh Eggs","egg","Fresh table eggs for homes, shops and kitchens.","eggs.jpg"],
["Wholesale Eggs","box","Crates of eggs for retailers, bakeries and food businesses.","wholesale.jpg"],
["Broilers (4 to 12 weeks)","bird","Healthy broilers raised on the farm, from 4 up to 12 weeks.","broilers.jpg"],
["Table-Sized Broilers","bird","Broilers ready for the table in about 4 weeks.","table.jpg"],
["Dressed Chickens","leg","Cleaned, dressed chickens. Ask us about availability.","dressed.jpg"],
["Turkeys (Local & Imported)","bird","Local and imported turkeys for festive seasons and events.","turkeys.jpg"],
["Poultry Consultation","users","Practical advice for people starting or running a poultry farm.","feeding.jpg"]];
const GALLERY=[["Healthy birds","birds.jpg"],["Poultry house","farm-1.jpg"],["Fresh eggs","eggs.jpg"],["Hen on straw","g4.jpg"],["Feeding time","feeding.jpg"],["Egg trays","trays.jpg"],["Egg collection","collection.jpg"],["Free-range hens","g8.jpg"],["Turkeys","turkeys.jpg"],["Broilers","broilers.jpg"],["Wholesale eggs","wholesale.jpg"],["Layer hen","promo-1.jpg"]];
/* ==================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],ic=n=>`<svg class="ic"><use href="#${n}"/></svg>`;
const src=f=>window.IMG?(IMG[f]||''):'images/'+f;
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
$$('.waLink').forEach(a=>a.href=wa("Hello Abounding Farms, I would like to make an enquiry."));
if($('#yr'))$('#yr').textContent=new Date().getFullYear();
$$('.pl').forEach(el=>{el.innerHTML=PRODUCTS.slice(0,+el.dataset.n||99).map((p,i)=>`<article class="card rv z" style="--d:${i%3*.1}s"><div class="ph"><span class="tag">Enquire</span>${ic(p[1])}<img src="${src(p[3])}" alt="${p[0]}" loading="lazy" onerror="this.remove()"></div><div class="bd"><h3>${p[0]}</h3><p>${p[2]}</p><div class="row"><a class="btn btn-g" href="${wa(`Hello Abounding Farms, I would like to enquire about ${p[0]}.
Quantity needed: 
Please confirm availability and price.`)}" target="_blank" rel="noopener">${ic('wa')}Enquire Now</a></div></div></article>`).join('')});
if($('#fp'))$('#fp').innerHTML=PRODUCTS.slice(0,6).map(p=>`<li><a href="${window.IMG?'#products':'products.html'}">${ic(p[1])}${p[0]}</a></li>`).join('');
const pr=$('#pr');
if(pr){pr.innerHTML='<option value="">Select a product</option>'+PRODUCTS.map(p=>`<option>${p[0]}</option>`).join('');
try{const v=localStorage.getItem('af_prod');if(v){pr.value=v;localStorage.removeItem('af_prod')}}catch{}}
document.addEventListener('click',e=>{
const b=e.target.closest('[data-p]'),s=e.target.closest('[data-s]');
if(b){const q=prompt(`How much ${b.dataset.p} do you need? (e.g. 10 crates)`);if(q!==null)window.open(wa(`Hello Abounding Farms, I would like to order:\nProduct: ${b.dataset.p}\nQuantity: ${q||'to be confirmed'}\nPlease confirm availability and price.`),'_blank')}
if(s){try{localStorage.setItem('af_prod',s.dataset.s)}catch{}if(pr)pr.value=s.dataset.s}});
/* gallery: natural aspect ratios so every photo is fully visible */
const gl=$('#gl');
if(gl)gl.innerHTML=GALLERY.map((g,i)=>`<button class="rv c" style="--d:${i%4*.08}s" data-i="${i}" aria-label="View ${g[0]}"><img src="${src(g[1])}" alt="${g[0]}" loading="lazy" onerror="this.parentNode.remove()"><span>${ic('zoom')}${g[0]}</span></button>`).join('');
/* nav */
const lk=$('#lk'),bg=$('#bg');
const tog=o=>{lk.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.innerHTML=ic(o?'x':'menu')};
bg.onclick=()=>tog(!lk.classList.contains('open'));
lk.onclick=e=>{if(e.target.closest('a'))tog(false)};
addEventListener('keydown',e=>{if(e.key==='Escape'){tog(false);lb.classList.remove('on')}});
/* scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
/* scroll effects: progress bar, sticky shadow, parallax */
const prog=$('#prog'),hd=$('#hd'),still=matchMedia('(prefers-reduced-motion:reduce)').matches;let tk=false;
const onS=()=>{tk=false;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
prog.style.transform=`scaleX(${h>0?y/h:0})`;hd.classList.toggle('s',y>10);
if(!still)$$('[data-par]').forEach(el=>{const r=el.parentElement.getBoundingClientRect();
if(r.bottom>0&&r.top<innerHeight)el.style.transform=`translateY(${(r.top+r.height/2-innerHeight/2)*(+el.dataset.par)}px) scale(1.15)`})};
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
/* lightbox */
const lb=$('#lb');
if(gl)gl.onclick=e=>{const b=e.target.closest('button');if(!b)return;const im=b.querySelector('img');
$('#li').src=im.src;$('#li').alt=im.alt;$('#lc').textContent=im.alt;lb.classList.add('on')};
lb.onclick=e=>{if(e.target===lb||e.target.className==='x')lb.classList.remove('on')};
/* form */
const f=$('#fm'),msg=$('#msg');
if(f)f.addEventListener('submit',async e=>{e.preventDefault();let ok=true;
f.querySelectorAll('[required]').forEach(i=>{const er=i.parentNode.querySelector('.err');let t='';
if(!i.value.trim())t='This field is required.';
else if(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value))t='Enter a valid email address.';
else if(i.type==='tel'&&!/^[+\d][\d\s-]{6,}$/.test(i.value))t='Enter a valid phone number.';
er.textContent=t;i.classList.toggle('bad',!!t);if(t)ok=false});
if(!ok){msg.className='no';msg.textContent='Please fix the highlighted fields and try again.';return}
const d=Object.fromEntries(new FormData(f));
const txt=Object.entries(d).filter(x=>x[1]).map(x=>`${x[0]}: ${x[1]}`).join('\n');
try{if(FORM_ENDPOINT){const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;
msg.className='ok';msg.textContent='Thank you. Your enquiry has been sent and we will contact you shortly.';f.reset()}
else{window.open(wa('New enquiry from website:\n'+txt),'_blank');msg.className='ok';msg.textContent='Almost done. Send the pre-filled message in WhatsApp to complete your enquiry.'}}
catch{msg.className='no';msg.textContent='Your enquiry could not be sent. Please try again or use WhatsApp.'}});
