import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/configs/axios";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const MyProjects = () => {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const deleteProject = async (projectId: string) => {
    try {
       const confirm = window.confirm('Are you sure you want to delete this project?');
       if(!confirm) return;
       await api.delete(`/api/project/${projectId}`);
       toast.success('Project deleted successfully');
       fetchProjects();
    } catch (error:any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }


  };



 const fetchProjects = async () => {
    try {
       const {data} = await api.get('/api/user/projects');
       setProjects(data.projects);
       setLoading(false);
    } catch (error:any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  
 }
 useEffect(() => {
  if (isPending) return;

  if (session?.user) {
    fetchProjects();
  } else {
    toast.error('Please login to view your projects');
    navigate('/auth/signin');
  }
}, [session?.user, isPending]);

    // useEffect(() => {
    //   if(session?.user && !isPending) {
    //     fetchProjects()
    //   }else if(!isPending === false && !session?.user) {
    //     navigate('Please login to view your projects.');
    //   }
    // },[session?.user]);
  return (
    <>
      <div className="px-4 md:px-16 lg:px-24 xl:px-32 min-h-screen">
        {loading ? (
          /* Loader */
          <div className="flex items-center justify-center min-h-[80vh]">
            <Loader2Icon className="animate-spin size-10 text-primary" />
          </div>
        ) : projects.length > 0 ? (
          /* Projects List */
          <div className="py-10 min-h-[80vh]">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-2xl font-semibold text-foreground">My Projects</h1>

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-primary-foreground px-6 py-2 rounded bg-gradient-to-br from-primary to-primary/85 hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                <PlusIcon size={18} />
                Create New
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
              {projects.map((project) => (
                <div
                  onClick={() => navigate(`/projects/${project.id}`)}
                  key={project.id}
                  className="relative group w-full max-w-[18rem] h-full flex flex-col max-sm:mx-auto cursor-pointer bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-primary/30 hover:border-primary/60 transition-all duration-300"
                >
                  {/* Preview */}
                  <div className="relative w-full h-40 bg-muted overflow-hidden border-b border-border">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none scale-[0.22] sm:scale-[0.25]"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No Preview Available
                      </div>
                    )}

                    <TrashIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="absolute top-3 right-3 z-20 scale-0 group-hover:scale-100 bg-background p-1.5 size-7 rounded text-destructive cursor-pointer shadow hover:scale-110 transition-all duration-200"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4 text-foreground bg-gradient-to-b from-transparent via-card/80 to-card flex flex-col flex-1">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium line-clamp-2">
                        {project.name}
                      </h2>

                      <span className="px-2.5 py-0.5 ml-2 text-xs bg-muted border border-border rounded-full">
                        Website
                      </span>  
                    </div>

                    <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                      {project.initial_prompt}
                    </p>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-between items-center mt-6"
                    >
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex flex-wrap gap-2 text-foreground text-xs sm:text-sm">
                        <button
                          onClick={() => navigate(`/preview/${project.id}`)}
                          className="px-2 sm:px-3 py-1.5 bg-foreground/10 hover:bg-foreground/15 rounded-md transition-all"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="px-2 sm:px-3 py-1.5 bg-foreground/10 hover:bg-foreground/15 rounded-md transition-all"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h2 className="text-3xl font-semibold text-foreground/80">
              You have no projects yet!
            </h2>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 mt-6 text-primary-foreground px-6 py-2 rounded-md bg-primary hover:bg-primary/90 active:scale-95 transition-all shadow-md"
            >
              <PlusIcon size={18} />
              Create New
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProjects;
