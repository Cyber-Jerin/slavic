import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EcommerceNavigation from '@/components/EcommerceNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate('/collection');
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <EcommerceNavigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="mb-8">
            <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
            <h1 className="text-cinematic-brand text-primary mb-4 font-bold tracking-[0.2em]">
              ORDER PLACED
            </h1>
            <p className="text-cinematic-lg text-muted-foreground mb-2">
              Thank you for your purchase!
            </p>
            <p className="text-cinematic-base text-foreground">
              Order ID: <span className="font-mono text-primary">#{orderId}</span>
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Package size={24} className="text-primary" />
                <h2 className="text-cinematic-lg font-medium">
                  What happens next?
                </h2>
              </div>
              
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-1">
                    1
                  </div>
                  <div>
                    <p className="text-cinematic-sm font-medium">Order Confirmation</p>
                    <p className="text-cinematic-xs text-muted-foreground">
                      You'll receive a confirmation email shortly
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-1">
                    2
                  </div>
                  <div>
                    <p className="text-cinematic-sm font-medium">Processing</p>
                    <p className="text-cinematic-xs text-muted-foreground">
                      We'll prepare your order for shipment
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold mt-1">
                    3
                  </div>
                  <div>
                    <p className="text-cinematic-sm font-medium">Shipping</p>
                    <p className="text-cinematic-xs text-muted-foreground">
                      Your order will be shipped within 2-3 business days
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold mt-1">
                    4
                  </div>
                  <div>
                    <p className="text-cinematic-sm font-medium">Delivery</p>
                    <p className="text-cinematic-xs text-muted-foreground">
                      Expected delivery in 5-7 business days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/orders')}
              className="w-full max-w-xs"
            >
              Track Your Order
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/collection')}
              className="w-full max-w-xs"
            >
              Continue Shopping
            </Button>
          </div>

          <div className="mt-12 p-6 bg-accent/5 rounded-lg">
            <h3 className="text-cinematic-base font-medium mb-3">
              Need Help?
            </h3>
            <p className="text-cinematic-sm text-muted-foreground mb-4">
              If you have any questions about your order, feel free to contact our support team.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/contact')}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;