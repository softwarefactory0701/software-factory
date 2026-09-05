"use client";
import{motion,useReducedMotion}from"motion/react";

export function FloatingPaths({position}:{readonly position:number}){const reduced=useReducedMotion();const paths=Array.from({length:36},(_,i)=>({id:i,d:`M-${380-i*5*position} -${189+i*6} C-${380-i*5*position} -${189+i*6} -${312-i*5*position} ${216-i*6} ${152-i*5*position} ${343-i*6} C${616-i*5*position} ${470-i*6} ${684-i*5*position} ${875-i*6} ${684-i*5*position} ${875-i*6}`,width:.45+i*.025}));return <svg aria-hidden className="background-paths" fill="none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 696 316">{paths.map(path=><motion.path animate={reduced?undefined:{pathLength:[.34,1,.34],pathOffset:[0,.1,0],opacity:[.025,.07,.025]}} d={path.d} initial={{pathLength:1,opacity:.04}} key={path.id} stroke="currentColor" strokeWidth={path.width} transition={{duration:22+path.id*.16,delay:path.id*.09,ease:"linear",repeat:Infinity}}/>)}</svg>}

export function BackgroundPaths(){return <><FloatingPaths position={1}/><FloatingPaths position={-1}/></>}
