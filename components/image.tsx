import { DeleteOutlined } from '@ant-design/icons';
import { Button, Image, ImageProps } from 'antd';
import clsx from 'clsx';

type Props = ImageProps & {
  onDelete?: () => void;
};

export function ImageItem(props: Props) {
  return (
    <div
      className={clsx(
        'group',
        `w-[${props.sizes || props.width}px] h-[${
          props.sizes || props.height
        }px] bg-grey`,
      )}
    >
      <Image {...props} className='object-cover' />
      <div>
        <Button
          size="small"
          type="dashed"
          danger
          style={{ width: '100%' }}
          onClick={props.onDelete}
          icon={<DeleteOutlined />}
        ></Button>
      </div>
    </div>
  );
}
