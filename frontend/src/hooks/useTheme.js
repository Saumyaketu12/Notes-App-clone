// small shim - re-export the ThemeContext hook for backwards compatibility
import { useTheme as useThemeContext } from "../contexts/ThemeContext";
export default function useTheme() {
  return useThemeContext();
}
