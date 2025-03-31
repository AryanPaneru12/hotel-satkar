
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PaymentsStatistics from './payments/components/PaymentsStatistics';
import PaymentsFilters from './payments/components/PaymentsFilters';
import PaymentsTable from './payments/components/PaymentsTable';
import CustomerIdBanner from './payments/components/CustomerIdBanner';
import AdminBanner from './payments/components/AdminBanner';
import { usePaymentsData } from './payments/hooks/usePaymentsData';
import PaymentDetailsDialog from './payments/components/PaymentDetailsDialog';
import { useAuth } from '@/contexts/AuthContext';

const Payments = () => {
  try {
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
      try {
        setSelectedPayment(payment);
        setShowPaymentDetails(true);
      } catch (error) {
        console.error("Error showing payment details:", error);
      }
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
  } catch (error) {
    console.error("Error in Payments component:", error);
    return (
      <PageContainer title="Payments">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Unable to load payments</h2>
          <p className="text-muted-foreground mb-6">
            There was an error loading the payments data. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </PageContainer>
    );
  }
};

export default Payments;
