"use client"

import { Button } from "@/components/ui/button"
import { FileText, Upload, PlayCircle } from "lucide-react"

interface ActionStepProps {
  userData: {
    fullName: string
    role: string
    organization: string
  }
  onComplete: () => void
}

export default function ActionStep({ userData, onComplete }: ActionStepProps) {
  return (
    <div className="py-6">
      <div className="mb-8 rounded-lg bg-[#002A5C]/10 p-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-[#002A5C]">You're all set, {userData.fullName}!</h2>
        <p className="text-gray-600">
          Your account is ready to use. Start your first requirement session or explore the system.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium text-[#002A5C]">Start your first requirement session</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Button
            onClick={onComplete}
            className="flex h-auto flex-col items-center justify-center gap-3 bg-white p-6 text-[#002A5C] hover:bg-[#002A5C] hover:text-white"
            variant="outline"
          >
            <FileText className="h-8 w-8" />
            <span className="text-center font-medium">Start New Requirement Session</span>
            <span className="text-center text-xs">Create a new project and define requirements</span>
          </Button>

          <Button
            onClick={onComplete}
            className="flex h-auto flex-col items-center justify-center gap-3 bg-white p-6 text-[#002A5C] hover:bg-[#002A5C] hover:text-white"
            variant="outline"
          >
            <Upload className="h-8 w-8" />
            <span className="text-center font-medium">Upload Files</span>
            <span className="text-center text-xs">Extract requirements from existing documents</span>
          </Button>

          <Button
            onClick={onComplete}
            className="flex h-auto flex-col items-center justify-center gap-3 bg-white p-6 text-[#002A5C] hover:bg-[#002A5C] hover:text-white"
            variant="outline"
          >
            <PlayCircle className="h-8 w-8" />
            <span className="text-center font-medium">Learn How It Works</span>
            <span className="text-center text-xs">Watch a quick tutorial video</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-medium text-[#002A5C]">Your account information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Full Name</p>
            <p className="text-[#002A5C]">{userData.fullName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="text-[#002A5C]">{userData.role}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Organization</p>
            <p className="text-[#002A5C]">{userData.organization}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={onComplete} className="bg-[#002A5C] px-8 text-white hover:bg-[#003c80]">
          Take Me to Dashboard
        </Button>
      </div>
    </div>
  )
}
