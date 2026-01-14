import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (import.meta.env.VITE_ENABLE_ANALYTICS === "true") {
  const script = document.createElement("script");
  script.async = true;
  script.src = import.meta.env.VITE_UMAMI_SCRIPT_URL;
  script.setAttribute(
    "data-website-id",
    import.meta.env.VITE_UMAMI_WEBSITE_ID
  );
  document.head.appendChild(script);
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
