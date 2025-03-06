import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mobile-First Experience</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Optimized for your mobile device with powerful backend capabilities.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="#features">
              <Button>Get Started</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=300&text=App Preview"
              width={300}
              height={400}
              alt="Mobile app preview"
              className="rounded-lg"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

