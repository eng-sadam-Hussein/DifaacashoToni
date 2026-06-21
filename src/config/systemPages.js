const statistics = [
  {
    label: "Total Records",
    value: "1,284",
    note: "All available records",
  },
  {
    label: "Active",
    value: "1,247",
    note: "Currently active",
  },
  {
    label: "Pending",
    value: "24",
    note: "Requires attention",
  },
  {
    label: "Updated Today",
    value: "18",
    note: "Recent changes",
  },
];

const fileColumns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "owner",
    label: "Owner",
  },
  {
    key: "department",
    label: "Department",
  },
  {
    key: "classification",
    label: "Classification",
  },
  {
    key: "status",
    label: "Status",
  },
];

const fileRows = [
  {
    id: "FIL-001",
    name: "Q2 Financial Report.pdf",
    owner: "Amina Yusuf",
    department: "Finance",
    classification: "Confidential",
    status: "Encrypted",
  },
  {
    id: "FIL-002",
    name: "Employee Payroll.xlsx",
    owner: "Ahmed Hassan",
    department: "Human Resources",
    classification: "Restricted",
    status: "Encrypted",
  },
  {
    id: "FIL-003",
    name: "Supplier Agreement.docx",
    owner: "Mohamed Ali",
    department: "Procurement",
    classification: "Internal",
    status: "Shared",
  },
];

const userColumns = [
  {
    key: "name",
    label: "Full Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "department",
    label: "Department",
  },
  {
    key: "status",
    label: "Status",
  },
];

const userRows = [
  {
    id: "USR-001",
    name: "Ahmed Hassan",
    email: "admin@afess.com",
    role: "Organization Admin",
    department: "Administration",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Fatima Noor",
    email: "security@afess.com",
    role: "Security Officer",
    department: "Information Security",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Amina Yusuf",
    email: "employee@afess.com",
    role: "Employee",
    department: "Finance",
    status: "Active",
  },
];

const securityColumns = [
  {
    key: "event",
    label: "Event",
  },
  {
    key: "user",
    label: "User",
  },
  {
    key: "severity",
    label: "Severity",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "status",
    label: "Status",
  },
];

const securityRows = [
  {
    id: "ALT-001",
    event: "Unknown device login",
    user: "Ahmed Hassan",
    severity: "Medium",
    date: "Today, 09:15",
    status: "Warning",
  },
  {
    id: "ALT-002",
    event: "Restricted file access blocked",
    user: "External Guest",
    severity: "Critical",
    date: "Today, 08:42",
    status: "Blocked",
  },
];

const approvalColumns = [
  {
    key: "file",
    label: "File",
  },
  {
    key: "requester",
    label: "Requester",
  },
  {
    key: "approver",
    label: "Approver",
  },
  {
    key: "classification",
    label: "Classification",
  },
  {
    key: "status",
    label: "Status",
  },
];

const approvalRows = [
  {
    id: "APR-001",
    file: "Q2 Financial Report.pdf",
    requester: "Amina Yusuf",
    approver: "Mohamed Ali",
    classification: "Confidential",
    status: "Pending",
  },
  {
    id: "APR-002",
    file: "Supplier Agreement.docx",
    requester: "Ahmed Hassan",
    approver: "Fatima Noor",
    classification: "Highly Confidential",
    status: "Approved",
  },
];

const createFilePage = (
  title,
  description,
  primaryAction
) => ({
  title,
  description,
  primaryAction,
  columns: fileColumns,
  initialRows: fileRows,
  statistics,
});

