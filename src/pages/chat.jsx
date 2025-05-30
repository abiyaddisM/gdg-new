"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"
import { useEffect, useRef, useState } from "react"
export default function Chat() {
    const scrollAreaRef = useRef(null)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])
    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            parts: [{ type: "text", text: input }],
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

/*        try {
            // Replace this with your actual API call
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            })

            const data = await response.json()

            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                parts: [{ type: "text", text: data.response }],
            }

            setMessages((prev) => [...prev, assistantMessage])
        } catch (error) {
            console.error('Error:', error)
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                parts: [{ type: "text", text: "Sorry, something went wrong. Please try again." }],
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }*/
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="mx-auto max-w-4xl">
                <Card className="h-[90vh] flex flex-col shadow-xl">
                    <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Bot className="h-6 w-6 text-blue-600" />
                            AI Chat Assistant
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-full p-4" >
                            <div className="space-y-4">
                                { messages.length === 0 && (
                                    <div className="text-center text-gray-500 mt-8">
                                        <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                        <p className="text-lg font-medium">Welcome to AI Chat!</p>
                                        <p className="text-sm">Start a conversation by typing a message below.</p>
                                    </div>
                                )}

                                { messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {message.role === "assistant" && (
                                            <Avatar className="h-8 w-8 bg-blue-100">
                                                <AvatarFallback>
                                                    <Bot className="h-4 w-4 text-blue-600" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div
                                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                                message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                                            }`}
                                        >
                                            {message.parts.map((part, i) => {
                                                switch (part.type) {
                                                    case "text":
                                                        return (
                                                            <div key={`${message.id}-${i}`} className="whitespace-pre-wrap">
                                                                {part.text}
                                                            </div>
                                                        )
                                                    default:
                                                        return null
                                                }
                                            })}
                                        </div>

                                        {message.role === "user" && (
                                            <Avatar className="h-8 w-8 bg-blue-600">
                                                <AvatarFallback>
                                                    <User className="h-4 w-4 text-white" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-3 justify-start">
                                        <Avatar className="h-8 w-8 bg-blue-100">
                                            <AvatarFallback>
                                                <Bot className="h-4 w-4 text-blue-600" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: "0.1s" }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: "0.2s" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="border-t bg-white/50 backdrop-blur-sm p-4">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message here..."
                                disabled={isLoading}
                                className="flex-1"
                                autoFocus
                            />
                            <Button type="submit" disabled={isLoading || !input.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
