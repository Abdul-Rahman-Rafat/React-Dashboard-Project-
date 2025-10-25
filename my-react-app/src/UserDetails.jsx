import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const fetchPosts = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const fetchTodos = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function UserDetails() {
  const { id } = useParams();

  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });

  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPosts(id),
  });

  const { data: todos, isLoading: todosLoading, error: todosError } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodos(id),
  });

  const [todoState, setTodoState] = useState({});

  useEffect(() => {
    if (todos) {
      const state = {};
      todos.forEach((todo) => {
        state[todo.id] = todo.completed;
      });
      setTodoState(state);
    }
  }, [todos]);

  const toggleTodo = (todoId) => {
    setTodoState((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };

  if (userLoading || postsLoading || todosLoading)
    return <div className="card">جاري تحميل بيانات المستخدم...</div>;

  if (userError || postsError || todosError)
    return <div className="card text-red-500">حدث خطأ أثناء تحميل البيانات!</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
        <div className="mb-4">
          <span className="font-semibold">الإيميل:</span> {user.email}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">المنشورات</h3>
          <ul className="list-disc pl-5">
            {posts?.map((post) => (
              <li key={post.id}>
                <span className="font-bold">{post.title}</span>
                <div className="text-sm text-gray-600">{post.body}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">المهام (To-dos)</h3>
          <ul>
            {todos?.map((todo) => (
              <li
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer mb-2 p-2 rounded ${
                  todoState[todo.id]
                    ? "bg-green-100 line-through text-green-700"
                    : "bg-gray-100"
                }`}
              >
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
