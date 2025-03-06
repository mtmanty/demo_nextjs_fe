"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Info, Phone, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { performAction } from "@/lib/actions"

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [actionResult, setActionResult] = useState<string | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuAction = async (action: string) => {
    setActionResult("Loading...")
    try {
      const result = await performAction(action)
      setActionResult(result)
      // Auto-hide the result after 3 seconds
      setTimeout(() => setActionResult(null), 3000)
    } catch (error) {
      setActionResult("Error occurred")
      setTimeout(() => setActionResult(null), 3000)
    }

    // Close menu after action
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">MobileSite</span>
        </Link>

        <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Desktop navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" onClick={() => handleMenuAction("home")}>
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button variant="ghost" onClick={() => handleMenuAction("about")}>
            <Info className="h-4 w-4 mr-2" />
            About
          </Button>
          <Button variant="ghost" onClick={() => handleMenuAction("contact")}>
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button variant="ghost" onClick={() => handleMenuAction("settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </nav>
      </div>

      {/* Mobile menu - slides in from the right */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg transform transition-transform duration-200 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-4">
            <Button variant="ghost" className="justify-start" onClick={() => handleMenuAction("home")}>
              <Home className="h-5 w-5 mr-3" />
              Home
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => handleMenuAction("about")}>
              <Info className="h-5 w-5 mr-3" />
              About
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => handleMenuAction("contact")}>
              <Phone className="h-5 w-5 mr-3" />
              Contact
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => handleMenuAction("settings")}>
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
          </nav>
        </div>
      </div>

      {/* Action result notification */}
      {actionResult && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-[90%] max-w-md bg-primary text-primary-foreground p-3 rounded-md shadow-lg text-center">
          {actionResult}
        </div>
      )}
    </header>
  )
}

