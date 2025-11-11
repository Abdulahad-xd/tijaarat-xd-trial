"use client"

import { useState } from "react"
import {
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Bell,
  Settings,
  LogOut,
  Menu,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
// import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { toast } from "sonner"

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data
  const stats = {
    totalSales: 125430,
    totalOrders: 1247,
    totalProducts: 45,
    totalCustomers: 892,
    monthlyGrowth: 12.5,
    orderGrowth: 8.3,
    productGrowth: 15.2,
    customerGrowth: 6.7
  }

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", product: "Premium Cotton", amount: 159.00, status: "pending", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", product: "Industrial Chemicals", amount: 299.00, status: "shipped", date: "2024-01-14" },
    { id: "ORD-003", customer: "Bob Johnson", product: "Refined Oil", amount: 89.00, status: "delivered", date: "2024-01-13" },
    { id: "ORD-004", customer: "Alice Brown", product: "Cooking Oil", amount: 65.00, status: "pending", date: "2024-01-12" },
    { id: "ORD-005", customer: "Charlie Wilson", product: "Lab Chemicals", amount: 380.00, status: "processing", date: "2024-01-11" },
  ]

  const topProducts = [
    { name: "Premium Cotton", sales: 45, revenue: 7155.00, growth: 12.5 },
    { name: "Industrial Chemicals", sales: 32, revenue: 9568.00, growth: 8.3 },
    { name: "Refined Oil", sales: 67, revenue: 5963.00, growth: 15.2 },
    { name: "Cooking Oil", sales: 89, revenue: 5785.00, growth: 6.7 },
    { name: "Lab Chemicals", sales: 23, revenue: 8740.00, growth: 18.9 },
  ]

  const lowStockProducts = [
    { name: "Premium Cotton", stock: 5, threshold: 10 },
    { name: "Industrial Chemicals", stock: 3, threshold: 15 },
    { name: "Refined Oil", stock: 8, threshold: 20 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "processing": return "bg-blue-100 text-blue-800"
      case "shipped": return "bg-purple-100 text-purple-800"
      case "delivered": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
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
              <span className="font-semibold text-foreground">Tijarat Seller</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/seller/dashboard" className="text-foreground font-medium">
                Dashboard
              </Link>
              <Link href="/seller/products" className="text-muted-foreground hover:text-foreground">
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
            <div>
              <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, BabarAzam! Here's what's happening with your store.</p>
            </div>
            <div className="flex space-x-3">
              <Link href="/seller/products/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View Store
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{stats.monthlyGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{stats.orderGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{stats.productGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{stats.customerGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              <TabsTrigger value="products">Top Products</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>Your sales performance over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Sales chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="/seller/products/new">
                      <Button className="w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Product
                      </Button>
                    </Link>
                    <Link href="/seller/orders">
                      <Button variant="outline" className="w-full justify-start">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View All Orders
                      </Button>
                    </Link>
                    <Link href="/seller/analytics">
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </Link>
                    <Link href="/seller/settings">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders from your customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                          </div>
                          <div>
                            <p className="font-medium">{order.product}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="font-medium">${order.amount.toFixed(2)}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
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
                                Update Status
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Your best-selling products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">${product.revenue.toFixed(2)}</p>
                            <p className="text-sm text-green-600">+{product.growth}%</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Low Stock Alert</CardTitle>
                  <CardDescription>Products that need restocking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.stock} units remaining
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${Math.min((product.stock / product.threshold) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Threshold: {product.threshold}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Restock
                          </Button>
                        </div>
                      </div>
                    ))}
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
