import type{ReactNode}from"react";
export function Container({children,wide=false,className=""}:{readonly children:ReactNode;readonly wide?:boolean;readonly className?:string}){return <div className={`site-container ${wide?'site-container--wide':''} ${className}`}>{children}</div>}
export function Section({children,id,className=""}:{readonly children:ReactNode;readonly id?:string;readonly className?:string}){return <section className={`site-section ${className}`} id={id}>{children}</section>}
export function Eyebrow({children,dark=false}:{readonly children:ReactNode;readonly dark?:boolean}){return <p className={`eyebrow ${dark?'eyebrow--dark':''}`}>{children}</p>}
export function Arrow(){return <span aria-hidden className="link-arrow">↗</span>}
