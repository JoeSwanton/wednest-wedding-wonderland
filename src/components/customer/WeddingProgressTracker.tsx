
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface WeddingTask {
  id: string;
  title: string;
  category: string;
  status: 'completed' | 'in_progress' | 'pending' | 'overdue';
  dueDate?: string;
  progress: number;
}

const mockTasks: WeddingTask[] = [
  {
    id: '1',
    title: 'Book venue',
    category: 'Venue',
    status: 'completed',
    progress: 100
  },
  {
    id: '2',
    title: 'Choose photographer',
    category: 'Photography',
    status: 'in_progress',
    progress: 75,
    dueDate: '2025-07-01'
  },
  {
    id: '3',
    title: 'Send invitations',
    category: 'Invitations',
    status: 'pending',
    progress: 0,
    dueDate: '2025-08-01'
  }
];

const WeddingProgressTracker = () => {
  const completedTasks = mockTasks.filter(task => task.status === 'completed').length;
  const totalTasks = mockTasks.length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-theme-brown">Wedding Progress</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <p className="text-xs text-theme-brown-light">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(task.status)}
                <div>
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  <p className="text-xs text-gray-500">{task.category}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(task.status)}>
                  {task.status.replace('_', ' ')}
                </Badge>
                {task.dueDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeddingProgressTracker;
