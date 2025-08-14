// Income table data interface
export interface IncomeTableData {
  customer: string;
  date: string;
  type: string;
  amount: number;
}

// Payment types constants
export const PaymentType = {
  CASH: "Cash",
  CREDIT_CARD: "Credit Card",
  BANK_TRANSFER: "Bank Transfer",
} as const;

// Sample income data
export const INCOME_TABLE_DATA: IncomeTableData[] = [
  {
    customer: "Ahmed Ali",
    date: "2025-08-01",
    type: PaymentType.CASH,
    amount: 200,
  },
  {
    customer: "Sara Hassan",
    date: "2025-08-03",
    type: PaymentType.CREDIT_CARD,
    amount: 500,
  },
  {
    customer: "Omar Khaled",
    date: "2025-08-05",
    type: PaymentType.CASH,
    amount: 150,
  },
  {
    customer: "Laila Mostafa",
    date: "2025-08-07",
    type: PaymentType.BANK_TRANSFER,
    amount: 800,
  },
];

// Payment filter options
export const PAYMENT_FILTER_OPTIONS = [
  { value: "all", labelKey: "instructor.income.filters.all" },
  { value: PaymentType.CASH, labelKey: "instructor.income.paymentTypes.cash" },
  {
    value: PaymentType.CREDIT_CARD,
    labelKey: "instructor.income.paymentTypes.creditCard",
  },
  {
    value: PaymentType.BANK_TRANSFER,
    labelKey: "instructor.income.paymentTypes.bankTransfer",
  },
];

export default INCOME_TABLE_DATA;
