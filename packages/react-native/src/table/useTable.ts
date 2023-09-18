import { useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { useSafeState } from '@td-design/rn-hooks';

import { TableProps } from './type';

export default function useTable({ columns, tableWidth }: Pick<TableProps, 'columns' | 'tableWidth'>) {
  /**当前容器的宽度，用来计算表格的长度 */
  const [wrapWidth, setWrapWidth] = useSafeState<number>(0);

  /** 计算单元格的长度 */
  const cellWidth =
    (wrapWidth - columns.reduce((prev, next) => prev + (next.width ?? 0), 0)) /
    (columns.length - columns.filter(item => item.width).length);

  /** 获取容器宽度 如果有tableWidth则用tableWidth */
  const handleLayout = (e: LayoutChangeEvent) => {
    setWrapWidth(tableWidth ?? e.nativeEvent.layout.width);
  };

  return {
    cellWidth: cellWidth,
    handleLayout: useCallback(handleLayout, []),
  };
}
