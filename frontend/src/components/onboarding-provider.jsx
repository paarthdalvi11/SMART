"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id?: string
  fullName: string
  role: string
  organization: string
  profileImage?: string
  onboarded: boolean
}

type OnboardingContextType = {
  user: User | null
  isOnboarded: boolean
  updateUser: (userData: Partial<User>) => Promise<void>
  completeOnboarding: () => Promise<void>
}

const defaultUser: User = {
  fullName: "",
  role: "",
  organization: "",
  onboarded: false,
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user data from database on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Assuming you have an API route to fetch the current user
        const response = await fetch('/api/user')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          // If no user exists yet, use the default
          setUser(defaultUser)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUser(defaultUser)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const updateUser = async (userData: Partial<User>) => {
    try {
      const updatedUser = { ...(user || defaultUser), ...userData }
      
      // Send update to the database via API
      const response = await fetch('/api/user', {
        method: user?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })

      if (response.ok) {
        const result = await response.json()
        setUser(result)
        return result
      } else {
        throw new Error('Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  const completeOnboarding = async () => {
    await updateUser({ onboarded: true })
  }

  if (loading) {
    return <div>Loading user data...</div>
  }

  return (
    <OnboardingContext.Provider
      value={{
        user,
        isOnboarded: user?.onboarded || false,
        updateUser,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}