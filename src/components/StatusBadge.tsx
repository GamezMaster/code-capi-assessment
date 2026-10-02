interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color =
    status === 'Alive'
      ? 'bg-green-100 text-green-800 border-green-300'
      : status === 'Dead'
      ? 'bg-red-100 text-red-800 border-red-300'
      : 'bg-gray-100 text-gray-800 border-gray-300';

  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${color}`}>
      {status}
    </span>
  );
}