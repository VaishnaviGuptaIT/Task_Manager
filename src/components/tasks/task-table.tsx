"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/task-store";
import { Task } from "@/types/task";
import { DataTable } from "./data-table";
import { getColumns } from "./task-columns";
import { TaskDialog } from "./task-dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function TaskTable() {
  const { tasks, isLoading, fetchTasks, createTask, updateTask, deleteTask, deleteTasks } =
    useTaskStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [tasksToDelete, setTasksToDelete] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete);
      toast({ title: "Task deleted", variant: "success" });
    }
    setTaskToDelete(null);
  };

  const handleDeleteSelected = (ids: string[]) => {
    setTasksToDelete(ids);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSelected = async () => {
    if (tasksToDelete.length > 0) {
      await deleteTasks(tasksToDelete);
      toast({ title: `${tasksToDelete.length} task(s) deleted`, variant: "success" });
    }
    setTasksToDelete([]);
  };

  const handleSubmit = async (data: any) => {
    if (editingTask) {
      await updateTask(editingTask._id, data);
      toast({ title: "Task updated", variant: "success" });
    } else {
      await createTask(data);
      toast({ title: "Task created", variant: "success" });
    }
    setEditingTask(null);
  };

  const columns = getColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Tasks</h2>
          <p className="text-muted-foreground mt-1">Manage and organize your tasks efficiently.</p>
        </div>
        <Button 
          onClick={() => { setEditingTask(null); setDialogOpen(true); }}
          className="gap-2 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <Plus className="h-5 w-5" /> Add Task
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <p>Loading tasks...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={tasks}
          onDeleteSelected={handleDeleteSelected}
        />
      )}

      <TaskDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingTask(null); }}
        onSubmit={handleSubmit}
        task={editingTask}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={taskToDelete ? confirmDelete : confirmDeleteSelected}
        title={taskToDelete ? "Delete this task?" : `Delete ${tasksToDelete.length} task(s)?`}
        description={taskToDelete ? "This action cannot be undone. This task will be permanently deleted." : "This action cannot be undone. These tasks will be permanently deleted."}
        confirmText="Delete"
      />
    </div>
  );
}
