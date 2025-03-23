
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Bed, 
  CalendarDays, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  Settings, 
  LogOut, 
  CreditCard, 
  Moon,
  Sun,
  UserRound,
  Hotel,
  Wallet,
  Receipt
} from 'lucide-react';
import { SidebarItem } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from 'next-themes';

// Admin sidebar items
const adminSidebarItems: SidebarItem[] = [
  { title: 'Dashboard', path: '/', icon: LayoutDashboard },
  { title: 'Rooms', path: '/rooms', icon: Bed },
  { title: 'Bookings', path: '/bookings', icon: CalendarDays },
  { title: 'Guests', path: '/guests', icon: Users },
  { title: 'Payments', path: '/bookings', icon: CreditCard },
  { title: 'Reports', path: '/bookings', icon: Receipt },
];

// Customer sidebar items
const customerSidebarItems: SidebarItem[] = [
  { title: 'Dashboard', path: '/customer-dashboard', icon: LayoutDashboard },
  { title: 'Book Rooms', path: '/rooms', icon: Bed },
  { title: 'My Bookings', path: '/bookings', icon: CalendarDays },
  { title: 'My Payments', path: '/bookings', icon: Wallet },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // If no theme is set, initialize it based on system preference
    if (!theme) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, [theme, setTheme]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/landing');
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    
    // Show toast notification
    toast({
      title: `${theme === 'dark' ? 'Light' : 'Dark'} Mode Activated`,
      description: `Switched to ${theme === 'dark' ? 'light' : 'dark'} mode.`,
    });
  };

  // Choose sidebar items based on user role
  const sidebarItems = user?.role === 'customer' ? customerSidebarItems : adminSidebarItems;
  
  // Filter sidebar items based on user role
  const filteredItems = sidebarItems.filter(item => {
    if (item.path === '/guests' && user?.role === 'customer') {
      return false;
    }
    return true;
  });

  return (
    <div
      className={cn(
        "h-screen flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed ? (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Hotel className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold">Satkar</h1>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Hotel className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      {/* User Info */}
      {!collapsed && user && (
        <div className="px-4 py-3 border-b border-border">
          <div className="font-medium truncate">{user.name}</div>
          <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          <div className="text-xs text-muted-foreground mt-1 capitalize">
            {user.role === 'superadmin' ? 'Super Admin' : user.role}
          </div>
        </div>
      )}
      
      {/* Mobile Menu Toggle - Only visible on small screens */}
      <div className="lg:hidden p-4">
        <Button variant="ghost" size="icon" className="w-full justify-start">
          <Menu className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Menu</span>}
        </Button>
      </div>
      
      {/* Sidebar Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", location.pathname === item.path ? "text-primary" : "")} />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => navigate('/profile')}
          >
            <UserRound className="h-4 w-4" />
            {!collapsed && <span className="ml-2">My Account</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Settings</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start transition-colors hover:bg-primary/10"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-yellow-400" />
                {!collapsed && <span className="ml-2">Light Mode</span>}
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-indigo-400" />
                {!collapsed && <span className="ml-2">Dark Mode</span>}
              </>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