export const systemPages = {
  myFiles: createFilePage(
    "My Files",
    "Manage encrypted corporate documents and files.",
    "Upload File"
  ),

  upload: createFilePage(
    "Upload Files",
    "Upload, classify and protect corporate documents.",
    "Choose Files"
  ),

  sharedWithMe: createFilePage(
    "Shared With Me",
    "Files securely shared with your account.",
    "Request Access"
  ),

  sharedByMe: createFilePage(
    "Shared By Me",
    "Manage files and links you have shared.",
    "Secure Share"
  ),

  recentFiles: createFilePage(
    "Recent Files",
    "Review recently opened and modified documents.",
    "Upload File"
  ),

  favorites: createFilePage(
    "Favorite Files",
    "Quickly access important files.",
    "Add Favorite"
  ),

  folders: createFilePage(
    "Folders",
    "Organize files into protected folders.",
    "Create Folder"
  ),

  trash: createFilePage(
    "Trash",
    "Restore or permanently remove deleted files.",
    "Empty Trash"
  ),

  fileDetails: createFilePage(
    "File Details",
    "Review metadata, access controls and activity.",
    "Secure Share"
  ),

  versionHistory: createFilePage(
    "Version History",
    "Review and restore previous file versions.",
    "Upload Version"
  ),

  secureShare: createFilePage(
    "Secure Share",
    "Configure recipients and sharing permissions.",
    "Create Share"
  ),

  secureLinks: createFilePage(
    "Secure Links",
    "Manage active, expired and revoked links.",
    "Create Link"
  ),

  accessRequests: {
    title: "Access Requests",
    description:
      "Review requests to access protected resources.",
    primaryAction: "New Request",
    columns: approvalColumns,
    initialRows: approvalRows,
    statistics,
  },

  approvals: {
    title: "Approval Center",
    description:
      "Review secure sharing approval workflows.",
    primaryAction: "New Request",
    columns: approvalColumns,
    initialRows: approvalRows,
    statistics,
  },

  monitoring: {
    title: "Security Monitoring",
    description:
      "Monitor security alerts and suspicious activities.",
    primaryAction: "Create Alert Rule",
    columns: securityColumns,
    initialRows: securityRows,
    statistics,
  },

  alertDetails: {
    title: "Security Alert Details",
    description:
      "Investigate a detected security incident.",
    primaryAction: "Resolve Alert",
    columns: securityColumns,
    initialRows: securityRows,
    statistics,
  },

  auditLogs: {
    title: "Audit Logs",
    description:
      "Review system and user activity records.",
    primaryAction: "Export Logs",
    columns: securityColumns,
    initialRows: securityRows,
    statistics,
  },

  encryption: createFilePage(
    "Encryption Management",
    "Monitor file encryption policies and operations.",
    "Run Encryption Scan"
  ),

  integrity: createFilePage(
    "Integrity Verification",
    "Verify that files have not been altered.",
    "Verify Files"
  ),

  sessions: {
    title: "Active Sessions",
    description:
      "Review devices and revoke account sessions.",
    primaryAction: "Revoke Session",
    columns: securityColumns,
    initialRows: securityRows,
    statistics,
  },

  users: {
    title: "Users Management",
    description:
      "Manage organization users and roles.",
    primaryAction: "Add User",
    columns: userColumns,
    initialRows: userRows,
    statistics,
  },

  userDetails: {
    title: "User Details",
    description:
      "Review user profile, sessions and activity.",
    primaryAction: "Edit User",
    columns: userColumns,
    initialRows: userRows,
    statistics,
  },

  roles: {
    title: "Roles & Permissions",
    description:
      "Configure roles and access permissions.",
    primaryAction: "Create Role",
    columns: userColumns,
    initialRows: userRows,
    statistics,
  },

  departments: {
    title: "Departments",
    description:
      "Manage departments, managers and members.",
    primaryAction: "Add Department",
    columns: userColumns,
    initialRows: userRows,
    statistics,
  },

  categories: createFilePage(
    "Categories & Tags",
    "Organize files with categories and tags.",
    "Add Category"
  ),

  storage: createFilePage(
    "Storage Management",
    "Monitor storage usage and quotas.",
    "Add Storage"
  ),

  reports: createFilePage(
    "Reports",
    "Generate file, security and sharing reports.",
    "Generate Report"
  ),

  settings: {
    title: "Organization Settings",
    description:
      "Configure system and organization policies.",
    primaryAction: "Save Settings",
    columns: userColumns,
    initialRows: userRows,
    statistics,
  },

  systemHealth: {
    title: "System Health",
    description:
      "Monitor application services and operations.",
    primaryAction: "Run Diagnostics",
    columns: securityColumns,
    initialRows: securityRows,
    statistics,
  },

  notifications: {
    title: "Notifications",
    description:
      "Review security, sharing and account notifications.",
    primaryAction: "Mark All Read",
    columns: securityColumns,
    initialRows: securityRows,
    statistics,
  },

  profile: {
    title: "My Profile",
    description:
      "Manage account information and security.",
    primaryAction: "Update Profile",
    columns: userColumns,
    initialRows: userRows,
    statistics,
  },

  help: createFilePage(
    "Help & Support",
    "Access system guidance and support resources.",
    "Contact Support"
  ),
};