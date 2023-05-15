import { UserLayoutManager } from '@/layout/layoutUser';
import LayoutContact from '@/local-page/user/contact-page/layout-contact';
export default function Contact () {
  return (
    <>
      <LayoutContact/>
    </>
  );
}
Contact.PageLayout = UserLayoutManager;

