import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface MaterialsUploadFieldProps {
  value?:
    | {
        name: string;
        type: "link" | "pdf" | "doc";
        url?: string;
        file?: File | null;
      }[]
    | null;
  onChange: (
    materials:
      | {
          name: string;
          type: "link" | "pdf" | "doc";
          url?: string;
          file?: File | null;
        }[]
      | null
  ) => void;
  error?: string;
  disabled?: boolean;
}

export default function MaterialsUploadField({
  value = null,
  onChange,
  error,
}: MaterialsUploadFieldProps) {
  const entries = value || [];
  const { t } = useTranslation();

  const ensureCurrent = () => {
    const idx = entries.length - 1;
    if (idx < 0) {
      const updated = [...entries, { name: "", type: "link" as const }];
      onChange(updated);
      return updated.length - 1;
    }
    return idx;
  };

  const handleRemoveEntry = (indexToRemove: number) => {
    const updated = entries.filter((_, index) => index !== indexToRemove);
    onChange(updated.length > 0 ? updated : null);
  };

  return (
    <div className="space-y-4">
      {/* Add Material Entry Controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Material Name */}
          <div className="space-y-2">
            <Label htmlFor="material-name" className="text-sm font-medium">
              {t("instructor.lessons.materialName")}
            </Label>
            <Input
              id="material-name"
              type="text"
              className="bg-white"
              placeholder={t("instructor.lessons.materialName")}
              onChange={(e) => {
                const idx = ensureCurrent();
                const updated = [...entries];
                updated[idx] = {
                  ...(updated[idx] || { type: "link" as const }),
                  name: e.target.value,
                } as {
                  name: string;
                  type: "link" | "pdf" | "doc";
                  url?: string;
                  file?: File | null;
                };
                onChange(updated);
              }}
            />
          </div>

          {/* Material Type */}
          <div className="space-y-2">
            <Label htmlFor="material-type" className="text-sm font-medium">
              {t("instructor.lessons.materialType")}
            </Label>
            <Select
              defaultValue="link"
              onValueChange={(nextType: "link" | "pdf" | "doc") => {
                const idx = ensureCurrent();
                const updated = [...entries];

                // ⚠️ DISABLED: Show warning for file types
                if (nextType !== "link") {
                  toast.info(t("instructor.lessons.fileUploadDisabledLinkOnly"));
                  return;
                }

                // Reset url/file when switching type
                updated[idx] = {
                  name: (updated[idx] && updated[idx].name) || "",
                  type: nextType,
                } as {
                  name: string;
                  type: "link" | "pdf" | "doc";
                  url?: string;
                  file?: File | null;
                };
                onChange(updated);
              }}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select material type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="pdf" disabled>
                  PDF (معطل مؤقتاً)
                </SelectItem>
                <SelectItem value="doc" disabled>
                  Document (معطل مؤقتاً)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Material Link */}
          {entries.length > 0 &&
            entries[entries.length - 1]?.type === "link" && (
              <div className="space-y-2">
                <Label htmlFor="material-link" className="text-sm font-medium">
                  {t("instructor.lessons.materialLink")}
                </Label>
                <Input
                  id="material-link"
                  type="text"
                  placeholder={t("instructor.lessons.materialLink")}
                  onChange={(e) => {
                    const idx = ensureCurrent();
                    const updated = [...entries];
                    updated[idx] = {
                      ...(updated[idx] || { type: "link" as const, name: "" }),
                      url: e.target.value,
                    } as {
                      name: string;
                      type: "link" | "pdf" | "doc";
                      url?: string;
                      file?: File | null;
                    };
                    onChange(updated);
                  }}
                />
              </div>
            )}
        </div>

        <Button
          type="button"
          variant="outline"
          className="bg-white"
          onClick={() => {
            const idx = ensureCurrent();
            const m = entries[idx];
            if (!m?.name || !m.type || (m.type === "link" ? !m.url : !m.file))
              return;
            // Start a new entry slot for next material
            onChange([...entries, { name: "", type: "link" }]);
          }}
        >
          {t("common.add")}
        </Button>
      </div>

      {/* Material Entries List */}
      {entries.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Materials:</h4>
          <div className="space-y-2">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">
                    {entry.type === "link" ? "🔗" : "📎"}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {entry.name || (entry.file ? entry.file.name : "")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {entry.type === "link"
                        ? entry.url
                        : "File upload disabled"}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEntry(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
