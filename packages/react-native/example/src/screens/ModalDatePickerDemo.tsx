import React, { useState } from 'react';
import { DatePicker, Text } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';

export default function ModalDatePickerDemo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<Date>();
  const [formattedValue, setFormattedValue] = useState<string>();

  const handleChange = (date?: Date, formattedDate?: string) => {
    setValue(date);
    setFormattedValue(formattedDate);
  };

  return (
    <Container>
      <Button title="显示" onPress={() => setVisible(true)} />
      <Text>{formattedValue}</Text>
      <DatePicker
        title="请选择日期"
        visible={visible}
        onClose={() => setVisible(false)}
        value={value}
        onChange={handleChange}
      />
    </Container>
  );
}
