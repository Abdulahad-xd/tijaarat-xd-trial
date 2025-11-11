"use client"

import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calculator,
  CreditCard,
  Receipt,
  FileText,
  ArrowLeft,
  Menu,
  Settings,
  LogOut,
  Bell,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Filter,
  Search,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Banknote,
  Wallet,
  Building2,
  Users,
  Package,
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

export default function FinancialManagementPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [selectedView, setSelectedView] = useState("overview")
  const [activeTab, setActiveTab] = useState("overview")

  // Sample financial data
  const financialKPIs = {
    revenue: {
      current: 1254300,
      previous: 1100000,
      growth: 14.0,
      target: 1500000
    },
    expenses: {
      current: 890000,
      previous: 820000,
      growth: 8.5,
      target: 900000
    },
    profit: {
      current: 364300,
      previous: 280000,
      growth: 30.1,
      target: 600000
    },
    cashFlow: {
      current: 245000,
      previous: 180000,
      growth: 36.1,
      target: 300000
    }
  }

  const invoices = [
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      customer: "Textile Manufacturing Co",
      amount: 125000,
      currency: "USD",
      status: "paid",
      dueDate: "2024-01-15",
      paidDate: "2024-01-12",
      paymentMethod: "Bank Transfer",
      items: [
        { name: "Premium Cotton", quantity: 1000, unitPrice: 125, total: 125000 }
      ]
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      customer: "Chemical Solutions Ltd",
      amount: 89000,
      currency: "USD",
      status: "overdue",
      dueDate: "2024-01-10",
      paidDate: null,
      paymentMethod: null,
      items: [
        { name: "Industrial Chemicals", quantity: 500, unitPrice: 178, total: 89000 }
      ]
    },
    {
      id: 3,
      invoiceNumber: "INV-2024-003",
      customer: "Oil Refineries Inc",
      amount: 156000,
      currency: "USD",
      status: "pending",
      dueDate: "2024-01-20",
      paidDate: null,
      paymentMethod: null,
      items: [
        { name: "Refined Oil", quantity: 2000, unitPrice: 78, total: 156000 }
      ]
    },
    {
      id: 4,
      invoiceNumber: "INV-2024-004",
      customer: "Food Processing Corp",
      amount: 67000,
      currency: "USD",
      status: "paid",
      dueDate: "2024-01-08",
      paidDate: "2024-01-05",
      paymentMethod: "Credit Card",
      items: [
        { name: "Cooking Oil", quantity: 1000, unitPrice: 67, total: 67000 }
      ]
    }
  ]

  const expenses = [
    {
      id: 1,
      category: "Raw Materials",
      amount: 450000,
      currency: "USD",
      vendor: "Cotton Suppliers Ltd",
      date: "2024-01-15",
      status: "paid",
      paymentMethod: "Bank Transfer",
      description: "Monthly cotton supply"
    },
    {
      id: 2,
      category: "Utilities",
      amount: 15000,
      currency: "USD",
      vendor: "Electricity Company",
      date: "2024-01-14",
      status: "paid",
      paymentMethod: "Auto Pay",
      description: "Monthly electricity bill"
    },
    {
      id: 3,
      category: "Rent",
      amount: 25000,
      currency: "USD",
      vendor: "Property Management",
      date: "2024-01-01",
      status: "paid",
      paymentMethod: "Bank Transfer",
      description: "Monthly warehouse rent"
    },
    {
      id: 4,
      category: "Salaries",
      amount: 120000,
      currency: "USD",
      vendor: "Payroll",
      date: "2024-01-15",
      status: "paid",
      paymentMethod: "Bank Transfer",
      description: "Monthly staff salaries"
    },
    {
      id: 5,
      category: "Marketing",
      amount: 8500,
      currency: "USD",
      vendor: "Digital Marketing Agency",
      date: "2024-01-12",
      status: "pending",
      paymentMethod: null,
      description: "Q1 marketing campaign"
    }
  ]

  const accounts = [
    {
      id: 1,
      name: "Business Checking",
      type: "Checking",
      bank: "First National Bank",
      accountNumber: "****1234",
      balance: 245000,
      currency: "USD",
      status: "active"
    },
    {
      id: 2,
      name: "Business Savings",
      type: "Savings",
      bank: "First National Bank",
      accountNumber: "****5678",
      balance: 500000,
      currency: "USD",
      status: "active"
    },
    {
      id: 3,
      name: "Credit Line",
      type: "Credit",
      bank: "Business Credit Union",
      accountNumber: "****9012",
      balance: -150000,
      currency: "USD",
      status: "active"
    }
  ]

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
  const periods = ["7d", "30d", "90d", "1y", "custom"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "overdue": return "bg-red-100 text-red-800"
      case "cancelled": return "bg-gray-100 text-gray-800"
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600"
    if (growth < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4" />
    if (growth < 0) return <TrendingDown className="w-4 h-4" />
    return <Clock className="w-4 h-4" />
  }

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const netProfit = totalRevenue - totalExpenses
  const totalCash = accounts.reduce((sum, acc) => sum + acc.balance, 0)

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
              <Link href="/seller/analytics" className="text-muted-foreground hover:text-foreground">
                Analytics
              </Link>
              <Link href="/seller/finance" className="text-foreground font-medium">
                Finance
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
                  <Link href="/seller/finance">
                    <Button variant="ghost" className="justify-start w-full">
                      Finance
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
                <h1 className="text-3xl font-bold text-foreground">Financial Management</h1>
                <p className="text-muted-foreground">Accounting, invoicing, and financial reporting</p>
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
                New Invoice
              </Button>
            </div>
          </div>

          {/* Period and Currency Selectors */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium">Period:</Label>
                  <RadioGroup value={selectedPeriod} onValueChange={setSelectedPeriod} className="flex space-x-4">
                    {periods.map((period) => (
                      <div key={period} className="flex items-center space-x-2">
                        <RadioGroupItem value={period} id={period} />
                        <Label htmlFor={period} className="text-sm capitalize">
                          {period === "7d" ? "7 Days" : 
                           period === "30d" ? "30 Days" : 
                           period === "90d" ? "90 Days" : 
                           period === "1y" ? "1 Year" : period}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium">Currency:</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {selectedCurrency}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {currencies.map((currency) => (
                        <DropdownMenuItem
                          key={currency}
                          onClick={() => setSelectedCurrency(currency)}
                        >
                          {currency}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Financial KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${financialKPIs.revenue.current.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={getGrowthColor(financialKPIs.revenue.growth)}>
                        {getGrowthIcon(financialKPIs.revenue.growth)}
                      </span>
                      <span className={getGrowthColor(financialKPIs.revenue.growth)}>
                        +{financialKPIs.revenue.growth}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: ${financialKPIs.revenue.target.toLocaleString()}</span>
                        <span>{((financialKPIs.revenue.current / financialKPIs.revenue.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((financialKPIs.revenue.current / financialKPIs.revenue.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${financialKPIs.expenses.current.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={getGrowthColor(financialKPIs.expenses.growth)}>
                        {getGrowthIcon(financialKPIs.expenses.growth)}
                      </span>
                      <span className={getGrowthColor(financialKPIs.expenses.growth)}>
                        +{financialKPIs.expenses.growth}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: ${financialKPIs.expenses.target.toLocaleString()}</span>
                        <span>{((financialKPIs.expenses.current / financialKPIs.expenses.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((financialKPIs.expenses.current / financialKPIs.expenses.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${financialKPIs.profit.current.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={getGrowthColor(financialKPIs.profit.growth)}>
                        {getGrowthIcon(financialKPIs.profit.growth)}
                      </span>
                      <span className={getGrowthColor(financialKPIs.profit.growth)}>
                        +{financialKPIs.profit.growth}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: ${financialKPIs.profit.target.toLocaleString()}</span>
                        <span>{((financialKPIs.profit.current / financialKPIs.profit.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((financialKPIs.profit.current / financialKPIs.profit.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${financialKPIs.cashFlow.current.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={getGrowthColor(financialKPIs.cashFlow.growth)}>
                        {getGrowthIcon(financialKPIs.cashFlow.growth)}
                      </span>
                      <span className={getGrowthColor(financialKPIs.cashFlow.growth)}>
                        +{financialKPIs.cashFlow.growth}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: ${financialKPIs.cashFlow.target.toLocaleString()}</span>
                        <span>{((financialKPIs.cashFlow.current / financialKPIs.cashFlow.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((financialKPIs.cashFlow.current / financialKPIs.cashFlow.target) * 100, 100)}%` }}
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
                    <CardTitle>Revenue vs Expenses</CardTitle>
                    <CardDescription>Monthly financial performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Revenue vs Expenses chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow Trend</CardTitle>
                    <CardDescription>Monthly cash flow analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center">
                        <LineChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Cash flow trend chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices ({invoices.length})</CardTitle>
                  <CardDescription>Manage customer invoices and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Receipt className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{invoice.invoiceNumber}</h3>
                            <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {invoice.dueDate} • 
                              {invoice.paidDate ? ` Paid: ${invoice.paidDate}` : " Not paid"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{invoice.currency}</p>
                          </div>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
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
                                Edit Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Record Payment
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

            <TabsContent value="expenses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expenses ({expenses.length})</CardTitle>
                  <CardDescription>Track business expenses and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Calculator className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{expense.category}</h3>
                            <p className="text-sm text-muted-foreground">{expense.vendor}</p>
                            <p className="text-sm text-muted-foreground">{expense.description}</p>
                            <p className="text-sm text-muted-foreground">Date: {expense.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">${expense.amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{expense.currency}</p>
                            {expense.paymentMethod && (
                              <p className="text-sm text-muted-foreground">{expense.paymentMethod}</p>
                            )}
                          </div>
                          <Badge className={getStatusColor(expense.status)}>
                            {expense.status}
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
                                Edit Expense
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Receipt className="mr-2 h-4 w-4" />
                                Upload Receipt
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Record Payment
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

            <TabsContent value="accounts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Accounts</CardTitle>
                  <CardDescription>Manage business bank accounts and balances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accounts.map((account) => (
                      <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{account.name}</h3>
                            <p className="text-sm text-muted-foreground">{account.bank}</p>
                            <p className="text-sm text-muted-foreground">
                              {account.type} • {account.accountNumber}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className={`font-medium ${account.balance < 0 ? "text-red-600" : "text-green-600"}`}>
                              ${Math.abs(account.balance).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">{account.currency}</p>
                            {account.balance < 0 && (
                              <p className="text-sm text-red-600">Credit Used</p>
                            )}
                          </div>
                          <Badge className={getStatusColor(account.status)}>
                            {account.status}
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
                                View Transactions
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Account
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Statement
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

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                  <CardDescription>Generate comprehensive financial reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Profit & Loss Statement</h3>
                      <p className="text-sm text-muted-foreground mb-4">Revenue, expenses, and profitability analysis</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Balance Sheet</h3>
                      <p className="text-sm text-muted-foreground mb-4">Assets, liabilities, and equity overview</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Cash Flow Statement</h3>
                      <p className="text-sm text-muted-foreground mb-4">Cash inflows and outflows analysis</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Aging Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Outstanding invoices and receivables</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Tax Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Tax calculations and compliance</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Budget vs Actual</h3>
                      <p className="text-sm text-muted-foreground mb-4">Budget performance analysis</p>
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










