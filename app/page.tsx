"use client"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  Phone,
  ChevronDown,
  Grid3X3,
  List,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  User,
  Settings,
  LogOut,
  Eye,
  Heart,
  Star,
  Filter,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import Link from "next/link"
import { useCart, Product } from "@/lib/cart-context"
import { CartIcon } from "@/components/cart-icon"
import { CartDrawer } from "@/components/cart-drawer"

export default function TijaratEcommerce() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const { addToCart } = useCart()

  const products: Product[] = [
    { id: 1, name: "Premium Cotton", price: 159.0, category: "Cotton", rating: 4.5, reviews: 24 },
    { id: 2, name: "Organic Cotton", price: 189.0, category: "Cotton", rating: 4.8, reviews: 18 },
    { id: 3, name: "Industrial Chemicals", price: 299.0, category: "Chemicals", rating: 4.2, reviews: 12 },
    { id: 4, name: "Refined Oil", price: 89.0, category: "Oil", rating: 4.6, reviews: 31 },
    { id: 5, name: "Crude Oil", price: 120.0, category: "Oil", rating: 4.3, reviews: 15 },
    { id: 6, name: "Specialty Chemicals", price: 450.0, category: "Chemicals", rating: 4.7, reviews: 8 },
    { id: 7, name: "Cooking Oil", price: 65.0, category: "Oil", rating: 4.4, reviews: 42 },
    { id: 8, name: "Raw Cotton", price: 135.0, category: "Cotton", rating: 4.1, reviews: 28 },
    { id: 9, name: "Lab Chemicals", price: 380.0, category: "Chemicals", rating: 4.9, reviews: 6 },
    { id: 10, name: "Essential Oil", price: 95.0, category: "Oil", rating: 4.5, reviews: 19 },
    { id: 11, name: "Cotton Fabric", price: 175.0, category: "Cotton", rating: 4.3, reviews: 22 },
    { id: 12, name: "Cleaning Chemicals", price: 220.0, category: "Chemicals", rating: 4.0, reviews: 14 },
  ]

  const categories = ["Cotton", "Wheat", "Rice", "Oil", "Sugar", "Chemicals", "Plastic"]

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
      toast("Removed from favorites")
    } else {
      newFavorites.add(productId)
      toast("Added to favorites")
    }
    setFavorites(newFavorites)
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast(`${product.name} added to cart`)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <header className="bg-muted px-6 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted-foreground rounded-full"></div>
                <span className="font-semibold text-foreground">Tijarat</span>
              </div>
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
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/product-details" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                        Product Details
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                        Wishlist
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                        Contact
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
                  <Link href="/search">
                    <Button variant="ghost" size="icon">
                      <Search className="w-5 h-5" />
                    </Button>
                  </Link>
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
              <Link href="/contact">
                <Button variant="outline">Contact us</Button>
              </Link>
              <Link href="/seller/auth/login">
                <Button>Sell on Tijarat</Button>
              </Link>
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
                    <Link href="/product-details">
                      <Button variant="ghost" className="justify-start w-full">
                        Product Details
                      </Button>
                    </Link>
                    <Link href="/wishlist">
                      <Button variant="ghost" className="justify-start w-full">
                        Wishlist
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="ghost" className="justify-start w-full">
                        Contact
                      </Button>
                    </Link>
                    <Link href="/seller/auth/login">
                      <Button variant="ghost" className="justify-start w-full">
                        Sell on Tijarat
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <div className="flex">
          <aside className="hidden lg:block w-64 p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Legs Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Legs</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="steel" />
                      <Label htmlFor="steel" className="text-muted-foreground">
                        Steel
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="aluminium" />
                      <Label htmlFor="aluminium" className="text-muted-foreground">
                        Aluminium
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="custom" />
                      <Label htmlFor="custom" className="text-muted-foreground">
                        Custom
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Size Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Size</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="xs" />
                      <Label htmlFor="xs" className="text-muted-foreground">
                        XS
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="s" checked />
                      <Label htmlFor="s" className="text-muted-foreground">
                        S
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m" />
                      <Label htmlFor="m" className="text-muted-foreground">
                        M
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="l" />
                      <Label htmlFor="l" className="text-muted-foreground">
                        L
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="xl" />
                      <Label htmlFor="xl" className="text-muted-foreground">
                        XL
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Credibility Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Credibility</h3>
                  <RadioGroup defaultValue="non-verified">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="verified" id="verified" />
                      <Label htmlFor="verified" className="text-muted-foreground">
                        Verified
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-verified" id="non-verified" />
                      <Label htmlFor="non-verified" className="text-muted-foreground">
                        Non-verified
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1 p-6">
            <Tabs defaultValue="all" className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Input placeholder="Search products..." className="w-80 pr-10" />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <span>Public Pricelist</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Public Pricelist</DropdownMenuItem>
                      <DropdownMenuItem>Private Pricelist</DropdownMenuItem>
                      <DropdownMenuItem>Wholesale Prices</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <span>Sort By: Featured</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Featured</DropdownMenuItem>
                      <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                      <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                      <DropdownMenuItem>Newest</DropdownMenuItem>
                      <DropdownMenuItem>Best Rating</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={viewMode === "grid" ? "default" : "ghost"}
                          size="icon"
                          onClick={() => setViewMode("grid")}
                        >
                          <Grid3X3 className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Grid View</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={viewMode === "list" ? "default" : "ghost"}
                          size="icon"
                          onClick={() => setViewMode("list")}
                        >
                          <List className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>List View</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="new">New Arrivals</TabsTrigger>
                <TabsTrigger value="sale">On Sale</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge key={category} variant="outline" className="cursor-pointer hover:bg-accent">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  {products.map((product) => (
                    <HoverCard key={product.id}>
                      <HoverCardTrigger asChild>
                        <Link href="/product-details">
                          <Card className="cursor-pointer hover:shadow-md transition-shadow group">
                            <CardContent className="p-4">
                              <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                <div className="w-12 h-12 bg-muted-foreground rounded-full opacity-50"></div>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      toggleFavorite(product.id)
                                    }}
                                  >
                                    <Heart
                                      className={`w-4 h-4 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : ""}`}
                                    />
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-medium text-foreground">{product.name}</h3>
                                <div className="flex items-center space-x-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i < Math.floor(product.rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                                </div>
                                <p className="text-foreground font-semibold">${product.price.toFixed(2)}</p>
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1 bg-transparent"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                    }}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="flex-1" 
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      handleAddToCart(product)
                                    }}
                                  >
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            High-quality {product.category.toLowerCase()} product with excellent reviews.
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{product.category}</Badge>
                            <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Featured products will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="new">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">New arrivals will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="sale">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Sale products will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </main>
        </div>

        <footer className="bg-background border-t px-6 py-12">
          <div className="grid grid-cols-3 gap-12 mb-8">
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
        </footer>
        
        {/* Cart Drawer */}
        <CartDrawer />
      </div>
    </TooltipProvider>
  )
}
