import React, { createContext, FC, ReactNode, useEffect, useRef } from 'react';
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import Box from '../box';
import PortalManager from './portalManager';

export type PortalMethods = {
  mount: (children: ReactNode, key?: number) => number;
  update: (key: number, children: ReactNode) => void;
  unmount: (key: number) => void;
};
export const PortalContext = createContext<PortalMethods>({
  mount: () => 0,
  update: () => {
    console.log('update');
  },
  unmount: () => {
    console.log('unmount');
  },
});

// 事件
const addType = 'THUNDERSDATA_RN_ADD_PORTAL';
const removeType = 'THUNDERSDATA_RN_REMOVE_PORTAL';

const TopViewEventEmitter = DeviceEventEmitter || new NativeEventEmitter();

class PortalGuard {
  private nextKey = 10000;

  add = (e: ReactNode) => {
    const key = this.nextKey++;
    TopViewEventEmitter.emit(addType, e, key);
    return key;
  };

  remove = (key: number) => TopViewEventEmitter.emit(removeType, key);
}
export const portal = new PortalGuard();

//==============================================================================================================

export type Operation =
  | { type: 'mount'; key: number; children: ReactNode }
  | { type: 'update'; key: number; children: ReactNode }
  | { type: 'unmount'; key: number };

const PortalHost: FC = props => {
  const nextKey = useRef<number>(0);
  const queue = useRef<Operation[]>([]);
  const manager = useRef<PortalManager>(null);

  useEffect(() => {
    TopViewEventEmitter.addListener(addType, mount);
    TopViewEventEmitter.addListener(removeType, unmount);

    while (queue.current.length > 0 && manager.current) {
      const action = queue.current.pop();
      if (!action) {
        continue;
      }
      switch (action.type) {
        case 'mount':
          manager.current.mount(action.key, action.children);
          break;
        case 'update':
          manager.current.update(action.key, action.children);
          break;
        case 'unmount':
          manager.current.unmount(action.key);
          break;
      }
    }

    return () => {
      TopViewEventEmitter.removeListener(addType, mount);
      TopViewEventEmitter.removeListener(removeType, unmount);
    };
  }, []);

  const mount = (children: ReactNode, key?: number) => {
    const _key = key || nextKey.current++;
    if (manager.current) {
      manager.current.mount(_key, children);
    } else {
      queue.current.push({ type: 'mount', key: _key, children });
    }
    return _key;
  };

  const update = (key: number, children: ReactNode) => {
    if (manager.current) {
      manager.current.update(key, children);
    } else {
      const operation: Operation = { type: 'mount', key, children };
      const index = queue.current.findIndex(o => o.type === 'mount' || (o.type === 'update' && o.key === key));
      if (index > -1) {
        queue.current[index] = operation;
      } else {
        queue.current.push(operation);
      }
    }
  };

  const unmount = (key: number) => {
    if (manager.current) {
      manager.current.unmount(key);
    } else {
      queue.current.push({ type: 'unmount', key });
    }
  };

  return (
    <PortalContext.Provider
      value={{
        mount,
        update,
        unmount,
      }}
    >
      <Box collapsable={false} flex={1}>
        {props.children}
      </Box>
      <PortalManager ref={manager} />
    </PortalContext.Provider>
  );
};
PortalHost.displayName = 'Portal.Host';

export default PortalHost;
