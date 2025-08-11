import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import REVENUE_DATA from '../../../data/revenueData';

export default function RevenueChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="lastPeriodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--revenue1-graph)" stopOpacity={0.8} />
                        <stop offset="80%" stopColor="var(--revenue1-graph)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="currentPeriodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--revenue2-graph)" stopOpacity={0.8} />
                        <stop offset="80%" stopColor="var(--revenue2-graph)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-gray-500"
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    className="text-xs text-gray-500"
                    tickFormatter={(value) => `$${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number, name: string) => [
                        `$${value.toLocaleString()}`,
                        name === 'lastPeriod' ? 'Last Period' : 'Current Period'
                    ]}
                />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="lastPeriod"
                    stroke="var(--revenue1-graph)"
                    fill="url(#lastPeriodGradient)"
                    strokeWidth={2}
                    name="Last Period"
                />
                <Area
                    type="monotone"
                    dataKey="currentPeriod"
                    stroke="var(--revenue2-graph)"
                    fill="url(#currentPeriodGradient)"
                    strokeWidth={2}
                    name="Current Period"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
