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
  Eye,
  Menu,
  Trash2,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function WishlistPage() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3, 5, 7, 9]))
  const { addToCart } = useCart()

  // Sample products that are favorited
  const favoriteProducts: Product[] = [
    { id: 1, name: "Premium Cotton", price: 159.0, category: "Cotton", rating: 4.5, reviews: 24 },
    { id: 3, name: "Industrial Chemicals", price: 299.0, category: "Chemicals", rating: 4.2, reviews: 12 },
    { id: 5, name: "Crude Oil", price: 120.0, category: "Oil", rating: 4.3, reviews: 15 },
    { id: 7, name: "Cooking Oil", price: 65.0, category: "Oil", rating: 4.4, reviews: 42 },
    { id: 9, name: "Lab Chemicals", price: 380.0, category: "Chemicals", rating: 4.9, reviews: 6 },
  ]

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
      toast("Removed from wishlist")
    } else {
      newFavorites.add(productId)
      toast("Added to wishlist")
    }
    setFavorites(newFavorites)
  }

  const removeFromWishlist = (productId: number) => {
    const newFavorites = new Set(favorites)
    newFavorites.delete(productId)
    setFavorites(newFavorites)
    toast("Removed from wishlist")
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast(`${product.name} added to cart`)
  }

  const addAllToCart = () => {
    favoriteProducts.forEach(product => {
      if (favorites.has(product.id)) {
        addToCart(product)
      }
    })
    toast("All items added to cart")
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
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Shopping
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">My Wishlist</h1>
                  <p className="text-muted-foreground">
                    {favoriteProducts.length} item{favoriteProducts.length !== 1 ? 's' : ''} in your wishlist
                  </p>
                </div>
              </div>
              {favoriteProducts.length > 0 && (
                <Button onClick={addAllToCart}>
                  Add All to Cart
                </Button>
              )}
            </div>

            {/* Wishlist Items */}
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">Add some products to your wishlist to see them here</p>
                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                        <div className="w-12 h-12 bg-muted-foreground rounded-full opacity-50"></div>
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                            onClick={() => removeFromWishlist(product.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
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
                        <div className="flex space-x-2">
                          <Link href="/product-details" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            className="flex-1" 
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Cart Drawer */}
        <CartDrawer />
      </div>
    </TooltipProvider>
  )
}

