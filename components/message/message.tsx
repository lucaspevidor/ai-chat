import { cn } from "@/lib/utils";

import "./s-message.css";

interface IMessageProps {
  sender: string,
  content: string,
  time: string,
  accent?: boolean
}

const Message = (props: IMessageProps) => {
  const {sender, content, time, accent} = props;

  return (
    <div className={cn(
      "flex flex-col gap-1 min-w-[6rem] max-w-[18rem] bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl shadow-xl shadow-black/10 p-2",
      accent && "from-blue-600 to-blue-500",
      "message"
    )}
    >
      <span className="text-slate-200 font-md text-sm">{sender}:</span>
      <p className="text-slate-200">{content}</p>
      <span className="text-xs text-slate-200 self-end">{time}</span>
    </div>
  );
};

export default Message;
