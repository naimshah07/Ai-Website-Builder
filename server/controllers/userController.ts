import{Request, Response} from 'express';
import prisma from '../lib/prisma.js';
import openai from '../configs/openai.js';
import Stripe from 'stripe'; 
  

//Get User Credits
export const getUserCredits = async (req: Request, res: Response) => {
    try {
       const userId = req.userId;
         if(!userId){
            return res.status(401).json({message: 'Unauthorized'});
        }   
        const user = await prisma.user.findUnique({
            where: {id: userId}
        });
        res.json({credits: user?.credits});
    } catch (error:any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller function to get create New Project
export const createUserProject = async (req: Request, res: Response) => {
     const userId = req.userId;

    try {
        const { initial_prompt } = req.body;

      console.log("========== CREATE PROJECT START =========="); 
      console.log("User ID:", userId);
      console.log("Prompt:", initial_prompt);
      console.log("API Key Loaded:", !!process.env.AI_API_KEY);


        if(!userId){
            return res.status(401).json({message: 'Unauthorized'});

        } 
        console.log("✅ User authenticated");

        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {credits: true}
        });
         

        if(!user || user.credits < 5){
            return res.status(403).json({message: 'Add credits to create more projects'});
        }

       console.log("✅ Credits verified:", user.credits);
        //Create a new project
        const project = await prisma.websiteProject.create({
            data: {
                name:initial_prompt.length > 50 ? initial_prompt.substring(0,47) + '...' : initial_prompt,
                initial_prompt,
                userId
            }
        });
      console.log("✅ Project created:", project.id);

        //Update User's Total Creation

        await prisma.user.update({
            where: {id: userId},
            data: {totalCreation: { increment: 1 }}
        });

        await prisma.conversation.create({
            data:{
                role: 'user',
                content: initial_prompt,
                projectId: project.id
            }
        })
       // Deduct credits 
        await prisma.user.update({
            where: {id: userId},
            data: {credits: { decrement: 5 }}
        })
       console.log("✅ Credits deducted");
      
       console.log("📤 Sending Project ID to frontend");
        res.json({projectId: project.id});

      console.log("🚀 Calling OpenRouter (Prompt Enhancement)...");
        //Enhace user prompt

        const promptEnhanceResponse = await openai.chat.completions.create({
            model: 'google/gemma-4-31b-it:free', 
            messages:[
                {
                    role: 'system',
                    content:`
                    You are a web design assistant.

Improve the user's website request into a concise, well-structured specification.

Include:
- Design style
- Color palette
- Main sections
- Important features
- Responsive design

Keep it under 150 words.

Return only the enhanced prompt.
` 
                },
                {
                    role: 'user',
                    content: initial_prompt
                }
            ]
        }) 

        const enhancedPrompt = promptEnhanceResponse.choices[0].message.content; 
      console.log("✅ Prompt Enhancement Completed");
      console.log("Enhanced Prompt:", enhancedPrompt);
        //Store enhanced prompt in conversation
        await prisma.conversation.create({
            data:{
                role: 'assistant',
                content: `I've enhanced your prompt to: "${enhancedPrompt}"`,
                projectId: project.id
            }
        })

        await prisma.conversation.create({
            data:{
                role: 'assistant',
                content: `Now generating your website...`,
                projectId: project.id
            }
        })

      console.log("🚀 Calling OpenRouter (Website Generation)...");

        // Generate website code 
        const codeGenerationResponse = await openai.chat.completions.create({
            model: 'google/gemma-4-31b-it:free',
          
            messages:[
                {
                    role: 'user',
                    content: `
                  You are an expert frontend developer.

Create a complete single-page website based on this request:

${enhancedPrompt}

Requirements:
- Return ONLY valid HTML.
- Use Tailwind CSS.
- Include:
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
inside the <head>.
- Make it responsive.
- Use modern UI.
- Add JavaScript inside a <script> tag if needed.
- Use https://placehold.co/600x400 for placeholder images.
- Do not use Markdown or code fences.` 
                }
            ]  
        });    
          
        const code = codeGenerationResponse.choices[0].message.content || '';
      console.log("✅ Website Generated");
console.log("Generated HTML Length:", code.length);

          if(!code){
           await prisma.conversation.create({
                data:{
                    role:'assistant',
                    content: 'Failed to generate revised code. Please try again.',
                    projectId:project.id
                }
            });
            await prisma.user.update({
                where:{id:userId},
                data:{credits:{increment:5}}
            });      
            return;
        }

        console.log("💾 Saving Version...");
        // Create Version for the project
        const version = await prisma.version.create({
            data:{
                code: code.replace(/```[a-z]*\n?/gi,'')
                .replace(/```$/g,'')
                .trim(),
                description: 'Initial version',
                projectId: project.id
            }
        })

        await prisma.conversation.create({
            data:{
                role: 'assistant',
                content: `Your website is ready! You can preview it and request any changes if needed.`,
                projectId: project.id
            },
        })

        await prisma.websiteProject.update({
            where: {id: project.id},
            data: {
                current_code: code.replace(/```[a-z]*\n?/gi,'')
                .replace(/```$/g,'')
                .trim(),
                current_version_index: version.id
            }
        })
      console.log("✅ Project Updated Successfully");
     console.log("========== CREATE PROJECT END ==========");

    } catch (error: any) {
    console.error("❌ CREATE PROJECT ERROR");
    console.error(error);

    if (userId) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                credits: {
                    increment: 5,
                },
            },
        }).catch(() => {});
    }

    if (!res.headersSent) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    return;
}
};

