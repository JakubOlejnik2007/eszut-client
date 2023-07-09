import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/AuthWrapper";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {


  

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthWrapper />
        </BrowserRouter>
        <ToastContainer role='alert' />
      </QueryClientProvider>
    </div>
  );
}

export default App;
