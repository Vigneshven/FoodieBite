import type { ReactNode } from "react";
import RegisterSidebar from "./RegisterSidebar";

type RegisterLayoutProps = {
  children: ReactNode;
};

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <RegisterSidebar />
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
          <div className="w-full max-w-xl">{children}</div>
        </section>
      </div>
    </main>
  );
}
