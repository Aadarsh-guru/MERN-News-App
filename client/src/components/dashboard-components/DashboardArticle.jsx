import { Box, Card, CardContent, Grid, Menu, MenuItem, Typography, styled } from '@mui/material'
import React, { memo, useState } from 'react'
import { Close, Delete, DeleteForever, Edit, MoreHoriz, MoreVert, Preview, Public, RestoreFromTrash } from '@mui/icons-material'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Image = styled('img')(({ theme }) => ({
    height: '268px',
    width: '88%',
    objectFit: 'cover',
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}))

const Component = styled(Card)(({ theme }) => ({
    marginBottom: 20,
    boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
}))


const Container = styled(CardContent)(({ theme }) => ({
    padding: '8px',
    paddingBottom: '4px !important'
}))

const Text = styled(Typography)(({ theme }) => ({
    fontWeight: 300,
    fontSize: '22px',
    color: '#44444d',
    lineHeight: '27px',
}))


const RightContainer = styled(Grid)(({ theme }) => ({
    margin: "5px 0 0 -25px",
    [theme.breakpoints.between('sm', 'lg')]: {
        padding: '0 5px'
    },
    [theme.breakpoints.down('sm')]: {
        margin: '5px 0'
    }
}))

const Autor = styled(Typography)(({ theme }) => ({
    color: '#808290',
    fontSize: 12,
    lineHeight: '22px'
}))

const Description = styled(Typography)(({ thrme }) => ({
    lineHeight: '22px',
    color: '#44444d',
    marginTop: '5px',
    fontWeight: 300
}))

const ReadMore = styled(Typography)(({ theme }) => ({
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
    cursor: 'pointer',
    ':hover': {
        color: 'grey'
    },

}))

const MoreIcon = styled(MoreVert)(({ theme }) => ({
    cursor: 'pointer',
    ':hover': {
        color: '#2466ad',
    },
    ':active': {
        color: 'grey'
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

const MoreMobileIcon = styled(MoreHoriz)(({ theme }) => ({
    cursor: 'pointer',
    ':hover': {
        color: '#2466ad',
    },
    ':active': {
        color: 'grey'
    },
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}))

const Item = styled(MenuItem)({
    ':hover': {
        color: 'red'
    },
    '& > svg': {
        marginRight: 10
    }
})

const DashboardArticle = ({ data }) => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMoveToBin = async (news) => {
        try {
            const response = await axios.put(`/api/v1/news/move-to-bin/${news?._id}`)
            if (response?.data?.success) {
                toast.success(response.data?.message)
                handleMenuClose()
            } else {
                handleMenuClose()
            }
        } catch (error) {
            handleMenuClose()
            console.log(error);
            toast.error('something went wrong')
        }
    }

    const handleDeletePermanantly = async (news) => {
        try {
            const response = await axios.delete(`/api/v1/news/delete-permanantly/${news?._id}`)
            if (response?.data?.success) {
                toast.success(response.data?.message)
                handleMenuClose()
            } else {
                handleMenuClose()
            }
        } catch (error) {
            handleMenuClose()
            console.log(error);
            toast.error('something went wrong')
        }
    }

    const handlePublishNews = async (news) => {
        try {
            const response = await axios.put(`/api/v1/news/publish-news/${news?._id}`)
            if (response?.data?.success) {
                toast.success(response.data?.message)
                handleMenuClose()
            } else {
                handleMenuClose()
            }
        } catch (error) {
            handleMenuClose()
            console.log(error);
            toast.error('something went wrong')
        }
    }

    const handleRestore = async (news) => {
        try {
            const response = await axios.put(`/api/v1/news/restore-news/${news?._id}`)
            if (response?.data?.success) {
                toast.success(response.data?.message)
                handleMenuClose()
            } else {
                handleMenuClose()
            }
        } catch (error) {
            handleMenuClose()
            console.log(error);
            toast.error('something went wrong')
        }
    }

    const handleEditNews = async (news) => {
        navigate(`/dashboard/update/${news?._id}`)
        handleMenuClose()
    }

    return (
        <Component className='AnimatedCard' >
            <Container>
                <Grid container>
                    <Grid lg={5} sm={5} xs={12} item>
                        <Image loading='lazy' src={`/api/v1/news/image/${data?.image}`} alt='the related to article pic' />
                    </Grid>
                    <RightContainer lg={7} md={7} sm={7} xs={12} item>
                        <Text>{data?.title?.slice(0, 150) + '...'}</Text>
                        <Autor>
                            <b>written</b> by {data?.author} / {new Date(data?.createdAt).toDateString()}
                        </Autor>
                        <Description>{data?.description?.slice(0, 450) + '...'}</Description>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <ReadMore onClick={() => window.open(`/news/${data?._id}`, '_blank')} >Read more..</ReadMore>
                            <MoreMobileIcon onClick={(e) => handleMenuClick(e)} />
                        </Box>
                    </RightContainer>
                    <MoreIcon onClick={(e) => handleMenuClick(e)} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                    >
                        <Box>
                            {
                                data?.type === 'publish' ?
                                    (
                                        <>
                                            <Item onClick={() => { window.open(`/news/${data?._id}`, '_blank'); handleMenuClose() }} ><Preview />Preview News</Item>
                                            <Item onClick={() => handleEditNews(data)} ><Edit />Edit</Item>
                                            <Item onClick={() => handleMoveToBin(data)} ><Delete />Move To Bin</Item>
                                            <Item onClick={handleMenuClose} ><Close />Close</Item>
                                        </>
                                    )
                                    : data?.type === 'draft' ?
                                        (
                                            <>
                                                <Item onClick={() => { window.open(`/news/${data?._id}`, '_blank'); handleMenuClose() }} ><Preview />Preview News</Item>
                                                <Item onClick={() => handlePublishNews(data)} ><Public />Publish</Item>
                                                <Item onClick={() => handleEditNews(data)} ><Edit />Edit</Item>
                                                <Item onClick={() => handleMoveToBin(data)} ><Delete />Move To Bin</Item>
                                                <Item onClick={handleMenuClose} ><Close />Close</Item>
                                            </>
                                        )
                                        : data?.type === 'bin' ?
                                            (
                                                <>
                                                    <Item onClick={() => handleRestore(data)} ><RestoreFromTrash />Restore</Item>
                                                    <Item onClick={() => handleDeletePermanantly(data)} ><DeleteForever />Delete Permanantly</Item>
                                                    <Item onClick={handleMenuClose} ><Close />Close</Item>
                                                </>
                                            )
                                            : null
                            }
                        </Box>
                    </Menu>
                </Grid>
            </Container>
        </Component>
    )
}

export default memo(DashboardArticle)