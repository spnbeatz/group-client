"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthWrapper from "@/context/AuthWrapper";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageSocketProvider } from "@/context/MessageContextProvider";
import { NotifySocketProvider } from "@/context/NotifySocketProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AuthWrapper>
              <NotifySocketProvider>
                <MessageSocketProvider>
                  {children}
                </MessageSocketProvider>
              </NotifySocketProvider>
            </AuthWrapper>
          </QueryClientProvider>
        </Provider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
