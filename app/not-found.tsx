"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-6 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Page not found</h1>
        <p className="text-muted-foreground max-w-md">
          The page you’re looking for doesn’t exist or has been moved. Check the URL or return to the home page.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline">Contact Support</Button>
        </Link>
      </div>
    </div>
  )
}

