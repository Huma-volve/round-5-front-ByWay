import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "./hooks/useLanguage";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

function App() {
  // Initialize language and direction handling
  useLanguage();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

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
          rtl={isRTL}
          className={isRTL ? "toast-container-rtl" : "toast-container-ltr"}
          toastClassName={isRTL ? "toast-rtl" : "toast-ltr"}
          style={{
            direction: isRTL ? "rtl" : "ltr",
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
