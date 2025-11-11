"use client"

import { useState } from "react"
import {
  Building2,
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
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  DollarSign,
  Package,
  Calendar,
  Users,
  Award,
  Shield,
  Download,
  Upload,
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { toast } from "sonner"

export default function SupplierManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [selectedSuppliers, setSelectedSuppliers] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState("overview")

  // Sample suppliers data
  const suppliers = [
    {
      id: 1,
      name: "Cotton Suppliers Ltd",
      category: "Raw Materials",
      status: "active",
      rating: 4.8,
      totalOrders: 156,
      totalValue: 2450000,
      onTimeDelivery: 96.5,
      qualityScore: 4.7,
      paymentTerms: "Net 30",
      leadTime: "7-14 days",
      contact: {
        primary: "John Smith",
        email: "john@cottonsuppliers.com",
        phone: "+1-555-0123",
        address: "123 Cotton Street, Textile City, TC 12345"
      },
      website: "www.cottonsuppliers.com",
      certifications: ["ISO 9001", "OEKO-TEX", "GOTS"],
      riskLevel: "Low",
      lastOrder: "2024-01-15",
      nextReview: "2024-04-15",
      products: ["Premium Cotton", "Organic Cotton", "Raw Cotton"],
      performance: {
        delivery: 96.5,
        quality: 94.2,
        communication: 98.1,
        pricing: 89.3
      }
    },
    {
      id: 2,
      name: "Chemical Solutions Inc",
      category: "Chemicals",
      status: "active",
      rating: 4.6,
      totalOrders: 89,
      totalValue: 1890000,
      onTimeDelivery: 92.3,
      qualityScore: 4.5,
      paymentTerms: "Net 45",
      leadTime: "14-21 days",
      contact: {
        primary: "Sarah Johnson",
        email: "sarah@chemicalsolutions.com",
        phone: "+1-555-0456",
        address: "456 Chemical Ave, Industrial Park, IP 67890"
      },
      website: "www.chemicalsolutions.com",
      certifications: ["ISO 14001", "REACH", "FDA Approved"],
      riskLevel: "Medium",
      lastOrder: "2024-01-12",
      nextReview: "2024-03-12",
      products: ["Industrial Chemicals", "Specialty Chemicals", "Lab Chemicals"],
      performance: {
        delivery: 92.3,
        quality: 91.8,
        communication: 95.4,
        pricing: 87.6
      }
    },
    {
      id: 3,
      name: "Oil Refineries Co",
      category: "Oil & Gas",
      status: "active",
      rating: 4.9,
      totalOrders: 234,
      totalValue: 3200000,
      onTimeDelivery: 98.7,
      qualityScore: 4.8,
      paymentTerms: "Net 15",
      leadTime: "3-7 days",
      contact: {
        primary: "Michael Brown",
        email: "michael@oilrefineries.com",
        phone: "+1-555-0789",
        address: "789 Refinery Road, Energy City, EC 11111"
      },
      website: "www.oilrefineries.com",
      certifications: ["ISO 9001", "API", "HACCP"],
      riskLevel: "Low",
      lastOrder: "2024-01-14",
      nextReview: "2024-07-14",
      products: ["Refined Oil", "Cooking Oil", "Crude Oil"],
      performance: {
        delivery: 98.7,
        quality: 96.4,
        communication: 97.8,
        pricing: 92.1
      }
    },
    {
      id: 4,
      name: "Cooking Oil Suppliers",
      category: "Food & Beverage",
      status: "inactive",
      rating: 3.2,
      totalOrders: 45,
      totalValue: 890000,
      onTimeDelivery: 78.9,
      qualityScore: 3.8,
      paymentTerms: "Net 60",
      leadTime: "21-30 days",
      contact: {
        primary: "Lisa Davis",
        email: "lisa@cookingoilsuppliers.com",
        phone: "+1-555-0321",
        address: "321 Food Street, Culinary City, CC 22222"
      },
      website: "www.cookingoilsuppliers.com",
      certifications: ["HACCP", "Kosher"],
      riskLevel: "High",
      lastOrder: "2023-12-20",
      nextReview: "2024-02-20",
      products: ["Cooking Oil", "Vegetable Oil"],
      performance: {
        delivery: 78.9,
        quality: 82.1,
        communication: 75.3,
        pricing: 85.7
      }
    },
    {
      id: 5,
      name: "Textile Manufacturers Group",
      category: "Manufacturing",
      status: "active",
      rating: 4.4,
      totalOrders: 78,
      totalValue: 1560000,
      onTimeDelivery: 89.2,
      qualityScore: 4.3,
      paymentTerms: "Net 30",
      leadTime: "10-15 days",
      contact: {
        primary: "Robert Wilson",
        email: "robert@textilemanufacturers.com",
        phone: "+1-555-0654",
        address: "654 Manufacturing Blvd, Textile City, TC 33333"
      },
      website: "www.textilemanufacturers.com",
      certifications: ["ISO 9001", "WRAP", "BSCI"],
      riskLevel: "Medium",
      lastOrder: "2024-01-10",
      nextReview: "2024-05-10",
      products: ["Cotton Fabric", "Polyester Fabric", "Wool Fabric"],
      performance: {
        delivery: 89.2,
        quality: 88.7,
        communication: 91.5,
        pricing: 86.9
      }
    }
  ]

  const categories = ["all", "Raw Materials", "Chemicals", "Oil & Gas", "Food & Beverage", "Manufacturing", "Packaging", "Services"]
  const statuses = ["all", "active", "inactive", "pending", "suspended"]
  const ratings = ["all", "5.0", "4.5+", "4.0+", "3.5+", "3.0+"]

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.contact.primary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || supplier.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || supplier.status === selectedStatus
    const matchesRating = selectedRating === "all" || 
                         (selectedRating === "5.0" && supplier.rating >= 5.0) ||
                         (selectedRating === "4.5+" && supplier.rating >= 4.5) ||
                         (selectedRating === "4.0+" && supplier.rating >= 4.0) ||
                         (selectedRating === "3.5+" && supplier.rating >= 3.5) ||
                         (selectedRating === "3.0+" && supplier.rating >= 3.0)
    return matchesSearch && matchesCategory && matchesStatus && matchesRating
  })

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "rating":
        return b.rating - a.rating
      case "orders":
        return b.totalOrders - a.totalOrders
      case "value":
        return b.totalValue - a.totalValue
      case "delivery":
        return b.onTimeDelivery - a.onTimeDelivery
      case "risk":
        return a.riskLevel.localeCompare(b.riskLevel)
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "suspended": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "High": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))
  }

  const toggleSupplierSelection = (supplierId: number) => {
    const newSelection = new Set(selectedSuppliers)
    if (newSelection.has(supplierId)) {
      newSelection.delete(supplierId)
    } else {
      newSelection.add(supplierId)
    }
    setSelectedSuppliers(newSelection)
  }

  const selectAllSuppliers = () => {
    if (selectedSuppliers.size === sortedSuppliers.length) {
      setSelectedSuppliers(new Set())
    } else {
      setSelectedSuppliers(new Set(sortedSuppliers.map(s => s.id)))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedSuppliers.size === 0) {
      toast("Please select suppliers first")
      return
    }
    
    switch (action) {
      case "activate":
        toast(`Activated ${selectedSuppliers.size} suppliers`)
        break
      case "deactivate":
        toast(`Deactivated ${selectedSuppliers.size} suppliers`)
        break
      case "export":
        toast(`Exported ${selectedSuppliers.size} suppliers`)
        break
      case "review":
        toast(`Scheduled review for ${selectedSuppliers.size} suppliers`)
        break
    }
    setSelectedSuppliers(new Set())
  }

  // Calculate summary statistics
  const totalSuppliers = suppliers.length
  const activeSuppliers = suppliers.filter(s => s.status === "active").length
  const highRiskSuppliers = suppliers.filter(s => s.riskLevel === "High").length
  const avgRating = suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length

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
              <Link href="/seller/inventory" className="text-muted-foreground hover:text-foreground">
                Inventory
              </Link>
              <Link href="/seller/suppliers" className="text-foreground font-medium">
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
                <h1 className="text-3xl font-bold text-foreground">Supplier Management</h1>
                <p className="text-muted-foreground">Manage supplier relationships and performance</p>
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
                Add Supplier
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSuppliers}</div>
                <p className="text-xs text-muted-foreground">
                  {activeSuppliers} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  Overall performance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{highRiskSuppliers}</div>
                <p className="text-xs text-muted-foreground">
                  Need attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${suppliers.reduce((sum, s) => sum + s.totalValue, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Lifetime purchases
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
                      placeholder="Search suppliers, contacts, or categories..."
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
                        Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statuses.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                        >
                          {status === "all" ? "All Statuses" : status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Rating
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {ratings.map((rating) => (
                        <DropdownMenuItem
                          key={rating}
                          onClick={() => setSelectedRating(rating)}
                        >
                          {rating === "all" ? "All Ratings" : `${rating} stars`}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Sort: {sortBy === "name" ? "Name" : sortBy === "rating" ? "Rating" : sortBy === "orders" ? "Orders" : sortBy === "value" ? "Value" : sortBy === "delivery" ? "Delivery" : "Risk"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("orders")}>Total Orders</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("value")}>Total Value</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("delivery")}>Delivery Performance</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("risk")}>Risk Level</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedSuppliers.size > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedSuppliers.size} supplier{selectedSuppliers.size !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("activate")}>
                      Activate
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("deactivate")}>
                      Deactivate
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("review")}>
                      Schedule Review
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")}>
                      Export Selected
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suppliers List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Suppliers ({sortedSuppliers.length})</CardTitle>
                  <CardDescription>Supplier performance and relationship management</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedSuppliers.size === sortedSuppliers.length && sortedSuppliers.length > 0}
                    onCheckedChange={selectAllSuppliers}
                  />
                  <Label className="text-sm">Select All</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sortedSuppliers.map((supplier) => (
                  <div key={supplier.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={selectedSuppliers.has(supplier.id)}
                          onCheckedChange={() => toggleSupplierSelection(supplier.id)}
                        />
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{supplier.name}</h3>
                            <Badge className={getStatusColor(supplier.status)}>
                              {supplier.status}
                            </Badge>
                            <Badge className={getRiskColor(supplier.riskLevel)}>
                              {supplier.riskLevel} Risk
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{supplier.category}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {getRatingStars(supplier.rating)}
                            <span className="text-sm text-muted-foreground ml-1">
                              ({supplier.rating.toFixed(1)})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
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
                              Edit Supplier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Contracts
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="mr-2 h-4 w-4" />
                              View Products
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Supplier
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Supplier Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Contact Information */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{supplier.contact.primary}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{supplier.contact.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{supplier.contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="truncate">{supplier.contact.address}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <span>{supplier.website}</span>
                          </div>
                        </div>
                      </div>

                      {/* Business Information */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Business Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Payment Terms:</span>
                            <span className="font-medium">{supplier.paymentTerms}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Lead Time:</span>
                            <span className="font-medium">{supplier.leadTime}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total Orders:</span>
                            <span className="font-medium">{supplier.totalOrders}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total Value:</span>
                            <span className="font-medium">${supplier.totalValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Last Order:</span>
                            <span className="font-medium">{supplier.lastOrder}</span>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Performance Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>On-Time Delivery:</span>
                            <span className="font-medium">{supplier.onTimeDelivery}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Quality Score:</span>
                            <span className="font-medium">{supplier.qualityScore}/5.0</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Communication:</span>
                            <span className="font-medium">{supplier.performance.communication}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Pricing:</span>
                            <span className="font-medium">{supplier.performance.pricing}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Next Review:</span>
                            <span className="font-medium">{supplier.nextReview}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="mt-4">
                      <h4 className="font-medium text-sm mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {supplier.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Products */}
                    <div className="mt-4">
                      <h4 className="font-medium text-sm mb-2">Products Supplied</h4>
                      <div className="flex flex-wrap gap-2">
                        {supplier.products.map((product, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {product}
                          </Badge>
                        ))}
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










