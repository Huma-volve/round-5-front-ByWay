import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function AuthRoleSelect({ value, onChange }: any) {
  const { t } = useTranslation();

  return (
    <Select
      value={value}
      onValueChange={(val) => {
        onChange({ target: { name: "role", value: val } }); // mimic Formik event
      }}
    >
      <SelectTrigger className="lg:w-[180px]">
        <SelectValue placeholder={t("auth.selectRole")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("auth.role")}</SelectLabel>
          <SelectItem value="learner">{t("auth.learner")}</SelectItem>
          <SelectItem value="instructor">{t("auth.instructor")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
