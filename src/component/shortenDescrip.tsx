import { useState } from 'react';
import { Button, Card } from 'antd';

const ShortenDes = ({ content }: { content: string }) => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <Card className='mt-3'>
            <div dangerouslySetInnerHTML={{ __html: content }} style={{ maxHeight: showAll ? 'none' : '300px', overflow: 'hidden' }} />
            {content?.length > 100 && (
                <Button onClick={toggleShowAll} className='mt-3'>
                    {showAll ? 'Rút gọn' : 'Xem thêm'}
                </Button>
            )}
        </Card>
    );
};

export default ShortenDes
