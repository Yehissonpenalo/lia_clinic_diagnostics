import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebar = ({ notifications = 0, onNotificationClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Analytics Dashboard',
      path: '/admin-analytics-dashboard',
      icon: 'BarChart3',
      description: 'Business intelligence and metrics',
      badge: notifications > 0 ? notifications : null
    },
    {
      label: 'Content Management',
      path: '/admin-content-management',
      icon: 'FileEdit',
      description: 'Manage system content and templates'
    }
  ];

  const systemItems = [
    {
      label: 'User Management',
      icon: 'Users',
      description: 'Manage healthcare professionals',
      onClick: () => console.log('User management clicked')
    },
    {
      label: 'System Settings',
      icon: 'Settings',
      description: 'Configure system parameters',
      onClick: () => console.log('System settings clicked')
    },
    {
      label: 'Audit Logs',
      icon: 'FileSearch',
      description: 'View system activity logs',
      onClick: () => console.log('Audit logs clicked')
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      } bg-card border-r border-border transition-all duration-300`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary-foreground"
                  >
                    <path
                      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">LIA Admin</h2>
                  <p className="text-xs text-muted-foreground">Control Panel</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Main Navigation */}
            <div className="space-y-1">
              {!isCollapsed && (
                <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Main
                </h3>
              )}
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={isCollapsed ? item.label : item.description}
                >
                  <div className="relative">
                    <Icon name={item.icon} size={18} />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div>{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* System Items */}
            <div className="pt-4 space-y-1">
              {!isCollapsed && (
                <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  System
                </h3>
              )}
              {systemItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  title={isCollapsed ? item.label : item.description}
                >
                  <Icon name={item.icon} size={18} />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div>{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-secondary-foreground" />
              </div>
              {!isCollapsed && (
                <div>
                  <p className="text-sm font-medium text-foreground">Admin User</p>
                  <p className="text-xs text-muted-foreground">System Administrator</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <nav className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActivePath(item.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={20} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label.split(' ')[0]}</span>
            </button>
          ))}
          <button
            onClick={() => console.log('Settings clicked')}
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <Icon name="Settings" size={20} />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;