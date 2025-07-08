"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Upload, FileText, AlertCircle, ChevronDown, X, Save, Download, Sparkles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { Requirement } from "@/types/requirements"

// Mock data for extracted requirements
const mockRequirements: Requirement[] = [
  {
    id: 1,
    text: "The system shall allow users to upload documents in PDF, Word, Excel, HTML, and .eml formats.",
    type: "Functional",
    priority: "Must",
    status: "Clear",
  },
  {
    id: 2,
    text: "The system shall process uploaded documents within 30 seconds.",
    type: "Non-Functional",
    priority: "Should",
    status: "Clear",
  },
  {
    id: 3,
    text: "The system should integrate with existing CRM systems.",
    type: "Functional",
    priority: "Could",
    status: "Unclear",
    issue: "Which CRM systems? Need specific integration points.",
  },
  {
    id: 4,
    text: "The system must be available 99.9% of the time.",
    type: "Non-Functional",
    priority: "Must",
    status: "Clear",
  },
  {
    id: 5,
    text: "Users should be able to export requirements to various formats.",
    type: "Functional",
    priority: "Should",
    status: "Unclear",
    issue: "Which export formats are required?",
  },
]

// Mock chat messages
const initialChatMessages = [
  {
    role: "assistant",
    content:
      "Hello! I'm your AI assistant for requirements engineering. You can start by describing your project requirements or uploading relevant documents.",
  },
]

