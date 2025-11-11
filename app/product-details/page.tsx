"use client"

import { useState } from "react"
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
  User,
  Settings,
  LogOut,
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  Paperclip,
  Menu,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCart, Product } from "@/lib/cart-context"
import { CartIcon } from "@/components/cart-icon"
import { CartDrawer } from "@/components/cart-drawer"
import { toast } from "sonner"
import Link from "next/link"

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedLegs, setSelectedLegs] = useState("steel")
  const [selectedColor, setSelectedColor] = useState("white")
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [favorites, setFavorites] = useState(new Set())
  const { addToCart } = useCart()

  const product: Product = {
    id: 1,
    name: "Cotton",
    price: 159.0,
    category: "Cotton",
    rating: 4.5,
    reviews: 0
  }

  const productImages = [
    "/placeholder.jpg",
    "/placeholder.jpg", 
    "/placeholder.jpg",
    "/placeholder.jpg"
  ]

  const relatedProducts: Product[] = [
    { id: 2, name: "Wool", price: 159.0, category: "Wool", rating: 4.3, reviews: 12 },
    { id: 3, name: "Polyester", price: 159.0, category: "Polyester", rating: 4.1, reviews: 8 },
    { id: 4, name: "Plastic", price: 159.0, category: "Plastic", rating: 4.0, reviews: 15 },
    { id: 5, name: "Metal", price: 159.0, category: "Metal", rating: 4.2, reviews: 6 }
  ]

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

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      name: `${product.name} (${selectedLegs.charAt(0).toUpperCase() + selectedLegs.slice(1)})`,
      price: selectedLegs === "aluminium" ? product.price + 50.40 : product.price
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productWithOptions)
    }
    
    toast(`${product.name} added to cart`)
  }

  const toggleFavorite = () => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(product.id)) {
      newFavorites.delete(product.id)
      toast("Removed from favorites")
    } else {
      newFavorites.add(product.id)
      toast("Added to favorites")
    }
    setFavorites(newFavorites)
  }

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
    <TooltipProvider>
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
                      <Link href="/reviews" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                        Reviews
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <CartIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shopping Cart</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Search className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>
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

        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">All products</Link>
              <span>/</span>
              <span className="text-foreground">Stagg EKG Electric Kettle</span>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="w-24 h-24 bg-muted-foreground rounded-full opacity-50"></div>
                </div>
                
                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer border-2 transition-colors ${
                        selectedImage === index ? "border-foreground" : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <div className="w-8 h-8 bg-muted-foreground rounded-full opacity-50"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Product Information */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-2 mb-4">
                    {renderStars(product.rating)}
                    <span className="text-sm text-muted-foreground">({product.reviews} review)</span>
                  </div>
                  <p className="text-muted-foreground mb-4">Cotton is cool</p>
                  <p className="text-3xl font-bold text-foreground">$ {product.price.toFixed(2)}</p>
                </div>

                {/* LEGS Options */}
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">LEGS</h3>
                  <RadioGroup value={selectedLegs} onValueChange={setSelectedLegs}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="steel" id="steel" />
                      <Label htmlFor="steel" className="text-foreground">Steel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aluminium" id="aluminium" />
                      <Label htmlFor="aluminium" className="text-foreground">Aluminium +$50.40</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="text-foreground">Custom</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* COLOR Options */}
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">COLOR</h3>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                        selectedColor === "white" ? "border-foreground" : "border-muted-foreground"
                      }`}
                      style={{ backgroundColor: "white" }}
                      onClick={() => setSelectedColor("white")}
                    />
                    <div
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                        selectedColor === "black" ? "border-foreground" : "border-muted-foreground"
                      }`}
                      style={{ backgroundColor: "#374151" }}
                      onClick={() => setSelectedColor("black")}
                    />
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg" onClick={handleAddToCart}>
                    Add to cart
                  </Button>
                  <Link href="/checkout">
                    <Button variant="outline" className="w-full" size="lg">
                      Continue to Cart
                    </Button>
                  </Link>
                  <div className="flex space-x-4">
                    <Button variant="ghost" onClick={toggleFavorite}>
                      <Heart className={`w-4 h-4 mr-2 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                      Add to wishlist
                    </Button>
                    <Button variant="ghost">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compare
                    </Button>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Terms and Conditions</p>
                  <p>30-day money-back guarantee</p>
                  <p>Shipping: 2-3 Business Days</p>
                </div>

                {/* Social Sharing */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Share:</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <User className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-foreground mb-8">You might also like those products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                        <div className="w-12 h-12 bg-muted-foreground rounded-full opacity-50"></div>
                        {relatedProduct.id === 2 && (
                          <div className="absolute top-2 left-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6 bg-background/80 backdrop-blur-sm">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        {relatedProduct.id === 5 && (
                          <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6 bg-background/80 backdrop-blur-sm">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-foreground">{relatedProduct.name}</h3>
                        <p className="text-foreground font-semibold">$ {relatedProduct.price.toFixed(2)}</p>
                        <Button size="sm" className="w-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-foreground mb-8">Specifications</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Legs</span>
                      <span className="text-muted-foreground">Steel or Aluminium or Custom</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Color</span>
                      <span className="text-muted-foreground">White or Black</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Reviews */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-foreground mb-8">Customer Reviews</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Write Review */}
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

                {/* Existing Reviews */}
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
    </TooltipProvider>
  )
}
