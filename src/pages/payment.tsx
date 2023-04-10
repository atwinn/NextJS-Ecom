import React from 'react'
import PaymentPage from '@/local-page/user/payment'
import { UserLayoutManager } from '@/layout/layoutUser';

const InPaymentPage = () => {
    return (
        <div>
            <PaymentPage />
        </div>
    )
}

export default InPaymentPage
InPaymentPage.PageLayout = UserLayoutManager;