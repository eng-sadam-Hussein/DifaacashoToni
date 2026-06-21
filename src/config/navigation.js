import {
  Activity,
  Bell,
  Building2,
  Clock3,
  Database,
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
  History,
  KeyRound,
  Link2,
  ListChecks,
  LockKeyhole,
  Settings,
  ShieldAlert,
  Tags,
  Trash2,
  UserCircle,
  Users,
} from "lucide-react";

const allInternalRoles = [
  "super_admin",
  "organization_admin",
  "security_officer",
  "department_manager",
  "employee",
];

const adminRoles = ["super_admin", "organization_admin"];

const securityRoles = [
  "super_admin",
  "organization_admin",
  "security_officer",
];

const managerRoles = [
  "super_admin",
  "organization_admin",
  "security_officer",
  "department_manager",
];

export const navigationGroups = [
  {
    label: "Main",

    items: [
      {
        label: "Dashboard",
        path: "/app/dashboard",
        icon: Gauge,
        roles: allInternalRoles,
      },
    ],
  },

  {
    label: "Files",

    items: [
      {
        label: "My Files",
        path: "/app/files",
        icon: FileText,
        roles: allInternalRoles,
      },
      {
        label: "Shared With Me",
        path: "/app/files/shared-with-me",
        icon: FileCheck2,
        roles: allInternalRoles,
      },
      {
        label: "Shared By Me",
        path: "/app/files/shared-by-me",
        icon: FileKey2,
        roles: allInternalRoles,
      },
      {
        label: "Recent Files",
        path: "/app/files/recent",
        icon: FileClock,
        roles: allInternalRoles,
      },
      {
        label: "Favorites",
        path: "/app/files/favorites",
        icon: FileHeart,
        roles: allInternalRoles,
      },
      {
        label: "Folders",
        path: "/app/folders",
        icon: Folder,
        roles: allInternalRoles,
      },
      {
        label: "Trash",
        path: "/app/files/trash",
        icon: Trash2,
        roles: allInternalRoles,
      },
    ],
  },

  {
    label: "Sharing & Approvals",

    items: [
      {
        label: "Approval Center",
        path: "/app/approvals",
        icon: ListChecks,
        roles: allInternalRoles,
      },
      {
        label: "Secure Links",
        path: "/app/secure-links",
        icon: Link2,
        roles: managerRoles,
      },
      {
        label: "Access Requests",
        path: "/app/access-requests",
        icon: KeyRound,
        roles: managerRoles,
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
        icon: History,
        roles: securityRoles,
      },
      {
        label: "Encryption Management",
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
        roles: allInternalRoles,
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
        label: "Storage Management",
        path: "/app/admin/storage",
        icon: HardDrive,
        roles: adminRoles,
      },
      {
        label: "Reports",
        path: "/app/reports",
        icon: Database,
        roles: managerRoles,
      },
      {
        label: "Organization Settings",
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
    label: "Personal & Support",

    items: [
      {
        label: "Notifications",
        path: "/app/notifications",
        icon: Bell,
        roles: allInternalRoles,
      },
      {
        label: "My Profile",
        path: "/app/profile",
        icon: UserCircle,
        roles: allInternalRoles,
      },
      {
        label: "Help & Support",
        path: "/app/help",
        icon: HelpCircle,
        roles: allInternalRoles,
      },
    ],
  },
];