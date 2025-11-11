"use client"

import { useState } from "react"
import {
  Users,
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
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  CreditCard,
  Package,
  MessageSquare,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Target,
  Award,
  Zap,
  Activity,
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

export default function CustomerRelationshipManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCustomers, setSelectedCustomers] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState("overview")

  // Sample CRM data
  const customers = [
    {
      id: 1,
      name: "Textile Manufacturing Co",
      contact: "John Smith",
      email: "john@textilemanufacturing.com",
      phone: "+1-555-0123",
      address: "123 Industrial Ave, Manufacturing City, MC 12345",
      segment: "Enterprise",
      status: "active",
      priority: "high",
      totalOrders: 45,
      totalValue: 1250000,
      lastOrder: "2024-01-15",
      nextContact: "2024-01-25",
      creditLimit: 500000,
      creditUsed: 125000,
      rating: 4.8,
      notes: "Key enterprise customer, prefers bulk orders",
      tags: ["VIP", "Bulk Buyer", "Long-term"],
      opportunities: [
        { title: "Q2 Expansion", value: 250000, stage: "Proposal", probability: 75 },
        { title: "New Product Line", value: 180000, stage: "Negotiation", probability: 60 }
      ]
    },
    {
      id: 2,
      name: "Chemical Solutions Ltd",
      contact: "Sarah Johnson",
      email: "sarah@chemicalsolutions.com",
      phone: "+1-555-0456",
      address: "456 Chemical Blvd, Industrial Park, IP 67890",
      segment: "Mid-Market",
      status: "active",
      priority: "medium",
      totalOrders: 38,
      totalValue: 980000,
      lastOrder: "2024-01-12",
      nextContact: "2024-01-22",
      creditLimit: 300000,
      creditUsed: 98000,
      rating: 4.6,
      notes: "Regular customer, interested in new chemical products",
      tags: ["Regular", "Chemical Focus"],
      opportunities: [
        { title: "Annual Contract", value: 120000, stage: "Qualification", probability: 40 }
      ]
    },
    {
      id: 3,
      name: "Oil Refineries Inc",
      contact: "Michael Brown",
      email: "michael@oilrefineries.com",
      phone: "+1-555-0789",
      address: "789 Refinery Road, Energy City, EC 11111",
      segment: "Enterprise",
      status: "active",
      priority: "high",
      totalOrders: 32,
      totalValue: 870000,
      lastOrder: "2024-01-14",
      nextContact: "2024-01-24",
      creditLimit: 400000,
      creditUsed: 87000,
      rating: 4.9,
      notes: "Premium customer, excellent payment history",
      tags: ["VIP", "Premium", "Oil & Gas"],
      opportunities: [
        { title: "Multi-year Contract", value: 500000, stage: "Proposal", probability: 85 },
        { title: "Equipment Upgrade", value: 200000, stage: "Discovery", probability: 30 }
      ]
    },
    {
      id: 4,
      name: "Food Processing Corp",
      contact: "Lisa Davis",
      email: "lisa@foodprocessing.com",
      phone: "+1-555-0321",
      address: "321 Food Street, Culinary City, CC 22222",
      segment: "SMB",
      status: "inactive",
      priority: "low",
      totalOrders: 28,
      totalValue: 650000,
      lastOrder: "2023-12-20",
      nextContact: "2024-02-01",
      creditLimit: 200000,
      creditUsed: 65000,
      rating: 3.8,
      notes: "Inactive customer, last contact 2 months ago",
      tags: ["Inactive", "Food Industry"],
      opportunities: [
        { title: "Reactivation Campaign", value: 50000, stage: "Lead", probability: 20 }
      ]
    },
    {
      id: 5,
      name: "Laboratory Services",
      contact: "Robert Wilson",
      email: "robert@laboratoryservices.com",
      phone: "+1-555-0654",
      address: "654 Research Ave, Science City, SC 33333",
      segment: "Mid-Market",
      status: "active",
      priority: "medium",
      totalOrders: 25,
      totalValue: 580000,
      lastOrder: "2024-01-10",
      nextContact: "2024-01-20",
      creditLimit: 250000,
      creditUsed: 58000,
      rating: 4.4,
      notes: "Growing customer, interested in lab chemicals",
      tags: ["Growing", "Lab Focus"],
      opportunities: [
        { title: "Lab Equipment", value: 150000, stage: "Qualification", probability: 50 },
        { title: "Chemical Supply", value: 80000, stage: "Discovery", probability: 35 }
      ]
    }
  ]

  const segments = ["all", "Enterprise", "Mid-Market", "SMB", "Startup"]
  const statuses = ["all", "active", "inactive", "prospect", "lead", "customer"]
  const priorities = ["all", "low", "medium", "high", "critical"]

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSegment = selectedSegment === "all" || customer.segment === selectedSegment
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || customer.priority === selectedPriority
    return matchesSearch && matchesSegment && matchesStatus && matchesPriority
  })

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "value":
        return b.totalValue - a.totalValue
      case "orders":
        return b.totalOrders - a.totalOrders
      case "rating":
        return b.rating - a.rating
      case "lastOrder":
        return new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
      case "priority":
        const priorityOrder = { critical: 5, high: 4, medium: 3, low: 2 }
        return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[a.priority as keyof typeof priorityOrder] || 0)
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      case "prospect": return "bg-blue-100 text-blue-800"
      case "lead": return "bg-yellow-100 text-yellow-800"
      case "customer": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800"
      case "high": return "bg-orange-100 text-orange-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "Enterprise": return "bg-blue-100 text-blue-800"
      case "Mid-Market": return "bg-green-100 text-green-800"
      case "SMB": return "bg-yellow-100 text-yellow-800"
      case "Startup": return "bg-purple-100 text-purple-800"
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

  const toggleCustomerSelection = (customerId: number) => {
    const newSelection = new Set(selectedCustomers)
    if (newSelection.has(customerId)) {
      newSelection.delete(customerId)
    } else {
      newSelection.add(customerId)
    }
    setSelectedCustomers(newSelection)
  }

  const selectAllCustomers = () => {
    if (selectedCustomers.size === sortedCustomers.length) {
      setSelectedCustomers(new Set())
    } else {
      setSelectedCustomers(new Set(sortedCustomers.map(c => c.id)))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedCustomers.size === 0) {
      toast("Please select customers first")
      return
    }
    
    switch (action) {
      case "email":
        toast(`Sent email to ${selectedCustomers.size} customers`)
        break
      case "call":
        toast(`Scheduled calls for ${selectedCustomers.size} customers`)
        break
      case "export":
        toast(`Exported ${selectedCustomers.size} customers`)
        break
      case "tag":
        toast(`Added tags to ${selectedCustomers.size} customers`)
        break
    }
    setSelectedCustomers(new Set())
  }

  // Calculate summary statistics
  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === "active").length
  const totalValue = customers.reduce((sum, c) => sum + c.totalValue, 0)
  const avgRating = customers.reduce((sum, c) => sum + c.rating, 0) / customers.length
  const totalOpportunities = customers.reduce((sum, c) => sum + c.opportunities.length, 0)
  const totalOpportunityValue = customers.reduce((sum, c) => 
    sum + c.opportunities.reduce((oppSum, opp) => oppSum + opp.value, 0), 0)

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
              <Link href="/seller/finance" className="text-muted-foreground hover:text-foreground">
                Finance
              </Link>
              <Link href="/seller/crm" className="text-foreground font-medium">
                CRM
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
                  <Link href="/seller/crm">
                    <Button variant="ghost" className="justify-start w-full">
                      CRM
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
                <h1 className="text-3xl font-bold text-foreground">Customer Relationship Management</h1>
                <p className="text-muted-foreground">Manage customer relationships and sales opportunities</p>
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
                Add Customer
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  {activeCustomers} active
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
                  Lifetime value
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
                  Customer satisfaction
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOpportunities}</div>
                <p className="text-xs text-muted-foreground">
                  ${totalOpportunityValue.toLocaleString()} value
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
                      placeholder="Search customers, contacts, or companies..."
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
                        Segment
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {segments.map((segment) => (
                        <DropdownMenuItem
                          key={segment}
                          onClick={() => setSelectedSegment(segment)}
                        >
                          {segment === "all" ? "All Segments" : segment}
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
                        Sort: {sortBy === "name" ? "Name" : sortBy === "value" ? "Value" : sortBy === "orders" ? "Orders" : sortBy === "rating" ? "Rating" : sortBy === "lastOrder" ? "Last Order" : "Priority"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("value")}>Total Value</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("orders")}>Total Orders</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("lastOrder")}>Last Order</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("priority")}>Priority</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedCustomers.size > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomers.size} customer{selectedCustomers.size !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("email")}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("call")}>
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Call
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("tag")}>
                      <Award className="w-4 h-4 mr-2" />
                      Add Tags
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

          {/* Customers List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Customers ({sortedCustomers.length})</CardTitle>
                  <CardDescription>Manage customer relationships and opportunities</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCustomers.size === sortedCustomers.length && sortedCustomers.length > 0}
                    onCheckedChange={selectAllCustomers}
                  />
                  <Label className="text-sm">Select All</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sortedCustomers.map((customer) => (
                  <div key={customer.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={selectedCustomers.has(customer.id)}
                          onCheckedChange={() => toggleCustomerSelection(customer.id)}
                        />
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{customer.name}</h3>
                            <Badge className={getSegmentColor(customer.segment)}>
                              {customer.segment}
                            </Badge>
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                            <Badge className={getPriorityColor(customer.priority)}>
                              {customer.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{customer.contact}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {getRatingStars(customer.rating)}
                            <span className="text-sm text-muted-foreground ml-1">
                              ({customer.rating.toFixed(1)})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="font-medium">${customer.totalValue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{customer.totalOrders} orders</p>
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
                              Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Schedule Call
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Orders
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Customer Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Contact Information */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="truncate">{customer.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Business Information */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Business Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Orders:</span>
                            <span className="font-medium">{customer.totalOrders}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total Value:</span>
                            <span className="font-medium">${customer.totalValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Last Order:</span>
                            <span className="font-medium">{customer.lastOrder}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Next Contact:</span>
                            <span className="font-medium">{customer.nextContact}</span>
                          </div>
                        </div>
                      </div>

                      {/* Credit Information */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Credit Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Credit Limit:</span>
                            <span className="font-medium">${customer.creditLimit.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Credit Used:</span>
                            <span className="font-medium">${customer.creditUsed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Available Credit:</span>
                            <span className="font-medium">${(customer.creditLimit - customer.creditUsed).toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(customer.creditUsed / customer.creditLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4">
                      <h4 className="font-medium text-sm mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {customer.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Opportunities */}
                    {customer.opportunities.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-sm mb-2">Sales Opportunities</h4>
                        <div className="space-y-2">
                          {customer.opportunities.map((opportunity, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div>
                                <h5 className="font-medium text-sm">{opportunity.title}</h5>
                                <p className="text-sm text-muted-foreground">
                                  Stage: {opportunity.stage} • Probability: {opportunity.probability}%
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${opportunity.value.toLocaleString()}</p>
                                <Badge className={opportunity.probability >= 70 ? "bg-green-100 text-green-800" : 
                                                 opportunity.probability >= 40 ? "bg-yellow-100 text-yellow-800" : 
                                                 "bg-red-100 text-red-800"}>
                                  {opportunity.probability >= 70 ? "High" : 
                                   opportunity.probability >= 40 ? "Medium" : "Low"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {customer.notes && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium text-sm mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">{customer.notes}</p>
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










