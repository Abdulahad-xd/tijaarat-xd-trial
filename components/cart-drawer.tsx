"use client"

import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export function CartDrawer() {
  const { state, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart()

  return (
    <Sheet open={state.isOpen} onOpenChange={() => {}}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
            {getTotalItems() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getTotalItems()}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            {getTotalItems() === 0 
              ? "Your cart is empty" 
              : `${getTotalItems()} item${getTotalItems() === 1 ? '' : 's'} in your cart`
            }
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">Add some products to get started</p>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-muted-foreground rounded-full opacity-50"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.product.category}</p>
                    <p className="text-sm font-medium text-foreground">${item.product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Link href="/checkout" className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link href="/" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
