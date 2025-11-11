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
  MapPin,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  Upload,
  RefreshCw,
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { toast } from "sonner"

export default function AdvancedInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState("overview")

  // Sample inventory data with multi-location support
  const inventoryItems = [
    { 
      id: 1, 
      sku: "COT-001", 
      name: "Premium Cotton", 
      category: "Cotton", 
      totalStock: 150,
      locations: [
        { name: "Main Warehouse", stock: 80, reserved: 10, available: 70, status: "normal" },
        { name: "Distribution Center A", stock: 45, reserved: 5, available: 40, status: "normal" },
        { name: "Retail Store 1", stock: 25, reserved: 2, available: 23, status: "low" }
      ],
      unitCost: 45.50,
      sellingPrice: 159.00,
      reorderPoint: 30,
      reorderQuantity: 100,
      supplier: "Cotton Suppliers Ltd",
      lastUpdated: "2024-01-15",
      status: "active",
      abcCategory: "A",
      turnoverRate: 8.5,
      demandForecast: 120
    },
    { 
      id: 2, 
      sku: "CHEM-002", 
      name: "Industrial Chemicals", 
      category: "Chemicals", 
      totalStock: 75,
      locations: [
        { name: "Main Warehouse", stock: 50, reserved: 8, available: 42, status: "normal" },
        { name: "Distribution Center B", stock: 25, reserved: 3, available: 22, status: "normal" }
      ],
      unitCost: 120.00,
      sellingPrice: 299.00,
      reorderPoint: 20,
      reorderQuantity: 50,
      supplier: "Chemical Solutions Inc",
      lastUpdated: "2024-01-14",
      status: "active",
      abcCategory: "A",
      turnoverRate: 6.2,
      demandForecast: 85
    },
    { 
      id: 3, 
      sku: "OIL-003", 
      name: "Refined Oil", 
      category: "Oil", 
      totalStock: 200,
      locations: [
        { name: "Main Warehouse", stock: 120, reserved: 15, available: 105, status: "normal" },
        { name: "Distribution Center A", stock: 50, reserved: 5, available: 45, status: "normal" },
        { name: "Distribution Center B", stock: 30, reserved: 2, available: 28, status: "normal" }
      ],
      unitCost: 25.00,
      sellingPrice: 89.00,
      reorderPoint: 50,
      reorderQuantity: 150,
      supplier: "Oil Refineries Co",
      lastUpdated: "2024-01-13",
      status: "active",
      abcCategory: "B",
      turnoverRate: 12.3,
      demandForecast: 180
    },
    { 
      id: 4, 
      sku: "OIL-004", 
      name: "Cooking Oil", 
      category: "Oil", 
      totalStock: 0,
      locations: [
        { name: "Main Warehouse", stock: 0, reserved: 0, available: 0, status: "out" },
        { name: "Retail Store 1", stock: 0, reserved: 0, available: 0, status: "out" }
      ],
      unitCost: 18.00,
      sellingPrice: 65.00,
      reorderPoint: 25,
      reorderQuantity: 100,
      supplier: "Cooking Oil Suppliers",
      lastUpdated: "2024-01-10",
      status: "out-of-stock",
      abcCategory: "C",
      turnoverRate: 15.8,
      demandForecast: 95
    },
  ]

  const locations = ["all", "Main Warehouse", "Distribution Center A", "Distribution Center B", "Retail Store 1"]
  const categories = ["all", "Cotton", "Oil", "Chemicals", "Wool", "Polyester", "Metal", "Plastic"]

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === "all" || 
                           item.locations.some(loc => loc.name === selectedLocation)
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesLocation && matchesCategory
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "sku":
        return a.sku.localeCompare(b.sku)
      case "stock-low":
        return a.totalStock - b.totalStock
      case "stock-high":
        return b.totalStock - a.totalStock
      case "turnover-high":
        return b.turnoverRate - a.turnoverRate
      case "abc":
        return a.abcCategory.localeCompare(b.abcCategory)
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800"
      case "low": return "bg-yellow-100 text-yellow-800"
      case "out": return "bg-red-100 text-red-800"
      case "active": return "bg-green-100 text-green-800"
      case "out-of-stock": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal": return <CheckCircle className="w-4 h-4" />
      case "low": return <AlertTriangle className="w-4 h-4" />
      case "out": return <AlertTriangle className="w-4 h-4" />
      case "active": return <CheckCircle className="w-4 h-4" />
      case "out-of-stock": return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getABCCategoryColor = (category: string) => {
    switch (category) {
      case "A": return "bg-red-100 text-red-800"
      case "B": return "bg-yellow-100 text-yellow-800"
      case "C": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const toggleItemSelection = (itemId: number) => {
    const newSelection = new Set(selectedItems)
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId)
    } else {
      newSelection.add(itemId)
    }
    setSelectedItems(newSelection)
  }

  const selectAllItems = () => {
    if (selectedItems.size === sortedItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(sortedItems.map(item => item.id)))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedItems.size === 0) {
      toast("Please select items first")
      return
    }
    
    switch (action) {
      case "reorder":
        toast(`Generated reorder requests for ${selectedItems.size} items`)
        break
      case "transfer":
        toast(`Initiated transfer for ${selectedItems.size} items`)
        break
      case "adjust":
        toast(`Opened adjustment form for ${selectedItems.size} items`)
        break
      case "export":
        toast(`Exported ${selectedItems.size} items`)
        break
    }
    setSelectedItems(new Set())
  }

  // Calculate summary statistics
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.totalStock * item.unitCost), 0)
  const lowStockItems = inventoryItems.filter(item => item.totalStock <= item.reorderPoint).length
  const outOfStockItems = inventoryItems.filter(item => item.totalStock === 0).length
  const totalSKUs = inventoryItems.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted-foreground rounded-full"></div>
              <span className="font-semibold text-foreground">Tijarat SCM-ERP</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/seller/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/seller/inventory" className="text-foreground font-medium">
                Inventory
              </Link>
              <Link href="/seller/suppliers" className="text-muted-foreground hover:text-foreground">
                Suppliers
              </Link>
              <Link href="/seller/procurement" className="text-muted-foreground hover:text-foreground">
                Procurement
              </Link>
              <Link href="/seller/warehouse" className="text-muted-foreground hover:text-foreground">
                Warehouse
              </Link>
              <Link href="/seller/analytics" className="text-muted-foreground hover:text-foreground">
                Analytics
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
                  <SheetTitle>SCM-ERP Navigation</SheetTitle>
                  <SheetDescription>Advanced business management</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link href="/seller/dashboard">
                    <Button variant="ghost" className="justify-start w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/seller/inventory">
                    <Button variant="ghost" className="justify-start w-full">
                      Inventory
                    </Button>
                  </Link>
                  <Link href="/seller/suppliers">
                    <Button variant="ghost" className="justify-start w-full">
                      Suppliers
                    </Button>
                  </Link>
                  <Link href="/seller/procurement">
                    <Button variant="ghost" className="justify-start w-full">
                      Procurement
                    </Button>
                  </Link>
                  <Link href="/seller/warehouse">
                    <Button variant="ghost" className="justify-start w-full">
                      Warehouse
                    </Button>
                  </Link>
                  <Link href="/seller/analytics">
                    <Button variant="ghost" className="justify-start w-full">
                      Analytics
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
                <h1 className="text-3xl font-bold text-foreground">Advanced Inventory Management</h1>
                <p className="text-muted-foreground">Multi-location inventory tracking and optimization</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSKUs}</div>
                <p className="text-xs text-muted-foreground">
                  Active inventory items
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Inventory valuation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
                <p className="text-xs text-muted-foreground">
                  Items need reordering
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
                <p className="text-xs text-muted-foreground">
                  Items unavailable
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by SKU, name, or category..."
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
                        <MapPin className="w-4 h-4 mr-2" />
                        Location
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {locations.map((location) => (
                        <DropdownMenuItem
                          key={location}
                          onClick={() => setSelectedLocation(location)}
                        >
                          {location === "all" ? "All Locations" : location}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                        Sort: {sortBy === "name" ? "Name" : sortBy === "sku" ? "SKU" : sortBy === "stock-low" ? "Stock: Low to High" : sortBy === "stock-high" ? "Stock: High to Low" : sortBy === "turnover-high" ? "Turnover: High to Low" : "ABC Category"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("sku")}>SKU</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("stock-low")}>Stock: Low to High</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("stock-high")}>Stock: High to Low</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("turnover-high")}>Turnover: High to Low</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("abc")}>ABC Category</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedItems.size > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("reorder")}>
                      Generate Reorder
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("transfer")}>
                      Transfer Stock
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("adjust")}>
                      Adjust Inventory
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")}>
                      Export Selected
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inventory Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventory Items ({sortedItems.length})</CardTitle>
                  <CardDescription>Multi-location inventory tracking</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedItems.size === sortedItems.length && sortedItems.length > 0}
                    onCheckedChange={selectAllItems}
                  />
                  <Label className="text-sm">Select All</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sortedItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={selectedItems.has(item.id)}
                          onCheckedChange={() => toggleItemSelection(item.id)}
                        />
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{item.name}</h3>
                            <Badge variant="outline">{item.sku}</Badge>
                            <Badge className={getABCCategoryColor(item.abcCategory)}>
                              ABC-{item.abcCategory}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.category} • {item.supplier}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{item.status.replace('-', ' ')}</span>
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
                              Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Item Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Stock Summary */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Stock Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Stock:</span>
                            <span className="font-medium">{item.totalStock} units</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Unit Cost:</span>
                            <span className="font-medium">${item.unitCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Selling Price:</span>
                            <span className="font-medium">${item.sellingPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Turnover Rate:</span>
                            <span className="font-medium">{item.turnoverRate}x/year</span>
                          </div>
                        </div>
                      </div>

                      {/* Location Details */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Location Details</h4>
                        <div className="space-y-2">
                          {item.locations.map((location, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <div>
                                <span className="font-medium">{location.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-muted-foreground">
                                    {location.available} available
                                  </span>
                                  {location.reserved > 0 && (
                                    <span className="text-muted-foreground">
                                      ({location.reserved} reserved)
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Badge className={getStatusColor(location.status)}>
                                {location.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reorder Information */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Reorder Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Reorder Point:</span>
                            <span className="font-medium">{item.reorderPoint} units</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Reorder Qty:</span>
                            <span className="font-medium">{item.reorderQuantity} units</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Demand Forecast:</span>
                            <span className="font-medium">{item.demandForecast} units</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Last Updated:</span>
                            <span className="font-medium">{item.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stock Level Indicator */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Stock Level vs Reorder Point</span>
                        <span className={item.totalStock <= item.reorderPoint ? "text-red-600" : "text-green-600"}>
                          {item.totalStock <= item.reorderPoint ? "Needs Reorder" : "Stock OK"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            item.totalStock <= item.reorderPoint ? "bg-red-500" : 
                            item.totalStock <= item.reorderPoint * 1.5 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          style={{ width: `${Math.min((item.totalStock / (item.reorderPoint * 3)) * 100, 100)}%` }}
                        ></div>
                      </div>
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










