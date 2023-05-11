import { UserLayoutManager } from '@/layout/layoutUser';
import * as React from 'react';
import TrangChu from '@/local-page/user/home';
import Head from 'next/head';

export interface IAppProps {
}

export default function Home(props: IAppProps) {
    return (
        <div>
            <Head>
                <title>Trang chủ</title>
            </Head>
            <TrangChu />
        </div>

    );
}
Home.PageLayout = UserLayoutManager;