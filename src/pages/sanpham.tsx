import { UserLayoutManager } from '@/layout/layoutUser';
import * as React from 'react';
import { useSelector } from 'react-redux';

export interface IAppProps {
}

export default function StorePage(props: IAppProps) {
    const user = useSelector((state: any) => state.user);
    console.log(user);

    return (
        <div>
            sp
        </div>
    );
}
StorePage.PageLayout = UserLayoutManager;