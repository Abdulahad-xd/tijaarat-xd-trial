"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  ArrowLeft,
  Menu,
  Settings,
  LogOut,
  Bell,
  Download,
  Filter,
  Calendar,
  Target,
  Award,
  Zap,
  Activity,
  PieChart,
  LineChart,
  RefreshCw,
  Eye,
  Share2,
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { toast } from "sonner"

export default function BusinessIntelligencePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")
  const [selectedView, setSelectedView] = useState("overview")
  const [activeTab, setActiveTab] = useState("overview")

  // Sample analytics data
  const kpiData = {
    revenue: {
      current: 1254300,
      previous: 1100000,
      growth: 14.0,
      target: 1500000
    },
    orders: {
      current: 1247,
      previous: 1100,
      growth: 13.4,
      target: 1500
    },
    customers: {
      current: 892,
      previous: 850,
      growth: 4.9,
      target: 1000
    },
    inventory: {
      current: 45000,
      previous: 42000,
      growth: 7.1,
      target: 50000
    }
  }

  const salesData = [
    { month: "Jan", revenue: 120000, orders: 150, customers: 45 },
    { month: "Feb", revenue: 135000, orders: 180, customers: 52 },
    { month: "Mar", revenue: 145000, orders: 195, customers: 58 },
    { month: "Apr", revenue: 160000, orders: 220, customers: 65 },
    { month: "May", revenue: 175000, orders: 240, customers: 72 },
    { month: "Jun", revenue: 190000, orders: 260, customers: 78 },
    { month: "Jul", revenue: 210000, orders: 285, customers: 85 },
    { month: "Aug", revenue: 195000, orders: 270, customers: 82 },
    { month: "Sep", revenue: 220000, orders: 300, customers: 90 },
    { month: "Oct", revenue: 235000, orders: 320, customers: 95 },
    { month: "Nov", revenue: 250000, orders: 340, customers: 100 },
    { month: "Dec", revenue: 275000, orders: 365, customers: 105 }
  ]

  const topProducts = [
    { name: "Premium Cotton", sales: 450, revenue: 71550, growth: 12.5, margin: 28.5 },
    { name: "Industrial Chemicals", sales: 320, revenue: 95680, growth: 8.3, margin: 35.2 },
    { name: "Refined Oil", sales: 670, revenue: 59630, growth: 15.2, margin: 22.8 },
    { name: "Cooking Oil", sales: 890, revenue: 57850, growth: 6.7, margin: 18.9 },
    { name: "Lab Chemicals", sales: 230, revenue: 87400, growth: 18.9, margin: 42.1 }
  ]

  const topCustomers = [
    { name: "Textile Manufacturing Co", orders: 45, revenue: 125000, growth: 15.2, status: "premium" },
    { name: "Chemical Solutions Ltd", orders: 38, revenue: 98000, growth: 8.7, status: "premium" },
    { name: "Oil Refineries Inc", orders: 32, revenue: 87000, growth: 12.3, status: "standard" },
    { name: "Food Processing Corp", orders: 28, revenue: 65000, growth: 5.4, status: "standard" },
    { name: "Laboratory Services", orders: 25, revenue: 58000, growth: 22.1, status: "premium" }
  ]

  const supplierPerformance = [
    { name: "Cotton Suppliers Ltd", delivery: 96.5, quality: 94.2, communication: 98.1, pricing: 89.3, overall: 94.5 },
    { name: "Chemical Solutions Inc", delivery: 92.3, quality: 91.8, communication: 95.4, pricing: 87.6, overall: 91.8 },
    { name: "Oil Refineries Co", delivery: 98.7, quality: 96.4, communication: 97.8, pricing: 92.1, overall: 96.3 },
    { name: "Textile Manufacturers Group", delivery: 89.2, quality: 88.7, communication: 91.5, pricing: 86.9, overall: 89.1 },
    { name: "Cooking Oil Suppliers", delivery: 78.9, quality: 82.1, communication: 75.3, pricing: 85.7, overall: 80.5 }
  ]

  const inventoryInsights = [
    { category: "Cotton", turnover: 8.5, value: 450000, growth: 12.3, efficiency: "high" },
    { category: "Chemicals", turnover: 6.2, value: 320000, growth: 8.7, efficiency: "medium" },
    { category: "Oil", turnover: 12.3, value: 280000, growth: 15.2, efficiency: "high" },
    { category: "Fabric", turnover: 4.8, value: 180000, growth: 6.1, efficiency: "low" },
    { category: "Metal", turnover: 3.2, value: 120000, growth: 2.3, efficiency: "low" }
  ]

  const demandForecast = [
    { month: "Jan 2024", forecast: 125000, actual: 120000, accuracy: 96.0 },
    { month: "Feb 2024", forecast: 130000, actual: 135000, accuracy: 96.2 },
    { month: "Mar 2024", forecast: 140000, actual: 145000, accuracy: 96.4 },
    { month: "Apr 2024", forecast: 155000, actual: 160000, accuracy: 96.8 },
    { month: "May 2024", forecast: 170000, actual: 175000, accuracy: 97.1 },
    { month: "Jun 2024", forecast: 185000, actual: 190000, accuracy: 97.3 }
  ]

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600"
    if (growth < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4" />
    if (growth < 0) return <TrendingDown className="w-4 h-4" />
    return <Activity className="w-4 h-4" />
  }

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "high": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "premium": return "bg-blue-100 text-blue-800"
      case "standard": return "bg-green-100 text-green-800"
      case "basic": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

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
              <Link href="/seller/suppliers" className="text-muted-foreground hover:text-foreground">
                Suppliers
              </Link>
              <Link href="/seller/procurement" className="text-muted-foreground hover:text-foreground">
                Procurement
              </Link>
              <Link href="/seller/warehouse" className="text-muted-foreground hover:text-foreground">
                Warehouse
              </Link>
              <Link href="/seller/analytics" className="text-foreground font-medium">
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
                <h1 className="text-3xl font-bold text-foreground">Business Intelligence</h1>
                <p className="text-muted-foreground">Advanced analytics and performance insights</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Dashboard
              </Button>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Period and View Selectors */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium">Period:</Label>
                  <RadioGroup value={selectedPeriod} onValueChange={setSelectedPeriod} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="7d" id="7d" />
                      <Label htmlFor="7d" className="text-sm">7 Days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30d" id="30d" />
                      <Label htmlFor="30d" className="text-sm">30 Days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="90d" id="90d" />
                      <Label htmlFor="90d" className="text-sm">90 Days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1y" id="1y" />
                      <Label htmlFor="1y" className="text-sm">1 Year</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium">View:</Label>
                  <RadioGroup value={selectedView} onValueChange={setSelectedView} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="overview" id="overview" />
                      <Label htmlFor="overview" className="text-sm">Overview</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="detailed" id="detailed" />
                      <Label htmlFor="detailed" className="text-sm">Detailed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comparative" id="comparative" />
                      <Label htmlFor="comparative" className="text-sm">Comparative</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
              <TabsTrigger value="inventory">Inventory Analytics</TabsTrigger>
              <TabsTrigger value="suppliers">Supplier Analytics</TabsTrigger>
              <TabsTrigger value="forecasting">Demand Forecasting</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${kpiData.revenue.current.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={getGrowthColor(kpiData.revenue.growth)}>
                        {getGrowthIcon(kpiData.revenue.growth)}
                      </span>
                      <span className={getGrowthColor(kpiData.revenue.growth)}>
                        +{kpiData.revenue.growth}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: ${kpiData.revenue.target.toLocaleString()}</span>
                        <span>{((kpiData.revenue.current / kpiData.revenue.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((kpiData.revenue.current / kpiData.revenue.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpiData.orders.current.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={getGrowthColor(kpiData.orders.growth)}>
                        {getGrowthIcon(kpiData.orders.growth)}
                      </span>
                      <span className={getGrowthColor(kpiData.orders.growth)}>
                        +{kpiData.orders.growth}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: {kpiData.orders.target.toLocaleString()}</span>
                        <span>{((kpiData.orders.current / kpiData.orders.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((kpiData.orders.current / kpiData.orders.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpiData.customers.current.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={getGrowthColor(kpiData.customers.growth)}>
                        {getGrowthIcon(kpiData.customers.growth)}
                      </span>
                      <span className={getGrowthColor(kpiData.customers.growth)}>
                        +{kpiData.customers.growth}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: {kpiData.customers.target.toLocaleString()}</span>
                        <span>{((kpiData.customers.current / kpiData.customers.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((kpiData.customers.current / kpiData.customers.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${kpiData.inventory.current.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={getGrowthColor(kpiData.inventory.growth)}>
                        {getGrowthIcon(kpiData.inventory.growth)}
                      </span>
                      <span className={getGrowthColor(kpiData.inventory.growth)}>
                        +{kpiData.inventory.growth}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: ${kpiData.inventory.target.toLocaleString()}</span>
                        <span>{((kpiData.inventory.current / kpiData.inventory.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((kpiData.inventory.current / kpiData.inventory.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center">
                        <LineChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Revenue trend chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Distribution</CardTitle>
                    <CardDescription>Orders by product category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Order distribution chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Best performing products by revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${product.revenue.toLocaleString()}</p>
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm ${getGrowthColor(product.growth)}`}>
                                {getGrowthIcon(product.growth)}
                              </span>
                              <span className={`text-sm ${getGrowthColor(product.growth)}`}>
                                +{product.growth}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Margin: {product.margin}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Customers</CardTitle>
                    <CardDescription>Highest value customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topCustomers.map((customer, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                              <Users className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-medium">{customer.name}</h3>
                              <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${customer.revenue.toLocaleString()}</p>
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm ${getGrowthColor(customer.growth)}`}>
                                {getGrowthIcon(customer.growth)}
                              </span>
                              <span className={`text-sm ${getGrowthColor(customer.growth)}`}>
                                +{customer.growth}%
                              </span>
                            </div>
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Performance</CardTitle>
                  <CardDescription>Category-wise inventory analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventoryInsights.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{category.category}</h3>
                            <p className="text-sm text-muted-foreground">Value: ${category.value.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="font-medium">{category.turnover}x</p>
                            <p className="text-xs text-muted-foreground">Turnover</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">+{category.growth}%</p>
                            <p className="text-xs text-muted-foreground">Growth</p>
                          </div>
                          <Badge className={getEfficiencyColor(category.efficiency)}>
                            {category.efficiency} efficiency
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suppliers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance</CardTitle>
                  <CardDescription>Comprehensive supplier evaluation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplierPerformance.map((supplier, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">{supplier.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-800">
                              {supplier.overall.toFixed(1)}/100
                            </Badge>
                            <Badge className={supplier.overall >= 90 ? "bg-green-100 text-green-800" : 
                                           supplier.overall >= 80 ? "bg-yellow-100 text-yellow-800" : 
                                           "bg-red-100 text-red-800"}>
                              {supplier.overall >= 90 ? "Excellent" : 
                               supplier.overall >= 80 ? "Good" : "Needs Improvement"}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{supplier.delivery}%</p>
                            <p className="text-sm text-muted-foreground">Delivery</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{supplier.quality}%</p>
                            <p className="text-sm text-muted-foreground">Quality</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{supplier.communication}%</p>
                            <p className="text-sm text-muted-foreground">Communication</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{supplier.pricing}%</p>
                            <p className="text-sm text-muted-foreground">Pricing</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forecasting" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demand Forecasting</CardTitle>
                  <CardDescription>AI-powered demand predictions and accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demandForecast.map((forecast, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{forecast.month}</h3>
                            <p className="text-sm text-muted-foreground">
                              Forecast: ${forecast.forecast.toLocaleString()} | 
                              Actual: ${forecast.actual.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="font-medium">{forecast.accuracy}%</p>
                            <p className="text-xs text-muted-foreground">Accuracy</p>
                          </div>
                          <Badge className={forecast.accuracy >= 95 ? "bg-green-100 text-green-800" : 
                                           forecast.accuracy >= 90 ? "bg-yellow-100 text-yellow-800" : 
                                           "bg-red-100 text-red-800"}>
                            {forecast.accuracy >= 95 ? "Excellent" : 
                             forecast.accuracy >= 90 ? "Good" : "Needs Improvement"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Reports</CardTitle>
                  <CardDescription>Generate comprehensive business reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Financial Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Revenue, costs, and profitability analysis</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Inventory Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Stock levels, turnover, and valuation</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Supplier Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Supplier performance and evaluation</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Sales Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Sales performance and trends</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Customer Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Customer analysis and segmentation</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Operational Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Warehouse and operational efficiency</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}










