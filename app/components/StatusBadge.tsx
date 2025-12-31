type Status = "pending" | "running" | "completed" | "failed" | "insufficient_evidence";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "待機中",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
  },
  running: {
    label: "実行中",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  completed: {
    label: "完了",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
  },
  failed: {
    label: "失敗",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
  },
  insufficient_evidence: {
    label: "根拠不足",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
  },
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${className}`}
    >
      {config.label}
    </span>
  );
}
