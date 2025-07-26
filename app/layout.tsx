import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { Navigation } from "@/components/Navigation/Navigation";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { ChatLayout } from "@/components/Chat/ChatLayout";
import { NotifyLayout } from "@/components/Notifications/NotifyLayout";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen site-bg bg-background font-sans antialiased ",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen w-screen items-center ">
            <Navigation />
            <main className="p-4 flex-grow w-full h-full overflow-hidden overflow-y-scroll pt-11">

              {children}
              <NotifyLayout />
              <ChatLayout />
            </main>

          </div>
        </Providers>
      </body>
    </html>
  );
}
