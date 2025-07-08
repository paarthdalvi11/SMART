"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  History,
  ArrowUpDown,
  ChevronRight,
  RotateCcw,
  GitCompare,
  Tag,
  Calendar,
  User,
  FileText,
  Clock,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react"

// Mock version history data
const mockVersionHistory = [
  {
    id: 1,
    documentName: "ERP System Requirements",
    version: "1.2",
    date: "2023-09-15",
    user: "John Doe",
    changes: 12,
    comment: "Updated security requirements",
    labels: ["Security", "Review"],
  },
  {
    id: 2,
    documentName: "ERP System Requirements",
    version: "1.1",
    date: "2023-09-10",
    user: "Jane Smith",
    changes: 5,
    comment: "Added performance criteria",
    labels: ["Performance"],
  },
  {
    id: 3,
    documentName: "ERP System Requirements",
    version: "1.0",
    date: "2023-09-05",
    user: "John Doe",
    changes: 28,
    comment: "Initial document creation",
    labels: ["Baseline"],
  },
  {
    id: 4,
    documentName: "Mobile App Security Requirements",
    version: "0.8",
    date: "2023-09-12",
    user: "Mike Johnson",
    changes: 7,
    comment: "Updated authentication requirements",
    labels: ["Security"],
  },
  {
    id: 5,
    documentName: "Mobile App Security Requirements",
    version: "0.7",
    date: "2023-09-08",
    user: "Sarah Williams",
    changes: 4,
    comment: "Added biometric authentication",
    labels: ["Feature"],
  },
  {
    id: 6,
    documentName: "Cloud Migration Plan",
    version: "2.0",
    date: "2023-09-14",
    user: "David Brown",
    changes: 15,
    comment: "Complete revision of migration strategy",
    labels: ["Major Update"],
  },
  {
    id: 7,
    documentName: "Cloud Migration Plan",
    version: "1.5",
    date: "2023-09-09",
    user: "Emily Davis",
    changes: 8,
    comment: "Updated timeline and dependencies",
    labels: ["Timeline"],
  },
]

// Mock comparison data
const mockComparisonData = {
  documentName: "ERP System Requirements",
  oldVersion: "1.1",
  newVersion: "1.2",
  oldDate: "2023-09-10",
  newDate: "2023-09-15",
  oldUser: "Jane Smith",
  newUser: "John Doe",
  changes: [
    {
      id: 1,
      type: "added",
      content: "The system shall implement multi-factor authentication for all administrative access.",
      category: "Security",
    },
    {
      id: 2,
      type: "added",
      content: "The system shall log all authentication attempts, successful or failed.",
      category: "Security",
    },
    {
      id: 3,
      type: "modified",
      oldContent: "The system shall encrypt data at rest using AES-128.",
      newContent: "The system shall encrypt data at rest using AES-256.",
      category: "Security",
    },
    {
      id: 4,
      type: "removed",
      content: "The system shall allow password reset via email only.",
      category: "Security",
    },
  ],
}

