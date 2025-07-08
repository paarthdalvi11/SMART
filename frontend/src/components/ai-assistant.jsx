"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Bot, Send } from "lucide-react"

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      // Here you would handle the AI interaction
      console.log("AI query:", input)
      setInput("")
    }
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:shadow-xl"
        onClick={() => setIsOpen(true)}
      >
        <Bot className="h-6 w-6" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>AI Assistant</SheetTitle>
            <SheetDescription>Ask me anything about requirements engineering.</SheetDescription>
          </SheetHeader>
          <div className="mt-6 flex h-[calc(100vh-12rem)] flex-col">
            <div className="flex-1 overflow-auto rounded-md bg-gray-50 p-4">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Bot className="h-4 w-4 text-blue-700" />
                </div>
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-sm text-gray-700">
                    Hello! I'm your AI assistant for requirements engineering. How can I help you today?
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
