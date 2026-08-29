import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "light" | "dark"

type ThemeState = {
  theme: Theme
  toggleTheme: () => void
}

export const applyThemeClass = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        const { theme: prevTheme } = get()
        set({ theme: prevTheme === "dark" ? "light" : "dark" })
      },
    }),
    { name: "theme" },
  ),
)

useThemeStore.subscribe((state) => applyThemeClass(state.theme))
