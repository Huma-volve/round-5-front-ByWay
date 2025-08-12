import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

interface YearSelectorProps {
    availableYears: number[];
    selectedYear: number;
    onYearSelect: (year: number) => void;
}

export default function YearSelector({ availableYears, selectedYear, onYearSelect }: YearSelectorProps) {
    const { t } = useTranslation();
    return (
        <div className="flex items-center mb-4">
            <DropdownMenu>
                <DropdownMenuLabel className='text-placeholder'>{t('instructor.revenue.selectTimePeriod')} :</DropdownMenuLabel>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300">
                    <span>{selectedYear}</span>
                    <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-24">
                    {availableYears.map((year) => (
                        <DropdownMenuItem
                            key={year}
                            onClick={() => onYearSelect(year)}
                            className={`cursor-pointer flex justify-center ${year === selectedYear ? 'bg-gray-200 text-primary font-medium' : ''
                                }`}
                        >
                            {year}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
