import { useTranslation } from "react-i18next";
interface ComponentProps {
 message : string | undefined;
}
export default function ErrorDesign({message}: ComponentProps){
    const {t} = useTranslation();
    return(
              <div> 
        <div className="w-full mt-8 p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-red-500 text-lg font-medium mb-4">
            {t("adminUser.Error loading users")}
          </div>
          <p className="text-gray-600 mb-6">
            {message || t("adminUser.Unknown error occurred")}
          </p>
        </div>
      </div>

    )
}