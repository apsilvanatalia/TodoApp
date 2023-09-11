import * as React from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './style.css'

export default function EndDatePicker({conclusion, handleDatePicker}) {
  //const [value, setValue] = React.useState(null);

  return (
    <div className='datePickerOp'>
        <label htmlFor="date">Conclusão</label>
        <div className='inputDate' >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <div className='aaa'>
                <DatePicker 
                slotProps={
                    {textField:{size:'small', }}
                }
                inputFormat="DD-MM-YYYY"
                
                onChange={e => handleDatePicker(e.target)}
                value={conclusion}
            />
            </div>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        
    </div>
  );
}