import{CustomSoftware}from"../components/home/custom-software";
import{DemosShowcase}from"../components/home/demos-showcase";
import{Hero}from"../components/home/hero";
import{Pricing}from"../components/home/pricing";
import{ProductFamilies}from"../components/home/product-families";
import{FinalCta,ProblemSolution,Process}from"../components/home/sections";
import{SiteFooter}from"../components/layout/site-footer";
import{SiteHeader}from"../components/layout/site-header";

export default function HomePage(){return <><SiteHeader/><main><Hero/><ProblemSolution/><ProductFamilies/><DemosShowcase/><Process/><CustomSoftware/><Pricing/><FinalCta/></main><SiteFooter/></>}
