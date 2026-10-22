/* Planilha do Agricultor · funções comuns: cookies + pixel, checkout em popup, cupão ao voltar */
(function(){
  var C=window.AGRO||{}, P=C.precos||{normal:21997,hoje:7997,desconto:.4};
  function get(k,s){try{return (s?sessionStorage:localStorage).getItem(k)}catch(e){return null}}
  function set(k,v,s){try{(s?sessionStorage:localStorage).setItem(k,v)}catch(e){}}
  window.kz=function(v){return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')+' Kz'};
  // ---------- pixel com consentimento ----------
  var Q=[];
  window.track=function(ev,data,custom){ if(window.fbq){ fbq(custom?'trackCustom':'track',ev,data||{}) } else Q.push([ev,data,custom]) };
  function pixel(){
    if(!C.pixel||window.fbq)return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init',C.pixel); fbq('track','PageView'); Q.forEach(function(q){fbq(q[2]?'trackCustom':'track',q[0],q[1]||{})}); Q=[];
  }
  var choice=get('agro_cookies');
  if(choice==='sim') pixel();
  else if(choice!=='nao' && C.pixel){
    var b=document.createElement('div'); b.className='cookie'; b.setAttribute('role','dialog');
    b.innerHTML='<p>Usamos cookies de medição (Meta) para saber que anúncios funcionam. Só os activamos se aceitar. <a href="privacidade.html">Saber mais</a></p><div><button class="n" type="button">Recusar</button><button class="y" type="button">Aceitar</button></div>';
    document.body.appendChild(b);
    b.querySelector('.y').onclick=function(){set('agro_cookies','sim');b.remove();pixel()};
    b.querySelector('.n').onclick=function(){set('agro_cookies','nao');b.remove()};
  }
  // ---------- contactos ----------
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href='https://wa.me/'+((C.suporte||{}).whatsapp||'')});
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  // ---------- checkout ----------
  function withUtm(url){ if(!url) return url; var s=location.search; if(!s) return url; return url+(url.indexOf('?')<0?s:s.replace(/^\?/,'&')); }
  window.abrirCheckout=function(cupao){
    var url=withUtm(cupao&&C.checkoutCupao?C.checkoutCupao:C.checkout);
    track('InitiateCheckout',{value:cupao?Math.round(P.hoje*(1-P.desconto)):P.hoje,currency:'AOA'});
    set('agro_ck','1',true);
    if(!url){ alert('Link de pagamento ainda por configurar (config.js).'); return; }
    if(C.modoCheckout!=='popup'){ location.href=url; return; }
    var m=document.getElementById('ck');
    if(!m){
      m=document.createElement('div'); m.id='ck'; m.className='ck';
      m.innerHTML='<div class="ckbox"><div class="ckhead"><span>🔒 Pagamento seguro · Okanda Pay</span><button type="button" id="ckx">Fechar ✕</button></div><iframe id="ckf" title="Checkout" allow="payment"></iframe><div class="ckfoot">O formulário não aparece? <a id="cka" target="_blank" rel="noopener">Abra o pagamento aqui</a></div></div>';
      document.body.appendChild(m);
      document.getElementById('ckx').onclick=function(){m.hidden=true; document.body.style.overflow=''};
    }
    document.getElementById('ckf').src=url; document.getElementById('cka').href=url;
    m.hidden=false; document.body.style.overflow='hidden';
  };
  document.querySelectorAll('[data-checkout]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();abrirCheckout(a.getAttribute('data-checkout')==='cupao')})});
  // ---------- cupão ao sair (botão voltar ou rato a sair da página) ----------
  if(document.body.hasAttribute('data-exit')){
    var shown=false;
    function oferta(){
      if(shown||get('agro_cupao',true)) return; shown=true; set('agro_cupao','1',true);
      var ck=document.getElementById('ck'); if(ck&&!ck.hidden){ ck.hidden=true; document.body.style.overflow=''; }
      var m=document.getElementById('cupao'); if(!m) return; m.hidden=false; track('CupaoMostrado',{},true);
    }
    history.pushState({agro:1},'',location.href);
    window.addEventListener('popstate',function(){ if(!shown&&!get('agro_cupao',true)){ oferta(); history.pushState({agro:2},'',location.href); } else { history.back(); } });
    document.addEventListener('mouseout',function(e){ if(!e.relatedTarget && e.clientY<8 && window.innerWidth>800) oferta(); });
    var m=document.getElementById('cupao');
    if(m){
      var x=m.querySelectorAll('[data-close]'); x.forEach(function(b){b.onclick=function(){m.hidden=true}});
    }
  }
})();
