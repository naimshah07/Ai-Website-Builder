import {useState,forwardRef, useRef, useEffect, useImperativeHandle} from 'react'
import type{ Project } from '../types';
import { iframeScript } from '../assets/assets';
import EditorPanel from '../components/EditorPanel';
import LoaderSteps from './LoaderSteps';

interface ProjectPreviewProps {
  project: Project;
  isGenerating: boolean;
  device?: 'phone' | 'tablet' | 'desktop';
  showEditorPanel?: boolean;
}

export interface ProjectPreviewRef {
  getCode: ()=> string|undefined;
}


const ProjectPreview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>
(({project,isGenerating, device = 'desktop',showEditorPanel = true}, ref) => {
    
   const iframeRef = useRef<HTMLIFrameElement>(null) 
   const[selectedElement, setSelectedElement] = useState<any>(null);


   const resolutions ={
    phone:'w-[412px]',
    tablet:'w-[768px]',
    desktop:'w-full'
   }
      useImperativeHandle(ref, () => ({
        getCode: () => {
          const doc = iframeRef.current?.contentDocument;
          if(!doc) return undefined;
          // 1 . Remove our selection classes/attributes/outlines from all elements
           doc.querySelectorAll('.ai-selected-element,[data-ai-selected]').forEach
           ((el) => {
            el.classList.remove('ai-selected-element');
            el.removeAttribute('data-ai-selected');
            (el as HTMLElement).style.outline = '';
           }) 
            // 2. Return the cleaned up HTML + script from the document
              const previewStyle = doc.getElementById('ai-preview-styles');
              if(previewStyle) previewStyle.remove();
              
              const previewScript = doc.getElementById('ai-preview-script');
              if(previewScript) previewScript.remove();

            // 3. Serialize cleaned up HTML  

            const html = doc.documentElement.outerHTML;
            return html;
             
        }
      }), [project.current_code]);  

    useEffect(() => {
      const handleMessage = (event: MessageEvent) => { 
        if (event.data && event.data.type === 'ELEMENT_SELECTED') {
          setSelectedElement(event.data.payload);
        } else if(event.data && event.data.type === 'CLEAR SELECTION'){
          setSelectedElement(null);
        }
      }      
      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    },[]);

    const handleUpdate = (updates:any) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type:'UPDATE_ELEMENT',
          payload:updates 
        }, '*');
      }
    }; 



     const injectPreview = (html?: string) => {
      if (!html) return '';
      if (!showEditorPanel) return html;

      if (html.includes('</body>')) {
        return html.replace('</body>', iframeScript + '</body>');
      }

      return html + iframeScript;
    };

  return (
    <div className='relative h-full bg-card flex-1 rounded-xl overflow-hidden max-sm:ml-2'>
        {project.current_code ? (
          <>
          <iframe
          ref={iframeRef}
          srcDoc={injectPreview(project.current_code)}
          className={`h-full max-sm:w-full ${resolutions[device]} mx-auto transition-all`}
          />
            {showEditorPanel && selectedElement && (
              <EditorPanel selectedElement={selectedElement} 
              onUpdate={handleUpdate} onClose={() => 
                {setSelectedElement(null);
                  if(iframeRef.current?.contentWindow){
                    iframeRef.current.contentWindow.postMessage({type:'CLEAR SELECTION_REQUEST'}, '*');
                  }

                }} />
            )}
          </> 
        ) : isGenerating && (
            <LoaderSteps/>    
     )} 
      
    </div>
  )
})

export default ProjectPreview
