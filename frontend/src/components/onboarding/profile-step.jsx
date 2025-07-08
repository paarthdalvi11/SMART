"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"

interface ProfileStepProps {
  onSubmit: (data: { fullName: string; role: string; organization: string }) => void
}

export default function ProfileStep({ onSubmit }: ProfileStepProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    organization: "",
  })
  const [errors, setErrors] = useState({
    fullName: "",
    role: "",
    organization: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors = {
      fullName: formData.fullName ? "" : "Full name is required",
      role: formData.role ? "" : "Role is required",
      organization: formData.organization ? "" : "Organization name is required",
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="mx-auto max-w-md py-6">
      <h2 className="mb-6 text-center text-2xl font-bold text-[#002A5C]">Set Up Your Profile</h2>
      <p className="mb-8 text-center text-gray-600">
        Tell us a bit about yourself so we can personalize your experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-[#002A5C]">
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`border-gray-300 focus:border-[#002A5C] focus:ring-[#002A5C] ${
              errors.fullName ? "border-red-500" : ""
            }`}
          />
          {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-[#002A5C]">
            Role
          </Label>
          <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
            <SelectTrigger
              id="role"
              className={`border-gray-300 focus:border-[#002A5C] focus:ring-[#002A5C] ${
                errors.role ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Lead">Lead</SelectItem>
              <SelectItem value="Reviewer">Reviewer</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Business Analyst">Business Analyst</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization" className="text-[#002A5C]">
            Organization Name
          </Label>
          <Input
            id="organization"
            placeholder="Enter your organization name"
            value={formData.organization}
            onChange={(e) => handleChange("organization", e.target.value)}
            className={`border-gray-300 focus:border-[#002A5C] focus:ring-[#002A5C] ${
              errors.organization ? "border-red-500" : ""
            }`}
          />
          {errors.organization && <p className="text-sm text-red-500">{errors.organization}</p>}
        </div>

        <Button type="submit" className="mt-8 w-full bg-[#002A5C] py-6 text-white hover:bg-[#003c80]">
          Continue <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}
