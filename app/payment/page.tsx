"use client"

import { Search, ShoppingCart, Phone, ChevronDown, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"
import { CartDrawer } from "@/components/cart-drawer"

export default function PaymentPage() {
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
              <Link href="/payment" className="text-[#000000] font-medium">
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
          <div className="flex items-center space-x-2 text-[#6b7280] mb-8">
            <Link href="/" className="hover:text-[#374151]">Home</Link>
            <span>/</span>
            <Link href="/product-details" className="hover:text-[#374151]">Product Details</Link>
            <span>/</span>
            <Link href="/checkout" className="hover:text-[#374151]">Checkout</Link>
            <span>/</span>
            <span className="text-[#000000] font-medium">Payment</span>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Section - Order Details & Payment */}
            <div className="col-span-2 space-y-6">
              {/* Confirm Order */}
              <div>
                <h2 className="text-lg font-medium text-[#000000] mb-4">Confirm order</h2>
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
              </div>

              {/* Billing & Shipping */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#6b7280] text-sm">
                      <span className="font-medium text-[#000000]">Billing & shipping :</span> 215 Vine St, Scranton PA
                      18503, United States
                    </p>
                  </div>
                  <Button variant="link" className="text-[#6b7280] p-0 h-auto text-sm">
                    Edit
                  </Button>
                </div>
              </div>

              {/* Delivery */}
              <div className="space-y-4">
                <h3 className="font-medium text-[#000000]">Delivery</h3>
                <p className="text-[#6b7280] text-sm">$ 50.00</p>
                <p className="text-[#6b7280] text-sm">Choose a delivery method</p>

                <RadioGroup defaultValue="standard" className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="text-[#374151]">
                      Standard delivery
                    </Label>
                    <span className="text-[#6b7280] text-sm ml-auto">$ 50.00</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="text-[#374151]">
                      [On Site Pick] My shop 1
                    </Label>
                    <span className="text-[#6b7280] text-sm ml-auto">Free</span>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-medium text-[#000000]">CHOOSE A PAYMENT METHOD</h3>
                <p className="text-[#6b7280] text-sm">Pay with</p>

                <Card className="p-4 border border-[#d1d5db] shadow-none">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#000000] mb-2">Demo</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#6b7280] text-sm">Paiement Details</span>
                          <span className="text-[#6b7280] text-sm">Paiement Status</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#374151] text-sm">XXXX XXXX XXXX XXXX</span>
                          <span className="text-green-600 text-sm">Successful</span>
                        </div>
                      </div>
                    </div>

                    <Link href="/review-order">
                      <Button className="w-full bg-[#535353] text-[#ffffff] hover:bg-[#374151]">Pay now</Button>
                    </Link>

                    <div className="space-y-2">
                      <p className="text-[#6b7280] text-xs">Helper text</p>
                      <p className="text-[#6b7280] text-xs">Helper text</p>
                      <p className="text-[#6b7280] text-xs">Secured by Demo</p>
                    </div>

                    <div className="text-center text-[#6b7280] text-sm">or</div>

                    <p className="text-[#6b7280] text-xs">Your payment details will be saved for automatic renewals.</p>
                  </div>
                </Card>
              </div>

              {/* Back to Cart */}
              <Link href="/checkout">
                <Button variant="outline" className="border-[#d1d5db] text-[#374151] hover:bg-[#e5e7eb] bg-transparent">
                  Back to cart
                </Button>
              </Link>
            </div>

            {/* Right Section - Order Summary */}
            <div className="col-span-1 space-y-6">
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

                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Standard delivery</span>
                    <span className="text-[#000000]">$ 50.00</span>
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
