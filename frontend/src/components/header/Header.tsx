import { useEffect, useState } from 'react';
import { useStore } from '../../hooks/useStore';
import ToolTip from '../tooltip/CustomToolTip';
// import logo from '/images/logo.png';
import { MdSearch } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaFileContract } from "react-icons/fa";
import { IconButton, TextField, InputAdornment } from '@mui/material';
import Menu_Component from '../menu/MenuComponent';


const Header = () => {

    // States & Hooks
    const { state, dispatch } = useStore();
    const [search, setSearch] = useState<string>("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        console.log("Form Open State: ", state.formOpen);
    },[state.formOpen])


    // Functions
    const handle_Search = () => {
        dispatch({ type: 'SET_SEARCH_LOG_FILTER', payload: search });
        dispatch({ type: 'CHANGE_PAGE', payload: 1 });
    }

    const handle_AddLog = () => {
        console.log("form Open")
        dispatch({ type: 'SET_FORM_OPEN', payload: true });
    }

    const handle_openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handle_closeMenu = () => {
        setAnchorEl(null);
    };


    return (
        <header className='w-full h-20 flex items-center justify-between p-5 bg-[#12c21e]'>
            <nav className='w-full h-full flex items-center justify-between'>
                <div className="flex items-center justify-start sm:gap-3">
                    {/* <img src={logo} alt="BookHive Logo" loading='lazy' className='w-20 sm:w-25 max-w-full h-15 sm:h-19 max-h-full' /> */}
                    <h1 className="text-xl sm:text-3xl font-bold">LogInspector</h1>
                </div>
                <div className='flex md:hidden'>
                    <IconButton onClick={handle_openMenu}>
                        {
                            open ? <IoClose size={24} color={'#000'} /> : <IoMenu size={24} color={'#000'} />
                        }
                    </IconButton>
                    <Menu_Component handle_AddLog={handle_AddLog} handleClose={handle_closeMenu} anchorEl={anchorEl} open={open} />
                </div>

                <div className='hidden md:flex gap-8 items-center justify-center'>
                    <ToolTip
                        title="Add Log"
                    >
                        <IconButton onClick={handle_AddLog}>
                            <FaFileContract size={24} color='#000' />
                        </IconButton>
                    </ToolTip>
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search log..."
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handle_Search}>
                                        <MdSearch size={24} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { backgroundColor: "#fff", borderRadius: 4 },
                        }}
                        size="small"
                    />
                </div>
            </nav>
        </header>
    );
};

export default Header;
