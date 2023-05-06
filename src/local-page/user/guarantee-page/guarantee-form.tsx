import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import GuaranteeFormStep1 from './guarantee-step1';
import GuaranteeFormStep2 from './guarantee-step2';



const GuaranteeForm: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState("");

  const getResult = (props:string) => {
    setResult(props)
  };


  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: 'Nhập thông tin',
      content: <GuaranteeFormStep1 current={current} setCurrent={setCurrent} getResult={getResult} />,
    },
    {
      title: 'Kết quả',
      content: <GuaranteeFormStep2 result={result}/>,
    },
    
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Trở về
          </Button>
        )}
      </div>
    </>
  );
};

export default GuaranteeForm;