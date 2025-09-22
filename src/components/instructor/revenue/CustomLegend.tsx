import { useTranslation } from 'react-i18next';

export default function CustomLegend() {
    const { t } = useTranslation();

    return (
        <div className="flex justify-end mb-4 gap-6">
            <div className="flex items-center gap-2">
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: 'var(--revenue2-graph)' }}
                ></div>
                <span className="text-sm text-gray-600">{t('instructor.revenue.currentPeriod')}</span>
            </div>
            <div className="flex items-center gap-2">
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: 'var(--revenue1-graph)' }}
                ></div>
                <span className="text-sm text-gray-600">{t('instructor.revenue.lastPeriod')}</span>
            </div>
        </div>
    )
}
