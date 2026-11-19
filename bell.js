// أصوات الجرس المشتركة بين صفحة التلفاز وصفحة التحكم
let ctx;
export function audioCtx(){return ctx||(ctx=new (window.AudioContext||window.webkitAudioContext)())}
export function audioReady(){try{return audioCtx().state==='running'}catch(e){return false}}
export function unlock(){try{const c=audioCtx();return c.resume&&c.resume()}catch(e){}}
// [التردد, وقت البدء, المدة] بالثواني
const T={1:[[880,0,.9],[660,.55,1.3]],2:[[1000,0,.2],[1000,.32,.2],[1000,.64,.2],[1000,.96,.2],[1000,1.28,.6]],3:[[523,0,.9],[659,.35,.9],[784,.7,1.5]]};
export function playBell(tone,file){
 if(tone==='file'&&file){const a=new Audio('audio/'+encodeURI(file));return a.play().catch(()=>{})}
 try{const c=audioCtx();if(c.resume)c.resume();
  (T[tone]||T[1]).forEach(([f,t,d])=>{const o=c.createOscillator(),g=c.createGain();
   o.type=tone==='2'?'square':'sine';o.frequency.value=f;
   const s=c.currentTime+t,top=tone==='2'?.22:.55;
   g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(top,s+.02);g.gain.exponentialRampToValueAtTime(.0001,s+d);
   o.connect(g);g.connect(c.destination);o.start(s);o.stop(s+d+.05)})}catch(e){}}
