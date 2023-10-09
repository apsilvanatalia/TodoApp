import * as React from 'react';
import Radio from '@mui/material/Radio';

import './style.css'

export default function FilterRadioButton({selectValue, handleFilter}) {

  return (
    <div className='radioFilterOp'>
      <div >
        <Radio 
          checked={selectValue === 'all'}
          onChange={e => handleFilter(e.target)}
          value='all'
          sx={{
            color: '#ffd3ca',
            '&.Mui-checked': {
              color: '#eb8f7a',
            },
          }}
        />
        <span>All</span>
      </div>

      <div>
        <Radio 
          checked={selectValue === "Concluido"}
          onChange={e => handleFilter(e.target)}
          value='Concluido'
          sx={{
            color: '#ffd3ca',
            '&.Mui-checked': {
              color: '#eb8f7a',
            },
          }}
        />
        <span>Finished</span>
      </div>

      <div>
        <Radio
          checked={selectValue === 'Pendente'}
          onChange={e => handleFilter(e.target)}
          value='Pendente' 
          sx={{
            color: '#ffd3ca',
            '&.Mui-checked': {
              color: '#eb8f7a',
            },
          }}
        />
        <span>Not Finished</span>
      </div>
    </div>
  );
}