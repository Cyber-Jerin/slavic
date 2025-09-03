import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '@/contexts/EcommerceContext';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const EcommerceNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { state } = useEcommerce();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'backdrop-cinematic shadow-subtle' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="text-cinematic-base text-primary font-bold tracking-wider hover:opacity-80 transition-opacity cursor-pointer"
          >
            SLAVIC
          </button>

          {/* Center Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => navigate('/collection')}
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Men
            </button>
            <button
              onClick={() => navigate('/collection')}
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Women
            </button>
            <button
              onClick={() => navigate('/collection')}
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Kids
            </button>
            <button
              onClick={() => navigate('/collection')}
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/collection')}
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Beauty
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Bag */}
            <button
              onClick={() => navigate('/bag')}
              className="relative text-muted-foreground hover:text-primary transition-elegant"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="m16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigate('/wishlist')}
              className="relative text-muted-foreground hover:text-primary transition-elegant"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground flex items-center justify-center">
                  {wishlistCount}
                </Badge>
              )}
            </button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-elegant focus:outline-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border-border">
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Gift Cards
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/contact')}>
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Coupons
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Saved Cards
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Saved Addresses
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="relative text-muted-foreground hover:text-primary transition-elegant"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="m13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {state.orders.length > 0 && (
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></div>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EcommerceNavigation;