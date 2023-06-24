import { Box, MenuItem, TextField, Typography, styled } from '@mui/material';
import { categories } from '../../constants/sidebarData'
import { Add, Delete, Drafts } from '@mui/icons-material';

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    overflow: 'hidden'
}))

const ActionButton = styled(Box)(({ theme }) => ({
    textDecoration: 'none',
    color: '#7a6d6d',
    width: '90%',
    padding: '10px',
    margin: "10px 10px 10px 0",
    border: '1px solid grey',
    borderRadius: 5,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    ':hover': {
        background: '#7a6d6d',
        color: 'white'
    },
    cursor: 'pointer',
    ':active': {
        background: 'grey',
    },
    '& > p': {
        fontSize: 18,
    },
    transition: 'all 0.2s ease',
    [theme.breakpoints.down('md')]: {
        margin: "10px auto",
    }
}))

const SelectButton = styled(TextField)(({ theme }) => ({
    textDecoration: 'none',
    color: '#7a6d6d',
    width: '90%',
    margin: "10px 10px 10px 0",
    fontSize: 18,
    borderRadius: 10,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
        marginLeft: 35
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: 16
    }
}))

const DashboardNavigation = ({ tab, setTab, category, setCategory }) => {

    const handleSwitch = (value) => {
        setTab(value)
    }

    return (
        <Container>
            <ActionButton style={tab === 'create' ? { background: '#7a6d6d', color: 'white' } : null} onClick={() => handleSwitch('create')} ><Typography>Create News</Typography> <Add /></ActionButton>
            <SelectButton onChange={(e) => setCategory(e.target.value)} type='text' label={category === 'all-news' ? 'All News' : category} select >
                {
                    categories?.map(category => (
                        <MenuItem onClick={() => setTab('')} value={category.slug} key={category.slug} >{category.name}</MenuItem>
                    ))
                }
            </SelectButton>
            <ActionButton style={tab === 'draft' ? { background: '#7a6d6d', color: 'white' } : null} onClick={() => handleSwitch('draft')} ><Typography>Draft News</Typography> <Drafts /></ActionButton>
            <ActionButton style={tab === 'bin' ? { background: '#7a6d6d', color: 'white' } : null} onClick={() => handleSwitch('bin')} ><Typography>Bin News</Typography> <Delete /></ActionButton>
        </Container>
    )
}

export default DashboardNavigation