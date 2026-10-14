import api from '@/configs/axios';
import { authClient } from '@/lib/auth-client';
import { Loader2Icon } from 'lucide-react';
import  {useNavigate} from 'react-router-dom';
import React, { useState } from 'react'
import { toast } from 'sonner';

const Home = () => {

  const{data: session} = authClient.useSession();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const[loading, setLoading] = useState(false);
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if(!session?.user){
        return toast.error('Please sign in to create a project');
      }else if(!input.trim()){
        return toast.error('Please enter a prompt');
    }
    setLoading(true);
    const {data} = await api.post('/api/user/project',{initial_prompt: input});
    setLoading(false);
    navigate(`/projects/${data.projectId}`);
    } catch (error:any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);

    }
  } 
  return (

      <section className="flex flex-col items-center text-foreground text-sm pb-20 px-4 font-poppins">
         

        <a className="flex items-center gap-2 border border-border rounded-full p-1 pr-3 text-sm mt-20">
          <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">Coming Soon</span>
          <p className="flex items-center gap-2">
            <span>New AI features</span>
            {/* <svg className="mt-px" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> */}
          </p>
        </a>

        <h1 className="text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-3xl">
          Turn thoughts into websites instantly, with AI.
        </h1>

        <p className="text-center text-base max-w-md mt-2 text-muted-foreground"> 
          Create, customize and present faster than ever with intelligent design powered by AI Site Builder.
        </p>

        <form onSubmit={onSubmitHandler} className="bg-card max-w-2xl w-full rounded-xl p-4 mt-10 border border-primary/40 focus-within:ring-2 ring-primary transition-all shadow-lg">
          <textarea onChange={e => setInput(e.target.value)} className="bg-transparent outline-none text-foreground resize-none w-full placeholder:text-muted-foreground" rows={4} placeholder="Describe your project idea in detail…" required />
          <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-primary-foreground rounded-md px-4 py-2 shadow-md">
            {
              loading ?(
                <>
                Creating <Loader2Icon className="animate-spin size-4"  />
                </>
              ) : 'Create with AI'
            }
          </button>
        </form>

        {/* <div className="flex flex-wrap items-center justify-center gap-16 md:gap-20 mx-auto mt-16">
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" alt="" />
        </div> */}
      </section>
  )
}
export default Home

