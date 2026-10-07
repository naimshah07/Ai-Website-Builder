import logo from './logo.svg';

export const assets = {
    logo,
};

export const appPlans = [
        {
            id: 'basic',
            name: 'Basic',
            price: '₹49',
            credits: 100,
            description: 'Start Now, scale up as you grow.',
            features: ['Upto 20 Creations', 'Limited Revisions', 'Basic AI Models', 'email support', 'Basic analytics',],
        },
        {
            id: 'pro',
            name: 'Pro',
            price: '₹99',
            credits: 400,
            description: 'Add credits to create more projects',
            features: ['Upto 80 Creations', 'Extended Revisions', 'Advanced AI Models', 'priority email support', 'Advanced analytics',],
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: '₹199',
            credits: 1000,
            description: 'Add credits to create more projects',
            features: ['Upto 200 Creations', 'Increased Revisions', 'Advanced AI Models', 'email + chat support', 'Advanced analytics',],
        }
    ]


export const dummyConversations = [
    { id: '055f7c60-a693-4ce7-aa4d-475fa8cd0402', role: 'assistant', content: 'Now making changes to your website...', timestamp: '2025-11-14 10:23:43.837', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '28ce7e5e-e080-472a-a468-ea9bce893b91', role: 'assistant', content: "I've made the changes to your website! You can now preview it", timestamp: '2025-11-14 10:51:14.997', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '3953a4c5-cc96-40c2-9ba3-b1730e34e550', role: 'assistant', content:     'I\'ve enhanced your prompt to: "Create a responsive pricing table with three columns (Basic, Pro, Enterprise) on the homepage featuring monthly/yearly toggle functionality, using a clean white background with teal accent colors (#008B8B), proper 20px spacing between rows, and clear call-to-action buttons."', timestamp: '2025-11-20 09:07:18.779', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f', },
    { id: '3f66928e-582b-4f59-9233-8e40798ac0bd', role: 'assistant', content: "I've made the changes to your website! You can now preview it", timestamp: '2025-11-20 09:45:26.043', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '4fe1ebb4-39ae-4fb6-8773-48d9e997e0a7', role: 'assistant', content: "I've made the changes to your website! You can now preview it", timestamp: '2025-11-14 11:35:36.175', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '53c43430-8c49-49bc-ad7f-4b70342faeda', role: 'assistant', content:     'I\'ve enhanced your prompt to: "Create a call-to-action section above the footer with a headline, descriptive text, and two styled buttons (primary and secondary) using brand colors, specific padding (16px top/bottom, 32px left/right for primary button), rounded corners (8px), and a light gray background (#F5F5F5) with proper spacing (40px margin to footer)."', timestamp: '2025-11-14 10:23:42.554', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f', },
    { id: '565cb8cd-946b-49fa-bc28-5959a24be0c0', role: 'user', content: 'add a pricing table ', timestamp: '2025-11-20 09:07:02.751', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '605df07c-b20f-4485-aaba-176b483620fc', role: 'assistant', content:     'I\'ve enhanced your prompt to: "Create a modern, responsive navbar with a clean, minimalist design featuring a fixed position at the top of the page. Use a light background (#ffffff) with subtle shadow for depth, and dark gray text (#333333) that transitions to a deeper gray (#000000) on hover. The navbar should include a centered logo on the left with a sans-serif font (Roboto, 24px, medium weight), navigation links aligned to the right using Lato font (16px, regular weight) with proper letter spacing. Implement smooth hover animations with a subtle color transition and an underline effect that appears on hover. Include a mobile-responsive hamburger menu with three horizontal bars that transforms into an X when clicked, revealing a dropdown navigation overlay. The navbar should be fully accessible with proper ARIA labels, maintain visual hierarchy through consistent spacing, and be optimized for all screen sizes with breakpoints at 768px and 1024px."', timestamp: '2025-11-14 10:02:10.183', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f', },
    { id: '6230688b-acbf-4a12-9eba-37f3957d737e', role: 'assistant', content: "I've made the changes to your website! You can now preview it", timestamp: '2025-11-20 09:11:24.117', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '65624014-56ed-482b-b071-00c798418faf', role: 'assistant', content: 'Now making changes to your website...', timestamp: '2025-11-14 10:46:07.615', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '6857e34e-1108-4dea-8ff4-4497ad1ee3dd', role: 'assistant', content: "I've made the changes to your website! You can now preview it", timestamp: '2025-11-14 11:02:07.881', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '794c2e21-9be5-40d8-bac3-4648fdff5e7b', role: 'assistant', content: 'I\'ve enhanced your prompt to: "Add a responsive footer section at the bottom of the website with a dark background (#2C3E50), white text, and 30px padding, including three columns for company information, quick links, and contact details with 20px spacing between elements."', timestamp: '2025-11-14 10:16:22.02', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f', },
    { id: '7952d18e-1ebc-4389-a40b-09054a65aac9', role: 'assistant', content: "I've created your website! You can now preview it and request any changes.", timestamp: '2025-11-14 10:08:05.026', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '8bb6d934-a012-436a-a28a-2414301e81dd', role: 'assistant', content:     'I\'ve enhanced your prompt to: "Add a full-viewport hero section at the top of the homepage with a centered headline (48px, #2c3e50), supporting subheading (24px, #7f8c8d), and a primary CTA button (blue background, white text, 16px padding), all with proper spacing and responsive behavior."', timestamp: '2025-11-14 10:59:49.772', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f', },
    { id: '90fbb8cc-4375-43f0-80a9-8d7ea08c72ea', role: 'user', content: 'add a footer also ', timestamp: '2025-11-14 10:16:14.891', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '92a5540d-4494-4add-9dda-1601ed6b025f', role: 'user', content: 'instead of placeholders use real images', timestamp: '2025-11-14 10:45:57.093', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '92e41907-2118-46dc-a45e-ab1ca2c0bb4a', role: 'assistant', content: 'Now making changes to your website...', timestamp: '2025-11-20 09:41:34.075', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '97f5c728-03dc-43af-a543-876d515c0f23', role: 'assistant', content: 'I\'ve enhanced your prompt to: "Update the pricing table by changing the header background, button backgrounds, and border accents to indigo (#4B0082), ensuring proper contrast with text elements while maintaining consistent 8px padding throughout the table structure."', timestamp: '2025-11-20 09:41:33.02', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f', },
    { id: '995e8858-0935-49d7-8e2f-4d1e3d35f87e', role: 'assistant', content: 'now generating your website...', timestamp: '2025-11-14 10:02:10.432', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: '9ab8b847-c0ae-488b-b49e-3ff770ff7354', role: 'assistant', content: 'Now making changes to your website...', timestamp: '2025-11-20 09:07:19.806', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'b130d968-8cbb-4b51-a7b0-7e5c01ea746a', role: 'user', content: 'make this site more modern', timestamp: '2025-11-14 11:31:38.157', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'b29cc47a-2b4e-4443-b9b1-9823669f915d', role: 'assistant', content:     'I\'ve enhanced your prompt to: "Update the website\'s visual design with a modern aesthetic by implementing a clean color palette with primary accent colors, increasing whitespace between elements, using contemporary typography with proper hierarchy, and ensuring responsive layouts across all device breakpoints. Focus on simplifying navigation, incorporating subtle micro-interactions on interactive elements, and optimizing the overall user experience with intuitive minimalism."', timestamp: '2025-11-14 11:31:50.553', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f', },
    { id: 'c19047b0-b6bf-4bc4-a2e3-df306f50f66c', role: 'assistant', content: 'Now making changes to your website...', timestamp: '2025-11-14 11:31:51.332', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'c411a5f1-167d-4709-881d-23d5a6dc629b', role: 'user', content: 'make pricing table primary color indigo', timestamp: '2025-11-20 09:41:13.996', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'cacb673b-b69d-493b-9358-0b5f25246abc', role: 'user', content: 'create a simple navbar\n', timestamp: '2025-11-14 10:01:42.263', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'cfd43030-fbf7-460f-8011-b241ad88a80c', role: 'assistant', content: "I've made the changes to your website! You can now preview it", timestamp: '2025-11-14 10:17:13.773', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'd20a1d92-3fa3-4983-833d-71ccba6b8fd9', role: 'user', content: 'add a hero section', timestamp: '2025-11-14 10:59:40.343', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'd4d2f65e-ba89-46f0-aaa9-1ba8d8002b27', role: 'assistant', content:     'I\'ve enhanced your prompt to: "Replace all placeholder images throughout the website with high-resolution, contextually appropriate real images that match the brand aesthetic, ensuring proper sizing with maintained aspect ratios and responsive optimization across all device breakpoints."', timestamp: '2025-11-14 10:46:07.367', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f', },
    { id: 'd8ea0ad4-2deb-4ba0-aa99-6dd4d64c4293', role: 'assistant', content: 'Now making changes to your website...', timestamp: '2025-11-14 10:16:22.79', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'e060a86d-e1a6-4bea-a1f8-563be7439e0d', role: 'assistant', content: "I've made the changes to your website! You can now preview it", timestamp: '2025-11-14 10:24:42.967', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'e4794880-930b-4cbd-928c-fed981fdebe9', role: 'user', content: 'create a cta section before footer', timestamp: '2025-11-14 10:22:55.409', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
    { id: 'ec1d0622-a904-4227-89c8-47300c4cf28e', role: 'assistant', content: 'Now making changes to your website...', timestamp: '2025-11-14 10:59:50.031', projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f' },
];

export const dummyVersion = [
    {
     id: 'zyx',
     code: '',
     description: 'code updated',
     timestamp: '2025-11-14 10:51:14.997',
     projectId: '6cd61d42-04e3-433f-9fcc-aba884e4115f'
    }
]

export const iframeScript = `
        <style id="ai-preview-style">
        .ai-selected-element {
            outline: 2px solid #6366f1 !important;
        }
        </style>
        <script id="ai-preview-script">
        (function () {
            // If this HTML is opened directly (not in an iframe), do nothing.
            if (window === window.parent) {
            return;
            }

            let selectedElement = null;

            function clearSelected() {
            if (selectedElement) {
                selectedElement.classList.remove('ai-selected-element');
                selectedElement.removeAttribute('data-ai-selected');
                selectedElement.style.outline = '';
                selectedElement = null;
            }
            }

            document.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            clearSelected();

            const target = e.target;

            // Don't select body or html
            if (!target || target.tagName === 'BODY' || target.tagName === 'HTML') {
                window.parent.postMessage({ type: 'CLEAR_SELECTION' }, '*');
                return;
            }

            selectedElement = target;
            selectedElement.classList.add('ai-selected-element');
            selectedElement.setAttribute('data-ai-selected', 'true');

            const computedStyle = window.getComputedStyle(selectedElement);

            window.parent.postMessage({
                type: 'ELEMENT_SELECTED',
                payload: {
                tagName: selectedElement.tagName,
                className: selectedElement.className,
                text: selectedElement.innerText,
                styles: {
                    padding: computedStyle.padding,
                    margin: computedStyle.margin,
                    backgroundColor: computedStyle.backgroundColor,
                    color: computedStyle.color,
                    fontSize: computedStyle.fontSize
                }
                }
            }, '*');
            });

            window.addEventListener('message', function (event) {
            if (event.data.type === 'UPDATE_ELEMENT' && selectedElement) {
                const updates = event.data.payload;

                if (updates.className !== undefined) {
                selectedElement.className = updates.className;
                }

                if (updates.text !== undefined) {
                selectedElement.innerText = updates.text;
                }

                if (updates.styles) {
                Object.assign(selectedElement.style, updates.styles);
                }
            } else if (event.data.type === 'CLEAR_SELECTION_REQUEST') {
                clearSelected();

                // extra safety: remove our class + outline from any stray elements
                document.querySelectorAll('.ai-selected-element,[data-ai-selected]').forEach(function (el) {
                el.classList.remove('ai-selected-element');
                el.removeAttribute('data-ai-selected');
                el.style.outline = '';
                });
            }
            });
        })();
        </script>
`;
