import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '@/contexts/EcommerceContext';
import EcommerceNavigation from '@/components/EcommerceNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus } from 'lucide-react';

const Bag = () => {
  const { state, dispatch } = useEcommerce();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const applyCoupon = () => {
    if (couponCode && !appliedCoupons.includes(couponCode)) {
      setAppliedCoupons([...appliedCoupons, couponCode]);
      setCouponCode('');
    }
  };

  const calculateSubtotal = () => {
    return state.cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = subtotal * 0.1; // 10% discount
  const couponDiscount = appliedCoupons.length > 0 ? subtotal * 0.05 : 0; // 5% coupon discount
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount - couponDiscount + shipping;

  if (state.cart.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <EcommerceNavigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-cinematic-brand text-primary mb-8 font-bold tracking-[0.2em]">
              YOUR BAG
            </h1>
            <p className="text-cinematic-lg text-muted-foreground mb-8">
              Your bag is empty
            </p>
            <Button onClick={() => navigate('/collection')} className="px-8 py-3">
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <EcommerceNavigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-cinematic-brand text-primary mb-8 font-bold tracking-[0.2em] text-center">
            YOUR BAG
          </h1>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {state.cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-cinematic-base font-medium text-foreground">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <p className="text-cinematic-sm text-muted-foreground mb-2">
                        {item.type}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-cinematic-sm text-muted-foreground">
                          Size: <Badge variant="outline" className="ml-1">{item.size}</Badge>
                        </span>
                        <span className="text-cinematic-base text-primary font-bold">
                          {item.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-cinematic-sm text-muted-foreground">
                          Quantity:
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="w-8 text-center text-cinematic-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border sticky top-32">
                <h2 className="text-cinematic-lg font-medium text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Available Offers */}
                <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="text-cinematic-sm font-medium text-primary mb-2">
                    Available Offers
                  </h3>
                  <p className="text-cinematic-xs text-muted-foreground">
                    • 10% off on orders above $50
                  </p>
                  <p className="text-cinematic-xs text-muted-foreground">
                    • Free shipping on orders above $100
                  </p>
                </div>

                {/* Coupon Section */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={applyCoupon}>
                      Apply
                    </Button>
                  </div>
                  {appliedCoupons.length > 0 && (
                    <div className="mt-2">
                      {appliedCoupons.map((coupon) => (
                        <Badge key={coupon} variant="secondary" className="mr-2">
                          {coupon} Applied
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-cinematic-sm">
                    <span className="text-muted-foreground">Total MRP</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-cinematic-sm">
                    <span className="text-muted-foreground">Discount on MRP</span>
                    <span className="text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-cinematic-sm">
                      <span className="text-muted-foreground">Coupon Discount</span>
                      <span className="text-green-600">-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-cinematic-sm">
                    <span className="text-muted-foreground">Shipping Charge</span>
                    <span className="text-foreground">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="h-px bg-border my-3" />
                  <div className="flex justify-between text-cinematic-base font-bold">
                    <span className="text-foreground">Total Amount</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate('/address')}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Bag;