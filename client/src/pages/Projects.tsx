import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  ArrowBigDownDashIcon,
  EyeIcon,
  EyeOffIcon,
  FullscreenIcon,
  LaptopIcon,
  Loader2Icon,
  MessageSquareIcon,
  SaveIcon,
  SmartphoneIcon,
  TabletIcon,
  XIcon,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import api from "@/configs/axios";
import ProjectPreview, {
  type ProjectPreviewRef,
} from "../components/ProjectPreview";
import { toast } from "sonner";
import { authClient} from "@/lib/auth-client";                     

const Projects = () => {
  const {projectId} = useParams();
  const navigate = useNavigate();
  
  const{data: session,isPending} = authClient.useSession();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [isGenerating, setIsGenerating] = useState(true);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const previewRef = useRef<ProjectPreviewRef>(null);

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${projectId}`);
      setProject(data.project);
      setIsGenerating(data.project.current_code ? false : true);
      setLoading(false);
    } catch (error:any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
      setLoading(false);
      navigate("/projects");
    }
  }
  const saveProject = async () => {
    if(!previewRef.current) return;
    const code = previewRef.current.getCode();
    if(!code) return;
    setIsSaving(true);
    try {
      const { data } = await api.put(`/api/project/save/${projectId}`,{code});
      toast.success(data.message);
    } catch (error:any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };


  // Download the code (index.html) from the iframe
  const downloadCode = async () => {
    const code = previewRef.current?.getCode() || project?.current_code;
    if (!code) {
      if (isGenerating) {
        return;
      }
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();
  };

  const togglePublish = async () => {
    try {
      const { data } = await api.get(`/api/user/publish-toggle/${projectId}`);
      toast.success(data.message);
      setProject((prev) => prev ? {...prev, isPublished: !prev.isPublished} : null);
    } catch (error:any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
    
  };

  useEffect(()=> {
    if(session?.user){
      fetchProject();
    }else if(!isPending && !session?.user){
      navigate('/');
      toast('Please sign in to access your projects');
    }
  }, [session?.user]);

  useEffect(() => {
    if(project && !project.current_code){
      const intervalId = setInterval(fetchProject, 10000);
      return () => clearInterval(intervalId);
    }
  }, [project]);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="size-10 animate-spin text-primary" />
        </div>
      </>
    );
  }

  return project ? (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      {/* {builder nav} */}
      <div className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-2 no-scrollbar">
        {/* left col */}
        <div className="flex items-center gap-2 sm:min-w-90 text-nowrap">
          <img
            src="/favicon.svg"
            alt="logo"
            className="h-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div>
            <p className="text-sm text-medium capitalize truncate">
              {project.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Previewing last saved version
            </p>
          </div>
          <div className="sm:hidden flex-1 flex justify-end">
            {isMenuOpen ? (
              <MessageSquareIcon
                onClick={() => setIsMenuOpen(false)}
                className="size-6 cursor-pointer"
              />
            ) : (
              <XIcon
                onClick={() => setIsMenuOpen(true)}
                className="size-6 cursor-pointer"
              />
            )}
          </div>
        </div>
    {/* center col */}
<div className="hidden sm:flex gap-2 bg-card p-1.5 rounded-md border border-border">

  {/* Phone */}
  <div className="relative group">
    <SmartphoneIcon
      onClick={() => setDevice("phone")}
      className={`size-6 p-1 rounded cursor-pointer transition ${
        device === "phone" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    />
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                     opacity-0 group-hover:opacity-100
                     bg-muted text-xs text-foreground px-2 py-1 rounded
                     transition-all duration-200 pointer-events-none">
      Phone
    </span>
  </div>

  {/* Tablet */}
  <div className="relative group">
    <TabletIcon
      onClick={() => setDevice("tablet")}
      className={`size-6 p-1 rounded cursor-pointer transition ${
        device === "tablet" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    />
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                     opacity-0 group-hover:opacity-100
                     bg-muted text-xs text-foreground px-2 py-1 rounded
                     transition-all duration-200 pointer-events-none">
      Tablet
    </span>
  </div>

  {/* Desktop */}
  <div className="relative group">
    <LaptopIcon
      onClick={() => setDevice("desktop")}
      className={`size-6 p-1 rounded cursor-pointer transition ${
        device === "desktop" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    />
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                     opacity-0 group-hover:opacity-100
                     bg-muted text-xs text-foreground px-2 py-1 rounded
                     transition-all duration-200 pointer-events-none">
      Desktop
    </span>
  </div>

</div>

        {/* right col */}
        <div className="flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm">
          <button
            onClick={saveProject}
            disabled={isSaving}
            className="max-sm:hidden bg-card hover:bg-muted text-foreground px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-border"
          >
            {isSaving ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : (
              <SaveIcon size={16} />
            )}{" "}
            Save
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/preview/${projectId}`, "_blank");
            }}
            className="flex items-center gap-2 px-4 py-1 rounded sm:rounded-sm border border-border hover:border-primary/60 transition-colors"
          >
            <FullscreenIcon size={16} />
            Preview
          </button>

          {/* <Link target='_blank' to={`/preview/${projectId}`} className='flex items-center gap-2 px-4 py-1 rounded sm:rounded-sm border border-gray-700 hover:border-gray-500 transition-colors'>
           <FullscreenIcon size={16} /> Preview
         </Link> */}
          <button
            onClick={downloadCode}
            className="bg-linear-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors shadow-md"
          >
            <ArrowBigDownDashIcon size={16} /> Download
          </button>
          <button
            onClick={togglePublish}
            className="bg-linear-to-br from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors shadow-md"
          >
            {project.isPublished ? (
              <EyeOffIcon size={16} />
            ) : (
              <EyeIcon size={16} />
            )}
            {project.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
      <div className="flex-1 flex overflow-auto">
        <Sidebar
          isMenuOpen={isMenuOpen}
          project={project}
          setProject={(p) => setProject(p)}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        <div className="flex-1 p-2 pl-0">
          <ProjectPreview
            ref={previewRef}
            project={project}
            isGenerating={isGenerating}
            device={device}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-medium text-foreground/70">
        Unable to load the project🫠
      </p>
    </div>
  );
};

export default Projects;







