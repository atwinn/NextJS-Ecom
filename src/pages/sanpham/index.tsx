import { UserLayoutManager } from '@/layout/layoutUser';
import * as React from 'react';
import UserProduct from '@/local-page/user/product';

export interface IAppProps {
}

export default function StorePage(props: IAppProps) {
    return (
        <>
            <UserProduct />
        </>
    );
}
StorePage.PageLayout = UserLayoutManager;