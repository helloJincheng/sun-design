import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  createRestyleComponent,
  useTheme,
  BorderProps,
  border,
  BackgroundColorProps,
  backgroundColor,
  ColorProps,
  color,
  LayoutProps,
  layout,
  TypographyProps,
  typography,
} from '@shopify/restyle';

import { Theme } from '../theme';
import Box from '../box';
import Text from '../text';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';

type TagSize = 'large' | 'middle' | 'small';
type TagProps = {
  text: string;
  /** 标签大小 */
  size?: TagSize;
  /** 是否背景镂空 */
  ghost?: boolean;
  /** 设置禁用 */
  disabled?: boolean;
  /** 是否可关闭 */
  closable?: boolean;
  /** 设置标签的选中状态 */
  selected?: boolean;
  /** 点击关闭的回调函数 */
  onClose?: () => void;
  /** 点击标签的回调函数 */
  onSelect?: (selected: boolean) => void;
};

type BaseTagProps = BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  LayoutProps<Theme> &
  TypographyProps<Theme>;
const BaseTag = createRestyleComponent<BaseTagProps, Theme>([border, backgroundColor, color, layout, typography]);

const { px, ONE_PIXEL } = helpers;
const Tag: FC<TagProps & BaseTagProps> = ({
  text,
  size = 'middle',
  ghost = false,
  closable = false,
  disabled = false,
  selected = false,
  onClose,
  onSelect,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const [checked, setChecked] = useState(selected);
  const [closed, setClosed] = useState(false);

  /** 点击事件 */
  const handlePress = () => {
    if (disabled) {
      return;
    }
    setChecked(!checked);
    onSelect?.(!checked);
  };

  /** 删除事件 */
  const handleDelete = () => {
    setClosed(!closed);
    onClose?.();
  };

  /** 删除的图标组件 */
  const closableDom =
    closable && !disabled ? (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handleDelete()}
        style={{
          position: 'absolute',
          width: px(8),
          height: px(8),
          top: -px(4),
          right: -px(4),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            backgroundColor: theme.colors.gray100,
            borderRadius: px(8),
          }}
        >
          <SvgIcon name="close" color={theme.colors.white} size={px(10)} />
        </Box>
      </TouchableOpacity>
    ) : null;

  /** 选中的图标组件 */
  const checkedDom = checked ? (
    <Box
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
    >
      <Svg viewBox="0 0 1040 1024" width={px(28)} height={px(28)}>
        <Path
          d="M1023.83 474.655l-549.255 549.283h549.255V474.655zM783.16 979.732l-96.896-96.933 36.335-36.35 60.56 60.583L952.729 737.4l36.335 36.35L783.16 979.731z"
          fill={theme.colors.primary200}
        />
      </Svg>
    </Box>
  ) : null;

  if (closed) return null;

  const {
    fontFamily,
    fontSize = px(12),
    fontStyle,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecorationLine,
    textDecorationStyle,
    textTransform,
    color = disabled ? 'gray300' : 'primary100',
    backgroundColor,
    borderWidth = ONE_PIXEL,
    width: defaultWidth,
    height: defaultHeight,
    justifyContent = 'center',
    alignItems = 'center',
    borderRadius = 'x1',
    ...rest
  } = restProps;

  let borderColor = rest.borderColor ?? color;
  if (ghost && disabled) {
    borderColor = 'disabled';
  } else if (checked) {
    borderColor = 'primary200';
  }

  const { width, height } = getBySize(size, defaultWidth as number, defaultHeight as number);

  return (
    <Box>
      <TouchableOpacity disabled={disabled} activeOpacity={0.5} onPress={handlePress}>
        <BaseTag
          {...rest}
          {...{ width, height, justifyContent, alignItems, borderColor, borderWidth, borderRadius }}
          {...{ backgroundColor: ghost ? 'transparent' : backgroundColor }}
        >
          <Text
            {...{
              fontFamily,
              fontSize,
              fontStyle,
              fontWeight,
              letterSpacing,
              lineHeight,
              textAlign,
              textDecorationLine,
              textDecorationStyle,
              textTransform,
              color,
            }}
          >
            {text}
          </Text>
        </BaseTag>
      </TouchableOpacity>
      {closableDom}
      {checkedDom}
    </Box>
  );
};

export default Tag;

function getBySize(size: TagSize, width?: number, height?: number) {
  if (width && height) return { width, height };
  switch (size) {
    case 'large':
      return {
        width: px(108),
        height: px(32),
      };
    case 'small':
      return {
        width: px(48),
        height: px(20),
      };
    case 'middle':
    default:
      return {
        width: px(80),
        height: px(24),
      };
  }
}
