import type { FC } from 'react';
import { FaFileContract } from 'react-icons/fa'
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material'


// Type Definition for Props
interface Props {
    handle_AddLog: () => void;
    handleClose: () => void;
    anchorEl: null | HTMLElement;
    open: boolean;
}

const Menu_Component: FC<Props> = ({ handle_AddLog, handleClose, anchorEl, open }) => {

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuList>
                <MenuItem onClick={handle_AddLog}>
                    <ListItemIcon>
                        <FaFileContract size={24} color='#000' />
                    </ListItemIcon>
                    <ListItemText>
                        Add Log
                    </ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default Menu_Component;
