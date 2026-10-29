import NavBar from "@/component/NavBar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <>{children}</>
    </>
  );
}
