"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  User,
  Palette,
  Languages,
  FileText,
  Link,
  UserPlus,
  Edit,
  Trash2,
  Save,
  Moon,
  Sun,
  Monitor,
  Check,
} from "lucide-react"

// Mock user roles data
const mockUserRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to all features",
    permissions: ["create", "read", "update", "delete", "manage_users", "manage_settings"],
  },
  {
    id: 2,
    name: "Project Manager",
    description: "Can manage projects and requirements",
    permissions: ["create", "read", "update", "delete"],
  },
  {
    id: 3,
    name: "Business Analyst",
    description: "Can create and edit requirements",
    permissions: ["create", "read", "update"],
  },
  {
    id: 4,
    name: "Developer",
    description: "Can view and comment on requirements",
    permissions: ["read", "comment"],
  },
  {
    id: 5,
    name: "Stakeholder",
    description: "Can view requirements",
    permissions: ["read"],
  },
]

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    lastActive: "2023-09-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Project Manager",
    lastActive: "2023-09-19",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Business Analyst",
    lastActive: "2023-09-18",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "Developer",
    lastActive: "2023-09-15",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Stakeholder",
    lastActive: "2023-09-10",
  },
]

// Mock export templates
const mockExportTemplates = [
  {
    id: 1,
    name: "Standard Requirements Document",
    description: "Default template for requirements documentation",
    format: "Word",
    isDefault: true,
  },
  {
    id: 2,
    name: "Agile User Stories",
    description: "Template for exporting requirements as user stories",
    format: "Excel",
    isDefault: false,
  },
  {
    id: 3,
    name: "Technical Specification",
    description: "Detailed technical specification template",
    format: "Word",
    isDefault: false,
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("user-roles")
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [showEditRoleDialog, setShowEditRoleDialog] = useState(false)
  const [showAddTemplateDialog, setShowAddTemplateDialog] = useState(false)
  const [selectedRole, setSelectedRole] = useState<(typeof mockUserRoles)[0] | null>(null)

  // Handle edit role
  const handleEditRole = (role: (typeof mockUserRoles)[0]) => {
    setSelectedRole(role)
    setShowEditRoleDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings & Admin</h2>
          <p className="text-muted-foreground">Manage system settings and user access.</p>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="user-roles">
            <User className="mr-1 h-4 w-4" />
            User Roles
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Link className="mr-1 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="language">
            <Languages className="mr-1 h-4 w-4" />
            Language
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-1 h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-1 h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* User Roles Tab */}
        <TabsContent value="user-roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage users and their access levels.</CardDescription>
                </div>
                <Button onClick={() => setShowAddUserDialog(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Define user roles and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserRoles.map((role) => (
                  <div key={role.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">{role.name}</h3>
                      <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                        <Edit className="mr-1 h-4 w-4" />
                        Edit Role
                      </Button>
                    </div>
                    <p className="mb-2 text-sm text-gray-500">{role.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                          {permission.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>External Integrations</CardTitle>
              <CardDescription>Connect with external tools and services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* JIRA Integration */}
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-6 w-6 text-blue-700"
                          fill="currentColor"
                        >
                          <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">JIRA Integration</h3>
                        <p className="text-sm text-gray-500">Sync requirements with JIRA issues</p>
                      </div>
                    </div>
                    <Switch id="jira-integration" />
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jira-url">JIRA URL</Label>
                        <Input id="jira-url" placeholder="https://your-domain.atlassian.net" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jira-project">Default Project Key</Label>
                        <Input id="jira-project" placeholder="e.g. PROJ" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jira-username">Username/Email</Label>
                        <Input id="jira-username" type="email" placeholder="your.email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jira-token">API Token</Label>
                        <Input id="jira-token" type="password" placeholder="••••••••••••••••" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Test Connection
                    </Button>
                  </div>
                </div>

                {/* Confluence Integration */}
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-6 w-6 text-blue-700"
                          fill="currentColor"
                        >
                          <path d="M.997 12.993c0 2.946 2.387 5.336 5.333 5.336 2.946 0 5.333-2.39 5.333-5.336 0-2.946-2.387-5.336-5.333-5.336-2.946 0-5.333 2.39-5.333 5.336zm7.022-2.577c.146-.21.233-.466.233-.741 0-.699-.57-1.269-1.269-1.269s-1.269.57-1.269 1.269c0 .276.087.531.233.741l-.854 1.269.854 1.269a1.269 1.269 0 0 0-.233.741c0 .699.57 1.269 1.269 1.269s1.269-.57 1.269-1.269c0-.276-.087-.531-.233-.741l.854-1.269-.854-1.269zm4.982-4.08c-2.946 0-5.333 2.39-5.333 5.336 0 2.946 2.387 5.336 5.333 5.336 2.946 0 5.333-2.39 5.333-5.336 0-2.946-2.387-5.336-5.333-5.336zm0 8.64c-1.82 0-3.297-1.478-3.297-3.304 0-1.826 1.478-3.304 3.297-3.304 1.82 0 3.297 1.478 3.297 3.304 0 1.826-1.478 3.304-3.297 3.304z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Confluence Integration</h3>
                        <p className="text-sm text-gray-500">Publish requirements to Confluence pages</p>
                      </div>
                    </div>
                    <Switch id="confluence-integration" />
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="confluence-url">Confluence URL</Label>
                        <Input id="confluence-url" placeholder="https://your-domain.atlassian.net/wiki" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confluence-space">Default Space Key</Label>
                        <Input id="confluence-space" placeholder="e.g. DOCS" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="confluence-username">Username/Email</Label>
                        <Input id="confluence-username" type="email" placeholder="your.email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confluence-token">API Token</Label>
                        <Input id="confluence-token" type="password" placeholder="••••••••••••••••" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Test Connection
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Tab */}
        <TabsContent value="language" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language & Dialect Settings</CardTitle>
              <CardDescription>Configure language preferences for the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="interface-language">Interface Language</Label>
                  <Select defaultValue="en-US">
                    <SelectTrigger id="interface-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                      <SelectItem value="de-DE">German</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="ja-JP">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ai-language">AI Assistant Language</Label>
                  <Select defaultValue="en-US">
                    <SelectTrigger id="ai-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                      <SelectItem value="de-DE">German</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="ja-JP">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="requirement-dialect">Requirement Dialect</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="requirement-dialect">
                      <SelectValue placeholder="Select dialect" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (shall/should/will)</SelectItem>
                      <SelectItem value="user-story">User Stories (As a... I want... So that...)</SelectItem>
                      <SelectItem value="job-story">Job Stories (When... I want... So that...)</SelectItem>
                      <SelectItem value="gherkin">Gherkin (Given... When... Then...)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    This setting affects how AI generates and formats requirements.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terminology">Domain-Specific Terminology</Label>
                  <Textarea
                    id="terminology"
                    placeholder="Enter domain-specific terms and their definitions, one per line"
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500">
                    These terms will be recognized by the AI when processing requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Export Templates</CardTitle>
                  <CardDescription>Manage document export templates.</CardDescription>
                </div>
                <Button onClick={() => setShowAddTemplateDialog(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Add Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockExportTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{template.name}</h3>
                        {template.isDefault && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Default
                          </Badge>
                        )}
                        <Badge variant="outline">{template.format}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      {!template.isDefault && (
                        <Button variant="outline" size="sm">
                          <Check className="mr-1 h-4 w-4" />
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <div className="flex gap-4">
                    <div className="flex flex-1 flex-col items-center gap-2 rounded-md border p-4 hover:bg-gray-50">
                      <Sun className="h-6 w-6 text-amber-500" />
                      <Label htmlFor="theme-light" className="cursor-pointer">
                        Light
                      </Label>
                      <input
                        type="radio"
                        id="theme-light"
                        name="theme"
                        value="light"
                        className="h-4 w-4 cursor-pointer"
                        defaultChecked
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-2 rounded-md border p-4 hover:bg-gray-50">
                      <Moon className="h-6 w-6 text-blue-700" />
                      <Label htmlFor="theme-dark" className="cursor-pointer">
                        Dark
                      </Label>
                      <input
                        type="radio"
                        id="theme-dark"
                        name="theme"
                        value="dark"
                        className="h-4 w-4 cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-2 rounded-md border p-4 hover:bg-gray-50">
                      <Monitor className="h-6 w-6 text-gray-500" />
                      <Label htmlFor="theme-system" className="cursor-pointer">
                        System
                      </Label>
                      <input
                        type="radio"
                        id="theme-system"
                        name="theme"
                        value="system"
                        className="h-4 w-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    {["blue", "purple", "green", "red", "amber"].map((color) => (
                      <div
                        key={color}
                        className={`h-8 w-8 cursor-pointer rounded-full border-2 ${
                          color === "blue" ? "border-black" : "border-transparent"
                        }`}
                        style={{
                          backgroundColor:
                            color === "blue"
                              ? "#2563eb"
                              : color === "purple"
                                ? "#8b5cf6"
                                : color === "green"
                                  ? "#10b981"
                                  : color === "red"
                                    ? "#ef4444"
                                    : "#f59e0b",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger>
                      <SelectValue placeholder="Select density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-animations">Animations</Label>
                    <p className="text-xs text-gray-500">Enable or disable UI animations</p>
                  </div>
                  <Switch id="show-animations" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <p className="text-xs text-gray-500">Increase contrast for better visibility</p>
                  </div>
                  <Switch id="high-contrast" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Invite a new user to the system.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue="Developer">
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {mockUserRoles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="send-invitation" defaultChecked />
              <Label htmlFor="send-invitation">Send invitation email</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddUserDialog(false)}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={showEditRoleDialog} onOpenChange={setShowEditRoleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Role: {selectedRole?.name}</DialogTitle>
            <DialogDescription>Modify role permissions and settings.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input id="role-name" defaultValue={selectedRole?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Textarea id="role-description" defaultValue={selectedRole?.description} />
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="perm-create"
                    defaultChecked={selectedRole?.permissions.includes("create")}
                  />
                  <Label htmlFor="perm-create">Create Requirements</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="perm-read" defaultChecked={selectedRole?.permissions.includes("read")} />
                  <Label htmlFor="perm-read">Read Requirements</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="perm-update"
                    defaultChecked={selectedRole?.permissions.includes("update")}
                  />
                  <Label htmlFor="perm-update">Update Requirements</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="perm-delete"
                    defaultChecked={selectedRole?.permissions.includes("delete")}
                  />
                  <Label htmlFor="perm-delete">Delete Requirements</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="perm-manage-users"
                    defaultChecked={selectedRole?.permissions.includes("manage_users")}
                  />
                  <Label htmlFor="perm-manage-users">Manage Users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="perm-manage-settings"
                    defaultChecked={selectedRole?.permissions.includes("manage_settings")}
                  />
                  <Label htmlFor="perm-manage-settings">Manage Settings</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditRoleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowEditRoleDialog(false)}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Template Dialog */}
      <Dialog open={showAddTemplateDialog} onOpenChange={setShowAddTemplateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Export Template</DialogTitle>
            <DialogDescription>Create a new document export template.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input id="template-name" placeholder="Enter template name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Textarea id="template-description" placeholder="Enter template description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-format">Format</Label>
              <Select defaultValue="Word">
                <SelectTrigger id="template-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Word">Word (.docx)</SelectItem>
                  <SelectItem value="Excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="PDF">PDF (.pdf)</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="set-default" />
              <Label htmlFor="set-default">Set as default template</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTemplateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddTemplateDialog(false)}>Add Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
