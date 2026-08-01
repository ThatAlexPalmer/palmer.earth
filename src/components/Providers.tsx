"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import { theme } from "@/config/theme";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
}
