
export interface UserManagementItem {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: string;
  date: string;
}

export const UserManagement_DETAILES: UserManagementItem[] = [
  {
    id: 1,
    name: "John Cina",
    email: "cina2@gmail.com",
    role: "instractor",
    status: "Active",
    date: "2023-05-23"
},
{
  id: 2,
  name: "Recardo Kaka",
  email: "kaka@gmail.com",
  role: "Learner",
  status: "Active",
  date: "2022-22-22"
},
{
  id: 3,
  name: "Luis Figo",
  email: "figo@gmail.com",
  role: "instractor",
  status: "Blocked",
  date: "2025-03-12"
},
{
  id: 4,
  name: "John Cina",
  email: "cina2@gmail.com",
  role: "instractor",
  status: "Active",
  date: "2023-05-23"
},
  {
    id: 5,
    name: "John Cina",
    email: "cina2@gmail.com",
    role: "instractor",
    status: "Blocked",
    date: "2023-05-23"
  },
  {
    id: 6,
    name: "John Cina",
    email: "cina2@gmail.com",
    role: "instractor",
    status: "Active",
    date: "2023-05-23"
  },
];
