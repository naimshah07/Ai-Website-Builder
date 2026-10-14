import { Loader2Icon } from "lucide-react"
import { useEffect } from "react"

const Loading = () => {
useEffect(() => {
    setTimeout(()=> {
        // Redirect to another page after 2 seconds
        window.location.href = '/';
    },6000)
}, []); 
    


  return (
    <div className='h-screen flex flex-col'>
        <div className='flex items-center justify-center flex-1'>
            <Loader2Icon className=" size-7 animate-spin h-8 w-8 text-primary" />
        </div>
    </div>
  )
}

export default Loading
