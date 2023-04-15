import { UserLayoutManager } from '@/layout/layoutUser';
import * as React from 'react';
import TrangChu from '@/local-page/user/home';

export interface IAppProps {
}

export default function Home(props: IAppProps) {
    return (
        <div>
            <TrangChu />
        </div>

    );
}
Home.PageLayout = UserLayoutManager;