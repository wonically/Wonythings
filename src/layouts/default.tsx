import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ScrollToTopButton from "@/components/scroll-to-top-button";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#F2E3E6] dark:bg-[#22171A] z-10">
      <NavBar />
      <main className="container mx-0 max-w-full px-6 flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
