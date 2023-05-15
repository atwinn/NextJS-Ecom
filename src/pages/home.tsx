import { UserLayoutManager } from '@/layout/layoutUser';
import * as React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const TrangChu = dynamic(() => import('@/local-page/user/home'), {
    ssr: false
});

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