export default function NewRequirementSession() {
  const [chatMessages, setChatMessages] = useState(initialChatMessages)
  const [userInput, setUserInput] = useState("")
  const [requirements, setRequirements] = useState<Requirement[]>(mockRequirements)
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [textInput, setTextInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // Add user message to chat
    const newMessages = [...chatMessages, { role: "user", content: userInput }]

    setChatMessages(newMessages)
    setUserInput("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      setChatMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I've analyzed your input. Based on what you've shared, I've identified some potential requirements. You can review them in the requirements panel and adjust their priority as needed.",
        },
      ])
    }, 1000)
  }

  // Handle file upload
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files)
    setUploadedFiles([...uploadedFiles, ...newFiles])

    // Simulate AI processing message
    setChatMessages([
      ...chatMessages,
      {
        role: "assistant",
        content: `I'm analyzing the uploaded file(s): ${newFiles.map(f => f.name).join(", ")}. I'll extract requirements and update the requirements panel shortly.`,
      },
    ])
  }

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files)
  }

  // Handle priority change
  const handlePriorityChange = (id: number, priority: "Must" | "Should" | "Could" | "Won't") => {
    setRequirements(requirements.map((req) => (req.id === id ? { ...req, priority } : req)))
  }

  // Get badge color based on priority
  const getPriorityBadgeColor = (priority: "Must" | "Should" | "Could" | "Won't") => {
    switch (priority) {
      case "Must":
        return "bg-red-500 hover:bg-red-600"
      case "Should":
        return "bg-amber-500 hover:bg-amber-600"
      case "Could":
        return "bg-green-500 hover:bg-green-600"
      case "Won't":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return "bg-blue-500 hover:bg-blue-600"
    }
  }

  // Remove a file from the uploaded files list
  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName))
  }

  // Extract requirements from uploaded files
  const extractRequirements = async () => {
    setIsProcessing(true);
    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append("files", file));
    const response = await fetch("/api/agent", { method: "POST", body: formData });
    const data = await response.json();

    // Flatten all requirements from all files
    let allReqs: Requirement[] = [];
    Object.values(data).forEach((reqs: any) => {
      if (Array.isArray(reqs)) allReqs = [...allReqs, ...reqs];
    });
    setRequirements(allReqs);
    setIsProcessing(false);
  };

  // Handle export
  const handleExport = async () => {
    const response = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requirements),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "requirements.docx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Process files and text input
  const processInputs = async () => {
    if ((uploadedFiles.length === 0 && !textInput.trim()) || isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Add processing message to chat
      setChatMessages([
        ...chatMessages,
        {
          role: "assistant",
          content: "I'm processing your input. This may take a moment...",
        },
      ]);
      
      // Create form data
      const formData = new FormData();
      
      // Add files
      uploadedFiles.forEach(file => {
        formData.append('files', file);
      });
      
      // Add text input if provided
      if (textInput.trim()) {
        formData.append('textInput', textInput);
      }
      
      // Send to API
      const response = await fetch('/api/agent', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to process input');
      }
      
      const data = await response.json();
      
      // Process the response
      const extractedRequirements: Requirement[] = [];
      let reqId = 1;
      
      // Process each file's requirements
      for (const [fileName, fileData] of Object.entries(data)) {
        // Add a message about the file
        setChatMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: `I've analyzed ${fileName} and extracted requirements.`,
          },
        ]);
        
        // Process requirements from this file
        if (Array.isArray(fileData)) {
          fileData.forEach(req => {
            const type = req.type === "Functional" || req.type === "Non-Functional" 
              ? req.type 
              : req.id?.startsWith('FR') 
                ? "Functional" 
                : "Non-Functional";

            const priority = req.priority === "Must" || req.priority === "Should" || 
                           req.priority === "Could" || req.priority === "Won't"
              ? req.priority
              : "Should";

            extractedRequirements.push({
              id: reqId++,
              text: req.description || req.text || '',
              type,
              priority,
              status: req.note ? 'Unclear' : 'Clear',
              issue: req.note || undefined,
            });
          });
        }
      }
      
      // Update requirements
      if (extractedRequirements.length > 0) {
        setRequirements(extractedRequirements);
        
        // Add success message
        setChatMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: `I've extracted ${extractedRequirements.length} requirements from your input. You can review and adjust them in the requirements panel.`,
          },
        ]);
      } else {
        // Add message if no requirements found
        setChatMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "I couldn't extract any clear requirements from your input. Please try providing more specific information.",
          },
        ]);
      }
    } catch (error) {
      console.error('Error processing input:', error);
      
      // Add error message
      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered an error while processing your input. Please try again.",
        },
      ]);
      
      toast.error("Failed to process input");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Requirement Session</h2>
          <p className="text-muted-foreground">Create and manage requirements with AI assistance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Panel - Input */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Input Requirements</CardTitle>
              <CardDescription>Enter requirements manually or upload documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="text">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Text Input</TabsTrigger>
                  <TabsTrigger value="upload">File Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Enter your requirements here. You can describe the system functionality, constraints, or paste existing requirements."
                      className="min-h-[200px]"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                    <Button 
                      className="w-full"
                      onClick={processInputs}
                      disabled={!textInput.trim() || isProcessing}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {isProcessing ? "Processing..." : "Extract Requirements"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div
                    className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                      dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="mb-2 h-10 w-10 text-gray-400" />
                    <p className="mb-1 text-sm font-medium">Drag and drop files here</p>
                    <p className="mb-4 text-xs text-gray-500">Supports PDF, Word, Excel, HTML, .eml</p>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Browse Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileInputChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.html,.eml"
                    />
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Uploaded Files:</p>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between rounded-md border p-2">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-blue-500" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(file.name)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full mt-2"
                        onClick={processInputs}
                        disabled={isProcessing}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isProcessing ? "Processing..." : "Extract Requirements"}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* AI Chat Assistant */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get help with your requirements</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="mb-1 flex items-center">
                            <Bot className="mr-1 h-4 w-4" />
                            <span className="text-xs font-medium">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  placeholder="Ask the AI assistant..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Extracted Requirements</CardTitle>
            <CardDescription>Review and prioritize requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-50">
                    Functional: {requirements.filter((r) => r.type === "Functional").length}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50">
                    Non-Functional: {requirements.filter((r) => r.type === "Non-Functional").length}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-red-50">
                    Issues: {requirements.filter((r) => r.status === "Unclear").length}
                  </Badge>
                </div>
              </div>

              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {requirements.map((req) => (
                    <div key={req.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline" className={req.type === "Functional" ? "bg-blue-50" : "bg-purple-50"}>
                          {req.type}
                        </Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className={getPriorityBadgeColor(req.priority)}>
                                    {req.priority}
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handlePriorityChange(req.id, "Must")}>
                                    Must Have
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handlePriorityChange(req.id, "Should")}>
                                    Should Have
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handlePriorityChange(req.id, "Could")}>
                                    Could Have
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handlePriorityChange(req.id, "Won't")}>
                                    Won't Have
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>MoSCoW Priority</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <p className="text-sm">{req.text}</p>

                      {req.status === "Unclear" && req.issue && (
                        <div className="mt-2 rounded-md bg-amber-50 p-2">
                          <div className="flex items-center gap-1 text-amber-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Issue:</span>
                          </div>
                          <p className="text-xs text-amber-700">{req.issue}</p>
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
