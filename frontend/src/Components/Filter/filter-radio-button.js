import * as React from 'react';
import Radio from '@mui/material/Radio';
import './style.css'

export default function FilterRadioButton({selectValue, handleFilter}) {

  const controlProps = (item) =>({
    checked: {},
    //onChange: handleChange,
    //value: item,
    //name: 'color-radio-button-demo',
    /*inputProps: { 
        'aria-label': item ,

    },*/
    sx:{
      color: '#ffd3ca',
      '&.Mui-checked': {
        color: '#eb8f7a',
      },
    }
  });

  return (
    <div className='radioFilterOp'>
      <div >
        <Radio
          checked={selectValue === 'all'}
          onChange={e => handleFilter(e.target)}
          value='all'
          //{...controlProps('e')}
        />
        <span>All</span>
      </div>

      <div>
        <Radio 
          checked={selectValue === 'true'}
          onChange={e => handleFilter(e.target)}
          value='true'
          //{...controlProps('e')}
        />
        <span>Finished</span>
      </div>

      <div>
        <Radio
          checked={selectValue === 'false'}
          onChange={e => handleFilter(e.target)}
          value='false' 
          //{...controlProps('e')}
        />
        <span>Not Finished</span>
      </div>
    </div>
  );
}
