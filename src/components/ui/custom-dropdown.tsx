import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

// Custom Dropdown Component
interface CustomDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: { value: string; labelKey: string }[];
  t: (key: string) => string;
  className?: string;
}

export function CustomDropdown({
  value,
  onValueChange,
  placeholder,
  options,
  t,
  className = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="truncate">
          {selectedOption ? t(selectedOption.labelKey) : placeholder}
        </span>
        <ListFilter className="h-4 w-4 ml-2 text-gray-600" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full px-3 py-2 rtl:text-right text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-md last:rounded-b-md"
              onClick={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
              type="button"
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
