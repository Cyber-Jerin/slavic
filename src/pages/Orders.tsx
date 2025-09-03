import { useEcommerce } from '@/contexts/EcommerceContext';
import EcommerceNavigation from '@/components/EcommerceNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { state } = useEcommerce();
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ordered':
        return <Clock size={16} className="text-blue-500" />;
      case 'Shipped':
        return <Package size={16} className="text-orange-500" />;
      case 'Out for Delivery':
        return <Truck size={16} className="text-purple-500" />;
      case 'Delivered':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ordered':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (state.orders.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <EcommerceNavigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-md mx-auto">
              <Package size={80} className="text-muted-foreground mx-auto mb-6" />
              <h1 className="text-cinematic-brand text-primary mb-4 font-bold tracking-[0.2em]">
                MY ORDERS
              </h1>
              <p className="text-cinematic-lg text-muted-foreground mb-8">
                You haven't placed any orders yet.
              </p>
              <Button onClick={() => navigate('/collection')} className="px-8 py-3">
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <EcommerceNavigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-cinematic-brand text-primary mb-4 font-bold tracking-[0.2em]">
              MY ORDERS
            </h1>
            <p className="text-cinematic-lg text-muted-foreground">
              Track your orders and view order history
            </p>
          </div>

          <div className="space-y-6">
            {state.orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-cinematic-lg">
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-cinematic-sm text-muted-foreground">
                        Placed on {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                      <p className="text-cinematic-base font-bold text-primary mt-2">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-accent/5 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-cinematic-sm font-medium text-foreground">
                            {item.name}
                          </h4>
                          <p className="text-cinematic-xs text-muted-foreground">
                            {item.type}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" className="text-xs">
                              Size: {item.size}
                            </Badge>
                            <span className="text-cinematic-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-cinematic-sm font-bold text-primary">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="text-cinematic-sm font-medium mb-2">Delivery Address</h4>
                    <p className="text-cinematic-xs text-muted-foreground">
                      {order.address.name} - {order.address.mobile}
                    </p>
                    <p className="text-cinematic-xs text-muted-foreground">
                      {order.address.address}
                    </p>
                    <p className="text-cinematic-xs text-muted-foreground">
                      {order.address.pincode}
                    </p>
                  </div>

                  {/* Order Status Timeline */}
                  <div className="mb-6">
                    <h4 className="text-cinematic-sm font-medium mb-4">Order Status</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${order.status === 'Ordered' || order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-primary' : 'bg-muted'}`} />
                        <span className="text-cinematic-xs">Ordered</span>
                      </div>
                      <div className={`flex-1 h-0.5 mx-2 ${order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-primary' : 'bg-muted'}`} />
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-primary' : 'bg-muted'}`} />
                        <span className="text-cinematic-xs">Shipped</span>
                      </div>
                      <div className={`flex-1 h-0.5 mx-2 ${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-primary' : 'bg-muted'}`} />
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-primary' : 'bg-muted'}`} />
                        <span className="text-cinematic-xs">Out for Delivery</span>
                      </div>
                      <div className={`flex-1 h-0.5 mx-2 ${order.status === 'Delivered' ? 'bg-primary' : 'bg-muted'}`} />
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${order.status === 'Delivered' ? 'bg-primary' : 'bg-muted'}`} />
                        <span className="text-cinematic-xs">Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {order.status !== 'Delivered' && (
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Download Invoice
                    </Button>
                    {order.status === 'Delivered' && (
                      <Button variant="outline" size="sm">
                        Return/Exchange
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Orders;