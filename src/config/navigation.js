import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  Clock3,
  FileCheck2,
  FileClock,
  FileHeart,
  FileLock2,
  FileText,
  Folder,
  HardDrive,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
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

const managementRoles = [
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
        icon: LayoutDashboard,
        roles: allRoles,
      },
    ],
  },

  {
    label: "File Management",
    items: [
      {
        label: "My Files",
        path: "/app/files",
        icon: FileText,
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
        icon: Share2,
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
    label: "Sharing & Approvals",
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
        roles: managementRoles,
      },
      {
        label: "Access Requests",
        path: "/app/access-requests",
        icon: KeyRound,
        roles: managementRoles,
      },
    ],
  },

  {
    label: "Security",
    items: [
      {
        label: "Security Monitoring",
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
        label: "Integrity Verification",
        path: "/app/security/integrity",
        icon: LockKeyhole,
        roles: securityRoles,
      },
      {
        label: "Active Sessions",
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
        label: "Roles & Permissions",
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
        label: "Categories & Tags",
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
        roles: managementRoles,
      },
      {
        label: "Settings",
        path: "/app/settings",
        icon: Settings,
        roles: adminRoles,
      },
      {
        label: "System Health",
        path: "/app/system-health",
        icon: Clock3,
        roles: ["super_admin"],
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
        label: "My Profile",
        path: "/app/profile",
        icon: UserCircle,
        roles: allRoles,
      },
      {
        label: "Help & Support",
        path: "/app/help",
        icon: HelpCircle,
        roles: allRoles,
      },
    ],
  },
];