import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import comingSoonImage from "@/assets/coming-soon-cyber.jpg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(
      "Navigated to under-construction page:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/20 relative overflow-hidden">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-dots-pattern animate-pulse opacity-10"></div>
      
      <div className="text-center space-y-8 px-4 z-10">
        {/* Cyberpunk image */}
        <div className="relative mx-auto w-80 h-80 mb-8">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"></div>
          <img 
            src={comingSoonImage} 
            alt="Coming Soon - Under Construction"
            className="relative w-full h-full object-cover rounded-2xl border border-primary/30 shadow-2xl"
            loading="lazy"
          />
        </div>

        {/* Coming Soon content */}
        <div className="space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-[Orbitron]">
            Coming Soon
          </h1>
          
          <div className="space-y-3">
            <p className="text-xl text-muted-foreground">
              页面正在搭建中...
            </p>
            <p className="text-lg text-muted-foreground/80">
              This page is under construction
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all duration-300 group"
            >
              <span>返回首页</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-accent/30 rotate-12 animate-pulse"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rotate-45 animate-bounce"></div>
    </div>
  );
};

export default NotFound;
