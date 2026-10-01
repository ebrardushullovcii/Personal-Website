/* Art-directed sprite poses; bounded motion, no skeleton, WebGL or physics rig. */
(() => {
  const nav = document.querySelector('.dotnav');
  const actor = nav?.querySelector('.orb-companion');
  if (!actor) return;
  const image = actor.querySelector('img');
  const sprite = actor.querySelector('.companion-sprite');
  const attentionLayer = image.cloneNode();
  attentionLayer.className='companion-attention';attentionLayer.style.opacity='0';sprite.append(attentionLayer);
  const hit = actor.querySelector('.companion-hit');
  const status = actor.querySelector('.companion-status');
  const ring = actor.querySelector('.companion-ring');
  const tether = actor.querySelector('.companion-tether');
  const edge = actor.querySelector('.companion-edge');
  const balloon = actor.querySelector('.companion-balloon');
  const links = [...nav.querySelectorAll('a')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 861px)');
  const hover = matchMedia('(hover: hover)');
  const poses = ['rest','crouch','launch','tuck','land','wings','balloon','wave','grab','compress','push','balloon-pull','balloon-arrive','release','look-left','look-right','look-down','typing-a','typing-b','surprise','ouch','recover','swat','kick','dodge','recoil'];
  const assetVersion = document.querySelector('script[src^="/app.js"]')?.getAttribute('src').split('?')[1] ?? 'pose-v3';
  const cache = Object.fromEntries(poses.map(name => {
    const img = new Image(); img.src = `/assets/companion/${name}.png?${assetVersion}`; return [name, img];
  }));
  const actions = [
    {name:'springboard',weight:3,duration:1320,cooldown:3800,short:true},
    {name:'edge-vault',weight:3,duration:1900,cooldown:6000},
    {name:'tether-swing',weight:2,duration:1850,cooldown:8000},
    {name:'orb-wrap',weight:2,duration:1550,cooldown:6000,short:true},
    {name:'balloon',weight:1.5,duration:2300,cooldown:16000},
    {name:'wings',weight:.8,duration:1850,cooldown:20000},
  ];
  const used = new Map();
  const reviewAction = new URLSearchParams(location.search).get('companion-review');
  let previous = '';
  let reaction=null, lastReaction='', lastClick=-Infinity, gaze='rest', idleScene=null, idleTimer=0, previousScene='', outing=null, lastOuting=-Infinity;
  let gazeMotion={x:0,angle:0,sx:1,sy:1};
  let drawn={y:0,x:0,pose:'rest'}, lastTargetChange=-Infinity, fastScrollAt=-Infinity, clickGrace=-Infinity, previousScroll=scrollY, scrollTime=performance.now();
  let current = 0, wanted = 0, trip = null, frame = 0, restUntil = 0, lastPose = '', idleStart = performance.now(), debounce = 0;
  const ease = t => t*t*(3-2*t);
  const mix = (a,b,t) => a+(b-a)*t;
  const position = index => {
    const orb = links[index].querySelector('.dot');
    const rect = orb.getBoundingClientRect();
    return rect.top-nav.getBoundingClientRect().top+rect.height/2;
  };
  function choose(now) {
    if (reviewAction==='hurry' || (now-fastScrollAt<650 && now>clickGrace)) return {name:'hurry',duration:1200,rough:true};
    const review = actions.find(action => action.name === reviewAction);
    if (review) return review;
    const distance = Math.abs(position(wanted)-position(current));
    const eligible = actions.filter(a => a.name!==previous && (!a.short || distance<110) && (innerHeight>650 || !['edge-vault','balloon'].includes(a.name)));
    let candidates = eligible.filter(a => now-(used.get(a.name)??-Infinity)>a.cooldown);
    if (!candidates.length) candidates = eligible;
    const sample = new Uint32Array(1); crypto.getRandomValues(sample);
    let ticket = sample[0]/4294967296*candidates.reduce((sum,a)=>sum+a.weight,0);
    const chosen = candidates.find(a => (ticket-=a.weight)<0)??candidates[candidates.length-1];
    used.set(chosen.name,now); previous=chosen.name; return chosen;
  }
  function pose(name) {
    if(name===lastPose) return;
    image.src=cache[name].src; lastPose=name; actor.dataset.pose=name;
  }
  function paint(y,x=0,angle=0,sx=1,sy=1,name='rest',lift=0,impact=0) {
    if(reaction && (trip||outing) && performance.now()-reaction.start<reaction.duration) {name=reaction.name; sx*=reaction.facing;}
    drawn={y,x,pose:name};
    actor.style.transform=`translateY(${y}px)`;
    sprite.style.transform=`translate(${x}px, ${-lift}px) rotate(${angle}deg) scale(${sx}, ${sy})`;
    hit.style.transform=sprite.style.transform;
    pose(name);
    ring.style.opacity=String(impact*.4);
    ring.style.transform=`translate(-50%,-50%) scale(${1+(1-impact)*.6})`;
  }
  function clearProps() {
    tether.style.opacity='0'; edge.style.opacity='0'; balloon.style.opacity='0'; actor.dataset.depth='front';
    links.forEach(link => {const dot=link.querySelector('.dot'); dot.style.removeProperty('transform'); dot.style.removeProperty('transition');});
  }
  function settle() {
    cancelAnimationFrame(frame); frame=0; trip=null; reaction=null; idleScene=null; outing=null; current=wanted; clearProps(); paint(position(current)); actor.dataset.action='rest';
  }
  function hurry(index,rough=false) {
    outing=null;idleScene=null;reaction=null;
    trip={from:current,to:index,start:performance.now(),startY:drawn.y,startX:drawn.x,action:{name:'hurry',duration:rough?1200:780,rough}};
    actor.dataset.action='hurry';wake();
  }
  function scheduleIdle(delay=['typing','surprise','media-hop'].includes(reviewAction)?800:4200) {
    clearTimeout(idleTimer);
    if(motion.matches||!desktop.matches||!hover.matches) return;
    idleTimer=setTimeout(startIdle,delay);
  }
  function mediaAnchor() {
    const navRect=nav.getBoundingClientRect(), center=navRect.right-22;
    const copy=[...document.querySelectorAll('main h1,main h2,main h3,main p')].map(el=>el.getBoundingClientRect());
    return [...document.querySelectorAll('.shot,main .diagram-frame,main .btn')].map(element=>({element,rect:element.getBoundingClientRect()}))
      .filter(({element,rect:r})=>r.width>(element.matches('.btn')?70:150)&&r.height>(element.matches('.btn')?24:120)&&r.top>165&&r.top<innerHeight-100&&center-(r.right-25)>45&&center-(r.right-25)<150&&Math.abs(r.top-(navRect.top+position(current)))<155&&Number(getComputedStyle(element).opacity)>.98)
      .filter(({rect:r})=>!copy.some(c=>c.width>0&&c.height>0&&c.right>r.right-54&&c.left<r.right+4&&c.bottom>r.top-78&&c.top<r.top-4))
      .sort((a,b)=>Math.abs(a.rect.top-(navRect.top+position(current)))-Math.abs(b.rect.top-(navRect.top+position(current))))[0];
  }
  function startIdle() {
    if(trip||reaction||outing||wanted!==current||motion.matches||!desktop.matches||document.hidden) {scheduleIdle(['typing','surprise','media-hop'].includes(reviewAction)?600:1200);return;}
    const now=performance.now(), anchor=mediaAnchor();
    if(anchor && (reviewAction==='media-hop'||now-lastOuting>45000) && (reviewAction==='media-hop'||Math.random()<.28)) {
      const rect=nav.getBoundingClientRect();
      outing={element:anchor.element,start:now,x:anchor.rect.right-25-(rect.right-22),y:anchor.rect.top-rect.top+11};
      lastOuting=now;actor.dataset.action='media-hop';
      actor.dataset.anchor=anchor.element.matches('.shot')?'card':anchor.element.matches('.diagram-frame')?'graph':'button';
    } else {
      const name=reviewAction==='typing'?'typing':reviewAction==='surprise'?'surprise':previousScene==='typing'?'surprise':'typing';
      previousScene=name;idleScene={name,start:now,duration:name==='typing'?4300:2300};actor.dataset.action=name;
    }
    wake();
  }
  function tick(now) {
    if(motion.matches || !desktop.matches || document.hidden) {settle();return;}
    if(reaction && now-reaction.start>=reaction.duration) {reaction=null;actor.dataset.reaction='';}
    if(outing) {
      const r=outing.element.getBoundingClientRect(), n=nav.getBoundingClientRect();
      const x=r.right-25-(n.right-22), y=r.top-n.top+11;
      if(Math.abs(x-outing.x)>3||Math.abs(y-outing.y)>3||r.top<145||r.top>innerHeight-90) hurry(wanted);
      else {
        const elapsed=now-outing.start, q=elapsed<640?elapsed/640:elapsed>1140?1-(elapsed-1140)/640:1;
        const progress=ease(Math.max(0,Math.min(1,q)));
        paint(mix(position(current),y,progress),x*progress,-4*Math.sin(progress*Math.PI),1,1,elapsed>640&&elapsed<1140?'rest':progress>.85?'land':progress<.2?'launch':'tuck',22*Math.sin(progress*Math.PI));
        if(elapsed>=1780) {outing=null;idleStart=now;actor.dataset.action='rest';actor.dataset.anchor='';scheduleIdle(8000+Math.random()*4000);}
        frame=requestAnimationFrame(tick);return;
      }
    }
    if(reaction && !trip) {
      clearProps();const q=(now-reaction.start)/reaction.duration;
      paint(position(current),0,0,reaction.facing,1,q<.16?'crouch':q<.70?reaction.name:q<.88?'recover':gaze);
      frame=requestAnimationFrame(tick);return;
    }
    if(idleScene && wanted===current) {
      const elapsed=now-idleScene.start;
      clearProps();paint(position(current),0,0,1,1,elapsed<160?'crouch':elapsed>idleScene.duration-180?'recover':idleScene.name==='typing'?(Math.floor(elapsed/360)%2?'typing-a':'typing-b'):'surprise');
      if(elapsed>=idleScene.duration) {idleScene=null;idleStart=now;actor.dataset.action='rest';scheduleIdle(8000+Math.random()*4000);}
      frame=requestAnimationFrame(tick);return;
    }
    if(!trip && wanted!==current && now>=restUntil) {
      trip={from:current,to:wanted,start:now,action:choose(now)}; actor.dataset.action=trip.action.name;
    }
    if(trip) {
      const {from,to,start,action}=trip;
      const t=Math.min(1,(now-start)/action.duration), a=trip.startY??position(from), b=position(to), down=b>a;
      clearProps();
      const source=links[from].querySelector('.dot');
      if(action.name==='hurry') {
        const airEnd=action.rough?.58:.68;
        if(t<airEnd) {const q=t/airEnd;paint(mix(a,b,ease(q)),(trip.startX??0)*(1-ease(q)),0,1,1,q<.12?drawn.pose:q<.65?'tuck':'launch',12*Math.sin(Math.PI*q));}
        else {const q=(t-airEnd)/(1-airEnd);paint(b,0,0,1,1,action.rough?(q<.52?'ouch':q<.86?'recover':'rest'):(q<.5?'land':'rest'),0,q<.25?1-q/.25:0);}
      } else if(t<.13) {
        const q=ease(t/.13);
        paint(a,0,-3*q,1+.08*q,1-.08*q,q<.15?'rest':'crouch');
        if(action.name==='springboard') {source.style.transition='none';source.style.transform=`scale(${1+.22*q},${1-.18*q})`;}
      } else if(t<.82) {
        const q=(t-.13)/.69;
        if(action.name==='edge-vault') {
          if(q<.23) {
            const p=ease(q/.23); paint(a,12*p,0,1,1,'grab',3*p);
            edge.style.opacity=String(p);edge.style.top=`${-77}px`;
          } else if(q<.40) {
            const p=ease((q-.23)/.17); paint(a-3-2*p,12+9*p,0,1,1,'compress');
            edge.style.opacity='1';edge.style.top=`${-74+2*p}px`;
          } else {
            const p=(q-.4)/.6;
            const travel=down?p*p:1-(1-p)*(1-p);
            paint(mix(a-5,b,travel),21*(1-p)-15*Math.sin(Math.PI*p),-6*Math.sin(Math.PI*p),1,1,
              p<.34?'push':p<.74?'tuck':'launch',22*Math.sin(Math.PI*p));
          }
        } else if(action.name==='springboard') {
          const travel=down?q*q:1-(1-q)*(1-q);
          paint(mix(a,b,travel),-6*Math.sin(Math.PI*q),-4*Math.sin(Math.PI*q),1-.025*Math.sin(Math.PI*q),1+.04*Math.sin(Math.PI*q),
            q<.25?'launch':q<.68?'tuck':'launch',24*Math.sin(Math.PI*q));
        } else if(action.name==='tether-swing') {
          // The hand and cord stay connected; the rope terminates on the destination orb.
          const travel=ease(q), y=mix(a,b,travel), x=-22*Math.sin(Math.PI*q);
          const lift=12*Math.sin(Math.PI*q);
          const angle=-7*Math.sin(Math.PI*q);
          paint(y,x,angle,1,1,q<.80?'grab':'launch',lift);
          if(q<.82) {
            tether.style.opacity=String(Math.min(1,q*8));
            tether.setAttribute('d',`M ${x+30} ${-72-lift} Q ${x+38} ${mix(-72-lift,b-y-12,.5)} 0 ${b-y-12}`);
          }
        } else if(action.name==='orb-wrap') {
          const y=mix(a,b,ease(q));
          // Smaller behind the orbs, full size on the front arc; the sprite itself never spins.
          const depth=Math.sin(q*Math.PI*2), x=19*Math.sin(q*Math.PI*2);
          const size=1-.13*Math.max(0,depth);
          actor.dataset.depth=q>.10&&q<.48?'behind':'front';
          paint(y,x,-5*Math.sin(q*Math.PI),size,size,q<.26?'push':q<.72?'tuck':'launch',10*Math.sin(Math.PI*q));
        } else if(action.name==='balloon') {
          const y=mix(a,b,ease(q));
          const sway=3*Math.sin(q*Math.PI*2)*Math.sin(q*Math.PI);
          paint(y,-5*Math.sin(Math.PI*q)+sway,-3*Math.sin(q*Math.PI*2),1,1,q<.72?'balloon-pull':'balloon-arrive',4*Math.sin(Math.PI*q));
        } else {
          const arc=Math.sin(Math.PI*q);
          paint(mix(a,b,ease(q)),-17*arc,-5*Math.sin(q*Math.PI*2),1,1+.02*Math.sin(q*Math.PI*8),
            q<.12||q>.91?'launch':'wings',10*arc);
        }
      } else {
        const q=(t-.82)/.18;
        const squash=Math.sin(q*Math.PI)*Math.exp(-2*q);
        paint(b,0,2*squash,1+.11*squash,1-.1*squash,q<.45?'land':action.name==='balloon'&&q<.85?'release':'rest',0,q<.40?1-q/.40:0);
        if(action.name==='balloon' && q>.24) {
          const release=(q-.24)/.76;
          balloon.style.opacity=String(1-release);
          balloon.style.transform=`translate(${8*release}px,${-50*release}px) scale(${1-.2*release})`;
        }
      }
      if(t===1) {current=to;trip=null;clearProps();actor.dataset.action='rest';restUntil=now+280;idleStart=now;paint(position(current));scheduleIdle();}
    } else {
      const idle=now-idleStart;
      paint(position(current),gazeMotion.x,idle>450&&idle<1050?1.2*Math.sin(idle/160):gazeMotion.angle,gazeMotion.sx,gazeMotion.sy,idle>450&&idle<1050?'wave':gaze);
      if(now>=restUntil && wanted===current && idle>1150) {frame=0;return;}
    }
    frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame)frame=requestAnimationFrame(tick);}
  function target(index,manual=false){
    const now=performance.now(), changed=index!==wanted;
    if(!changed&&!outing)return;
    wanted=index;idleScene=null;reaction=null;
    const rough=now-fastScrollAt<650&&now>clickGrace;
    if(outing || (trip&&trip.to!==index&&(manual||rough||now-lastTargetChange<350))) hurry(index,rough);
    lastTargetChange=now;
    if(motion.matches||!desktop.matches)settle();else wake();scheduleIdle();
  }
  function activeTarget(){target(Math.max(0,links.findIndex(link=>link.classList.contains('active'))));}
  new MutationObserver(()=>{clearTimeout(debounce);debounce=setTimeout(activeTarget,90);}).observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});
  nav.addEventListener('click',event=>{const index=links.indexOf(event.target.closest('a'));if(index>=0){clickGrace=performance.now()+1500;target(index,true);}});
  addEventListener('scroll',()=>{const now=performance.now();if(Math.abs(scrollY-previousScroll)/Math.max(16,now-scrollTime)>1.6)fastScrollAt=now;previousScroll=scrollY;scrollTime=now;if(outing)hurry(wanted);},{passive:true});
  addEventListener('resize',()=>{hit.disabled=!desktop.matches||innerHeight<461;if(outing)hurry(wanted);if(!trip)paint(position(current));wake();});
  motion.addEventListener('change',()=>{settle();wake();scheduleIdle();});
  desktop.addEventListener('change',()=>{hit.disabled=!desktop.matches||innerHeight<461;settle();wake();scheduleIdle();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){settle();clearTimeout(idleTimer);}else {wake();scheduleIdle();}});
  hit.addEventListener('click',event=>{
    event.stopPropagation();const now=performance.now();if(now-lastClick<850)return;lastClick=now;
    const choices=['swat','kick','dodge','recoil'].filter(name=>name!==lastReaction);
    const name=choices[Math.floor(Math.random()*choices.length)];lastReaction=name;
    status.textContent={swat:'He gives a playful swat.',kick:'He tries a little kick.',dodge:'He ducks playfully.',recoil:'You surprised him!'}[name];
    if(motion.matches){pose('wave');setTimeout(()=>pose('rest'),700);return;}
    idleScene=null;reaction={name:trip||outing?'recoil':name,start:now,duration:680,facing:event.clientX&&event.clientX>nav.getBoundingClientRect().right-22?-1:1};
    actor.dataset.reaction=name;wake();scheduleIdle();
  });
  let lookTime=0;
  addEventListener('pointermove',event=>{
    if(!hover.matches||motion.matches||!desktop.matches||performance.now()-lookTime<90)return;lookTime=performance.now();
    const r=nav.getBoundingClientRect(), x=r.right-22, y=r.top+drawn.y-48;
    const dx=event.clientX-x,dy=event.clientY-y;
    gaze=dy<-95?'grab':dx<-380&&Math.abs(dy)<140?'swat':dy>100?'look-down':dx<-60?'look-left':dx>18?'look-right':'rest';
    gazeMotion={x:dx<-60?-3:dx>18?2:0,angle:dy<-95?-4:dx<-60?-4.5:dx>18?4:0,sx:dy<-95&&dx<0?-1:1,sy:dy>100?.97:1};
    if(!trip&&!reaction&&!outing&&!idleScene&&wanted===current){
      const old=image.src;
      paint(position(current),gazeMotion.x,gazeMotion.angle,gazeMotion.sx,gazeMotion.sy,gaze);
      if(old!==image.src){attentionLayer.src=old;attentionLayer.animate([{opacity:1},{opacity:0}],{duration:150,easing:'ease-out'});}
    }
  },{passive:true});
  Promise.all(Object.values(cache).map(img=>img.decode().catch(()=>{}))).then(()=>{
    current=wanted=Math.max(0,links.findIndex(link=>link.classList.contains('active')));actor.classList.add('ready');paint(position(current));hit.disabled=!desktop.matches||innerHeight<461;wake();scheduleIdle(['typing','surprise','media-hop'].includes(reviewAction)?650:4200);
  });
})();
