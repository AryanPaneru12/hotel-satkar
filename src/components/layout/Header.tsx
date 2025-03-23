
import React, { useState, useEffect } from 'react';
import { Bell, Search, UserRound, UserSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useDebounce } from '@/hooks/useDebounce';
import { searchData } from '@/utils/searchUtils';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [notifications] = useState<{ id: string; message: string; time: string }[]>([
    { id: '1', message: 'New booking created', time: '5 mins ago' },
    { id: '2', message: 'Guest checked in - Room 304', time: '2 hours ago' },
    { id: '3', message: 'Payment confirmed for booking #1234', time: '3 hours ago' },
  ]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/landing');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    // Use the searchData utility
    const results = searchData(query);
    setSearchResults(results);
    setShowResults(results.length > 0);
  };

  const handleResultClick = (result: any) => {
    toast({
      title: "Selected Item",
      description: `You selected: ${result.title}`,
    });
    
    // Navigate based on result type
    if (result.type === 'booking') {
      navigate('/bookings');
    } else if (result.type === 'room') {
      navigate('/rooms');
    } else if (result.type === 'guest') {
      navigate('/guests');
    }
    
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  // Use debounced value for search
  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-border bg-background/60 backdrop-blur-md">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-4">
        {/* Customer Search */}
        <div className="relative hidden md:block">
          <div className="flex items-center space-x-1 bg-muted/50 rounded-lg px-2 py-1 border border-border/50 hover:border-primary/30 transition-colors">
            <UserSearch className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary mr-1">Customer:</span>
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by ID or name..."
              className="w-[200px] lg:w-[250px] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => {
                if (searchResults.length > 0) setShowResults(true);
              }}
            />
          </div>
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-background border rounded-md shadow-lg max-h-[300px] overflow-y-auto">
              {searchResults.map((result) => (
                <div 
                  key={result.id}
                  className="p-2 hover:bg-muted cursor-pointer transition-colors duration-200"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="font-medium flex items-center">
                    {result.type === 'guest' ? (
                      <UserRound className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    ) : (
                      <span className="h-3.5 w-3.5 mr-1.5"></span>
                    )}
                    {result.title}
                  </div>
                  <div className="text-xs text-muted-foreground pl-5">{result.subtitle}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-muted transition-colors duration-200">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2 cursor-pointer hover:bg-muted transition-colors duration-200">
                <span>{notification.message}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            {notifications.length === 0 && (
              <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Button variant="ghost" size="sm" className="w-full hover:bg-muted transition-colors duration-200">View all</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted transition-colors duration-200">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-muted transition-colors duration-200" 
              onClick={() => navigate('/profile')}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-muted transition-colors duration-200" 
              onClick={() => navigate('/settings')}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-muted transition-colors duration-200" 
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
