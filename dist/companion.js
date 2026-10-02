/* Art-directed sprite poses; bounded motion, no skeleton, WebGL or physics rig. */
(() => {
  const nav = document.querySelector('.dotnav');
  const actor = nav?.querySelector('.orb-companion');
  if (!actor) return;
  const image = actor.querySelector('img');
  const sprite = actor.querySelector('.companion-sprite');
  const attentionLayer = image.cloneNode();
  attentionLayer.className='companion-attention';sprite.append(attentionLayer);
  const hit = actor.querySelector('.companion-hit');
  const status = actor.querySelector('.companion-status');
  const ring = actor.querySelector('.companion-ring');
  const tether = actor.querySelector('.companion-tether');
  const edge = actor.querySelector('.companion-edge');
  const balloon = actor.querySelector('.companion-balloon');
  const hook = document.createElementNS('http://www.w3.org/2000/svg','circle');
  hook.setAttribute('r','3');hook.classList.add('companion-rope-hook');tether.parentNode.append(hook);
  const portals=document.createElement('span');portals.className='companion-portals';portals.setAttribute('aria-hidden','true');
  portals.innerHTML='<span class="companion-portal"><i class="portal-back"></i><i class="portal-front"></i></span><span class="companion-portal"><i class="portal-back"></i><i class="portal-front"></i></span>';nav.append(portals);
  const portalRings=[...portals.children];
  const plane=document.createElement('span');plane.className='companion-plane';plane.setAttribute('aria-hidden','true');
  plane.innerHTML='<svg viewBox="0 0 52 20"><path fill="#eec878" d="M1 5 51 1 29 19 19 10Z"/><path fill="#fff0c1" d="M1 5 51 1 19 10Z"/><path fill="none" stroke="#b5843e" stroke-width="1" d="m19 10 32-9-22 18"/></svg>';actor.append(plane);
  const steps=document.createElement('span');steps.className='companion-stars';steps.setAttribute('aria-hidden','true');steps.innerHTML='<i></i><i></i>';nav.append(steps);
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
    {name:'rope-climb',weight:2.6,duration:2500,cooldown:8000},
    {name:'orb-wrap',weight:2,duration:1550,cooldown:6000,short:true},
    {name:'balloon',weight:1.5,duration:2300,cooldown:16000},
    {name:'wings',weight:.8,duration:1850,cooldown:20000},
    {name:'portal',weight:2.2,duration:2200,cooldown:10000},
    {name:'paper-plane',weight:1.5,duration:2300,cooldown:12000},
    {name:'star-steps',weight:2,duration:2350,cooldown:9000},
  ];
  const used = new Map();
  const reviewAction = new URLSearchParams(location.search).get('companion-review');
  let previous = '';
  let impactTimer=0, impactEffect=null;
  let reaction=null, lastReaction='', lastClick=-Infinity, gaze='rest', idleScene=null, idleTimer=0, previousScene='', outing=null, lastOuting=-Infinity;
  // Four seconds of idle after a short scroll-settle window. Landings and
  // section observers never restart this clock; actual browsing input does.
  const browsingIdleDelay = 4200;
  let idleDeadline=performance.now()+browsingIdleDelay, touching=false, lastAnchor=null;
  const anchorVisits=new WeakMap();
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
    const review = actions.find(action => action.name === (reviewAction==='tether-swing'?'rope-climb':reviewAction));
    if (review) return review;
    const distance = Math.abs(position(wanted)-position(current));
    const eligible = actions.filter(a => a.name!==previous && (!a.short || distance<110) && (innerHeight>650 || !['edge-vault','balloon','rope-climb'].includes(a.name)));
    let candidates = eligible.filter(a => now-(used.get(a.name)??-Infinity)>a.cooldown);
    if (!candidates.length) candidates = eligible;
    // A random first tour of the eligible moves makes variety discoverable;
    // subsequent choices use the same weighted pool and cooldowns.
    const unseen=candidates.filter(action=>!used.has(action.name));if(unseen.length)candidates=unseen;
    const sample = new Uint32Array(1); crypto.getRandomValues(sample);
    let ticket = sample[0]/4294967296*candidates.reduce((sum,a)=>sum+a.weight,0);
    const chosen = candidates.find(a => (ticket-=a.weight)<0)??candidates[candidates.length-1];
    used.set(chosen.name,now); previous=chosen.name; return chosen;
  }
  function pose(name) {
    actor.classList.toggle('companion-looking',name==='rest'&&!motion.matches&&desktop.matches);
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
    tether.style.opacity='0';hook.style.opacity='0';edge.style.opacity='0';balloon.style.opacity='0';plane.style.opacity='0';actor.dataset.depth='front';
    portals.style.opacity='0';steps.style.opacity='0';sprite.style.clipPath='';sprite.style.opacity='1';hit.style.visibility='';
    links.forEach(link => {const dot=link.querySelector('.dot'); dot.style.removeProperty('transform'); dot.style.removeProperty('transition');});
  }
  function settle() {
    clearImpact();
    cancelAnimationFrame(frame); frame=0; trip=null; reaction=null; idleScene=null; outing=null; current=wanted; clearProps(); paint(position(current)); actor.dataset.action='rest';
  }
  function hurry(index,rough=false) {
    clearImpact();
    outing=null;idleScene=null;reaction=null;
    actor.dataset.anchor='';
    trip={from:current,to:index,start:performance.now(),startY:drawn.y,startX:drawn.x,action:{name:'hurry',duration:rough?1200:780,rough}};
    actor.dataset.action='hurry';wake();
  }
  function scheduleIdle(delay) {
    clearTimeout(idleTimer);
    if(delay!==undefined) idleDeadline=Math.max(idleDeadline,performance.now()+delay);
    if(motion.matches||!desktop.matches||!hover.matches||!actor.classList.contains('ready')) return;
    idleTimer=setTimeout(startIdle,Math.max(0,idleDeadline-performance.now()));
  }
  function browsingActivity() {
    clearImpact();
    idleDeadline=performance.now()+browsingIdleDelay;
    if(outing) hurry(wanted);
    if(idleScene) {
      idleScene=null;clearProps();actor.dataset.action='rest';paint(position(current));wake();
    }
    scheduleIdle();
  }
  function clearImpact() {
    clearTimeout(impactTimer);impactEffect?.remove();impactEffect=null;
  }
  function strikeImpact(point,direction,showCursor) {
    clearImpact();
    const effect=document.createElement('span');impactEffect=effect;effect.className='companion-click-impact';effect.setAttribute('aria-hidden','true');
    effect.style.left=`${point.x}px`;effect.style.top=`${point.y}px`;
    effect.innerHTML='<i class="click-impact-ring"></i>'+(showCursor?'<svg class="click-impact-pointer" viewBox="0 0 20 26"><path d="M2 2v19l5-5 4 8 3-2-4-8h7Z"/></svg>':'');document.body.append(effect);
    const life=motion.matches?160:420;
    effect.querySelector('.click-impact-ring').animate([{opacity:.8,transform:'scale(.45)'},{opacity:0,transform:`scale(${motion.matches?1:1.8})`}],{duration:life,easing:'ease-out'});
    const cursor=effect.querySelector('svg');
    if(cursor)cursor.animate([{opacity:.85,transform:`translate(${direction*4}px,0) rotate(0deg)`},{opacity:.7,transform:`translate(${direction*42}px,-12px) rotate(${direction*12}deg)`,offset:.6},{opacity:0,transform:`translate(${direction*66}px,4px) rotate(${direction*22}deg)`}],{duration:life,easing:'cubic-bezier(.16,.7,.3,1)',fill:'forwards'});
    setTimeout(()=>{effect.remove();if(impactEffect===effect)impactEffect=null;},life+20);
  }
  function ropeClimb(a,b,q) {
    const anchor=Math.min(a,b)-126;
    let x,y,angle=0,name;
    if(q<.16){const p=ease(q/.16);x=-43*p;y=a;name='grab';}
    else if(q<.86){
      const phase=(q-.16)/.70*4,step=Math.min(3,Math.floor(phase)),part=phase-step;
      x=-43;y=mix(a,b,(step+ease(part))/4);angle=1.5*Math.sin(part*Math.PI*2);name=part<.48?'grab':'compress';
    }else{const p=(q-.86)/.14;x=-43*(1-ease(p));y=b-8*Math.sin(p*Math.PI);name=p<.70?'launch':'land';}
    paint(y,x,angle,1,1,name);
    // Grip coordinates are measured in the two illustrated hand poses.
    const gx=name==='compress'?22.1:30.2,gy=name==='compress'?-61.9:-64.8;
    const r=angle*Math.PI/180,hx=x+gx*Math.cos(r)-gy*Math.sin(r),hy=gx*Math.sin(r)+gy*Math.cos(r)-11;
    const release=q>.86?(q-.86)/.14:0,alpha=q<.12?q/.12:1-release;
    hook.setAttribute('cx','-12');hook.setAttribute('cy',String(anchor-y));hook.style.opacity=String(alpha);
    tether.style.opacity=String(alpha);
    const endY=release?mix(hy,anchor-y,ease(release)):hy;
    tether.setAttribute('d',`M -12 ${anchor-y} L ${hx} ${endY}`+(release?'':` M ${hx} ${hy} Q ${hx+2*Math.sin(q*Math.PI*4)} ${mix(hy,b-y+14,.6)} -12 ${b-y+14}`));
  }
  function portalTravel(a,b,q) {
    let x,y,name;
    if(q<.34){const p=ease(q/.34);x=-92*p;y=a;name=p<.3?'grab':'tuck';actor.dataset.portalPhase='enter';}
    else if(q<.48){x=-92;y=a;name='tuck';sprite.style.opacity='0';actor.dataset.portalPhase='inside';}
    else{const p=ease(Math.min(1,(q-.48)/.45));x=-76*(1-p);y=b;name=p<.45?'launch':p<.84?'land':'rest';actor.dataset.portalPhase='exit';}
    paint(y,x,0,1,1,name);sprite.style.clipPath=`inset(0 0 0 ${(q<.48?2:18)-x}px)`;hit.style.visibility='hidden';
  }
  function planeTravel(a,b,q) {
    let x,y,angle=0,name,alpha=1,peel=0;
    if(q<.16){x=0;y=a;name='compress';alpha=ease(q/.16);}
    else if(q<.78){const p=(q-.16)/.62;x=-30*Math.sin(p*Math.PI);y=mix(a,b,ease(p))-8*Math.sin(p*Math.PI);angle=-5*Math.sin(p*Math.PI*2);name=p<.15?'grab':p<.4?'rest':p<.58?'wave':p<.82?'rest':'crouch';}
    else{const p=(q-.78)/.22;x=0;y=b-10*Math.sin(p*Math.PI);name=p<.70?'launch':'land';alpha=1-p;peel=p;}
    paint(y,x,angle,1,1,name);plane.style.opacity=String(alpha);plane.style.transform=`translate(${x-35*peel}px,${-40*peel}px) rotate(${angle-15*peel}deg) scale(${1-.35*peel})`;
  }
  function starTravel(a,b,q) {
    const xs=[0,-18,-30,0],phase=Math.min(2.99999,q*3),step=Math.floor(phase),part=phase-step;
    const start=mix(a,b,step/3),end=mix(a,b,(step+1)/3);
    steps.style.opacity='1';
    [...steps.children].forEach((star,index)=>{star.style.left=`${nav.clientWidth-22+xs[index+1]}px`;star.style.top=`${mix(a,b,(index+1)/3)-5}px`;star.style.transform=`translate(-50%,-50%) scale(${q>(index+1)/3?Math.max(.15,1-(q-(index+1)/3)*1.8):.75})`;});
    if(part<.17)paint(start,xs[step],0,1,.96,'crouch');
    else if(part<.80){const p=(part-.17)/.63;paint(mix(start,end,ease(p)),mix(xs[step],xs[step+1],ease(p)),-3*Math.sin(p*Math.PI),1,1,p<.25?'launch':p<.7?'tuck':'launch',10*Math.sin(p*Math.PI));}
    else paint(end,xs[step+1],0,1,1,part<.93?'land':'rest');
  }
  function mediaAnchor() {
    const now=performance.now(), navRect=nav.getBoundingClientRect(), center=navRect.right-22;
    const copy=[...document.querySelectorAll('main h1,main h2,main h3,main p')].map(el=>el.getBoundingClientRect());
    return [...document.querySelectorAll('.shot,main .diagram-frame,main .btn')].map(element=>({element,rect:element.getBoundingClientRect()}))
      .filter(({element,rect:r})=>r.width>(element.matches('.btn')?70:150)&&r.height>(element.matches('.btn')?24:120)&&r.top>160&&r.top<innerHeight-90&&center-(r.right-25)>40&&center-(r.right-25)<Math.min(280,innerWidth*.24)&&Number(getComputedStyle(element).opacity)>.98)
      .filter(({rect:r})=>!copy.some(c=>c.width>0&&c.height>0&&c.right>r.right-54&&c.left<r.right+4&&c.bottom>r.top-78&&c.top<r.top-4))
      .filter(({element})=>now-(anchorVisits.get(element)??-Infinity)>30000)
      .sort((a,b)=>Number(anchorVisits.has(a.element))-Number(anchorVisits.has(b.element))||Number(a.element===lastAnchor)-Number(b.element===lastAnchor)||Math.abs(a.rect.top-(navRect.top+position(current)))-Math.abs(b.rect.top-(navRect.top+position(current))))[0];
  }
  function startIdle() {
    if(performance.now()<idleDeadline) {scheduleIdle();return;}
    if(trip||reaction||outing||touching||wanted!==current||motion.matches||!desktop.matches||document.hidden) {scheduleIdle(250);return;}
    const now=performance.now(), anchor=mediaAnchor();
    const sceneReview=['typing','surprise'].includes(reviewAction);
    if(anchor && !sceneReview && (reviewAction==='media-hop'||!anchorVisits.has(anchor.element)||now-lastOuting>18000) && (anchor.element!==lastAnchor||previousScene!=='media-hop')) {
      const rect=nav.getBoundingClientRect();
      outing={element:anchor.element,start:now,x:anchor.rect.right-25-(rect.right-22),y:anchor.rect.top-rect.top+11};
      lastOuting=now;lastAnchor=anchor.element;anchorVisits.set(anchor.element,now);previousScene='media-hop';actor.dataset.action='media-hop';
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
      paint(position(current),0,0,reaction.facing,1,q<.16?'crouch':q<.70?reaction.name:q<.88?'recover':'rest');
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
      if(action.name==='portal'){
        const open=t<.13?ease(t/.13):t>.86?1-ease((t-.86)/.14):1;
        portals.style.opacity=String(open);portals.style.setProperty('--portal-open',String(open));
        portalRings[0].style.top=`${a-45}px`;portalRings[1].style.top=`${b-45}px`;
      }
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
        } else if(action.name==='rope-climb') {
          ropeClimb(a,b,q);
        } else if(action.name==='portal') {
          portalTravel(a,b,q);
        } else if(action.name==='paper-plane') {
          planeTravel(a,b,q);
        } else if(action.name==='star-steps') {
          starTravel(a,b,q);
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
      paint(position(current));
      if(now>=restUntil && wanted===current && idle>1150) {frame=0;return;}
    }
    frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame)frame=requestAnimationFrame(tick);}
  function target(index,manual=false){
    const now=performance.now(), changed=index!==wanted;
    if(!manual&&now<clickGrace&&trip)return;
    if(!changed)return;
    wanted=index;idleScene=null;reaction=null;
    const rough=now-fastScrollAt<650&&now>clickGrace;
    if(outing || (trip&&trip.to!==index&&(manual||rough||now-lastTargetChange<350))) hurry(index,rough);
    lastTargetChange=now;
    if(motion.matches||!desktop.matches)settle();else wake();scheduleIdle();
  }
  function activeTarget(){target(Math.max(0,links.findIndex(link=>link.classList.contains('active'))));}
  new MutationObserver(records=>{
    if(!records.some(record=>links.includes(record.target)))return;
    clearTimeout(debounce);debounce=setTimeout(activeTarget,90);
  }).observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});
  nav.addEventListener('click',event=>{const index=links.indexOf(event.target.closest('a'));if(index>=0){clickGrace=performance.now()+1500;target(index,true);}});
  addEventListener('scroll',()=>{const now=performance.now();if(Math.abs(scrollY-previousScroll)/Math.max(16,now-scrollTime)>1.6)fastScrollAt=now;previousScroll=scrollY;scrollTime=now;browsingActivity();},{passive:true});
  addEventListener('wheel',()=>{clickGrace=-Infinity;browsingActivity();},{passive:true});
  document.addEventListener('scroll',event=>{if(event.target!==document)browsingActivity();},{capture:true,passive:true});
  addEventListener('touchstart',()=>{touching=true;clickGrace=-Infinity;browsingActivity();},{passive:true});
  addEventListener('touchmove',browsingActivity,{passive:true});
  for(const type of ['touchend','touchcancel'])addEventListener(type,event=>{touching=event.touches.length>0;browsingActivity();},{passive:true});
  document.addEventListener('click',event=>{if(event.target.closest('a[href^="#"]'))browsingActivity();},{capture:true});
  addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)&&!event.target.closest('input,textarea,select,button,[contenteditable]')){clickGrace=-Infinity;browsingActivity();}});
  addEventListener('resize',()=>{hit.disabled=!desktop.matches||innerHeight<461;browsingActivity();if(trip)hurry(wanted);else paint(position(current));wake();});
  motion.addEventListener('change',()=>{settle();wake();scheduleIdle();});
  desktop.addEventListener('change',()=>{hit.disabled=!desktop.matches||innerHeight<461;settle();wake();scheduleIdle();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){settle();clearTimeout(idleTimer);}else {wake();scheduleIdle();}});
  hit.addEventListener('click',event=>{
    event.stopPropagation();const now=performance.now();if(now-lastClick<850)return;lastClick=now;
    const choices=['swat','kick','dodge','recoil'].filter(name=>name!==lastReaction);
    const name=choices[Math.floor(Math.random()*choices.length)];lastReaction=name;
    const box=hit.getBoundingClientRect(),facing=event.detail&&event.clientX>box.left+box.width/2?-1:1;
    const attack=['swat','kick'].includes(name)&&!trip&&!outing;
    const point={x:event.detail?event.clientX:box.left+box.width/2-14,y:event.detail?event.clientY:box.top+box.height*.35};
    status.textContent={swat:'He gives a playful swat.',kick:'He tries a little kick.',dodge:'He ducks playfully.',recoil:'You surprised him!'}[name];
    clearImpact();
    if(motion.matches){if(attack)strikeImpact(point,-facing,false);pose('wave');setTimeout(()=>pose('rest'),700);return;}
    idleScene=null;idleDeadline=now+browsingIdleDelay;reaction={name:trip||outing?'recoil':name,start:now,duration:680,facing};
    if(attack)impactTimer=setTimeout(()=>strikeImpact(point,-facing,hover.matches&&event.detail>0&&event.pointerType!=='touch'),120);
    actor.dataset.reaction=name;wake();scheduleIdle();
  });
  let lookTime=0;
  addEventListener('pointermove',event=>{
    if(!hover.matches||motion.matches||!desktop.matches||performance.now()-lookTime<90)return;lookTime=performance.now();
    const r=nav.getBoundingClientRect(), x=r.right-22, y=r.top+drawn.y-48;
    const dx=event.clientX-x,dy=event.clientY-y;
    // Cursor attention changes only the clipped illustrated head. The resting
    // body, action scheduler and click reactions are independent of the pointer.
    gaze=dy>100?'look-down':dx<-60?'look-left':dx>18?'look-right':'rest';
    attentionLayer.src=cache[gaze].src;
    attentionLayer.style.transform=`translate(${dx<-60?-.35:dx>18?.35:0}px,${dy>100?.35:dy<-95?-.25:0}px) rotate(${dy>100?1:dy<-95?-1:dx<-60?-1.5:dx>18?1.5:0}deg)`;
    actor.dataset.gaze=gaze;
  },{passive:true});
  Promise.all(Object.values(cache).map(img=>img.decode().catch(()=>{}))).then(()=>{
    current=wanted=Math.max(0,links.findIndex(link=>link.classList.contains('active')));actor.classList.add('ready');actor.dataset.action='rest';paint(position(current));hit.disabled=!desktop.matches||innerHeight<461;wake();scheduleIdle();
  });
})();
