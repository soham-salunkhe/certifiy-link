import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { AuthForm } from "@/components/AuthForm";
import { StudentDashboard } from "@/components/StudentDashboard";
import { RecruiterDashboard } from "@/components/RecruiterDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "auth" | "dashboard">("landing");
  const [userRole, setUserRole] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  const handleLogin = (role: string, email: string) => {
    setUserRole(role);
    setUserEmail(email);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUserRole("");
    setUserEmail("");
    setCurrentView("landing");
  };

  if (currentView === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === "auth") {
    return <AuthForm onLogin={handleLogin} />;
  }

  if (currentView === "dashboard") {
    if (userRole === "student") {
      return <StudentDashboard userEmail={userEmail} onLogout={handleLogout} />;
    }
    if (userRole === "recruiter") {
      return <RecruiterDashboard userEmail={userEmail} onLogout={handleLogout} />;
    }
    // Admin dashboard would go here
    return <div>Admin dashboard coming soon...</div>;
  }

  return null;
};

export default Index;
