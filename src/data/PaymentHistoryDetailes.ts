
export interface HistoryItem {
  id: string | number;
  course: string;
  method: string;
  date: string;
  amount: number;
}

export const HISTORY_DETAILES: HistoryItem[] = [
  {
    id: 1,
    course: "UI/UX Design",
    method: "Credit Card",
    date : "Apr 20,2025",
    amount: 300,
  },
  {
    id: 2,
    course: "Graphic Design",
    method: "Fawry",
    date : "Jul 17,2025",
    amount: 420,
  },
  {
    id: 3,
    course: "JavaScript",
    method: "E-Wallet",
    date : "Apr 22,2025",
    amount: 250,
  },
  {
    id: 4,
    course: "UI/UX Design",
    method: "Credit Card",
    date : "Apr 20,2025",
    amount: 300,
  },
  {
    id: 5,
    course: "UI/UX Design",
    method: "Credit Card",
    date : "Apr 20,2025",
    amount: 300,
  },
  {
    id: 6,
    course: "Graphic Design",
    method: "Fawry",
    date : "Jul 17,2025",
    amount: 420,
  },
  {
    id: 7,
    course: "JavaScript",
    method: "E-Wallet",
    date : "Apr 22,2025",
    amount: 250,
  },
];
