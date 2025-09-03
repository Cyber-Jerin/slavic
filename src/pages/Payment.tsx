import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '@/contexts/EcommerceContext';
import EcommerceNavigation from '@/components/EcommerceNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, DollarSign, Clock } from 'lucide-react';

const Payment = () => {
  const { state, dispatch } = useEcommerce();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showCardForm, setShowCardForm] = useState(false);
  const [showUPIForm, setShowUPIForm] = useState(false);
  const [upiMethod, setUpiMethod] = useState('qr');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');

  const calculateSubtotal = () => {
    return state.cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = subtotal * 0.1;
  const couponDiscount = subtotal * 0.05;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount - couponDiscount + shipping;

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    setShowCardForm(value === 'card');
    setShowUPIForm(value === 'upi');
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = () => {
    const newOrder = {
      id: Date.now().toString(),
      items: state.cart,
      total,
      status: 'Ordered' as const,
      date: new Date().toISOString(),
      address: state.selectedAddress!
    };

    dispatch({ type: 'PLACE_ORDER', payload: newOrder });
    navigate('/order-confirmation', { state: { orderId: newOrder.id } });
  };

  if (!state.selectedAddress) {
    navigate('/address');
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <EcommerceNavigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-cinematic-brand text-primary mb-8 font-bold tracking-[0.2em] text-center">
            PAYMENT
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bank Offers */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-cinematic-lg">Bank Offers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-cinematic-sm text-primary font-medium">
                        10% instant discount with HDFC Bank Credit Cards
                      </p>
                      <p className="text-cinematic-xs text-muted-foreground">
                        Maximum discount up to $20. Valid on first purchase.
                      </p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-cinematic-sm font-medium">
                        5% cashback with American Express Cards
                      </p>
                      <p className="text-cinematic-xs text-muted-foreground">
                        Maximum cashback up to $15. Valid till end of month.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-cinematic-lg">Payment Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                    <div className="space-y-4">
                      {/* Cash on Delivery */}
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/5">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                          <DollarSign size={20} className="text-primary" />
                          <div>
                            <p className="text-cinematic-sm font-medium">Cash on Delivery</p>
                            <p className="text-cinematic-xs text-muted-foreground">Pay when your order is delivered</p>
                          </div>
                        </Label>
                      </div>

                      {/* Credit/Debit Card */}
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/5">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard size={20} className="text-primary" />
                          <div>
                            <p className="text-cinematic-sm font-medium">Credit/Debit Card</p>
                            <p className="text-cinematic-xs text-muted-foreground">Visa, MasterCard, American Express</p>
                          </div>
                        </Label>
                      </div>

                      {/* UPI */}
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/5">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Smartphone size={20} className="text-primary" />
                          <div>
                            <p className="text-cinematic-sm font-medium">UPI</p>
                            <p className="text-cinematic-xs text-muted-foreground">Pay using any UPI app</p>
                          </div>
                        </Label>
                      </div>

                      {/* Pay Later */}
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/5">
                        <RadioGroupItem value="pay-later" id="pay-later" />
                        <Label htmlFor="pay-later" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Clock size={20} className="text-primary" />
                          <div>
                            <p className="text-cinematic-sm font-medium">Pay Later</p>
                            <p className="text-cinematic-xs text-muted-foreground">Interest-free EMI options available</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Card Form */}
              {showCardForm && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-cinematic-lg">Card Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.cardNumber}
                          onChange={handleCardInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={cardData.cardName}
                          onChange={handleCardInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={cardData.expiryDate}
                            onChange={handleCardInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={handleCardInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* UPI Form */}
              {showUPIForm && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-cinematic-lg">UPI Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={upiMethod} onValueChange={setUpiMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="qr" id="qr" />
                          <Label htmlFor="qr">Scan & Pay</Label>
                        </div>
                        {upiMethod === 'qr' && (
                          <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
                            <div className="w-32 h-32 bg-muted mx-auto mb-4 rounded-lg flex items-center justify-center">
                              <p className="text-cinematic-xs text-muted-foreground">QR Code</p>
                            </div>
                            <p className="text-cinematic-sm text-muted-foreground">
                              Scan this QR code with your UPI app
                            </p>
                            <p className="text-cinematic-sm font-medium text-primary">
                              Amount: ${total.toFixed(2)}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="id" id="upi-id" />
                          <Label htmlFor="upi-id">Enter UPI ID</Label>
                        </div>
                        {upiMethod === 'id' && (
                          <Input
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        )}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle className="text-cinematic-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-cinematic-sm">
                      <span className="text-muted-foreground">Total MRP</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-cinematic-sm">
                      <span className="text-muted-foreground">Discount on MRP</span>
                      <span className="text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-cinematic-sm">
                      <span className="text-muted-foreground">Coupon Discount</span>
                      <span className="text-green-600">-${couponDiscount.toFixed(2)}</span>
                    </div>
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

                  {/* Delivery Address */}
                  <div className="mb-6 p-4 bg-accent/5 rounded-lg">
                    <h3 className="text-cinematic-sm font-medium mb-2">Delivery Address</h3>
                    <p className="text-cinematic-xs text-muted-foreground">
                      {state.selectedAddress.name} - {state.selectedAddress.mobile}
                    </p>
                    <p className="text-cinematic-xs text-muted-foreground">
                      {state.selectedAddress.address}
                    </p>
                    <p className="text-cinematic-xs text-muted-foreground">
                      {state.selectedAddress.pincode}
                    </p>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={placeOrder}
                  >
                    {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;