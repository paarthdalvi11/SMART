"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, X, Menu, Upload, MessageSquare } from "lucide-react"

interface TourStepProps {
  onComplete: () => void
  onSkip: () => void
}

export default function TourStep({ onComplete, onSkip }: TourStepProps) {
  const [currentTourStep, setCurrentTourStep] = useState(1)
  const totalTourSteps = 3

  const handleNextTourStep = () => {
    if (currentTourStep < totalTourSteps) {
      setCurrentTourStep(currentTourStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="relative py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#002A5C]">Product Tour</h2>
        <Button variant="ghost" onClick={onSkip} className="text-gray-500 hover:text-gray-700">
          Skip Tour <X className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="relative h-[400px] overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        {/* Mock UI for tour */}
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-48 border-r border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center">
              <div className="h-8 w-8 rounded bg-[#002A5C]"></div>
              <span className="ml-2 font-medium">ReqSystem</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-md bg-gray-100 p-2">Dashboard</div>
              <div className="rounded-md p-2">Sessions</div>
              <div className="rounded-md p-2">Documents</div>
              <div className="rounded-md p-2">History</div>
              <div className="rounded-md p-2">Settings</div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Dashboard</h3>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="rounded-md border border-gray-200 bg-white p-3">
                <h4 className="font-medium">New Session</h4>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-3">
                <h4 className="font-medium">Upload Files</h4>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-3">
                <h4 className="font-medium">Documents</h4>
              </div>
            </div>

            <div className="rounded-md border border-gray-200 bg-white p-4">
              <h4 className="mb-2 font-medium">Recent Activity</h4>
              <div className="space-y-2">
                <div className="rounded-md bg-gray-50 p-2 text-sm">ERP System Requirements updated</div>
                <div className="rounded-md bg-gray-50 p-2 text-sm">Mobile App Requirements created</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tour overlays */}
        {currentTourStep === 1 && (
          <div className="absolute inset-0 flex items-start bg-black/50">
            <div className="relative ml-24 mt-20 max-w-xs rounded-lg bg-white p-4 shadow-lg">
              <div className="absolute -left-12 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#002A5C] text-white">
                <Menu className="h-5 w-5" />
              </div>
              <h4 className="mb-2 font-medium text-[#002A5C]">Navigation Sidebar</h4>
              <p className="mb-4 text-sm text-gray-600">
                Navigate between Dashboard, Sessions, and Documents here. Access all your project resources easily.
              </p>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  {currentTourStep} of {totalTourSteps}
                </span>
                <Button size="sm" onClick={handleNextTourStep} className="bg-[#002A5C] text-white hover:bg-[#003c80]">
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentTourStep === 2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="relative max-w-xs rounded-lg bg-white p-4 shadow-lg">
              <div className="absolute -top-12 flex h-10 w-10 items-center justify-center rounded-full bg-[#002A5C] text-white">
                <Upload className="h-5 w-5" />
              </div>
              <h4 className="mb-2 font-medium text-[#002A5C]">Upload Area</h4>
              <p className="mb-4 text-sm text-gray-600">
                Upload project files to start extracting requirements. Our AI will analyze documents and identify key
                requirements automatically.
              </p>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  {currentTourStep} of {totalTourSteps}
                </span>
                <Button size="sm" onClick={handleNextTourStep} className="bg-[#002A5C] text-white hover:bg-[#003c80]">
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentTourStep === 3 && (
          <div className="absolute inset-0 flex items-end justify-end bg-black/50 pb-20 pr-20">
            <div className="relative max-w-xs rounded-lg bg-white p-4 shadow-lg">
              <div className="absolute -bottom-12 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#002A5C] text-white">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h4 className="mb-2 font-medium text-[#002A5C]">AI Assistant</h4>
              <p className="mb-4 text-sm text-gray-600">
                Ask questions, get insights, and validate requirements with our AI assistant. It's available throughout
                the system to help you.
              </p>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  {currentTourStep} of {totalTourSteps}
                </span>
                <Button size="sm" onClick={handleNextTourStep} className="bg-[#002A5C] text-white hover:bg-[#003c80]">
                  Finish <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onSkip} className="text-gray-700">
          Skip Tour
        </Button>
        <Button onClick={handleNextTourStep} className="bg-[#002A5C] text-white hover:bg-[#003c80]">
          {currentTourStep < totalTourSteps ? "Next" : "Finish"} <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
