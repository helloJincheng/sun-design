import React, { forwardRef, memo, ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import useTextArea from './useTextArea';

const { ONE_PIXEL, px } = helpers;
export interface TextAreaProps
  extends Omit<TextInputProps, 'placeholderTextColor' | 'onChange' | 'onChangeText' | 'style'> {
  /** 标签 */
  label?: ReactNode;
  /** 是否必填 */
  required?: boolean;
  /** 值 */
  value?: string;
  /** 输入改变事件 */
  onChange?: (value: string) => void;
  /** 文本域高度 */
  height?: number;
  /** 文本长度限制 */
  limit?: number;
  /** 是否有边框 */
  border?: boolean;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 额外内容 */
  brief?: ReactNode;
}

const TextArea = forwardRef<TextInput, TextAreaProps>(
  (
    { label, height = px(150), limit, value = '', border = true, onChange, style, brief, required, ...restProps },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { inputValue, handleChange } = useTextArea({ value, onChange });

    const styles = StyleSheet.create({
      input: {
        height,
        padding: theme.spacing.x2,
        fontSize: px(14),
        lineHeight: px(20),
        color: theme.colors.text,
      },
    });

    return (
      <Box>
        <Label {...{ label, required }} />
        <Box borderWidth={border ? ONE_PIXEL : 0} borderColor="border" style={style}>
          <TextInput
            ref={ref}
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            {...restProps}
            style={styles.input}
            placeholderTextColor={theme.colors.gray300}
            selectionColor={theme.colors.primary200}
            value={inputValue}
            onChangeText={handleChange}
            multiline
            underlineColorAndroid="transparent"
            maxLength={limit}
          />
          {!!limit && (
            <Flex flexDirection="row-reverse" padding="x1">
              <Text variant="p1" color="text">
                {inputValue.length} / {limit}
              </Text>
            </Flex>
          )}
        </Box>
        {!!brief && (
          <Box marginTop="x1">
            {typeof brief === 'string' ? (
              <Text variant="p2" color="text">
                {brief}
              </Text>
            ) : (
              brief
            )}
          </Box>
        )}
      </Box>
    );
  }
);
TextArea.displayName = 'TextArea';

export default TextArea;

const Label = memo(({ label, required }: Pick<TextAreaProps, 'label' | 'required'>) => {
  if (!label) return null;

  if (typeof label === 'string')
    return (
      <Flex alignItems={'center'}>
        {required && <Text color="func600">*</Text>}
        <Text variant="p1" color="text">
          {label}
        </Text>
      </Flex>
    );

  return (
    <Flex alignItems={'center'}>
      {required && <Text color="func600">*</Text>}
      {label}
    </Flex>
  );
});
