import React, { CSSProperties, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import Swiper, { SwiperRefNode } from 'react-id-swiper';
import 'swiper/components/pagination/pagination.less';
import './index.less';
import { ReactNode } from 'react';
import { useRAF } from '../../hooks/useRAF';
import useTheme from '../../hooks/useTheme';

SwiperCore.use([Autoplay]);

type Column = {
  title: string;
  dataIndex: string;
  id?: number | string;
  width?: number;
  render?: (data: ReactNode) => ReactElement;
};

type CustomTableProps = {
  /** 列数据 */
  columns: Column[];
  /** 数据源 */
  data: ReactNode[];
  /** 速度（ms） */
  speed?: number;
  /** 自动轮播 */
  autoLoop?: boolean;
  /** 是否在弹窗中 */
  inModal?: boolean;
  /** 自定义行高 */
  numberOfLines?: number;
  /** 背景颜色 */
  colors?: [string, string];
};

const Table = ({
  columns = [],
  data = [],
  speed = 3000,
  autoLoop = true,
  inModal = false,
  numberOfLines = 1,
  colors = ['rgba(51, 64, 146, 1)', 'rgba(35, 40, 129, 1)'],
}: CustomTableProps) => {
  const theme = useTheme();
  const swiper = useRef<SwiperRefNode>(null);
  const [index, setIndex] = useState(0);
  const [stop, setStop] = useState(false);
  const height = numberOfLines * 30;
  const params = {
    height: height * 3,
    slidesPerView: 3,
    loop: true,
  };

  const length = data.length;
  const { raf } = useRAF();

  const updateIndex = useCallback(() => {
    setIndex(idx => (idx < length - 1 ? idx + 1 : 0));
  }, [length]);

  useEffect(() => {
    swiper.current?.swiper?.update();
  }, [length]);

  useEffect(() => {
    swiper.current?.swiper?.slideTo(index);
  }, [index, length]);

  useEffect(() => {
    if (stop || !autoLoop) return;
    const interval = raf.setInterval(() => {
      updateIndex();
    }, speed);
    return () => raf.clearInterval(interval);
  }, [raf, speed, updateIndex, stop, autoLoop]);

  useEffect(() => {
    if (swiper && swiper.current) {
      //鼠标覆盖停止自动切换
      swiper.current.onmouseover = function () {
        setStop(true);
      };
      //鼠标离开开始自动切换
      swiper.current.onmouseout = function () {
        setStop(false);
      };
    }
  }, [length]);

  return (
    <div className="td-lego-table-container">
      <div style={{ width: '100%' }}>
        <div className="table-view">
          <div className="header" style={{ backgroundColor: colors[1] }}>
            {columns && columns?.length ? (
              <div key={index} className="content" style={{ height: height }}>
                {columns.map(item => {
                  return (
                    <div
                      className="text"
                      key={item.id}
                      style={
                        {
                          ...theme.typography[inModal ? 'p0' : 'p2'],
                          lineHeight: inModal ? '25px' : '19px',
                          width: item.width || `${100 / columns?.length}%`,
                        } as CSSProperties
                      }
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div
            className="waybill-table"
            style={{
              background: `linear-gradient( ${colors[0]} 50%, ${colors[1]} 0)`,
              backgroundSize: numberOfLines ? `100% ${2 * height}px` : '100% 60px',
            }}
          >
            {data?.length && columns?.length ? (
              <Swiper direction="vertical" {...params} containerClass="table-swiper" ref={swiper}>
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="content"
                      style={
                        {
                          ...theme.typography[inModal ? 'p0' : 'p2'],
                          lineHeight: inModal ? '25px' : '19px',
                        } as CSSProperties
                      }
                    >
                      {columns.map(term => {
                        return (
                          <div
                            className="text"
                            key={term.id}
                            style={{ width: term.width || `${100 / columns?.length}%` }}
                          >
                            {term.render ? term.render(item) : item?.[term?.dataIndex]}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </Swiper>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
