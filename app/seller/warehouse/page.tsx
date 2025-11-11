"use client"

import { useState } from "react"
import {
  Warehouse,
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
  Package,
  Truck,
  Users,
  BarChart3,
  Download,
  Upload,
  RefreshCw,
  Move,
  Scan,
  QrCode,
  Package as PackageIcon,
  Forklift,
  Box,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
  PauseCircle,
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

export default function WarehouseManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedZone, setSelectedZone] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedOperation, setSelectedOperation] = useState("all")
  const [sortBy, setSortBy] = useState("location")
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState("overview")

  // Sample warehouse data
  const warehouseOperations = [
    {
      id: 1,
      type: "receiving",
      reference: "REC-2024-001",
      supplier: "Cotton Suppliers Ltd",
      status: "in-progress",
      priority: "high",
      items: [
        { sku: "COT-001", name: "Premium Cotton", quantity: 1000, received: 500, location: "A-01-01" },
        { sku: "COT-002", name: "Organic Cotton", quantity: 500, received: 0, location: "A-01-02" }
      ],
      scheduledDate: "2024-01-15",
      actualDate: "2024-01-15",
      assignedTo: "John Smith",
      dock: "Dock 1",
      truck: "TRK-789456",
      notes: "Urgent delivery for Q1 production",
      qualityCheck: "pending"
    },
    {
      id: 2,
      type: "picking",
      reference: "PICK-2024-001",
      customer: "Textile Manufacturing Co",
      status: "completed",
      priority: "medium",
      items: [
        { sku: "COT-001", name: "Premium Cotton", quantity: 200, picked: 200, location: "A-01-01" },
        { sku: "CHEM-002", name: "Industrial Chemicals", quantity: 50, picked: 50, location: "B-02-01" }
      ],
      scheduledDate: "2024-01-14",
      actualDate: "2024-01-14",
      assignedTo: "Sarah Johnson",
      zone: "Zone A",
      orderNumber: "ORD-2024-001",
      notes: "Standard picking operation",
      qualityCheck: "passed"
    },
    {
      id: 3,
      type: "putaway",
      reference: "PUT-2024-001",
      supplier: "Chemical Solutions Inc",
      status: "pending",
      priority: "low",
      items: [
        { sku: "CHEM-002", name: "Industrial Chemicals", quantity: 100, putaway: 0, location: "B-02-01" }
      ],
      scheduledDate: "2024-01-16",
      actualDate: null,
      assignedTo: "Mike Brown",
      zone: "Zone B",
      notes: "Regular putaway operation",
      qualityCheck: "pending"
    },
    {
      id: 4,
      type: "transfer",
      reference: "TRF-2024-001",
      fromLocation: "Main Warehouse",
      toLocation: "Distribution Center A",
      status: "in-progress",
      priority: "medium",
      items: [
        { sku: "OIL-003", name: "Refined Oil", quantity: 500, transferred: 200, location: "C-03-01" }
      ],
      scheduledDate: "2024-01-15",
      actualDate: "2024-01-15",
      assignedTo: "Lisa Davis",
      zone: "Zone C",
      notes: "Inter-warehouse transfer",
      qualityCheck: "passed"
    },
    {
      id: 5,
      type: "cycle-count",
      reference: "CC-2024-001",
      zone: "Zone A",
      status: "completed",
      priority: "low",
      items: [
        { sku: "COT-001", name: "Premium Cotton", quantity: 1000, counted: 995, location: "A-01-01", variance: -5 },
        { sku: "COT-002", name: "Organic Cotton", quantity: 500, counted: 500, location: "A-01-02", variance: 0 }
      ],
      scheduledDate: "2024-01-13",
      actualDate: "2024-01-13",
      assignedTo: "Robert Wilson",
      notes: "Monthly cycle count",
      qualityCheck: "completed"
    }
  ]

  const warehouseZones = [
    { id: 1, name: "Zone A - Raw Materials", capacity: 1000, used: 750, status: "normal" },
    { id: 2, name: "Zone B - Chemicals", capacity: 500, used: 300, status: "normal" },
    { id: 3, name: "Zone C - Oils", capacity: 800, used: 600, status: "normal" },
    { id: 4, name: "Zone D - Finished Goods", capacity: 1200, used: 1100, status: "high" },
    { id: 5, name: "Zone E - Returns", capacity: 200, used: 50, status: "low" }
  ]

  const equipment = [
    { id: 1, name: "Forklift #001", type: "Forklift", status: "operational", location: "Zone A", operator: "John Smith", lastMaintenance: "2024-01-10" },
    { id: 2, name: "Pallet Jack #002", type: "Pallet Jack", status: "operational", location: "Zone B", operator: "Sarah Johnson", lastMaintenance: "2024-01-12" },
    { id: 3, name: "Conveyor Belt #001", type: "Conveyor", status: "maintenance", location: "Zone C", operator: "Mike Brown", lastMaintenance: "2024-01-08" },
    { id: 4, name: "Scanner #001", type: "Barcode Scanner", status: "operational", location: "Zone A", operator: "Lisa Davis", lastMaintenance: "2024-01-14" }
  ]

  const zones = ["all", "Zone A", "Zone B", "Zone C", "Zone D", "Zone E"]
  const statuses = ["all", "pending", "in-progress", "completed", "cancelled", "on-hold"]
  const operations = ["all", "receiving", "picking", "putaway", "transfer", "cycle-count", "shipping"]

  const filteredOperations = warehouseOperations.filter(operation => {
    const matchesSearch = operation.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         operation.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (operation.supplier && operation.supplier.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (operation.customer && operation.customer.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesZone = selectedZone === "all" || 
                       operation.zone === selectedZone ||
                       operation.items.some(item => item.location.startsWith(selectedZone.split(' ')[1]))
    const matchesStatus = selectedStatus === "all" || operation.status === selectedStatus
    const matchesOperation = selectedOperation === "all" || operation.type === selectedOperation
    return matchesSearch && matchesZone && matchesStatus && matchesOperation
  })

  const sortedOperations = [...filteredOperations].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
      case "priority":
        const priorityOrder = { urgent: 5, high: 4, medium: 3, low: 2 }
        return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[a.priority as keyof typeof priorityOrder] || 0)
      case "status":
        return a.status.localeCompare(b.status)
      case "location":
        return a.zone?.localeCompare(b.zone || "") || 0
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      case "on-hold": return "bg-gray-100 text-gray-800"
      case "normal": return "bg-green-100 text-green-800"
      case "high": return "bg-red-100 text-red-800"
      case "low": return "bg-yellow-100 text-yellow-800"
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

  const getOperationIcon = (type: string) => {
    switch (type) {
      case "receiving": return <ArrowRight className="w-4 h-4" />
      case "picking": return <Package className="w-4 h-4" />
      case "putaway": return <ArrowLeftIcon className="w-4 h-4" />
      case "transfer": return <Move className="w-4 h-4" />
      case "cycle-count": return <Scan className="w-4 h-4" />
      case "shipping": return <Truck className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
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
    if (selectedItems.size === sortedOperations.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(sortedOperations.map(item => item.id)))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedItems.size === 0) {
      toast("Please select operations first")
      return
    }
    
    switch (action) {
      case "assign":
        toast(`Assigned ${selectedItems.size} operations`)
        break
      case "complete":
        toast(`Completed ${selectedItems.size} operations`)
        break
      case "hold":
        toast(`Put ${selectedItems.size} operations on hold`)
        break
      case "export":
        toast(`Exported ${selectedItems.size} operations`)
        break
    }
    setSelectedItems(new Set())
  }

  // Calculate summary statistics
  const totalOperations = warehouseOperations.length
  const pendingOperations = warehouseOperations.filter(o => o.status === "pending").length
  const inProgressOperations = warehouseOperations.filter(o => o.status === "in-progress").length
  const completedOperations = warehouseOperations.filter(o => o.status === "completed").length
  const totalCapacity = warehouseZones.reduce((sum, zone) => sum + zone.capacity, 0)
  const usedCapacity = warehouseZones.reduce((sum, zone) => sum + zone.used, 0)
  const utilizationRate = (usedCapacity / totalCapacity) * 100

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
              <Link href="/seller/warehouse" className="text-foreground font-medium">
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
                <h1 className="text-3xl font-bold text-foreground">Warehouse Management System</h1>
                <p className="text-muted-foreground">Operations, zones, and equipment management</p>
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
                New Operation
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Operations</CardTitle>
                <Warehouse className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOperations}</div>
                <p className="text-xs text-muted-foreground">
                  {inProgressOperations} in progress
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Operations</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{pendingOperations}</div>
                <p className="text-xs text-muted-foreground">
                  Need attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{completedOperations}</div>
                <p className="text-xs text-muted-foreground">
                  Operations completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Warehouse Utilization</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{utilizationRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {usedCapacity}/{totalCapacity} capacity used
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Operations</TabsTrigger>
              <TabsTrigger value="zones">Zones</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Filters and Search */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search operations, items, or references..."
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
                            Zone
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {zones.map((zone) => (
                            <DropdownMenuItem
                              key={zone}
                              onClick={() => setSelectedZone(zone)}
                            >
                              {zone === "all" ? "All Zones" : zone}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                            Operation
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {operations.map((operation) => (
                            <DropdownMenuItem
                              key={operation}
                              onClick={() => setSelectedOperation(operation)}
                            >
                              {operation === "all" ? "All Operations" : operation}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Sort: {sortBy === "date" ? "Date" : sortBy === "priority" ? "Priority" : sortBy === "status" ? "Status" : "Location"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSortBy("date")}>Date</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy("priority")}>Priority</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy("status")}>Status</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy("location")}>Location</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bulk Actions */}
              {selectedItems.size > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {selectedItems.size} operation{selectedItems.size !== 1 ? 's' : ''} selected
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction("assign")}>
                          <Users className="w-4 h-4 mr-2" />
                          Assign
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction("complete")}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction("hold")}>
                          <PauseCircle className="w-4 h-4 mr-2" />
                          Hold
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

              {/* Operations List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Warehouse Operations ({sortedOperations.length})</CardTitle>
                      <CardDescription>Manage warehouse operations and workflows</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedItems.size === sortedOperations.length && sortedOperations.length > 0}
                        onCheckedChange={selectAllItems}
                      />
                      <Label className="text-sm">Select All</Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sortedOperations.map((operation) => (
                      <div key={operation.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Checkbox
                              checked={selectedItems.has(operation.id)}
                              onCheckedChange={() => toggleItemSelection(operation.id)}
                            />
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              {getOperationIcon(operation.type)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium">{operation.reference}</h3>
                                <Badge className={getStatusColor(operation.status)}>
                                  {operation.status}
                                </Badge>
                                <Badge className={getPriorityColor(operation.priority)}>
                                  {operation.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground capitalize">
                                {operation.type.replace('-', ' ')} • {operation.zone}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Assigned to {operation.assignedTo} • {operation.scheduledDate}
                              </p>
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
                                  Edit Operation
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Users className="mr-2 h-4 w-4" />
                                  Reassign
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Cancel Operation
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Operation Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Items */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Items</h4>
                            <div className="space-y-2">
                              {operation.items.map((item, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{item.name}</span>
                                    <span>{item.sku}</span>
                                  </div>
                                  <div className="flex justify-between text-muted-foreground">
                                    <span>Qty: {item.quantity}</span>
                                    <span>Location: {item.location}</span>
                                  </div>
                                  {'received' in item && (
                                    <div className="flex justify-between text-muted-foreground">
                                      <span>Received: {(item as any).received}</span>
                                      <span>Remaining: {item.quantity - (item as any).received}</span>
                                    </div>
                                  )}
                                  {'picked' in item && (
                                    <div className="flex justify-between text-muted-foreground">
                                      <span>Picked: {(item as any).picked}</span>
                                      <span>Remaining: {item.quantity - (item as any).picked}</span>
                                    </div>
                                  )}
                                  {'variance' in item && (
                                    <div className="flex justify-between text-muted-foreground">
                                      <span>Variance: {(item as any).variance > 0 ? '+' : ''}{(item as any).variance}</span>
                                      <span className={(item as any).variance === 0 ? "text-green-600" : "text-red-600"}>
                                        {(item as any).variance === 0 ? "Perfect" : "Adjustment needed"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Operation Info */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Operation Details</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Type:</span>
                                <span className="font-medium capitalize">{operation.type.replace('-', ' ')}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Scheduled:</span>
                                <span className="font-medium">{operation.scheduledDate}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Actual:</span>
                                <span className="font-medium">{operation.actualDate || "Pending"}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Assigned To:</span>
                                <span className="font-medium">{operation.assignedTo}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Quality Check:</span>
                                <Badge className={getStatusColor(operation.qualityCheck)}>
                                  {operation.qualityCheck}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Additional Information</h4>
                            <div className="space-y-2">
                              {operation.supplier && (
                                <div className="flex justify-between text-sm">
                                  <span>Supplier:</span>
                                  <span className="font-medium">{operation.supplier}</span>
                                </div>
                              )}
                              {operation.customer && (
                                <div className="flex justify-between text-sm">
                                  <span>Customer:</span>
                                  <span className="font-medium">{operation.customer}</span>
                                </div>
                              )}
                              {operation.dock && (
                                <div className="flex justify-between text-sm">
                                  <span>Dock:</span>
                                  <span className="font-medium">{operation.dock}</span>
                                </div>
                              )}
                              {operation.truck && (
                                <div className="flex justify-between text-sm">
                                  <span>Truck:</span>
                                  <span className="font-medium">{operation.truck}</span>
                                </div>
                              )}
                              {operation.orderNumber && (
                                <div className="flex justify-between text-sm">
                                  <span>Order #:</span>
                                  <span className="font-medium">{operation.orderNumber}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Operation Progress</span>
                            <span className="text-muted-foreground">
                              {operation.items.reduce((sum, item) => {
                                const completed = ('received' in item ? (item as any).received : 0) ||
                                                ('picked' in item ? (item as any).picked : 0) ||
                                                ('putaway' in item ? (item as any).putaway : 0) ||
                                                ('transferred' in item ? (item as any).transferred : 0) ||
                                                ('counted' in item ? (item as any).counted : 0) || 0;
                                return sum + completed;
                              }, 0)}/
                              {operation.items.reduce((sum, item) => sum + item.quantity, 0)} completed
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(operation.items.reduce((sum, item) => {
                                  const completed = ('received' in item ? (item as any).received : 0) ||
                                                  ('picked' in item ? (item as any).picked : 0) ||
                                                  ('putaway' in item ? (item as any).putaway : 0) ||
                                                  ('transferred' in item ? (item as any).transferred : 0) ||
                                                  ('counted' in item ? (item as any).counted : 0) || 0;
                                  return sum + completed;
                                }, 0) / operation.items.reduce((sum, item) => sum + item.quantity, 0)) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Notes */}
                        {operation.notes && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium text-sm mb-1">Notes</h4>
                            <p className="text-sm text-muted-foreground">{operation.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zones" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Warehouse Zones</CardTitle>
                  <CardDescription>Zone capacity and utilization management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {warehouseZones.map((zone) => (
                      <div key={zone.id} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">{zone.name}</h3>
                          <Badge className={getStatusColor(zone.status)}>
                            {zone.status}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Capacity:</span>
                            <span className="font-medium">{zone.capacity} units</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Used:</span>
                            <span className="font-medium">{zone.used} units</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Available:</span>
                            <span className="font-medium">{zone.capacity - zone.used} units</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                zone.used / zone.capacity > 0.9 ? "bg-red-500" : 
                                zone.used / zone.capacity > 0.7 ? "bg-yellow-500" : "bg-green-500"
                              }`}
                              style={{ width: `${(zone.used / zone.capacity) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-center text-sm text-muted-foreground">
                            {((zone.used / zone.capacity) * 100).toFixed(1)}% utilized
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Warehouse Equipment</CardTitle>
                  <CardDescription>Equipment status and maintenance tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {equipment.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            {item.type === "Forklift" ? <Forklift className="w-6 h-6 text-muted-foreground" /> :
                             item.type === "Pallet Jack" ? <PackageIcon className="w-6 h-6 text-muted-foreground" /> :
                             item.type === "Conveyor" ? <Box className="w-6 h-6 text-muted-foreground" /> :
                             <Scan className="w-6 h-6 text-muted-foreground" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{item.location}</p>
                            <p className="text-sm text-muted-foreground">{item.operator}</p>
                          </div>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Last Maintenance</p>
                            <p className="text-sm font-medium">{item.lastMaintenance}</p>
                          </div>
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
                  <CardTitle>Warehouse Reports</CardTitle>
                  <CardDescription>Performance and operational reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Daily Operations Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Summary of daily warehouse activities</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Zone Utilization Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Zone capacity and usage analysis</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-medium mb-2">Equipment Maintenance Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Equipment status and maintenance schedule</p>
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
