import React from 'react'
import { Box } from '@mui/system';
import { AppBar, Toolbar, styled } from '@mui/material'
import { Menu } from '@mui/icons-material/';
import { useData } from '../context/DataProvider'
import HeaderImage from '../assets/logo_inshorts.png'
import { useNavigate } from 'react-router-dom'

const StyledHeader = styled(AppBar)({
    background: '#fff',
})
const MenuIcon = styled(Menu)({
    color: '#000',
    cursor: 'pointer',
    borderRadius: '50%',
    ':hover': {
        color: '#f44336'
    }
})

const Image = styled('img')(({ theme }) => ({
    height: "55px",
    margin: "auto",
    cursor: 'pointer',
    paddingRight: "70px",
    [theme.breakpoints.down('sm')]: {
        paddingRight: '40px'
    }
}))

const Header = () => {

    const { setOpenSideBar } = useData()

    const navigate = useNavigate()

    return (
        <Box>
            <StyledHeader position='fixed'>
                <Toolbar>
                    <MenuIcon onClick={() => setOpenSideBar(prevValue => !prevValue)} />
                    <Image onClick={() => navigate('/')} src={HeaderImage} alt="logo" />
                </Toolbar>
            </StyledHeader>
        </Box>
    )
}

export default Header