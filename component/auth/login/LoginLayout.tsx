import type { ReactNode } from "react";
import LoginSidebar from "./LoginSidebar";

type LoginLayoutProps = {
  children: ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <LoginSidebar />
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
          <div className="w-full max-w-md">{children}</div>
        </section>
      </div>
    </main>
  );
}
