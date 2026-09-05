"use client";
import{motion,useReducedMotion}from"motion/react";import type{ReactNode}from"react";
export function Reveal({children,className="",delay=0}:{readonly children:ReactNode;readonly className?:string;readonly delay?:number}){const reduced=useReducedMotion();return <motion.div animate={reduced?undefined:{opacity:1,y:0}} className={`motion-reveal ${className}`} initial={false} transition={{duration:.65,delay:Math.min(delay,100)/1000,ease:[.22,1,.36,1]}}>{children}</motion.div>}
