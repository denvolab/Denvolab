"use client";
import Image from "next/image";
import { useSyncExternalStore } from "react";
function subscribe(tick:()=>void){const timer=setInterval(tick,1000);return ()=>clearInterval(timer);}
const snapshot=()=>Math.floor(Date.now()/1000);
const serverSnapshot=()=>null;
/** The Figma dial artwork, with hands showing the studio's actual local time. */
export function StudioClock({timeZone}:{timeZone:string}){
 const now=useSyncExternalStore(subscribe,snapshot,serverSnapshot);
 const parts=now===null?[]:new Intl.DateTimeFormat('en-GB',{timeZone,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(now*1000);
 const part=(key:string)=>Number(parts.find(p=>p.type===key)?.value??0);
 const hour=part('hour'),minute=part('minute'),second=part('second');
 return <div className="site-clock-frame" aria-hidden="true"><div className="site-clock">
  <Image src="/images/contact/final/SculptedMetalBezel.svg" alt="" width={148} height={148}/>
  <Image src="/images/contact/final/InnerBevel.svg" alt="" width={114} height={114}/>
  <Image src="/images/contact/final/PorcelainDial.svg" alt="" width={108} height={108}/>
  {Array.from({length:60},(_,i)=><span key={i} className="site-clock-tick" style={{transform:`rotate(${i*6}deg)`,opacity:i%5?0.3:0.8}}><i style={{height:i%5?2:6,width:i%5?0.5:1.5}}/></span>)}
  <span className="site-clock-hand hour" style={{transform:`rotate(${hour*30+minute/2}deg)`}}/>
  <span className="site-clock-hand" style={{transform:`rotate(${minute*6+second/10}deg)`}}/>
  <span className="site-clock-hand second" style={{transform:`rotate(${second*6}deg)`}}/>
  <span className="site-clock-pin"/>
 </div></div>;
}
