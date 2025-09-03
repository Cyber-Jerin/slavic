import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '@/contexts/EcommerceContext';
import EcommerceNavigation from '@/components/EcommerceNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Wishlist = () => {
  const { state, dispatch } = useEcommerce();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const removeFromWishlist = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const moveToCart = (product: any) => {
    if (!selectedSize) return;
    
    dispatch({ 
      type: 'MOVE_TO_CART', 
      payload: { product, size: selectedSize } 
    });
    setSelectedProduct(null);
    setSelectedSize('');
  };

  if (state.wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <EcommerceNavigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-md mx-auto">
              <Heart size={80} className="text-muted-foreground mx-auto mb-6" />
              <h1 className="text-cinematic-brand text-primary mb-4 font-bold tracking-[0.2em]">
                YOUR WISHLIST
              </h1>
              <p className="text-cinematic-lg text-muted-foreground mb-8">
                Your wishlist is empty. Save items you love to view them here.
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
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-cinematic-brand text-primary mb-4 font-bold tracking-[0.2em]">
              YOUR WISHLIST
            </h1>
            <p className="text-cinematic-lg text-muted-foreground">
              {state.wishlist.length} item{state.wishlist.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {state.wishlist.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden bg-muted rounded-sm mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="space-y-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <ShoppingBag size={16} className="mr-2" />
                            Move to Bag
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Select Size</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={selectedProduct?.image}
                                alt={selectedProduct?.name}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div>
                                <h3 className="font-medium">{selectedProduct?.name}</h3>
                                <p className="text-primary font-bold">{selectedProduct?.price}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-3">Available Sizes:</h4>
                              <div className="grid grid-cols-6 gap-2">
                                {sizes.map((size) => (
                                  <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-3 py-2 text-sm border transition-colors ${
                                      selectedSize === size
                                        ? 'border-primary text-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full" 
                              onClick={() => moveToCart(selectedProduct)}
                              disabled={!selectedSize}
                            >
                              Add to Bag
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Heart Icon */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-destructive hover:bg-background transition-colors"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-cinematic-base text-foreground font-medium tracking-wide">
                      {product.name}
                    </h3>
                    <span className="text-cinematic-base text-primary font-bold">
                      {product.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-cinematic-sm text-muted-foreground uppercase tracking-wider">
                      {product.type}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wishlist;