"use client"

import { Search, ShoppingCart, Phone, ChevronDown, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { CartIcon } from "@/components/cart-icon"
import { CartDrawer } from "@/components/cart-drawer"

export default function CheckoutPage() {
  const { state, getTotalPrice } = useCart()
  
  const suggestedProducts = [
    { name: "Cotton", price: 159.0 },
    { name: "Chemicals", price: 159.0 },
    { name: "Oil", price: 159.0 },
  ]

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <header className="bg-[#e5e7eb] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#9ca3af] rounded-full"></div>
              <span className="font-semibold text-[#000000]">Tijarat</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="text-[#374151] hover:text-[#000000]">
                Home
              </Link>
              <Link href="/checkout" className="text-[#000000] font-medium">
                Checkout
              </Link>
              <Link href="/payment" className="text-[#374151] hover:text-[#000000]">
                Payment
              </Link>
              <Link href="/review-order" className="text-[#374151] hover:text-[#000000]">
                Review Order
              </Link>
              <Link href="/reviews" className="text-[#374151] hover:text-[#000000]">
                Reviews
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <CartIcon className="text-[#374151] hover:text-[#000000]" />
            <Search className="w-5 h-5 text-[#374151]" />
            <div className="flex items-center space-x-2 text-[#374151]">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+1 (650) 555-0111</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-[#374151]">BabarAzam</span>
              <ChevronDown className="w-4 h-4 text-[#374151]" />
            </div>
            <Button className="bg-[#535353] text-[#ffffff] hover:bg-[#374151]">Contact us</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-[#6b7280] mb-6">
            <Link href="/" className="hover:text-[#374151]">Home</Link>
            <span>/</span>
            <Link href="/product-details" className="hover:text-[#374151]">Product Details</Link>
            <span>/</span>
            <span className="text-[#000000] font-medium">Checkout</span>
          </div>
          
          <h1 className="text-2xl font-semibold text-[#000000] mb-8">Order overview</h1>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Section - Cart Items */}
            <div className="col-span-2">
              <h2 className="text-lg font-medium text-[#000000] mb-6">Your Order</h2>

              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#6b7280] mb-4">Your cart is empty</p>
                  <Link href="/">
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <Card key={item.product.id} className="p-4 border border-[#d1d5db] shadow-none">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#e5e7eb] rounded-lg flex items-center justify-center">
                          <div className="w-8 h-8 bg-[#9ca3af] rounded-full opacity-50"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-[#000000]">{item.product.name}</h3>
                          <p className="text-[#6b7280] text-sm">Category: {item.product.category}</p>
                          <p className="text-[#6b7280] text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#000000]">$ {(item.product.price * item.quantity).toFixed(2)}</p>
                          <p className="text-[#6b7280] text-sm">$ {item.product.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Right Section - Order Summary */}
            <div className="col-span-1">
              <Card className="p-6 border border-[#d1d5db] shadow-none">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Subtotal</span>
                    <span className="text-[#000000]">$ {getTotalPrice().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Taxes</span>
                    <span className="text-[#000000]">$ 0.00</span>
                  </div>

                  <hr className="border-[#e5e7eb]" />

                  <div className="flex justify-between font-semibold">
                    <span className="text-[#000000]">Total</span>
                    <span className="text-[#000000]">$ {getTotalPrice().toFixed(2)}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link href="/payment">
                      <Button className="w-full bg-[#535353] text-[#ffffff] hover:bg-[#374151]">CONFIRM ORDER</Button>
                    </Link>

                    <Link href="/">
                      <Button
                        variant="outline"
                        className="w-full border-[#d1d5db] text-[#374151] hover:bg-[#e5e7eb] bg-transparent"
                      >
                        Continue shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              <div className="mt-4 text-center">
                <a href="#" className="text-[#6b7280] text-sm hover:text-[#374151]">
                  Optional delivery
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] border-t border-[#e5e7eb] px-6 py-12 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-12 mb-8">
            {/* Useful Links */}
            <div>
              <h3 className="font-semibold text-[#000000] mb-4">Useful Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-[#6b7280] hover:text-[#374151]">
                  About
                </a>
                <a href="#" className="block text-[#6b7280] hover:text-[#374151]">
                  About us
                </a>
                <a href="#" className="block text-[#6b7280] hover:text-[#374151]">
                  Products
                </a>
                <a href="#" className="block text-[#6b7280] hover:text-[#374151]">
                  Services
                </a>
                <a href="#" className="block text-[#6b7280] hover:text-[#374151]">
                  Legal
                </a>
                <a href="#" className="block text-[#6b7280] hover:text-[#374151]">
                  Contact us
                </a>
              </div>
            </div>

            {/* About us */}
            <div>
              <h3 className="font-semibold text-[#000000] mb-4">About us</h3>
              <p className="text-[#6b7280] mb-4">
                We are a team of passionate people whose goal is to improve everyone's life through disruptive products.
                We build great products to solve your business problems.
              </p>
              <p className="text-[#6b7280]">
                Our products are designed for small to medium size companies willing to optimize their performance.
              </p>
            </div>

            {/* Connect with us */}
            <div>
              <h3 className="font-semibold text-[#000000] mb-4">Connect with us</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-[#6b7280]">
                  <span>Contact us</span>
                </div>
                <div className="flex items-center space-x-2 text-[#6b7280]">
                  <span>BabarAzam@Tijarat.com</span>
                </div>
                <div className="flex items-center space-x-2 text-[#6b7280]">
                  <Phone className="w-4 h-4" />
                  <span>+1 (650) 555-0111</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-[#e5e7eb] rounded-full flex items-center justify-center">
                  <Facebook className="w-4 h-4 text-[#6b7280]" />
                </div>
                <div className="w-8 h-8 bg-[#e5e7eb] rounded-full flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-[#6b7280]" />
                </div>
                <div className="w-8 h-8 bg-[#e5e7eb] rounded-full flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-[#6b7280]" />
                </div>
                <div className="w-8 h-8 bg-[#e5e7eb] rounded-full flex items-center justify-center">
                  <Twitter className="w-4 h-4 text-[#6b7280]" />
                </div>
                <div className="w-8 h-8 bg-[#e5e7eb] rounded-full flex items-center justify-center">
                  <Youtube className="w-4 h-4 text-[#6b7280]" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-[#e5e7eb] pt-4">
            <p className="text-[#6b7280] text-sm">BabarAzam@Tijarat.com</p>
          </div>
        </div>
      </footer>
      
      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  )
}
