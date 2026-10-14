import { CircleIcon, ScanLineIcon, SquareIcon, TriangleIcon } from "lucide-react"
import { useEffect, useState } from "react";

const steps = [
    {icon:ScanLineIcon,label:'Analyzing your request...'},
    {icon:SquareIcon,label:'Generating layout structure...'},
    {icon:TriangleIcon,label:'Assembling UI components...'},
    {icon:CircleIcon,label:'Finalizing your website...'},
] 

const STEP_DURATION = 40000; // 40 seconds per step

const LoaderSteps = () => {

    const[current,setCurrent] = useState(0);
        
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((s) => (s + 1) % steps.length);
        }, STEP_DURATION);

        return () => clearInterval(interval);
    }, []);


    const Icon = steps[current].icon;


  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background
     relative overflow-hidden text-foreground">
      <div className="absolute inset-0 bg-linear-to-tr from-primary/10
       via-accent/10 to-primary/5 blur-3xl animate-pulse"></div>
        <div className="relative z-10 w-32 h-32 flex items-center justify-center"> 
            <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-30"/>
            <div className="absolute inset-0 rounded-full border border-accent/40"/>
            <Icon className="w-8 h-8 text-primary opacity-80 animate-bounce"/>
        </div>
           {/* {Step Label - fade using transition only} */}
           <p key={current} className="mt-8 text-lg font-light text-foreground/90 tracking-wide
           transition-all duration-700 ease-in-out opacity-100">
            {steps[current].label}
           </p>

           <p className="text-xs text-muted-foreground mt-2 transition-opacity duration-700 opacity-100">
            This may take a few moments. Thank you for your patience!
           </p>
       </div>
  )
}

export default LoaderSteps
