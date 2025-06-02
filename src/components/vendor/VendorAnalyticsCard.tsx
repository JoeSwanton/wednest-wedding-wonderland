
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AnalyticsMetric {
  label: string;
  value: string | number;
  change: number;
  period: string;
}

interface VendorAnalyticsCardProps {
  title: string;
  metrics: AnalyticsMetric[];
  icon: React.ReactNode;
}

const VendorAnalyticsCard = ({ title, metrics, icon }: VendorAnalyticsCardProps) => {
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-red-600" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-400";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-xl font-bold">{metric.value}</p>
              </div>
              <div className="text-right">
                <div className={`flex items-center gap-1 ${getTrendColor(metric.change)}`}>
                  {getTrendIcon(metric.change)}
                  <span className="text-xs">
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
                <p className="text-xs text-gray-500">{metric.period}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorAnalyticsCard;
