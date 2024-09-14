import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
<ThemeProvider>
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      <AppContextProvider>
    
       <App />
      </AppContextProvider>
     </QueryClientProvider>
  </React.StrictMode>
</ThemeProvider>,
);

    
  