import { create } from "zustand";
import { persist } from "zustand/middleware";

const demoUsers = {
  "super.admin@afess.com": {
    id: "USR-001",
    fullName: "Abdirahman Hassan",
    email: "super.admin@afess.com",
    role: "super_admin",
    roleLabel: "Super Admin",
    department: "Information Technology",
    avatar: null,
  },

  "admin@afess.com": {
    id: "USR-002",
    fullName: "Ahmed Hassan",
    email: "admin@afess.com",
    role: "organization_admin",
    roleLabel: "Organization Admin",
    department: "Administration",
    avatar: null,
  },

  "security@afess.com": {
    id: "USR-003",
    fullName: "Fatima Noor",
    email: "security@afess.com",
    role: "security_officer",
    roleLabel: "Security Officer",
    department: "Information Security",
    avatar: null,
  },

  "manager@afess.com": {
    id: "USR-004",
    fullName: "Mohamed Ali",
    email: "manager@afess.com",
    role: "department_manager",
    roleLabel: "Department Manager",
    department: "Finance",
    avatar: null,
  },

  "employee@afess.com": {
    id: "USR-005",
    fullName: "Amina Yusuf",
    email: "employee@afess.com",
    role: "employee",
    roleLabel: "Employee",
    department: "Finance",
    avatar: null,
  },
};

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: async ({ email, password }) => {
        set({ isLoading: true });

        await new Promise((resolve) => {
          window.setTimeout(resolve, 600);
        });

        const normalizedEmail = email.trim().toLowerCase();
        const user = demoUsers[normalizedEmail];

        if (!user || password !== "Secure@123") {
          set({ isLoading: false });

          throw new Error(
            "Invalid email or password. Please check your credentials."
          );
        }

        set({
          user,
          accessToken: "mock-afess-access-token",
          isAuthenticated: true,
          isLoading: false,
        });

        return user;
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (changes) => {
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
      name: "afess-auth-storage",

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;