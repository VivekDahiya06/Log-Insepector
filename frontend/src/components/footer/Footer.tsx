import { useStore } from '../../hooks/useStore';
import { Pagination } from '@mui/material';


const Footer = () => {

  // States & Hooks
  const { state, dispatch } = useStore();

  
  return (
    <footer className='w-full flex items-center justify-center p-5'>
      <div className='w-full flex items-center justify-center gap-5 py-3'>
        <Pagination
          color='primary'
          count={state.totalPages}
          page={state.page}
          onChange={(_e, page) => dispatch({ type: 'CHANGE_PAGE', payload: page })} />
        {/* here using "_" with 'e' is the convention for unused parameters. */}
      </div>
    </footer>
  )
}

export default Footer
