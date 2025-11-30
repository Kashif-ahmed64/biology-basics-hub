import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

const ProgressBar = ({ current, total, label }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">
            {current} / {total}
          </span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export default ProgressBar;
