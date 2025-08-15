import React, { useState, useRef } from "react";
import { ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ImageUploadFieldProps {
  value?: File | string;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export default function ImageUploadField({
  value,
  onChange,
  error,
  disabled = false,
}: ImageUploadFieldProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  // Create preview URL when file is selected
  React.useEffect(() => {
    if (value instanceof File) {
      const previewUrl = URL.createObjectURL(value);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else if (typeof value === "string" && value) {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert(t("instructor.upload.pleaseSelectImageFile"));
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert(t("instructor.upload.fileSizeImageError"));
      return;
    }

    onChange(file);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (!disabled) {
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (preview) {
    return (
      <div className="relative">
        <div className="relative group">
          <img
            src={preview}
            alt="Course thumbnail preview"
            className="w-full h-[400px] object-contain rounded-lg border-2 border-gray-200"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-4 h-[400px] bg-white
          flex flex-col items-center justify-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${
            dragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${error ? "border-red-300 bg-red-50" : ""}
        `}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="text-center space-y-2 ">
          <div className="mx-auto size-16 bg-gray-100 rounded-full flex items-center justify-center">
            <ImageIcon className="size-8 text-gray-400" />
          </div>

          <div className="space-y-1">
            <p className=" font-medium text-gray-900">
              {t("instructor.upload.thumbnailTitle")}
            </p>
            <p className=" text-gray-400">
              {t("instructor.upload.imageFileTypes")}
            </p>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
