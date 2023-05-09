import { LayoutManager } from '@/layout/layoutAdmin';
import CategoryAd from '@/local-page/admin/loaisanpham';
import * as React from 'react';
export default function CategoryAdmin() {
    return (
        <div>
            <CategoryAd />
        </div>
    );
}
CategoryAdmin.PageLayout = LayoutManager;