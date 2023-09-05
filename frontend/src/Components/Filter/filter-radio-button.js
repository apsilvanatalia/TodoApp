import * as React from 'react';
import Radio from '@mui/material/Radio';

import './style.css'
//import { makeStyles } from '@material-ui/core/styles';

export default function FilterRadioButton({selectValue, handleFilter}) {

  /*const RadioButton = makeStyles({
    root:{
      color: '#ffd3ca',
        '&.Mui-checked': {
          color: '#eb8f7a',
        },
    },
    checked:{},
  })((props) => <Radio color='default' {... props}/>);*/

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
          checked={selectValue === 'true'}
          onChange={e => handleFilter(e.target)}
          value='true'
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
          checked={selectValue === 'false'}
          onChange={e => handleFilter(e.target)}
          value='false' 
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