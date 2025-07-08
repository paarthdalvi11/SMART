"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface AIFeaturesProps {
  inputText?: string
  onGenerateRequirements?: (requirements: any[]) => void
  onGenerateTestCases?: (testCases: any[]) => void
  onGenerateCodeSnippets?: (codeSnippets: any[]) => void
}

export default function AIFeatures({
  inputText = "",
  onGenerateRequirements,
  onGenerateTestCases,
  onGenerateCodeSnippets,
}: AIFeaturesProps) {
  const [text, setText] = useState(inputText)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<{
    requirements: any[]
    testCases: any[]
    codeSnippets: any[]
    summary: string
    missingInfo: string[]
  } | null>(null)

  // Mock AI analysis function
  const analyzeText = () => {
    setIsAnalyzing(true)

    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis results
      const results = {
        requirements: [
          {
            id: "FR-001",
            text: "The system shall allow users to upload documents in multiple formats (PDF, Word, Excel, HTML, .eml).",
            type: "Functional",
            priority: "Must",
            status: "Clear",
          },
          {
            id: "FR-002",
            text: "The system shall extract requirements automatically from uploaded documents.",
            type: "Functional",
            priority: "Must",
            status: "Clear",
          },
          {
            id: "NFR-001",
            text: "The system shall process uploaded documents within 30 seconds.",
            type: "Non-Functional",
            priority: "Should",
            status: "Clear",
            category: "Performance",
          },
          {
            id: "FR-003",
            text: "The system should integrate with existing CRM systems.",
            type: "Functional",
            priority: "Could",
            status: "Unclear",
            issue: "Which CRM systems? Need specific integration points.",
          },
        ],
        testCases: [
          {
            id: "TC-001",
            name: "Document Upload Test",
            steps: [
              "Navigate to the upload page",
              "Select a PDF file",
              "Click the upload button",
            ],
            expectedResult: "File is uploaded and requirements are extracted",
            relatedRequirement: "FR-001",
          },
          {
            id: "TC-002",
            name: "Processing Time Test",
            steps: [
              "Upload a large document (>10MB)",
              "Start timer",
              "Wait for processing to complete",
            ],
            expectedResult: "Processing completes within 30 seconds",
            relatedRequirement: "NFR-001",
          },
        ],
        codeSnippets: [
          {
            id: "CS-001",
            language: "JavaScript",
            code: `// Document upload handler
async function handleDocumentUpload(file) {
  const formData = new FormData();
  formData.append('document', file);
  
  try {
    const response = await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    return data.requirements;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}`,
            relatedRequirement: "FR-001",
          },
        ],
        summary: "The text describes a requirement engineering system that allows users to upload documents in various formats and automatically extract requirements. The system should be performant and integrate with existing CRM systems.",
        missingInfo: [
          "Specific CRM systems for integration",
          "Detailed performance requirements for large documents",
          "User roles and access control requirements",
        ],
      }

      setAnalysisResults(results)
      setIsAnalyzing(false)

      // Call the callback functions if provided
      if (onGenerateRequirements) onGenerateRequirements(results.requirements)
      if (onGenerateTestCases) onGenerateTestCases(results.testCases)
      if (onGenerateCodeSnippets) onGenerateCodeSnippets(results.codeSnippets)
    }, 2000)
  }

  // Get priority badge color
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "Must":
        return "bg-red-100 text-red-800"
      case "Should":
        return "bg-amber-100 text-amber-800"
      case "Could":
        return "bg-green-100 text-green-800"
      case "Won't":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Functional":
        return "bg-blue-50 text-blue-700"
      case "Non-Functional":
        return "bg-purple-50 text-purple-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
          \
