import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios";
import { toast } from "sonner";
import { getTimeGreeting } from "../lib/utils.js";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const [credits, setCredits] = useState(0);

  const { data: session, isPending } = authClient.useSession();
   const isLoggedIn = !isPending && session?.user;
  

  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");
      setCredits(data.credits);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  useEffect(() => {
    if (!session?.user) return;

    const shown = sessionStorage.getItem("loginGreetingShown");

    if (!shown) {
      toast(`${getTimeGreeting()}, ${session.user.name} 👋`, {
        description: "Welcome back to Ai Site Builder 🚀",
      });

      sessionStorage.setItem("loginGreetingShown", "true");
    }
  }, [session?.user]);

  useEffect(() => {
    if (!session?.user) {
      // User logged out → reset greeting flag
      sessionStorage.removeItem("loginGreetingShown");
    }
  }, [session?.user]);
  

  return (
    <>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-foreground border-border">
        <Link to="/">
          <img src={assets.logo} alt="" className="h-5 sm:h-7" />
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/projects" className="hover:text-primary transition">
            My Projects
          </Link>
          <Link to="/community" className="hover:text-primary transition">
            Community
          </Link>
          <Link to="/pricing" className="hover:text-primary transition">
            Pricing
          </Link>
        </div>

        {/* <div className="hidden md:block space-x-3"> */}
        <div className="flex items-center gap-3">
           {!isLoggedIn ? (
            <button
              onClick={() => navigate("/auth/signin")}
              className="px-6 py-1.5 max-sm:text-sm bg-primary text-primary-foreground active:scale-95 hover:bg-primary/90 transition rounded shadow-md"
            >
              Get started
            </button>
          ) : (
            <>
              {/* Greeting */}
              <div className="hidden sm:flex items-center text-sm text-muted-foreground mr-2">
                <span className="text-muted-foreground">{getTimeGreeting()},</span>
                <span className="ml-1 font-medium text-foreground">
                  {session.user.name}
                </span>
                👋
              </div>

              {/* Credits and UserButton */}
              <button className="bg-foreground/10 px-5 py-1.5 text-xs sm:text-sm border border-border text-foreground/80 rounded-full">
                Credits:<span className="text-primary ml-1">{credits}</span>
              </button>
              <UserButton size="icon" />
            </>
          )} 
          

          <button
            id="open-menu"
            className="md:hidden active:scale-90 transition"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 text-foreground backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>
            My Projects
          </Link>
          <Link to="/community" onClick={() => setMenuOpen(false)}>
            Community
          </Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>

          <button
            className="active:ring-3 active:ring-foreground aspect-square size-10 p-1 items-center justify-center bg-muted hover:bg-muted/80 transition text-foreground rounded-md flex"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}
      {/* BACKGROUND GLOW */}
      <div
        className="absolute inset-0 -z-10 size-full"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, color-mix(in oklch, var(--primary) 55%, transparent), transparent 70%)",
        }}
      />
    </>
  );
};

export default Navbar;








