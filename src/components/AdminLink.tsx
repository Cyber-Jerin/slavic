import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLink = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button asChild variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
        <Link to="/auth">
          <Shield className="w-4 h-4 mr-2" />
          Admin
        </Link>
      </Button>
    </div>
  );
};

export default AdminLink;