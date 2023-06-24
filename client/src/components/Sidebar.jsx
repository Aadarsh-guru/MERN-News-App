import { Box, Divider, Drawer, Typography, styled } from '@mui/material'
import { useData } from '../context/DataProvider'
import { AccountCircle, Dashboard, Edit, Logout } from '@mui/icons-material'
import { categories, pages } from '../constants/sidebarData'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import DefaultUserProfile from '../assets/account.png'


const SignInBox = styled(Box)(({ theme }) => ({
    width: "100%",
    minHeight: '75px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const Categories = styled(Box)(({ theme }) => ({
    width: "100%",
}))

const SignInBotton = styled(Box)(({ theme }) => ({
    padding: '5px 10px',
    borderRadius: '50px',
    color: 'black',
    border: '1px solid grey',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 14,
    display: 'flex',
    gap: '5px',
    ':hover': {
        color: 'Highlight',
        border: '1px solid Highlight',
    },
    ':active': {
        color: 'grey',
        border: '1px solid grey',
    }
}))

const CategoriesHeading = styled(Box)(({ theme }) => ({
    height: '50px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    color: 'grey',
}))

const CategoryList = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 10px',
    gap: '10px'
}))

const Category = styled(NavLink)(({ theme }) => ({
    width: '100%',
    textDecoration: 'none',
    color: 'inherit',
    padding: '10px 20px',
    borderRadius: 10,
    display: 'flex',
    gap: 10,
    ':hover': {
        background: 'lightgrey'
    },
    ':active': {
        color: 'red',
    }
}))

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& > .MuiDrawer-paper': {
        marginTop: '64px',
        width: 225,
        background: '#f5f5f5',
        borderRight: 'none',
        height: 'calc(100vh - 64px)',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)',
            marginTop: '56px',
        },
        overFlowY: 'auto'
    }
}))

const Pages = styled(Box)(({ theme }) => ({
    width: '100%',
    marginBottom: 15
}))

const PagesHeading = styled(Box)(({ theme }) => ({
    height: '50px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    color: 'grey',
}))

const PagesList = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 10px',
    gap: '10px'
}))

const Page = styled(NavLink)(({ theme }) => ({
    width: '100%',
    textDecoration: 'none',
    color: 'inherit',
    padding: '10px 20px',
    display: 'flex',
    borderRadius: 10,
    gap: 10,
    ':hover': {
        background: 'lightgrey'
    },
    ':active': {
        color: 'red'
    }
}))

const UserInfoBox = styled(Box)(({ theme }) => ({
    width: "100%",
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 10px',
    gap: 10
}))

const UserImage = styled('img')(({ theme }) => ({
    height: 75,
    width: 75,
    border: '1px solid lightgrey',
    borderRadius: '50%'
}))

const UserName = styled(Typography)(({ theme }) => ({
    margin: '5px 0 5px 0',
    fontWeight: 600,
    color: 'grey',
    textTransform: 'capitalize'
}))

const DashboardButton = styled(NavLink)(({ theme }) => ({
    width: '100%',
    padding: '10px 20px',
    borderRadius: 10,
    display: 'flex',
    gap: 10,
    cursor: 'pointer',
    color: 'inherit',
    textDecoration: 'none',
    ':hover': {
        background: 'lightgrey',
        color: 'Highlight'
    },
    ':active': {
        color: 'grey'
    }
}))

const SignOutButton = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '10px 20px',
    borderRadius: 10,
    display: 'flex',
    gap: 10,
    cursor: 'pointer',
    ':hover': {
        background: 'lightgrey',
        color: 'red'
    },
    ':active': {
        color: 'grey'
    }
}))

const EditProfileButton = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '10px 20px',
    borderRadius: 10,
    display: 'flex',
    gap: 10,
    cursor: 'pointer',
    ':hover': {
        background: 'lightgrey',
        color: 'Highlight'
    },
    ':active': {
        color: 'grey'
    }
}))

const Sidebar = () => {

    const { openSideBar, setOpenSideBar, setOpenLoginDialog, setOpenUpdateUserDialog } = useData()
    const { auth, setAuth } = useAuth()

    const handleSignOut = () => {
        setAuth({})
        localStorage.removeItem('auth')
        setOpenSideBar(!openSideBar)
    }

    const handleEdit = () => {
        setOpenSideBar(!openSideBar)
        setOpenUpdateUserDialog(prev => !prev)
    }

    const handlesignIn = () => {
        setOpenSideBar(!openSideBar)
        setOpenLoginDialog(prev => !prev)
    }

    return (
        <StyledDrawer anchor='left' open={openSideBar} variant='persistent'>
            {
                auth?.token ?
                    (
                        <UserInfoBox>
                            <UserImage src={auth?.user?.profile ? `/api/v1/user/user-profile/${auth?.user?.profile}` : DefaultUserProfile} alt='user-profile' />
                            <UserName>{auth?.user?.firstName + " " + auth?.user?.lastName}</UserName>
                            <DashboardButton to={'/dashboard/home'} onClick={() => setOpenSideBar(!openSideBar)} >
                                <Dashboard />
                                <Typography>Dashboard</Typography>
                            </DashboardButton>
                            <EditProfileButton onClick={handleEdit} >
                                <Edit />
                                <Typography>Edit Profile</Typography>
                            </EditProfileButton>
                            <SignOutButton onClick={handleSignOut} >
                                <Logout />
                                <Typography>Sign Out</Typography>
                            </SignOutButton>
                        </UserInfoBox>
                    )
                    :
                    (
                        <SignInBox>
                            <SignInBotton onClick={() => handlesignIn()} >
                                <AccountCircle />
                                <Typography>
                                    Sign in
                                </Typography>
                            </SignInBotton>
                        </SignInBox>
                    )
            }
            <Divider sx={{ color: 'grey' }} />
            <Categories>
                <CategoriesHeading>
                    <Typography>Categories</Typography>
                </CategoriesHeading>
                <Divider sx={{ color: 'grey' }} />
                <CategoryList>
                    {
                        categories?.map(category => (
                            <Category onClick={() => setOpenSideBar(!openSideBar)} key={category?.to} to={category?.to} >
                                <category.icon />
                                <Typography>{category?.name}</Typography>
                            </Category>
                        ))
                    }
                </CategoryList>
            </Categories>
            <Divider sx={{ color: 'grey' }} />
            <Pages>
                <PagesHeading>
                    <Typography>Pages</Typography>
                </PagesHeading>
                <Divider sx={{ color: 'grey' }} />
                <PagesList>
                    {
                        pages?.map(page => (
                            <Page onClick={() => setOpenSideBar(!openSideBar)} key={page?.to} to={page?.to} >
                                <page.icon />
                                <Typography>{page?.name}</Typography>
                            </Page>
                        ))
                    }
                </PagesList>
                <Divider sx={{ color: 'grey' }} />
            </Pages>
            <Divider sx={{ color: 'grey' }} />
        </StyledDrawer>
    )
}

export default Sidebar