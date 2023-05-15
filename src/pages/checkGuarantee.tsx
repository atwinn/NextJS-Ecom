import GuaranteePage from '@/local-page/user/guarantee-page/guarantee';
import { UserLayoutManager } from '@/layout/layoutUser';

export default function CheckGuarantee () {
  return (
    <>
      <GuaranteePage/>
    </>
  );
}
CheckGuarantee.PageLayout = UserLayoutManager;
