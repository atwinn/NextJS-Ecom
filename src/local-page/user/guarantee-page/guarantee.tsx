import { ProCard } from '@ant-design/pro-components';
import GuaranteeForm from './guarantee-form';

 const GuaranteePage = () => {
  return (
    <ProCard
      title="Kiểm tra bảo hành"
      // extra="extra"
      // tooltip="这是提示"
      style={{ maxWidth: "70%",margin:"0 auto",marginTop:"1rem" }}
      bordered
    >
      <GuaranteeForm/>
    </ProCard>
  );
};
export default GuaranteePage