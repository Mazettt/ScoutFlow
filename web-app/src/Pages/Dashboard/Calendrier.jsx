import React from 'react';
import { Calendar } from 'antd';

export default function Calendrier() {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return(
    <Calendar onPanelChange={onPanelChange} />
  );
}
