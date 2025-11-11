"use client"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  Phone,
  ChevronDown,
  ChevronLeft,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  User,
  Settings,
  LogOut,
  Star,
  Paperclip,
  Minus,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"
import { CartDrawer } from "@/components/cart-drawer"

export default function CustomerReviews() {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  const existingReviews = [
    {
      id: 1,
      name: "Tijarat, Babar Azam",
      date: "Mar 11, 2024, 11:20:52 AM",
      rating: 5,
      comment: "This Company is really cool.",
      avatar: "BA",
    },
    {
      id: 2,
      name: "Leo Messi, Customer",
      date: "Mar 11, 2024, 11:20:52 AM",
      rating: 5,
      comment: "I am happy :)",
      avatar: "LM",
    },
  ]

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast("Please select a rating")
      return
    }
    if (!reviewText.trim()) {
      toast("Please write a review")
      return
    }

    toast("Review submitted successfully!")
    setRating(0)
    setReviewText("")
  }

  const renderStars = (currentRating: number, interactive = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 cursor-pointer transition-colors ${
              star <= currentRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-400"
            }`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted-foreground rounded-full"></div>
              <span className="font-semibold text-foreground">Tijarat</span>
            </Link>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                    Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <div className="row-span-3">
                        <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">Categories</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Browse our wide selection of products across different categories.
                          </p>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/checkout" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                      Checkout
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/payment" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                      Payment
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/review-order" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                      Review Order
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/reviews" className="text-foreground font-medium px-3 py-2">
                      Reviews
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center space-x-4">
            <CartIcon />
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+1 (650) 555-0111</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>BA</AvatarFallback>
                  </Avatar>
                  <span>BabarAzam</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Contact us</Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Browse our website sections</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link href="/">
                    <Button variant="ghost" className="justify-start w-full">
                    Home
                  </Button>
                  </Link>
                  <Link href="/checkout">
                    <Button variant="ghost" className="justify-start w-full">
                      Checkout
                  </Button>
                  </Link>
                  <Link href="/payment">
                    <Button variant="ghost" className="justify-start w-full">
                      Payment
                  </Button>
                  </Link>
                  <Link href="/review-order">
                    <Button variant="ghost" className="justify-start w-full">
                      Review Order
                  </Button>
                  </Link>
                  <Link href="/reviews">
                    <Button variant="ghost" className="justify-start w-full">
                      Reviews
                  </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/product-details" className="hover:text-foreground">Product Details</Link>
            <span>/</span>
            <Link href="/checkout" className="hover:text-foreground">Checkout</Link>
            <span>/</span>
            <Link href="/payment" className="hover:text-foreground">Payment</Link>
            <span>/</span>
            <Link href="/review-order" className="hover:text-foreground">Review Order</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Reviews</span>
          </div>
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Customer Reviews</h1>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Shopping
                </Button>
              </Link>
            <Button variant="ghost" size="icon">
              <Minus className="w-5 h-5" />
            </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - Write Review */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Avatar and Rating */}
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-muted">
                        <User className="w-6 h-6 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">{renderStars(rating, true)}</div>
                  </div>

                  {/* Review Text Area */}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Write a message..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleSubmitReview}>Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Section - Existing Reviews */}
            <div className="space-y-6">
              {existingReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-muted text-muted-foreground">{review.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="font-medium text-foreground">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">Published on {review.date}</p>
                        </div>
                        {renderStars(review.rating)}
                        <p className="text-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t px-6 py-12 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Useful Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Useful Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About us
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Legal
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact us
                </a>
              </div>
            </div>

            {/* About us */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">About us</h3>
              <p className="text-muted-foreground mb-4">
                We are a team of passionate people whose goal is to improve everyone's life through disruptive products.
                We build great products to solve your business problems.
              </p>
              <p className="text-muted-foreground">
                Our products are designed for small to medium size companies willing to optimize their performance.
              </p>
            </div>

            {/* Connect with us */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect with us</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>Contact us</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>BabarAzam@Tijarat.com</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+1 (650) 555-0111</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <Separator className="mb-4" />
          <p className="text-muted-foreground text-sm">BabarAzam@Tijarat.com</p>
        </div>
      </footer>
      
      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  )
}
