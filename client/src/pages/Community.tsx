import { useEffect, useEffectEvent, useState } from 'react';
import type { Project } from '../types';
import { Loader2Icon, PlusIcon} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import api from '@/configs/axios';
import { getErrorMessage } from '@/lib/utils';

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const fetchProjects = useEffectEvent(async () => {
    try {
       const {data} = await api.get('/api/project/published');
       setProjects(data.projects);
       setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    setLoading(false);
    }
  });
   useEffect(() => {
    void fetchProjects();
   }, []);
  return (
    <>
    <div className="px-4 md:px-16 lg:px-24 xl:px-32 min-h-screen">
      {loading ? (
        /* Loader */
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loader2Icon className="animate-spin size-10 text-indigo-400" />
        </div>
      ) : projects.length > 0 ? (
        /* Projects List */
        <div className="py-10 min-h-[80vh]">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-2xl font-medium text-white">
              Published Projects
            </h1>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
            {projects.map((project) => (
              <Link key={project.id} to={`/view/${project.id}`} target="_blank" className="relative group w-full max-w-[18rem] h-full flex flex-col max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-indigo-700/30 hover:border-indigo-800/80 transition-all duration-300">
                {/* Preview */}
                <div className="relative w-full h-40 bg-gray-900 overflow-hidden border-b border-gray-800">
                  {project.current_code ? (
                    <iframe
                      srcDoc={project.current_code}
                      className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none"
                      sandbox="allow-scripts allow-same-origin"
                      style={{ transform: 'scale(0.25)' }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No Preview Available
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 text-white bg-gradient-to-b from-transparent via-gray-900/80 to-gray-900 flex flex-col flex-1">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium line-clamp-2">
                      {project.name}
                    </h2>

                    <span className="px-2.5 py-0.5 ml-2 text-xs bg-gray-800 border border-gray-700 rounded-full">
                      Website
                    </span>
                  </div>

                  <p className="text-gray-400 mt-1 text-sm line-clamp-2">
                    {project.initial_prompt}
                  </p>
                  <div className='flex justify-between items-center mt-6'>
                     <span className='text-xs text-gray-500'>{new Date(project.createdAt).toLocaleDateString()}</span>
                     <div className='flex gap-3 text-white text-sm'>
                      <button className='px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md transition-colors flex items-center gap-2'>
                        <span className='bg-gray-200 size-4.5 rounded-full text-black font-semibold flex items-center justify-center'>{project.user?.name?.slice(0,1)}</span>
                        {project.user?.name}
                      </button>
                     </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h2 className="text-3xl font-semibold text-gray-200">
            You have no projects yet!
          </h2>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mt-6 text-white px-6 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all"
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


export default Community
