"use client"

import { useState } from "react"
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  ArrowLeft,
  Menu,
  Settings,
  LogOut,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { toast } from "sonner"

export default function SellerProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set())

  // Sample products data
  const products = [
    { 
      id: 1, 
      name: "Premium Cotton", 
      price: 159.0, 
      category: "Cotton", 
      stock: 45, 
      status: "active", 
      sales: 24,
      revenue: 3816.00,
      image: "/placeholder.jpg"
    },
    { 
      id: 2, 
      name: "Organic Cotton", 
      price: 189.0, 
      category: "Cotton", 
      stock: 32, 
      status: "active", 
      sales: 18,
      revenue: 3402.00,
      image: "/placeholder.jpg"
    },
    { 
      id: 3, 
      name: "Industrial Chemicals", 
      price: 299.0, 
      category: "Chemicals", 
      stock: 15, 
      status: "active", 
      sales: 12,
      revenue: 3588.00,
      image: "/placeholder.jpg"
    },
    { 
      id: 4, 
      name: "Refined Oil", 
      price: 89.0, 
      category: "Oil", 
      stock: 67, 
      status: "active", 
      sales: 31,
      revenue: 2759.00,
      image: "/placeholder.jpg"
    },
    { 
      id: 5, 
      name: "Crude Oil", 
      price: 120.0, 
      category: "Oil", 
      stock: 23, 
      status: "low-stock", 
      sales: 15,
      revenue: 1800.00,
      image: "/placeholder.jpg"
    },
    { 
      id: 6, 
      name: "Specialty Chemicals", 
      price: 450.0, 
      category: "Chemicals", 
      stock: 8, 
      status: "low-stock", 
      sales: 8,
      revenue: 3600.00,
      image: "/placeholder.jpg"
    },
    { 
      id: 7, 
      name: "Cooking Oil", 
      price: 65.0, 
      category: "Oil", 
      stock: 0, 
      status: "out-of-stock", 
      sales: 42,
      revenue: 2730.00,
      image: "/placeholder.jpg"
    },
    { 
      id: 8, 
      name: "Raw Cotton", 
      price: 135.0, 
      category: "Cotton", 
      stock: 28, 
      status: "active", 
      sales: 28,
      revenue: 3780.00,
      image: "/placeholder.jpg"
    },
  ]

  const categories = ["all", "Cotton", "Oil", "Chemicals", "Wool", "Polyester", "Metal", "Plastic"]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "stock-low":
        return a.stock - b.stock
      case "sales-high":
        return b.sales - a.sales
      default:
        return 0
    }
  })

  const toggleProductSelection = (productId: number) => {
    const newSelection = new Set(selectedProducts)
    if (newSelection.has(productId)) {
      newSelection.delete(productId)
    } else {
      newSelection.add(productId)
    }
    setSelectedProducts(newSelection)
  }

  const selectAllProducts = () => {
    if (selectedProducts.size === sortedProducts.length) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(sortedProducts.map(p => p.id)))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "low-stock": return "bg-yellow-100 text-yellow-800"
      case "out-of-stock": return "bg-red-100 text-red-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active"
      case "low-stock": return "Low Stock"
      case "out-of-stock": return "Out of Stock"
      case "inactive": return "Inactive"
      default: return "Unknown"
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedProducts.size === 0) {
      toast("Please select products first")
      return
    }
    
    switch (action) {
      case "activate":
        toast(`Activated ${selectedProducts.size} products`)
        break
      case "deactivate":
        toast(`Deactivated ${selectedProducts.size} products`)
        break
      case "delete":
        toast(`Deleted ${selectedProducts.size} products`)
        break
      case "export":
        toast(`Exported ${selectedProducts.size} products`)
        break
    }
    setSelectedProducts(new Set())
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted-foreground rounded-full"></div>
              <span className="font-semibold text-foreground">Tijarat Seller</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/seller/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/seller/products" className="text-foreground font-medium">
                Products
              </Link>
              <Link href="/seller/orders" className="text-muted-foreground hover:text-foreground">
                Orders
              </Link>
              <Link href="/seller/analytics" className="text-muted-foreground hover:text-foreground">
                Analytics
              </Link>
              <Link href="/seller/settings" className="text-muted-foreground hover:text-foreground">
                Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>BA</AvatarFallback>
                  </Avatar>
                  <span>BabarAzam</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Seller Navigation</SheetTitle>
                  <SheetDescription>Manage your seller account</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link href="/seller/dashboard">
                    <Button variant="ghost" className="justify-start w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/seller/products">
                    <Button variant="ghost" className="justify-start w-full">
                      Products
                    </Button>
                  </Link>
                  <Link href="/seller/orders">
                    <Button variant="ghost" className="justify-start w-full">
                      Orders
                    </Button>
                  </Link>
                  <Link href="/seller/analytics">
                    <Button variant="ghost" className="justify-start w-full">
                      Analytics
                    </Button>
                  </Link>
                  <Link href="/seller/settings">
                    <Button variant="ghost" className="justify-start w-full">
                      Settings
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
              <Link href="/seller/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Product Management</h1>
                <p className="text-muted-foreground">Manage your product catalog and inventory</p>
              </div>
            </div>
            <Link href="/seller/products/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Category
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {categories.map((category) => (
                        <DropdownMenuItem
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category === "all" ? "All Categories" : category}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Sort: {sortBy === "name" ? "Name" : sortBy === "price-low" ? "Price: Low to High" : sortBy === "price-high" ? "Price: High to Low" : sortBy === "stock-low" ? "Stock: Low to High" : "Sales: High to Low"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("stock-low")}>Stock: Low to High</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("sales-high")}>Sales: High to Low</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedProducts.size > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("activate")}>
                      Activate
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("deactivate")}>
                      Deactivate
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")}>
                      Export
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleBulkAction("delete")}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Table/Grid */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Products ({sortedProducts.length})</CardTitle>
                  <CardDescription>Manage your product catalog</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedProducts.size === sortedProducts.length && sortedProducts.length > 0}
                    onCheckedChange={selectAllProducts}
                  />
                  <Label className="text-sm">Select All</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        checked={selectedProducts.has(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                      />
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-medium">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.sales} sales</p>
                        <p className="text-sm text-muted-foreground">${product.revenue.toFixed(2)}</p>
                      </div>
                      <Badge className={getStatusColor(product.status)}>
                        {getStatusText(product.status)}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            Manage Inventory
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}










