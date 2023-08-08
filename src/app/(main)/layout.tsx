import MainNavbar from "./components/MainNavbar/MainNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}
