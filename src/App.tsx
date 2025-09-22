import AppRoutes from "./routes/AppRoutes";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useLanguage } from "./hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { queryClient } from "./lib/query-keys";


function App() {
  // Initialize language and direction handling
  useLanguage();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster
          position="top-center"
          duration={2000}
          closeButton
          richColors
          dir={isRTL ? "rtl" : "ltr"}
          toastOptions={{
            style: {
              direction: isRTL ? "rtl" : "ltr",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
