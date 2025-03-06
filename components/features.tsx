"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { performAction } from "@/lib/actions"

export function Features() {
  const [actionStates, setActionStates] = useState<Record<string, "idle" | "loading" | "success" | "error">>({
    feature1: "idle",
    feature2: "idle",
    feature3: "idle",
    feature4: "idle",
  })

  const [results, setResults] = useState<Record<string, string>>({})

  const handleAction = async (feature: string, action: string) => {
    setActionStates((prev) => ({ ...prev, [feature]: "loading" }))

    try {
      const result = await performAction(action)
      setActionStates((prev) => ({ ...prev, [feature]: "success" }))
      setResults((prev) => ({ ...prev, [feature]: result }))

      // Reset to idle after 2 seconds
      setTimeout(() => {
        setActionStates((prev) => ({ ...prev, [feature]: "idle" }))
      }, 2000)
    } catch (error) {
      setActionStates((prev) => ({ ...prev, [feature]: "error" }))
      setResults((prev) => ({ ...prev, [feature]: "Error occurred" }))

      // Reset to idle after 2 seconds
      setTimeout(() => {
        setActionStates((prev) => ({ ...prev, [feature]: "idle" }))
      }, 2000)
    }
  }

  const renderButton = (feature: string, action: string, label: string) => {
    const state = actionStates[feature]

    return (
      <Button onClick={() => handleAction(feature, action)} disabled={state === "loading"} className="w-full">
        {state === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {state === "success" && <CheckCircle className="mr-2 h-4 w-4" />}
        {state === "error" && <AlertCircle className="mr-2 h-4 w-4" />}
        {label}
      </Button>
    )
  }

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Explore our powerful features with backend capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Hello World</CardTitle>
              <CardDescription>Call /hello endpoint</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-start space-y-2">
              {renderButton("feature1", "processData", "Call /hello")}
              {results.feature1 && <p className="text-sm mt-2">{results.feature1}</p>}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error page</CardTitle>
              <CardDescription>Backend thrown exception</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-start space-y-2">
              {renderButton("feature2", "fetchError", "Fetch error")}
              {results.feature2 && <p className="text-sm mt-2">{results.feature2}</p>}
            </CardFooter>
          </Card>

        </div>
      </div>
    </section>
  )
}

