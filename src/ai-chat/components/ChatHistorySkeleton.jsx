export default function ChatHistorySkeleton() {
  const rows = [
    { isUser: false, width: 'w-56' },
    { isUser: true, width: 'w-40' },
    { isUser: false, width: 'w-64' },
    { isUser: false, width: 'w-32' },
  ];

  return (
    <div className="flex h-full flex-col justify-end gap-4 animate-pulse">
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex gap-2.5 ${row.isUser ? 'flex-row-reverse' : ''}`}
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
          <div
            className={`h-9 ${row.width} rounded-2xl ${
              row.isUser ? 'rounded-br-md' : 'rounded-bl-md'
            } bg-gray-200`}
          />
        </div>
      ))}
    </div>
  );
}
