(function(){
  const units=[...document.querySelectorAll('.course-unit')];
  const home=document.getElementById('inicio');
  const toolbar=document.getElementById('unit-toolbar');
  const toolbarTitle=document.getElementById('toolbar-title');
  const resultPanel=document.getElementById('result-panel');
  const resultFab=document.getElementById('result-fab');
  const resultImage=document.getElementById('result-panel-image');
  const resultCaption=document.getElementById('result-panel-caption');
  const lightbox=document.getElementById('result-lightbox');
  const lightboxImage=document.getElementById('result-lightbox-image');
  const lightboxCaption=document.getElementById('result-lightbox-caption');
  const valid=new Set(units.map(el=>el.id));
  let activeId=null,printState=[];

  async function copyValue(value){
    try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);return true;}}catch(e){}
    try{const ta=document.createElement('textarea');ta.value=value;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';ta.style.pointerEvents='none';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,ta.value.length);const ok=document.execCommand('copy');document.body.removeChild(ta);return ok;}catch(e){return false;}
  }
  function unitTitle(id){const el=document.getElementById(id);return el?.dataset?.title||'';}
  function updateResult(unit){
    const src=unit?.dataset?.resultImage||'';const cap=unit?.dataset?.resultCaption||'Resultado esperado';
    const has=!!src;
    resultPanel?.classList.toggle('has-result',has);resultFab?.classList.toggle('has-result',has);
    resultPanel?.classList.toggle('active',has);
    resultFab?.classList.toggle('active',has);
    if(has){resultPanel?.classList.remove('collapsed');resultImage.src=src;resultImage.alt=cap;resultCaption.textContent=cap;lightboxImage.src=src;lightboxImage.alt=cap;lightboxCaption.textContent=cap;}
    else{resultPanel?.classList.remove('collapsed');closeLightbox();}
  }
  function showHome(updateHash=true){activeId=null;home.hidden=false;units.forEach(u=>u.classList.remove('active'));toolbar.classList.remove('active');document.title='QGIS aplicado ao CAR — Material das atividades';updateResult(null);if(updateHash&&location.hash)history.pushState(null,'',location.pathname+location.search);window.scrollTo({top:0,behavior:'auto'});}
  function resetTopics(unit){const topics=[...unit.querySelectorAll('details.topic')];topics.forEach((d,i)=>d.open=i===0);} function showUnit(id,updateHash=true){if(!valid.has(id)){showHome(updateHash);return;}activeId=id;home.hidden=true;units.forEach(u=>u.classList.toggle('active',u.id===id));toolbar.classList.add('active');toolbarTitle.textContent=unitTitle(id);document.title=unitTitle(id)+' — QGIS aplicado ao CAR';const unit=document.getElementById(id);resetTopics(unit);updateResult(unit);if(updateHash&&location.hash!=='#'+id)history.pushState(null,'','#'+id);window.scrollTo({top:0,behavior:'auto'});}
  function openLightbox(src,cap){if(!activeId)return;const imageSrc=src||resultImage?.src||'';if(!imageSrc)return;lightboxImage.src=imageSrc;lightboxImage.alt=cap||'Imagem ampliada';lightboxCaption.textContent=cap||'';lightbox.classList.add('active');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
  function closeLightbox(){lightbox?.classList.remove('active');lightbox?.setAttribute('aria-hidden','true');document.body.style.overflow='';}

  function prepareImageZoom(){
    const selector='.course-unit .figure img,.course-unit .shot img,.course-unit .hero img,.course-unit .official-doc-example img';
    document.querySelectorAll(selector).forEach(img=>{
      if(img.closest('.quick,.tool-card,.copy-flow,.finish,.result-panel,.result-lightbox')||img.dataset.noZoom==='true')return;
      const host=img.parentElement;if(!host||host.querySelector(':scope > .image-zoom-button'))return;
      host.classList.add('zoom-host');
      const btn=document.createElement('button');btn.type='button';btn.className='image-zoom-button';btn.setAttribute('data-image-zoom','');btn.setAttribute('aria-label','Ampliar imagem');btn.title='Ampliar imagem';host.appendChild(btn);
    });
  }
  function imageCaption(img){const holder=img.closest('.figure,.shot,.hero,.official-doc-example');const cap=holder?.querySelector('.caption');return (cap?.textContent||img.alt||'Imagem').trim();}
  prepareImageZoom();
  document.addEventListener('click',function(e){
    const copyTarget=e.target.closest('[data-copy-target]');
    if(copyTarget){e.preventDefault();const target=document.querySelector(copyTarget.dataset.copyTarget);const original=copyTarget.textContent;copyValue(target?.textContent||'').then(ok=>{copyTarget.textContent=ok?'Copiado!':'Selecione e copie';copyTarget.classList.toggle('copied',ok);setTimeout(()=>{copyTarget.textContent=original;copyTarget.classList.remove('copied');},1400);});return;}
    const copyBtn=e.target.closest('[data-copy-value]');
    if(copyBtn){e.preventDefault();const original=copyBtn.textContent;copyValue(copyBtn.dataset.copyValue).then(ok=>{copyBtn.textContent=ok?'Copiado!':'Selecione e copie';copyBtn.classList.toggle('copied',ok);setTimeout(()=>{copyBtn.textContent=original;copyBtn.classList.remove('copied');},1400);});return;}
    const card=e.target.closest('[data-open-unit]');if(card){e.preventDefault();showUnit(card.dataset.openUnit,true);return;}
    if(e.target.closest('[data-home]')){e.preventDefault();showHome(true);return;}
    if(e.target.closest('[data-expand-all]')&&activeId){document.querySelectorAll('#'+activeId+' details.topic').forEach(d=>d.open=true);return;}
    if(e.target.closest('[data-collapse-all]')&&activeId){document.querySelectorAll('#'+activeId+' details.topic').forEach(d=>d.open=false);return;}
    if(e.target.closest('[data-print]')&&activeId){window.print();return;}
    if(e.target.closest('[data-result-collapse]')){resultPanel.classList.add('collapsed');resultFab.classList.add('active');return;}
    if(e.target.closest('[data-result-expand]')){resultPanel.classList.remove('collapsed');if(window.matchMedia('(min-width:1320px)').matches){resultFab.classList.remove('active');}else{openLightbox(resultImage?.src,resultCaption?.textContent||'Resultado esperado');}return;}
    const imageZoom=e.target.closest('[data-image-zoom]');if(imageZoom){const host=imageZoom.closest('.zoom-host');const img=host?.querySelector('img');if(img){openLightbox(img.currentSrc||img.src,imageCaption(img));}return;}
    if(e.target.closest('[data-result-zoom]')){openLightbox(resultImage?.src,resultCaption?.textContent||'Resultado esperado');return;}
    if(e.target.closest('[data-result-close]')||e.target===lightbox){closeLightbox();return;}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
  window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(valid.has(id))showUnit(id,false);else showHome(false);});
  window.addEventListener('beforeprint',()=>{if(!activeId)return;const active=document.getElementById(activeId);active.classList.add('print-active');printState=[...active.querySelectorAll('details.topic')].map(d=>[d,d.open]);printState.forEach(([d])=>d.open=true);});
  window.addEventListener('afterprint',()=>{document.querySelectorAll('.course-unit.print-active').forEach(u=>u.classList.remove('print-active'));printState.forEach(([d,open])=>d.open=open);printState=[];});
  const initial=location.hash.slice(1);if(valid.has(initial))showUnit(initial,false);else showHome(false);
})();