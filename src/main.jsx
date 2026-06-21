import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App";
import "./index.css";

//co
import { AlignJustify } from "lucide-react";



createRoot(document.getElementById("root")).render(
  
 
 


  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);