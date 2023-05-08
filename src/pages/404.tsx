import React from 'react';
import { Button, Result } from 'antd';
import Link from 'next/link';
import Head from 'next/head';

const PageNotFound: React.FC = () => (
    <div className='flex justify-center flex-col items-center bg-white w-[100vw] h-[100vh]'>
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi trang bạn đang tìm không tồn tại"
            extra={<Link href={"/"}><Button type="primary">Về trang chủ</Button></Link>}
        />
        <Head>
            <title>Không tìm thấy trang</title>
        </Head>
    </div>
);

export default PageNotFound;