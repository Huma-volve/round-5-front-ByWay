import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Slide } from "react-toastify";


const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          transition={Slide}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