// Controller function to get A Single User Project

export const getUserProject = async (req: Request, res: Response) => {
    try {
       const userId = req.userId;
         if(!userId){
            return res.status(401).json({message: 'Unauthorized'});
        }   

        const{projectId} = req.params;
        const project = await prisma.websiteProject.findUnique({
            where: { id: projectId,userId },
            include: {
                conversation:{ 
                 orderBy: { timestamp:'asc' },
            },
             versions:{orderBy:{timestamp:'asc'}} 
        }
    })
        res.json({project});
    } catch (error:any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}
// Controller function to get All User Projects

export const getUserProjects = async (req: Request, res: Response) => {
    try {
       const userId = req.userId;
         if(!userId){
            return res.status(401).json({message: 'Unauthorized'});
        }   

        const projects = await prisma.websiteProject.findMany({
            where: {userId},        
            orderBy: { updatedAt:'desc' },
            })
        res.json({projects});
    } catch (error:any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller function to Toggle Project Publish 

export const togglePublish = async (req: Request, res: Response) => {
    try {
       const userId = req.userId;
         if(!userId){
            return res.status(401).json({message: 'Unauthorized'});
        }   
            
        const{projectId} = req.params;
        const project = await prisma.websiteProject.findUnique({
            where: { id: projectId,userId },
        });

        if(!project){
            return  res.status(404).json({message: 'Project not found'});
        }

        await prisma.websiteProject.update({
            where: { id: projectId },
            data: { isPublished: !project.isPublished }
        });

        res.json({message: project.isPublished ? 'Project Unpublished' : 'Project Published successfully'});
    } catch (error:any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller function to Purchase Credits
export const purchaseCredits = async (req: Request, res: Response) => {
    try {
        interface Plan{
            credits: number;
            amount: number;
        }

      const plans = {
            basic: { credits: 100, amount: 49 },
            pro: { credits: 400, amount: 99 },
            enterprise: { credits: 1000, amount: 199 }
        };

        const userId = req.userId;
        const {planId} = req.body as {planId: keyof typeof plans};
        const origin = req.headers.origin  as string;

        const plan : Plan = plans[planId];
        if(!plan){
            return res.status(404).json({message: 'Plan not found'});
        }

        const transaction = await prisma.transaction.create({
            data:{
                userId: userId!,
                planId : req.body.planId,
                amount: plan.amount,
                credits: plan.credits,
            }
        });

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string); 
      const user = await prisma.user.findUnique({
  where: { id: transaction.userId },
});

         const session = await stripe.checkout.sessions.create({
 success_url: `${origin}/loading`,
cancel_url: `${origin}`,
  customer_email: user?.email,  
  line_items: [
    {
      price_data: {
        currency: 'inr',
        product_data: {
            name: `AiSiteBuilder - ${plan.credits} credits`,
        },
        unit_amount: Math.floor(transaction.amount * 100),
      },
        quantity: 1,
    },
  ],
  mode: 'payment',
  metadata: {
    transactionId: transaction.id,
    appId: 'ai-site-builder',
  },
  expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minutes
});

     res.json({payment_link: session.url});
    } catch (error:any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
    
}






