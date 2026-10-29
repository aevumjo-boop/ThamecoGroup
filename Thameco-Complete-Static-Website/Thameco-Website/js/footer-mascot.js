(() => {
function mount(host){
 const footer=host.closest('footer'),logo=footer?.querySelector('.aevum-credit-link'),floor=footer?.querySelector('.site-footer-bottom');
 if(!footer||!logo||!floor)return()=>{};
 const actor=document.createElement('div');actor.className='aevum-mascot-actor';
 const source='./assets/images/aevum-doctor-robot.png';
 actor.innerHTML='<i class="aevum-mascot-shadow"></i><div class="aevum-walker">'+['body','leg-left','leg-right'].map(part=>`<img class="aevum-doctor aevum-doctor-${part}" src="${source}" alt="" loading="lazy" decoding="async">`).join('')+'</div>';host.append(actor);
 const sprites=[...actor.querySelectorAll('img')],walker=actor.querySelector('.aevum-walker'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let animations=[],visible=false,dead=false,playing=false,ready=false,lastPlay=0;
 function geometry(){const f=footer.getBoundingClientRect(),l=logo.getBoundingClientRect(),g=floor.getBoundingClientRect(),h=parseFloat(getComputedStyle(host).getPropertyValue('--mascot-height'))||98;return {h,startX:l.left-f.left+l.width*.45-h/3,endX:Math.min(f.width-h*.67-12,l.right-f.left+10),y:g.bottom-f.top-h-10};}
 function stop(){animations.forEach(a=>a.cancel());animations=[];playing=false;host.classList.remove('is-walking');}
 function pose(g){actor.style.transform=`translate(${g.endX}px,${g.y}px)`;actor.style.opacity='1';walker.style.transform='none';}
 async function play(){if(dead||!visible||playing||Date.now()-lastPlay<5000)return;lastPlay=Date.now();playing=true;
 if(!ready){try{await Promise.all(sprites.map(s=>s.decode()));ready=true;}catch{playing=false;return;}}if(dead||!visible){playing=false;return;}
 stop();playing=true;const g=geometry();host.dataset.state=reduced.matches?'resting':'walking';host.style.opacity='1';
 if(reduced.matches){pose(g);playing=false;return;}
 const at=(x,scale=1)=>`translate(${x}px,${g.y}px) scale(${scale})`;
 // Emergence stays at floor level; the following travel is a steady walking pace.
 const travel=actor.animate([{offset:0,transform:at(g.startX,.08),opacity:0},{offset:.18,transform:at(g.startX),opacity:1},{offset:1,transform:at(g.endX),opacity:1}],{duration:3400,fill:'forwards',easing:'linear'});animations.push(travel);
 const gait=[{transform:'translateY(0) rotate(-7deg)'},{transform:'translateY(-1px) rotate(7deg)'},{transform:'translateY(0) rotate(-7deg)'}];
 for(const [i,leg]of [...actor.querySelectorAll('.aevum-doctor-leg-left,.aevum-doctor-leg-right')].entries())animations.push(leg.animate(gait,{duration:560,iterations:5,delay:560,iterationStart:i*.5,easing:'ease-in-out'}));
 animations.push(walker.animate([{transform:'translateY(0) rotate(-1deg)'},{transform:'translateY(-1px) rotate(1deg)'},{transform:'translateY(0) rotate(-1deg)'}],{duration:560,iterations:5,delay:560,easing:'ease-in-out'}));
 travel.finished.then(()=>{if(dead)return;stop();pose(g);host.dataset.state='resting';}).catch(()=>{});
 }
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)play();else{stop();host.style.opacity='0';}},{threshold:.2});observer.observe(floor);
 function resize(){if(!visible)return;stop();if(ready){pose(geometry());host.dataset.state='resting';}}
 function replay(){if(visible)play();}
 addEventListener('resize',resize);logo.addEventListener('pointerenter',replay);logo.addEventListener('focus',replay);reduced.addEventListener('change',resize);
 return()=>{dead=true;observer.disconnect();stop();removeEventListener('resize',resize);logo.removeEventListener('pointerenter',replay);logo.removeEventListener('focus',replay);reduced.removeEventListener('change',resize);actor.remove();};
}
window.ThamecoMascot={mount};
})();
