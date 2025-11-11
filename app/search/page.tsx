"use client"

import { useState, useEffect } from "react"
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
  Eye,
  Filter,
  Menu,
  X,
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCart, Product } from "@/lib/cart-context"
import { CartIcon } from "@/components/cart-icon"
import { CartDrawer } from "@/components/cart-drawer"
import { toast } from "sonner"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [filteredResults, setFilteredResults] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState(new Set())
  const { addToCart } = useCart()
  const searchParams = useSearchParams()

  // Sample products database
  const allProducts: Product[] = [
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
    { id: 13, name: "Wool", price: 159.0, category: "Wool", rating: 4.3, reviews: 12 },
    { id: 14, name: "Polyester", price: 159.0, category: "Polyester", rating: 4.1, reviews: 8 },
    { id: 15, name: "Plastic", price: 159.0, category: "Plastic", rating: 4.0, reviews: 15 },
    { id: 16, name: "Metal", price: 159.0, category: "Metal", rating: 4.2, reviews: 6 },
  ]

  const categories = ["all", "Cotton", "Wheat", "Rice", "Oil", "Sugar", "Chemicals", "Plastic", "Wool", "Polyester", "Metal"]

  useEffect(() => {
    const query = searchParams.get('q') || ""
    setSearchQuery(query)
    performSearch(query)
  }, [searchParams])

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(allProducts)
      setFilteredResults(allProducts)
      return
    }

    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    )
    
    setSearchResults(results)
    setFilteredResults(results)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)
  }

  const applyFilters = () => {
    let filtered = [...searchResults]

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredResults(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [selectedCategory, priceRange, sortBy, searchResults])

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

        {/* Search Bar */}
        <div className="px-6 py-4 border-b bg-background">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>

        <div className="flex">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-64 p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <Label htmlFor={category} className="text-muted-foreground capitalize">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20"
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Sort Options */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Sort By</h3>
                  <RadioGroup value={sortBy} onValueChange={setSortBy}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="relevance" id="relevance" />
                      <Label htmlFor="relevance" className="text-muted-foreground">Relevance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price-low" id="price-low" />
                      <Label htmlFor="price-low" className="text-muted-foreground">Price: Low to High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price-high" id="price-high" />
                      <Label htmlFor="price-high" className="text-muted-foreground">Price: High to Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rating" id="rating" />
                      <Label htmlFor="rating" className="text-muted-foreground">Rating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reviews" id="reviews" />
                      <Label htmlFor="reviews" className="text-muted-foreground">Reviews</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
                </h1>
                <p className="text-muted-foreground">
                  {filteredResults.length} product{filteredResults.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <div className="flex flex-col gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Results Grid */}
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setPriceRange([0, 1000])
                  setSortBy("relevance")
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredResults.map((product) => (
                  <Card key={product.id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                        <div className="w-12 h-12 bg-muted-foreground rounded-full opacity-50"></div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                            onClick={() => toggleFavorite(product.id)}
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
                          <Link href="/product-details">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Button size="sm" className="flex-1" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Cart Drawer */}
        <CartDrawer />
      </div>
    </TooltipProvider>
  )
}

