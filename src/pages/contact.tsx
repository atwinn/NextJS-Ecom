import { UserLayoutManager } from '@/layout/layoutUser';
import ContactPage from '@/local-page/user/contact';
export default function Contact () {
  return (
    <>
      <ContactPage/>
    </>
  );
}
Contact.PageLayout = UserLayoutManager;

