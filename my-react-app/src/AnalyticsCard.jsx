import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());
const fetchPosts = async () =>
  fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json());
const fetchTodos = async () =>
  fetch("https://jsonplaceholder.typicode.com/todos").then((res) => res.json());

export default function AnalyticsCard() {
  // ✅ الطريقة الصحيحة لـ React Query v5
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (!users || !posts || !todos)
    return <div className="card">جاري التحميل...</div>;

  // حسابات التحليلات المطلوبة
  const postsPerUser = users.map((u) => ({
    id: u.id,
    username: u.username,
    posts: posts.filter((p) => p.userId === u.id).length,
    completedTodos: todos.filter(
      (t) => t.userId === u.id && t.completed
    ).length,
  }));

  const mostPosts = postsPerUser.reduce((max, u) =>
    u.posts > max.posts ? u : max
  );
  const fewestPosts = postsPerUser.reduce((min, u) =>
    u.posts < min.posts ? u : min
  );
  const mostCompletedTodos = postsPerUser.reduce((max, u) =>
    u.completedTodos > max.completedTodos ? u : max
  );
  const fewestCompletedTodos = postsPerUser.reduce((min, u) =>
    u.completedTodos < min.completedTodos ? u : min
  );

  return (
    <div className="bg-white rounded shadow p-4 card">
      <h2 className="text-xl font-bold mb-2">تحليلات بسيطة</h2>
      <div className="mb-2">عدد المستخدمين: <span className="font-bold">{users.length}</span></div>
      <div className="mb-2">أكثر مستخدم منشورات: <span className="font-bold">{mostPosts.username}</span> ({mostPosts.posts})</div>
      <div className="mb-2">أقل مستخدم منشورات: <span className="font-bold">{fewestPosts.username}</span> ({fewestPosts.posts})</div>
      <div className="mb-2">أكثر مستخدم مهام منتهية: <span className="font-bold">{mostCompletedTodos.username}</span> ({mostCompletedTodos.completedTodos})</div>
      <div className="mb-2">أقل مستخدم مهام منتهية: <span className="font-bold">{fewestCompletedTodos.username}</span> ({fewestCompletedTodos.completedTodos})</div>
    </div>
  );
}