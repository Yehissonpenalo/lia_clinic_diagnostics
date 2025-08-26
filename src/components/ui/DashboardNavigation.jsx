import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const DashboardNavigation = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'AI Consultation',
      path: '/ai-consultation-interface',
      icon: 'MessageSquare',
      description: 'Start new consultation'
    },
    {
      label: 'Report Preview',
      path: '/report-preview-purchase',
      icon: 'FileText',
      description: 'View and purchase reports'
    },
    {
      label: 'Full Reports',
      path: '/full-report-dashboard',
      icon: 'BarChart3',
      description: 'Access complete reports'
    },
    {
      label: 'Profile',
      path: '/user-profile-management',
      icon: 'User',
      description: 'Manage your account'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
              >
                <path
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
                  fill="currentColor"
                  opacity="0.7"
                />
                <path
                  d="M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z"
                  fill="currentColor"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">LIA</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Clinic Diagnostics</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item.description}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* User Avatar */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {user?.name || 'Healthcare Professional'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.role || 'Clinic Owner'}
                </p>
              </div>
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-secondary-foreground" />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="px-4 py-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <div className="text-left">
                    <div>{item.label}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Mobile User Info */}
            <div className="px-4 py-3 border-t border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user?.name || 'Healthcare Professional'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role || 'Clinic Owner'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default DashboardNavigation;