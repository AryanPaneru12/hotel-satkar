
import React from 'react';
import { AlertCircle } from 'lucide-react';

const AdminBanner: React.FC = () => {
  return (
    <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <span className="font-medium text-amber-800">
          Admin View: Showing all payment records
        </span>
      </div>
    </div>
  );
};

export default AdminBanner;
