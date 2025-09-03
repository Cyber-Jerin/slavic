import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '@/contexts/EcommerceContext';
import EcommerceNavigation from '@/components/EcommerceNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Address as AddressType } from '@/contexts/EcommerceContext';

const Address = () => {
  const { state, dispatch } = useEcommerce();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: AddressType = {
      id: editingAddress?.id || Date.now().toString(),
      ...formData
    };

    if (editingAddress) {
      dispatch({ type: 'UPDATE_ADDRESS', payload: newAddress });
      setEditingAddress(null);
    } else {
      dispatch({ type: 'ADD_ADDRESS', payload: newAddress });
    }

    setFormData({ name: '', mobile: '', address: '', pincode: '' });
    setShowAddForm(false);
  };

  const handleEdit = (address: AddressType) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      mobile: address.mobile,
      address: address.address,
      pincode: address.pincode
    });
    setShowAddForm(true);
  };

  const handleDelete = (addressId: string) => {
    dispatch({ type: 'DELETE_ADDRESS', payload: addressId });
  };

  const selectAddress = (address: AddressType) => {
    dispatch({ type: 'SELECT_ADDRESS', payload: address });
  };

  const handleContinue = () => {
    if (!state.selectedAddress && state.addresses.length > 0) {
      // Auto-select default address
      const defaultAddress = state.addresses.find(addr => addr.isDefault) || state.addresses[0];
      dispatch({ type: 'SELECT_ADDRESS', payload: defaultAddress });
    }
    navigate('/payment');
  };

  const selectedAddress = state.selectedAddress || state.addresses.find(addr => addr.isDefault);

  return (
    <main className="min-h-screen bg-background">
      <EcommerceNavigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-cinematic-brand text-primary mb-8 font-bold tracking-[0.2em] text-center">
            SELECT ADDRESS
          </h1>

          <div className="space-y-6">
            {/* Existing Addresses */}
            {state.addresses.map((address) => (
              <Card 
                key={address.id} 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedAddress?.id === address.id 
                    ? 'border-primary shadow-lg' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => selectAddress(address)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-cinematic-base font-medium text-foreground">
                          {address.name}
                        </h3>
                        {address.isDefault && (
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-cinematic-sm text-muted-foreground mb-1">
                        {address.mobile}
                      </p>
                      <p className="text-cinematic-sm text-muted-foreground mb-2">
                        {address.address}
                      </p>
                      <p className="text-cinematic-sm text-muted-foreground">
                        Pincode: {address.pincode}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(address);
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      {!address.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(address.id);
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Address Button */}
            {!showAddForm && (
              <Button
                variant="outline"
                className="w-full py-8 border-dashed"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={20} className="mr-2" />
                Add New Address
              </Button>
            )}

            {/* Add/Edit Address Form */}
            {showAddForm && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-cinematic-lg font-medium text-foreground mb-6">
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Full Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button type="submit">
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingAddress(null);
                          setFormData({ name: '', mobile: '', address: '', pincode: '' });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Continue Button */}
            {selectedAddress && !showAddForm && (
              <div className="text-center">
                <Button size="lg" onClick={handleContinue} className="px-12">
                  Continue to Payment
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Address;
