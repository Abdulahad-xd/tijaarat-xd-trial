"use client"

import { useState } from "react"
import {
  ShoppingCart,
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
  FileText,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Calendar,
  Users,
  Building2,
  Download,
  Upload,
  Send,
  CheckCircle2,
  XCircle,
  Pause,
  Play,
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

export default function ProcurementManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSupplier, setSelectedSupplier] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState("overview")

  // Sample procurement data
  const purchaseOrders = [
    {
      id: 1,
      poNumber: "PO-2024-001",
      supplier: "Cotton Suppliers Ltd",
      status: "pending",
      priority: "high",
      totalAmount: 45000,
      currency: "USD",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-02-15",
      actualDelivery: null,
      items: [
        { name: "Premium Cotton", quantity: 1000, unitPrice: 45.00, total: 45000 }
      ],
      approver: "John Smith",
      createdBy: "BabarAzam",
      notes: "Urgent order for Q1 production",
      attachments: ["cotton-specs.pdf", "quality-requirements.docx"],
      paymentTerms: "Net 30",
      shippingTerms: "FOB",
      trackingNumber: null,
      invoiceNumber: null,
      receivedQuantity: 0,
      qualityStatus: "pending"
    },
    {
      id: 2,
      poNumber: "PO-2024-002",
      supplier: "Chemical Solutions Inc",
      status: "approved",
      priority: "medium",
      totalAmount: 125000,
      currency: "USD",
      orderDate: "2024-01-12",
      expectedDelivery: "2024-02-12",
      actualDelivery: null,
      items: [
        { name: "Industrial Chemicals", quantity: 500, unitPrice: 250.00, total: 125000 }
      ],
      approver: "Sarah Johnson",
      createdBy: "BabarAzam",
      notes: "Regular monthly order",
      attachments: ["chemical-specs.pdf"],
      paymentTerms: "Net 45",
      shippingTerms: "CIF",
      trackingNumber: "TRK-789456",
      invoiceNumber: null,
      receivedQuantity: 0,
      qualityStatus: "pending"
    },
    {
      id: 3,
      poNumber: "PO-2024-003",
      supplier: "Oil Refineries Co",
      status: "shipped",
      priority: "low",
      totalAmount: 89000,
      currency: "USD",
      orderDate: "2024-01-10",
      expectedDelivery: "2024-01-25",
      actualDelivery: null,
      items: [
        { name: "Refined Oil", quantity: 2000, unitPrice: 44.50, total: 89000 }
      ],
      approver: "Michael Brown",
      createdBy: "BabarAzam",
      notes: "Standard delivery",
      attachments: ["oil-specs.pdf"],
      paymentTerms: "Net 15",
      shippingTerms: "FOB",
      trackingNumber: "TRK-123456",
      invoiceNumber: "INV-2024-001",
      receivedQuantity: 0,
      qualityStatus: "pending"
    },
    {
      id: 4,
      poNumber: "PO-2024-004",
      supplier: "Textile Manufacturers Group",
      status: "delivered",
      priority: "medium",
      totalAmount: 156000,
      currency: "USD",
      orderDate: "2024-01-05",
      expectedDelivery: "2024-01-20",
      actualDelivery: "2024-01-18",
      items: [
        { name: "Cotton Fabric", quantity: 800, unitPrice: 195.00, total: 156000 }
      ],
      approver: "Robert Wilson",
      createdBy: "BabarAzam",
      notes: "Early delivery - excellent",
      attachments: ["fabric-specs.pdf", "quality-report.pdf"],
      paymentTerms: "Net 30",
      shippingTerms: "CIF",
      trackingNumber: "TRK-654321",
      invoiceNumber: "INV-2024-002",
      receivedQuantity: 800,
      qualityStatus: "approved"
    },
    {
      id: 5,
      poNumber: "PO-2024-005",
      supplier: "Cooking Oil Suppliers",
      status: "cancelled",
      priority: "low",
      totalAmount: 32000,
      currency: "USD",
      orderDate: "2024-01-08",
      expectedDelivery: "2024-02-08",
      actualDelivery: null,
      items: [
        { name: "Cooking Oil", quantity: 1000, unitPrice: 32.00, total: 32000 }
      ],
      approver: "Lisa Davis",
      createdBy: "BabarAzam",
      notes: "Cancelled due to quality issues",
      attachments: ["cooking-oil-specs.pdf"],
      paymentTerms: "Net 60",
      shippingTerms: "FOB",
      trackingNumber: null,
      invoiceNumber: null,
      receivedQuantity: 0,
      qualityStatus: "rejected"
    }
  ]

  const suppliers = ["all", "Cotton Suppliers Ltd", "Chemical Solutions Inc", "Oil Refineries Co", "Textile Manufacturers Group", "Cooking Oil Suppliers"]
  const statuses = ["all", "draft", "pending", "approved", "shipped", "delivered", "cancelled", "rejected"]
  const priorities = ["all", "low", "medium", "high", "urgent"]

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesSupplier = selectedSupplier === "all" || order.supplier === selectedSupplier
    const matchesPriority = selectedPriority === "all" || order.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesSupplier && matchesPriority
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      case "amount":
        return b.totalAmount - a.totalAmount
      case "supplier":
        return a.supplier.localeCompare(b.supplier)
      case "status":
        return a.status.localeCompare(b.status)
      case "priority":
        const priorityOrder = { urgent: 5, high: 4, medium: 3, low: 2 }
        return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[a.priority as keyof typeof priorityOrder] || 0)
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "approved": return "bg-blue-100 text-blue-800"
      case "shipped": return "bg-purple-100 text-purple-800"
      case "delivered": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      case "rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800"
      case "high": return "bg-orange-100 text-orange-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft": return <FileText className="w-4 h-4" />
      case "pending": return <Clock className="w-4 h-4" />
      case "approved": return <CheckCircle className="w-4 h-4" />
      case "shipped": return <Package className="w-4 h-4" />
      case "delivered": return <CheckCircle2 className="w-4 h-4" />
      case "cancelled": return <XCircle className="w-4 h-4" />
      case "rejected": return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const toggleOrderSelection = (orderId: number) => {
    const newSelection = new Set(selectedOrders)
    if (newSelection.has(orderId)) {
      newSelection.delete(orderId)
    } else {
      newSelection.add(orderId)
    }
    setSelectedOrders(newSelection)
  }

  const selectAllOrders = () => {
    if (selectedOrders.size === sortedOrders.length) {
      setSelectedOrders(new Set())
    } else {
      setSelectedOrders(new Set(sortedOrders.map(order => order.id)))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedOrders.size === 0) {
      toast("Please select orders first")
      return
    }
    
    switch (action) {
      case "approve":
        toast(`Approved ${selectedOrders.size} orders`)
        break
      case "reject":
        toast(`Rejected ${selectedOrders.size} orders`)
        break
      case "export":
        toast(`Exported ${selectedOrders.size} orders`)
        break
      case "cancel":
        toast(`Cancelled ${selectedOrders.size} orders`)
        break
    }
    setSelectedOrders(new Set())
  }

  // Calculate summary statistics
  const totalOrders = purchaseOrders.length
  const pendingOrders = purchaseOrders.filter(o => o.status === "pending").length
  const totalValue = purchaseOrders.reduce((sum, o) => sum + o.totalAmount, 0)
  const overdueOrders = purchaseOrders.filter(o => 
    o.expectedDelivery && new Date(o.expectedDelivery) < new Date() && o.status !== "delivered"
  ).length

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
              <Link href="/seller/procurement" className="text-foreground font-medium">
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
                <h1 className="text-3xl font-bold text-foreground">Procurement Management</h1>
                <p className="text-muted-foreground">Purchase orders, approvals, and supplier management</p>
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
                Create PO
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingOrders} pending approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Orders</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{overdueOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Need attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Lead Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 days</div>
                <p className="text-xs text-muted-foreground">
                  Delivery performance
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
                      placeholder="Search by PO number, supplier, or items..."
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
                        Supplier
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {suppliers.map((supplier) => (
                        <DropdownMenuItem
                          key={supplier}
                          onClick={() => setSelectedSupplier(supplier)}
                        >
                          {supplier === "all" ? "All Suppliers" : supplier}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Priority
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {priorities.map((priority) => (
                        <DropdownMenuItem
                          key={priority}
                          onClick={() => setSelectedPriority(priority)}
                        >
                          {priority === "all" ? "All Priorities" : priority}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Sort: {sortBy === "date" ? "Date" : sortBy === "amount" ? "Amount" : sortBy === "supplier" ? "Supplier" : sortBy === "status" ? "Status" : "Priority"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("date")}>Date</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("amount")}>Amount</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("supplier")}>Supplier</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("status")}>Status</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("priority")}>Priority</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedOrders.size > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedOrders.size} order{selectedOrders.size !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("approve")}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("reject")}>
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("cancel")}>
                      <Pause className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Purchase Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Purchase Orders ({sortedOrders.length})</CardTitle>
                  <CardDescription>Procurement and supplier management</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedOrders.size === sortedOrders.length && sortedOrders.length > 0}
                    onCheckedChange={selectAllOrders}
                  />
                  <Label className="text-sm">Select All</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sortedOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={selectedOrders.has(order.id)}
                          onCheckedChange={() => toggleOrderSelection(order.id)}
                        />
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{order.poNumber}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </Badge>
                            <Badge className={getPriorityColor(order.priority)}>
                              {order.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.supplier}</p>
                          <p className="text-sm text-muted-foreground">
                            Created by {order.createdBy} • {order.orderDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{order.currency}</p>
                        </div>
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
                              Edit Order
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Send to Supplier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Order Information */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Order Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Order Date:</span>
                            <span className="font-medium">{order.orderDate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Expected Delivery:</span>
                            <span className="font-medium">{order.expectedDelivery}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Actual Delivery:</span>
                            <span className="font-medium">{order.actualDelivery || "Pending"}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Approver:</span>
                            <span className="font-medium">{order.approver}</span>
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">{item.name}</span>
                                <span>${item.total.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Qty: {item.quantity}</span>
                                <span>@ ${item.unitPrice}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping & Payment */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Shipping & Payment</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Payment Terms:</span>
                            <span className="font-medium">{order.paymentTerms}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Shipping Terms:</span>
                            <span className="font-medium">{order.shippingTerms}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Tracking Number:</span>
                            <span className="font-medium">{order.trackingNumber || "N/A"}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Invoice Number:</span>
                            <span className="font-medium">{order.invoiceNumber || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress and Status */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Order Progress</span>
                        <span className="text-muted-foreground">
                          {order.receivedQuantity}/{order.items.reduce((sum, item) => sum + item.quantity, 0)} received
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(order.receivedQuantity / order.items.reduce((sum, item) => sum + item.quantity, 0)) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Notes and Attachments */}
                    {(order.notes || order.attachments.length > 0) && (
                      <div className="mt-4 pt-4 border-t">
                        {order.notes && (
                          <div className="mb-2">
                            <h4 className="font-medium text-sm mb-1">Notes</h4>
                            <p className="text-sm text-muted-foreground">{order.notes}</p>
                          </div>
                        )}
                        {order.attachments.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-1">Attachments</h4>
                            <div className="flex flex-wrap gap-2">
                              {order.attachments.map((attachment, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {attachment}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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










