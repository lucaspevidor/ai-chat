"use client";

import Message from "@/components/message/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollViewport } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

let messages = [
  {
    sender: "Lucas",
    content: "Olá pessoas! Tudo bem com vocês? Hoje estava pensando em desenvolver um app para troca de mensagems. O que vocês acham?",
    time: "10:55",
  },
  {
    sender: "Mateus",
    content: "Ideia bacana! Eu acho que se integrar com IA vai ser bem doido",
    time: "10:57",
  },
  {
    sender: "Ricardo",
    content: "Da hora",
    time: "10:58",
  },
  {
    sender: "Lucas",
    content: "Beleza. Vou tentar integrar com IA",
    time: "11:00",
  },
  {
    sender: "Mateus",
    content: "Legal!",
    time: "11:02",
  },
];

const App = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [msgContent, setMsgContent] = useState("");
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const {data: session, status} = useSession();

  useEffect(() => {
    if (status === "unauthenticated")
      signIn();
  }, [status]);

  function sendMsg() {
    if (msgContent.trim() !== "") {
      const newMsg = {
        sender: session?.user?.name?.split(" ")[0],
        content: msgContent.trim(),
        time: new Date().toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"}),
      };

      messages = [...messages, newMsg];
      setMsgContent("");
      setShouldScrollToBottom(true);
    }
  }

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldScrollToBottom]);

  function scrollToBottom() {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }

  return (
    <div className="flex flex-col p-5 h-full max-w-4xl min-h-[20rem]">
      <ScrollArea className="w-full flex-1 bg-slate-100 rounded-lg ring-1 ring-slate-200">
        <ScrollViewport ref={messagesRef} className="scroll-smooth">
          <div>
            {
              messages.map((message, index) => (
                <div className={
                  cn("flex m-5", message.sender === "Lucas" && "justify-end")
                } key={index}
                >
                  <Message
                    sender={message.sender}
                    content={message.content}
                    time={message.time}
                    accent={message.sender === "Lucas"}
                  />
                </div>
              ))
            }
          </div>
        </ScrollViewport>
      </ScrollArea>
      <form onSubmit={(e) => { e.preventDefault(); sendMsg();}}>
        <div className="flex gap-2 mt-4">
          <Input value={msgContent} onChange={e => setMsgContent(e.target.value)} />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default App;
