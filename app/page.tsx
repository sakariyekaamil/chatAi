"use client"
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const Home = () => {

  const [prompt,setPrompt] = useState("")
  const [messages,setMessages] = useState<{role:"user"|"ai",text:string}[]>([])

  const sendHandler = async()=>{

    if(!prompt.trim()) return null

    const newMessages = [...messages,{role:"user" as const,text:prompt}]
    setMessages(newMessages)
    setPrompt('')

    try {
      
      const res = await fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({prompt})
      })

      const data = await res.json()

      if(data.text){
        setMessages([...newMessages,{role:"ai" as const, text:data.text}])
      }


    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="w-full h-screen  bg-gray-800">
      <div className="flex-1 p-6  max-h-screen">
       {messages.map((msg,i)=>(
         <div key={i} className={`flex ${msg.role === "ai" ? "" : "justify-end"} `}>
          <div className={` ${msg.role === "ai" ? "bg-[#3e4147] h-sreen rounded-bl-none" : "bg-[#2563eb] rounded-br-none"} text-white px-4 py-3 rounded-2xl h-screen  max-w-[75%]`}>
            {msg.text} 
          </div>
        </div>
       ))}
      </div>
      <div className="w-full bottom-0 fixed h-screen flex items-end">
        <div className="flex   items-center justify-center  w-full relative bottom-5 ">
          <div className="w-200 bg-[#303030] justify-between px-10 items-center py-5 flex  rounded-full">
            <input
              value={prompt}
              onChange={(e)=>setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendHandler()}
              type="text"
              className="outline-0 text-gray-100 w-full"
              placeholder="Enter Prompt"
            />
            <button onClick={sendHandler} className="py-2 px-4 cursor-pointer rounded-lg">
              {" "}
             <SendHorizontal className="text-white "/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
