
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add the Google Fonts link to the document head
const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Plaster&family=Oswald:wght@300;400;500;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
