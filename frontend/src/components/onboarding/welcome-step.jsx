"use client"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface WelcomeStepProps {
  onContinue: () => void
}

export default function WelcomeStep({ onContinue }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#002A5C]/10">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#002A5C]"
        >
          <path
            d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 8V16M8 12H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="mb-3 text-3xl font-bold text-[#002A5C]">Welcome to the AI Requirement Assistant</h1>
      <p className="mb-8 max-w-lg text-gray-600">
        Let's help you define, manage, and organize your project needs. Our AI-powered system will help you create
        clear, consistent requirements with less effort.
      </p>
      <Button onClick={onContinue} className="bg-[#002A5C] px-8 py-6 text-lg font-medium text-white hover:bg-[#003c80]">
        Get Started <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <div className="mb-3 rounded-full bg-[#002A5C]/10 p-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#002A5C]"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mb-1 font-medium text-[#002A5C]">Define Requirements</h3>
          <p className="text-sm text-gray-500">Capture and organize project requirements with AI assistance</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-3 rounded-full bg-[#002A5C]/10 p-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#002A5C]"
            >
              <path
                d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="mb-1 font-medium text-[#002A5C]">Manage Documents</h3>
          <p className="text-sm text-gray-500">Organize and track all your requirement documents</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-3 rounded-full bg-[#002A5C]/10 p-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#002A5C]"
            >
              <path
                d="M15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5C13.933 5 15.5 6.567 15.5 8.5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19.5 19H4.5C4.5 15.5 7.5 13 12 13C16.5 13 19.5 15.5 19.5 19Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h3 className="mb-1 font-medium text-[#002A5C]">Collaborate</h3>
          <p className="text-sm text-gray-500">Work together with your team on requirements</p>
        </div>
      </div>
    </div>
  )
}
