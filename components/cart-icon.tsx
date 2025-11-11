"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"

interface CartIconProps {
  className?: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

export function CartIcon({ className, variant = "ghost", size = "icon" }: CartIconProps) {
  const { toggleCart, getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        onClick={toggleCart}
        className={className}
      >
        <ShoppingCart className="w-5 h-5" />
      </Button>
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </div>
  )
}

