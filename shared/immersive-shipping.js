(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (x,a=0,b=1) => Math.min(b,Math.max(a,x));
  const smooth = x => {x=clamp(x);return x*x*(3-2*x);};
  const rad = Math.PI/180;
  function attach(main,lang="en"){
    const copybook=window.ThamecoHeroCopy[lang]||window.ThamecoHeroCopy.en;
    const stages=copybook.stages;
    const hero=main.querySelector('.hero-scrim');if(!hero||hero.dataset.immersive)return;
    hero.dataset.immersive='true';main.classList.add('has-immersive-journey');
    const layer=document.createElement('div');layer.className='im-layer';
    layer.innerHTML=`<div class="im-sticky"><div class="im-photo-scene" aria-hidden="true">${stages.map((s,i)=>`<img class="im-photo im-photo-${i}" src="images/${s.photo}.webp" alt="" ${i?'loading="eager"':'fetchpriority="high"'}>`).join('')}<img class="im-foreground" src="images/cargo-foreground.webp" alt=""><div class="im-film-shade"></div></div><div class="im-chapter-copy">${stages.map((s,i)=>`<div class="im-chapter"><p class="im-eyebrow">0${i+1} / ${copybook.journey}</p><h2>${s.title.replace('\n','<br>')}</h2><p class="im-detail">${s.caption}</p></div>`).join('')}</div><div class="im-progress"><p class="im-origin"><i></i>${copybook.origin}</p><nav class="im-chapters" aria-label="${copybook.chapters}">${stages.map(({name},i)=>`<button type="button" data-im-step="${i}" aria-label="${lang==='ar'?`عرض مرحلة ${name}`:lang==='tr'?`${name} aşamasını görüntüle`:`View ${name.toLowerCase()} chapter`}"><span>0${i+1}</span>${name}<i></i></button>`).join('')}</nav><div class="im-scroll">${copybook.scroll}<span>↓</span></div></div></div>`;
    hero.append(layer);
    const copy=hero.querySelector('[x-id="Home_39_6"]'),photos=[...layer.querySelectorAll('.im-photo')],chapters=[...layer.querySelectorAll('.im-chapter')],buttons=[...layer.querySelectorAll('[data-im-step]')];
    let target=0,current=0,raf=0,dead=false;
    const targets=[.025,.035+.965*(.19/.60),.035+.965*(.38/.60),.035+.965*(.55/.60)];
    const scrollToProgress=p=>scrollTo({top:scrollY+hero.getBoundingClientRect().top+p*(hero.offsetHeight-innerHeight),behavior:reduced.matches?'instant':'smooth'});
    buttons.forEach((b,i)=>b.addEventListener('click',()=>scrollToProgress(targets[i])));
    const frame=()=>{
      raf=0;if(dead||!hero.isConnected)return;
      // Scrub directly from the measured scroll position; never run an independent timeline.
      current=target;
      const p=clamp((current-.035)/.965)*.60,intro=1-smooth((p-.04)/.075),s=clamp((p-.055)/.535)*3;
      hero.dataset.chapter=stages[Math.min(3,Math.round(s))].name.toLowerCase();hero.style.setProperty('--im-progress',p);
      if(copy){copy.style.opacity=intro;copy.style.visibility=intro<.01?'hidden':'visible';copy.style.transform=reduced.matches?'none':`translate3d(0,${(1-intro)*-40}px,0)`;}
      layer.querySelector('.im-photo-scene').style.opacity=1;
      photos.forEach((photo,i)=>{
        const local=clamp(s-i+.5),distance=Math.abs(s-i),opacity=1-smooth((distance-.15)/.85);
        photo.style.opacity=opacity;
        const z=1.17-local*.13;const x=(i===2?-1:1)*(local-.5)*5;
        photo.style.transform=reduced.matches?'none':`perspective(1400px) translate3d(${x}%,${(local-.5)*-2.5}%,0) rotateY(${(local-.5)*1.5}deg) scale(${z})`;
      });
      const foreground=layer.querySelector('.im-foreground');foreground.style.opacity=(1-smooth((s-.05)/.70));foreground.style.transform=reduced.matches?'none':`perspective(1100px) translate3d(${s*43}%,${s*14}%,${s*130}px) scale(${1.17+s*.10})`;
      chapters.forEach((c,i)=>{const a=(1-smooth((Math.abs(s-i)-.05)/.75))*(1-intro);c.style.opacity=a;c.style.visibility=a>.02?'visible':'hidden';c.style.transform=reduced.matches?'none':`translate3d(0,${(1-a)*35}px,0)`;});
      const active=Math.min(3,Math.round(s));
      buttons.forEach((b,i)=>{b.classList.toggle('is-active',i===active);b.classList.toggle('is-complete',i<active);b.setAttribute('aria-current',i===active?'step':'false');b.style.setProperty('--fill',i===3?clamp((p-.49)/.11):clamp(s-i));});
      if(current!==target)raf=requestAnimationFrame(frame);
    };
    const queue=()=>{if(!raf)raf=requestAnimationFrame(frame);};
    const measure=()=>{target=clamp(-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight-innerHeight));queue();};
    const resize=()=>{measure();};
    addEventListener('scroll',measure,{passive:true});addEventListener('resize',resize);
    const ro=new ResizeObserver(resize);ro.observe(hero);measure();
    hero._immersiveCleanup=()=>{dead=true;cancelAnimationFrame(raf);removeEventListener('scroll',measure);removeEventListener('resize',resize);ro.disconnect();};
  }
  window.ThamecoV3Attach=attach;
})();
