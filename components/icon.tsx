import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

export const Icon = (props: FontAwesomeIconProps) => (
  <FontAwesomeIcon {...{ color: '#464c77', ...props }} />
);
