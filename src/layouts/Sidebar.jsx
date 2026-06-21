import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  FileCheck2,
  FileClock,
  FileHeart,
  FileKey2,
  FileLock2,
  FileText,
  Folder,
  Gauge,
  HardDrive,
  HelpCircle,
  KeyRound,
  Link2,
  ListChecks,
  LockKeyhole,
  ScrollText,
  Settings,
  Share2,
  ShieldAlert,
  Tags,
  Trash2,
  UserCircle,
  Users,
} from "lucide-react";

const allRoles = [
  "super_admin",
  "organization_admin",
  "security_officer",
  "department_manager",
  "employee",
];

const managers = [
  "super_admin",
  "organization_admin",
  "security_officer",
  "department_manager",
];

const securityRoles = [
  "super_admin",
  "organization_admin",
  "security_officer",
];

const adminRoles = [
  "super_admin",
  "organization_admin",
];

export const navigationGroups = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/app/dashboard",
        icon: Gauge,
        roles: allRoles,
      },
    ],
  },

  {
    label: "File Workspace",
    items: [
      {
        label: "My Files",
        path: "/app/files",
        icon: FileText,
        roles: allRoles,
      },
      {
        label: "Upload Center",
        path: "/app/files/upload",
        icon: FileLock2,
        roles: allRoles,
      },
      {
        label: "Shared With Me",
        path: "/app/files/shared-with-me",
        icon: FileCheck2,
        roles: allRoles,
      },
      {
        label: "Shared By Me",
        path: "/app/files/shared-by-me",
        icon: FileKey2,
        roles: allRoles,
      },
      {
        label: "Recent Files",
        path: "/app/files/recent",
        icon: FileClock,
        roles: allRoles,
      },
      {
        label: "Favorites",
        path: "/app/files/favorites",
        icon: FileHeart,
        roles: allRoles,
      },
      {
        label: "Folders",
        path: "/app/folders",
        icon: Folder,
        roles: allRoles,
      },
      {
        label: "Trash",
        path: "/app/files/trash",
        icon: Trash2,
        roles: allRoles,
      },
    ],
  },

  {
    label: "Sharing Workflow",
    items: [
      {
        label: "Secure Share",
        path: "/app/share/new",
        icon: Share2,
        roles: allRoles,
      },
      {
        label: "Approval Center",
        path: "/app/approvals",
        icon: ListChecks,
        roles: allRoles,
      },
      {
        label: "Secure Links",
        path: "/app/secure-links",
        icon: Link2,
        roles: managers,
      },
      {
        label: "Access Requests",
        path: "/app/access-requests",
        icon: KeyRound,
        roles: managers,
      },
    ],
  },

  {
    label: "Security Center",
    items: [
      {
        label: "Monitoring",
        path: "/app/security/monitoring",
        icon: ShieldAlert,
        roles: securityRoles,
      },
      {
        label: "Audit Logs",
        path: "/app/security/audit-logs",
        icon: ScrollText,
        roles: securityRoles,
      },
      {
        label: "Encryption",
        path: "/app/security/encryption",
        icon: FileLock2,
        roles: securityRoles,
      },
      {
        label: "Integrity",
        path: "/app/security/integrity",
        icon: LockKeyhole,
        roles: securityRoles,
      },
      {
        label: "Sessions",
        path: "/app/security/sessions",
        icon: Activity,
        roles: allRoles,
      },
    ],
  },

  {
    label: "Administration",
    items: [
      {
        label: "Users",
        path: "/app/admin/users",
        icon: Users,
        roles: adminRoles,
      },
      {
        label: "Roles",
        path: "/app/admin/roles",
        icon: UserCircle,
        roles: adminRoles,
      },
      {
        label: "Departments",
        path: "/app/admin/departments",
        icon: Building2,
        roles: adminRoles,
      },
      {
        label: "Categories",
        path: "/app/admin/categories",
        icon: Tags,
        roles: adminRoles,
      },
      {
        label: "Storage",
        path: "/app/admin/storage",
        icon: HardDrive,
        roles: adminRoles,
      },
      {
        label: "Reports",
        path: "/app/reports",
        icon: BarChart3,
        roles: managers,
      },
      {
        label: "Settings",
        path: "/app/settings",
        icon: Settings,
        roles: adminRoles,
      },
    ],
  },

  {
    label: "Account",
    items: [
      {
        label: "Notifications",
        path: "/app/notifications",
        icon: Bell,
        roles: allRoles,
      },
      {
        label: "Profile",
        path: "/app/profile",
        icon: UserCircle,
        roles: allRoles,
      },
      {
        label: "Help Center",
        path: "/app/help",
        icon: HelpCircle,
        roles: allRoles,
      },
    ],
  },
];