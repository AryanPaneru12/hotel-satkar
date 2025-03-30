
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { useAuth } from '@/contexts/AuthContext';
import PaymentsStatistics from './components/PaymentsStatistics';
import PaymentsFilters from './components/PaymentsFilters';
import PaymentsTable from './components/PaymentsTable';
import CustomerIdBanner from './components/CustomerIdBanner';
import AdminBanner from './components/AdminBanner';
import { usePaymentsData } from './hooks/usePaymentsData';
import PaymentDetailsDialog from './components/PaymentDetailsDialog';

const PaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter,
    filteredPayments,
    totals,
    selectedPayment,
    setSelectedPayment,
    showPaymentDetails,
    setShowPaymentDetails,
    priceBreakdown,
    isAdmin
  } = usePaymentsData();

  // Handle view payment details
  const handleViewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };

  if (!user) {
    return (
      <PageContainer title="Payments Management">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">You need to log in</h2>
            <p className="text-muted-foreground">Please log in to view your payment history</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={isAdmin ? "Payments Management" : "Payment History"}>
      <div className="space-y-6">
        {/* Statistics Cards */}
        <PaymentsStatistics totals={totals} />
        
        {/* Customer ID display (only for regular users) */}
        {!isAdmin && <CustomerIdBanner />}
        
        {/* Admin section banner */}
        {isAdmin && <AdminBanner />}
        
        {/* Filters and Actions */}
        <PaymentsFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          isAdmin={isAdmin}
        />
        
        {/* Payments Table */}
        <PaymentsTable 
          filteredPayments={filteredPayments}
          isAdmin={isAdmin}
          onViewDetails={handleViewPaymentDetails}
        />
      </div>

      {/* Payment Details Dialog */}
      <PaymentDetailsDialog 
        showPaymentDetails={showPaymentDetails}
        setShowPaymentDetails={setShowPaymentDetails}
        selectedPayment={selectedPayment}
        priceBreakdown={priceBreakdown}
        isAdmin={isAdmin}
      />
    </PageContainer>
  );
};

export default PaymentsPage;
