import { Suspense } from "react";
import UserList from "./user-list";

export default function Home() {
  return (
    <main>
      <h1>Concurrent Mode with Suspense</h1>
      <Suspense fallback={<p>Loading users...</p>}>
        <UserList />
      </Suspense>
    </main>
  );
}

async function getUsers() {
  // Simulate slow API
  await new Promise((r) => setTimeout(r, 2000));
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

export default async function UserList() {
  const users = await getUsers();

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
