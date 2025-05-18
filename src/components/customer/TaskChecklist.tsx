
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Download, Filter, Calendar, Tag } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - would be replaced with actual user data from backend
const initialTasks = [
  { 
    id: 1, 
    title: "Book venue", 
    status: "completed", 
    dueDate: "2023-12-15",
    category: "venue",
    notes: "Deposit paid, contract signed" 
  },
  { 
    id: 2, 
    title: "Hire photographer", 
    status: "in-progress", 
    dueDate: "2024-01-20",
    category: "photography",
    notes: "Meeting with Jane next week" 
  },
  { 
    id: 3, 
    title: "Order wedding cake", 
    status: "to-do", 
    dueDate: "2024-02-10",
    category: "catering",
    notes: "" 
  },
  { 
    id: 4, 
    title: "Book florist", 
    status: "to-do", 
    dueDate: "2024-01-05",
    category: "decor",
    notes: "Get quotes from at least 3 vendors" 
  },
  { 
    id: 5, 
    title: "Send save-the-dates", 
    status: "completed", 
    dueDate: "2023-11-01",
    category: "stationery",
    notes: "All cards sent out on October 25" 
  },
];

const categories = [
  "venue", "catering", "photography", "decor", "attire", 
  "beauty", "stationery", "music", "transportation", "honeymoon", "misc"
];

const TaskChecklist = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ 
    title: "", 
    status: "to-do", 
    dueDate: "", 
    category: "", 
    notes: "" 
  });
  
  // Filter tasks based on status
  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter(task => task.status === filter);
  
  // Calculate progress
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const progressPercentage = (completedTasks / tasks.length) * 100;
  
  const handleStatusChange = (taskId: number, status: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };
  
  const handleAddTask = () => {
    if (newTask.title) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          ...newTask
        }
      ]);
      setNewTask({ title: "", status: "to-do", dueDate: "", category: "", notes: "" });
      setShowAddForm(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Wedding Planning Progress</CardTitle>
          <CardDescription>
            {completedTasks} of {tasks.length} tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Just Started</span>
            <span>Halfway There</span>
            <span>Almost Done!</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Task List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Wedding Checklist</CardTitle>
            <CardDescription>Track your wedding planning tasks</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="bg-muted p-4 rounded-md mb-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input 
                    id="task-title"
                    placeholder="What needs to be done?" 
                    value={newTask.title} 
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input 
                    id="due-date"
                    type="date"
                    value={newTask.dueDate} 
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newTask.category} 
                    onValueChange={(value) => setNewTask({...newTask, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newTask.status} 
                    onValueChange={(value) => setNewTask({...newTask, status: value})}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-do">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input 
                  id="notes"
                  placeholder="Any additional details?" 
                  value={newTask.notes} 
                  onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button onClick={handleAddTask}>Add Task</Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}
          
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="to-do">To Do</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
            </TabsContent>
            <TabsContent value="to-do" className="mt-0">
              <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
            </TabsContent>
            <TabsContent value="in-progress" className="mt-0">
              <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
            </TabsContent>
            <TabsContent value="completed" className="mt-0">
              <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for rendering task list
const TaskList = ({ tasks, onStatusChange }: any) => {
  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center border rounded-md">
        <p className="text-muted-foreground">No tasks found in this category.</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y border rounded-md">
      {tasks.map((task: any) => (
        <div key={task.id} className="p-4 flex items-start gap-3">
          <Checkbox 
            id={`task-${task.id}`}
            checked={task.status === "completed"}
            onCheckedChange={(checked) => {
              onStatusChange(task.id, checked ? "completed" : "to-do");
            }}
          />
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <label 
                htmlFor={`task-${task.id}`} 
                className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
              >
                {task.title}
              </label>
              <div className="flex items-center gap-2">
                {task.dueDate && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                
                <StatusBadge status={task.status} />
              </div>
            </div>
            
            {task.notes && <p className="text-sm text-muted-foreground">{task.notes}</p>}
            
            {task.category && (
              <div className="flex items-center gap-1 mt-1">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <Badge variant="outline" className="text-xs">
                  {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                </Badge>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper component for rendering status badges
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusProps = () => {
    switch (status) {
      case "completed":
        return { className: "bg-green-100 text-green-800", label: "Completed" };
      case "in-progress":
        return { className: "bg-blue-100 text-blue-800", label: "In Progress" };
      case "to-do":
      default:
        return { className: "bg-gray-100 text-gray-800", label: "To Do" };
    }
  };
  
  const { className, label } = getStatusProps();
  
  return <Badge className={className}>{label}</Badge>;
};

export default TaskChecklist;
