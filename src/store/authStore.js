import { create } from "zustand";
import { persist } from "zustand/middleware";

const wait = (duration = 600) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });

const frontendUsers = [
  {
    id: "USR-001",
    username: "superadmin",
    email: "super.admin@afess.com",
    password: "Secure@123",
    fullName: "Abdirahman Hassan",
    role: "super_admin",
    roleLabel: "Super Admin",
    department: "Information Technology",
    dashboardPath: "/app/dashboard",
  },
  {
    id: "USR-002",
    username: "admin",
    email: "admin@afess.com",
    password: "Secure@123",
    fullName: "Ahmed Hassan",
    role: "organization_admin",
    roleLabel: "Organization Admin",
    department: "Administration",
    dashboardPath: "/app/dashboard",
  },
  {
    id: "USR-003",
    username: "security",
    email: "security@afess.com",
    password: "Secure@123",
    fullName: "Fatima Noor",
    role: "security_officer",
    roleLabel: "Security Officer",
    department: "Information Security",
    dashboardPath: "/app/dashboard",
  },
  {
    id: "USR-004",
    username: "manager",
    email: "manager@afess.com",
    password: "Secure@123",
    fullName: "Mohamed Ali",
    role: "department_manager",
    roleLabel: "Department Manager",
    department: "Finance",
    dashboardPath: "/app/dashboard",
  },
  {
    id: "USR-005",
    username: "employee",
    email: "employee@afess.com",
    password: "Secure@123",
    fullName: "Amina Yusuf",
    role: "employee",
    roleLabel: "Employee",
    department: "Finance",
    dashboardPath: "/app/dashboard",
  },
];

const removePassword = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      pendingAuth: null,
      isAuthenticated: false,
      isInitializing: false,
      isSubmitting: false,
      error: null,

      initializeAuth: async () => {
        set({
          isInitializing: false,
        });
      },

      login: async ({ identifier, password }) => {
        set({
          isSubmitting: true,
          error: null,
        });

        await wait();

        const normalizedIdentifier = identifier
          .trim()
          .toLowerCase();

        const matchedUser = frontendUsers.find(
          (user) =>
            user.username.toLowerCase() === normalizedIdentifier ||
            user.email.toLowerCase() === normalizedIdentifier
        );

        if (!matchedUser || matchedUser.password !== password) {
          const message =
            "Username, email, or password is incorrect.";

          set({
            user: null,
            isAuthenticated: false,
            isSubmitting: false,
            error: message,
          });

          throw new Error(message);
        }

        const safeUser = removePassword(matchedUser);

        set({
          user: safeUser,
          pendingAuth: null,
          isAuthenticated: true,
          isSubmitting: false,
          error: null,
        });

        return {
          requiresOtp: false,
          user: safeUser,
        };
      },

      logout: () => {
        set({
          user: null,
          pendingAuth: null,
          isAuthenticated: false,
          isSubmitting: false,
          error: null,
        });
      },

      clearError: () => {
        set({
          error: null,
        });
      },

      clearPendingAuthentication: () => {
        set({
          pendingAuth: null,
          error: null,
        });
      },

      updateCurrentUser: (changes) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...changes,
              }
            : null,
        }));
      },
    }),
    {
      name: "afess-frontend-auth",

      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;