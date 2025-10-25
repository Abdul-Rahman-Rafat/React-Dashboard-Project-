import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function UsersManager() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const navigate = useNavigate();

  if (isLoading) return <div className="card">جاري تحميل المستخدمين...</div>;
  if (error) return <div className="card text-red-500">حدث خطأ أثناء تحميل المستخدمين!</div>;

  return (
    <div className="bg-white rounded shadow p-4 card">
      <h2 className="text-xl font-bold mb-2">المستخدمين</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer hover:bg-blue-100 p-2 rounded"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
