import { UserLayoutManager } from '@/layout/layoutUser';
import * as React from 'react';

export interface IAppProps {
}

export default function Home(props: IAppProps) {
    return (
        <div>
            home
        </div>
    );
}
Home.PageLayout = UserLayoutManager;