"use client"

import {
  Search,
  ShoppingCart,
  Phone,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"
import { CartDrawer } from "@/components/cart-drawer"

export default function ReviewOrderPage() {
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
              <Link href="/checkout" className="text-[#374151] hover:text-[#000000]">
                Checkout
              </Link>
              <Link href="/payment" className="text-[#374151] hover:text-[#000000]">
                Payment
              </Link>
              <Link href="/review-order" className="text-[#000000] font-medium">
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
          <div className="flex items-center space-x-2 text-[#6b7280] mb-8">
            <Link href="/" className="hover:text-[#374151]">Home</Link>
            <span>/</span>
            <Link href="/product-details" className="hover:text-[#374151]">Product Details</Link>
            <span>/</span>
            <Link href="/checkout" className="hover:text-[#374151]">Checkout</Link>
            <span>/</span>
            <Link href="/payment" className="hover:text-[#374151]">Payment</Link>
            <span>/</span>
            <span className="text-[#000000] font-medium">Review Order</span>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Section - Order Items */}
            <div className="col-span-2 space-y-6">
              {/* Order Item */}
              <Card className="p-6 border border-[#d1d5db] shadow-none">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#e5e7eb] rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#9ca3af] rounded-full opacity-50"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#000000]">2x Conference Chair (Steel)</h3>
                    <p className="text-[#6b7280] text-sm">$ 66.00</p>
                  </div>
                </div>
              </Card>

              {/* Address Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-[#000000]">Address</h2>

                {/* Billing */}
                <Card className="p-4 border border-[#d1d5db] shadow-none">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-[#000000] mb-1">Billing</h3>
                      <p className="text-[#6b7280] text-sm">Your Company, Mitchell Admin</p>
                      <p className="text-[#6b7280] text-sm">215 Vine St Scranton PA 18503 United States</p>
                      <Button variant="link" className="text-[#6b7280] p-0 h-auto text-sm">
                        Add address
                      </Button>
                    </div>
                    <Button variant="link" className="text-[#6b7280] p-0 h-auto text-sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </Card>

                {/* Shipping */}
                <Card className="p-4 border border-[#d1d5db] shadow-none">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-[#000000] mb-1">Shipping</h3>
                      <p className="text-[#6b7280] text-sm">Your Company, Mitchell Admin</p>
                      <p className="text-[#6b7280] text-sm">215 Vine St Scranton PA 18503 United States</p>
                      <Button variant="link" className="text-[#6b7280] p-0 h-auto text-sm">
                        Add address
                      </Button>
                    </div>
                    <Button variant="link" className="text-[#6b7280] p-0 h-auto text-sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="col-span-1 space-y-6">
              {/* Delivery Info */}
              <Card className="p-4 border border-[#d1d5db] shadow-none">
                <div className="flex justify-between items-center">
                  <span className="text-[#6b7280]">Delivery</span>
                  <span className="text-[#000000]">$ 50.00</span>
                </div>
              </Card>

              {/* Order Summary */}
              <Card className="p-6 border border-[#d1d5db] shadow-none">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Subtotal</span>
                    <span className="text-[#000000]">$ 66.00</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Taxes</span>
                    <span className="text-[#000000]">$ 9.90</span>
                  </div>

                  <hr className="border-[#e5e7eb]" />

                  <div className="flex justify-between font-semibold">
                    <span className="text-[#000000]">Total</span>
                    <span className="text-[#000000]">$ 133.40</span>
                  </div>

                  {/* Gift Card Section */}
                  <div className="pt-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Gift card or discount code..." className="flex-1 border-[#d1d5db]" />
                      <Button variant="outline" className="border-[#d1d5db] text-[#374151] bg-transparent">
                        Apply
                      </Button>
                    </div>
                  </div>

                  {/* Free Product Offer */}
                  <Card className="p-4 bg-[#f9fafb] border border-[#e5e7eb]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#000000] text-sm">Free Product - Simple Pen</h4>
                        <p className="text-[#6b7280] text-xs">You have 1400.70 Loyalty Points</p>
                        <p className="text-[#6b7280] text-xs">Costs 5 Loyalty Points</p>
                      </div>
                      <Button size="sm" className="bg-[#535353] text-[#ffffff] hover:bg-[#374151]">
                        Claim
                      </Button>
                    </div>
                  </Card>

                  <div className="space-y-3 pt-4">
                    <Link href="/reviews">
                      <Button className="w-full bg-[#535353] text-[#ffffff] hover:bg-[#374151]">Confirm</Button>
                    </Link>

                    <div className="text-center text-[#6b7280] text-sm">or</div>

                    <Link href="/checkout">
                      <Button
                        variant="outline"
                        className="w-full border-[#d1d5db] text-[#374151] hover:bg-[#e5e7eb] bg-transparent"
                      >
                        Back to cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
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