export default function VersionHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [documentFilter, setDocumentFilter] = useState("All")
  const [showComparisonDialog, setShowComparisonDialog] = useState(false)
  const [selectedVersions, setSelectedVersions] = useState<number[]>([])
  const [treeView, setTreeView] = useState(true)

  // Filter versions based on search and filters
  const filteredVersions = mockVersionHistory.filter((version) => {
    const matchesSearch =
      version.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      version.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      version.comment.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDocument = documentFilter === "All" || version.documentName === documentFilter

    return matchesSearch && matchesDocument
  })

  // Get unique document names for filter
  const documentNames = ["All", ...new Set(mockVersionHistory.map((version) => version.documentName))]

  // Group versions by document for tree view
  const groupedVersions = filteredVersions.reduce(
    (acc, version) => {
      if (!acc[version.documentName]) {
        acc[version.documentName] = []
      }
      acc[version.documentName].push(version)
      return acc
    },
    {} as Record<string, typeof mockVersionHistory>,
  )

  // Handle version selection for comparison
  const toggleVersionSelection = (id: number) => {
    if (selectedVersions.includes(id)) {
      setSelectedVersions(selectedVersions.filter((versionId) => versionId !== id))
    } else {
      if (selectedVersions.length < 2) {
        setSelectedVersions([...selectedVersions, id])
      } else {
        setSelectedVersions([selectedVersions[1], id])
      }
    }
  }

  // Handle compare button click
  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      setShowComparisonDialog(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Version Control & History</h2>
          <p className="text-muted-foreground">Track and manage changes to your requirement documents.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={selectedVersions.length !== 2} onClick={handleCompare}>
            <GitCompare className="mr-2 h-4 w-4" />
            Compare Selected
          </Button>
          <Button variant="outline" disabled={selectedVersions.length !== 1}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Rollback
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search versions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={documentFilter} onValueChange={setDocumentFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Document" />
                </SelectTrigger>
                <SelectContent>
                  {documentNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Tabs defaultValue={treeView ? "tree" : "table"} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tree" onClick={() => setTreeView(true)}>
                    Tree View
                  </TabsTrigger>
                  <TabsTrigger value="table" onClick={() => setTreeView(false)}>
                    Table View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version History */}
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle>Version History</CardTitle>
            <CardDescription>
              {selectedVersions.length > 0
                ? `${selectedVersions.length} version(s) selected`
                : `${filteredVersions.length} versions found`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {treeView ? (
            <div className="p-4">
              {Object.entries(groupedVersions).map(([documentName, versions]) => (
                <div key={documentName} className="mb-6">
                  <div className="mb-2 flex items-center">
                    <ChevronRight className="mr-1 h-4 w-4" />
                    <h3 className="font-medium">{documentName}</h3>
                    <Badge className="ml-2 bg-blue-100 text-blue-800">{versions.length} versions</Badge>
                  </div>
                  <div className="ml-6 space-y-2">
                    {versions
                      .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
                      .map((version) => (
                        <div
                          key={version.id}
                          className={`flex items-center justify-between rounded-md border p-3 ${
                            selectedVersions.includes(version.id) ? "border-blue-500 bg-blue-50" : ""
                          }`}
                          onClick={() => toggleVersionSelection(version.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                              <History className="h-4 w-4 text-blue-700" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">Version {version.version}</p>
                                <Badge variant="outline" className="bg-gray-100">
                                  {version.changes} changes
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500">{version.comment}</p>
                              <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                                <Calendar className="h-3 w-3" />
                                <span>{version.date}</span>
                                <span className="mx-1">•</span>
                                <User className="h-3 w-3" />
                                <span>{version.user}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {version.labels.map((label, index) => (
                              <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                                <Tag className="mr-1 h-3 w-3" />
                                {label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Document
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Changes</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Labels</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVersions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No versions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVersions.map((version) => (
                    <TableRow
                      key={version.id}
                      className={selectedVersions.includes(version.id) ? "bg-blue-50" : ""}
                      onClick={() => toggleVersionSelection(version.id)}
                    >
                      <TableCell>
                        <div
                          className={`h-4 w-4 rounded-sm border ${
                            selectedVersions.includes(version.id) ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{version.documentName}</TableCell>
                      <TableCell>v{version.version}</TableCell>
                      <TableCell>{version.date}</TableCell>
                      <TableCell>{version.user}</TableCell>
                      <TableCell>{version.changes}</TableCell>
                      <TableCell>{version.comment}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {version.labels.map((label, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Version Comparison Dialog */}
      <Dialog open={showComparisonDialog} onOpenChange={setShowComparisonDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Version Comparison</DialogTitle>
            <DialogDescription>
              Comparing {mockComparisonData.documentName} - v{mockComparisonData.oldVersion} and v
              {mockComparisonData.newVersion}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Version metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-3">
                <div className="mb-2 flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Version {mockComparisonData.oldVersion}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{mockComparisonData.oldDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <User className="h-3 w-3" />
                    <span>{mockComparisonData.oldUser}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-3">
                <div className="mb-2 flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Version {mockComparisonData.newVersion}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{mockComparisonData.newDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <User className="h-3 w-3" />
                    <span>{mockComparisonData.newUser}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Changes */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Changes ({mockComparisonData.changes.length})</h3>

              {mockComparisonData.changes.map((change) => (
                <div
                  key={change.id}
                  className={`rounded-md border p-3 ${
                    change.type === "added"
                      ? "border-green-200 bg-green-50"
                      : change.type === "removed"
                        ? "border-red-200 bg-red-50"
                        : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {change.type === "added" ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Plus className="mr-1 h-3 w-3" />
                          Added
                        </Badge>
                      ) : change.type === "removed" ? (
                        <Badge className="bg-red-100 text-red-800">
                          <Minus className="mr-1 h-3 w-3" />
                          Removed
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800">
                          <ArrowRight className="mr-1 h-3 w-3" />
                          Modified
                        </Badge>
                      )}
                      <Badge variant="outline">{change.category}</Badge>
                    </div>
                  </div>

                  {change.type === "modified" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-md bg-white p-2 text-sm">
                        <div className="mb-1 flex items-center">
                          <ArrowLeft className="mr-1 h-3 w-3 text-gray-500" />
                          <span className="text-xs font-medium text-gray-500">Before</span>
                        </div>
                        <p className="text-gray-700">{change.oldContent}</p>
                      </div>
                      <div className="rounded-md bg-white p-2 text-sm">
                        <div className="mb-1 flex items-center">
                          <ArrowRight className="mr-1 h-3 w-3 text-gray-500" />
                          <span className="text-xs font-medium text-gray-500">After</span>
                        </div>
                        <p className="text-gray-700">{change.newContent}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{change.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComparisonDialog(false)}>
              Close
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
