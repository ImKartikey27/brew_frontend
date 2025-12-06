export type Priority = "low" | "medium" | "high";
export type Status = "To Do" | "In Progress" | "Done";

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  owner: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  status?: "success" | "error";
  message?: string;
  data?: T;
}
