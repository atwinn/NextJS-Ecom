import { LayoutManager } from '@/layout/layoutAdmin';
import ContactAdmin from '@/local-page/admin/contact-admin/contact';
import * as React from 'react';
export default function ContactAdminLayout () {
  return (
    <div>
        <ContactAdmin/>
    </div>
  );
}
ContactAdminLayout.PageLayout = LayoutManager;
