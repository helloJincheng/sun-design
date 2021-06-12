import {FinishRefreshRef} from '@td-design/react-native-refreshview/lib/typescript/type';
import React, {useRef} from 'react';
import {FlatList, ScrollView, View, Text} from 'react-native';
import {LottieRefreshControl} from './components/LottieRefreshControl';

export default function FlatListLottie() {
  const data = [
    'row 1',
    'row 2',
    'row 3',
    'row 4',
    'row 5',
    'row 6',
    'row 7',
    'row 8',
  ];

  const refreshControl = useRef<FinishRefreshRef>(null);

  const onRefresh = () => {
    setTimeout(() => {
      refreshControl.current?.finishRefresh();
    }, 2000);
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'red',
            }}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={item => item}
        renderScrollComponent={props => (
          <ScrollView
            style={{flex: 1}}
            refreshControl={
              <LottieRefreshControl
                ref={refreshControl}
                onRefresh={onRefresh}
              />
            }
          />
        )}
      />
    </View>
  );
}