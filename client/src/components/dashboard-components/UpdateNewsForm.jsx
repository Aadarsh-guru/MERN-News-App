import { Box, Button, MenuItem, TextField, Typography, styled } from '@mui/material'
import { categories } from '../../constants/sidebarData'
import { Upload } from '@mui/icons-material'
import { useState, memo, useEffect } from 'react'
import toast from 'react-hot-toast'
import imageCompression from 'browser-image-compression';
import axios from 'axios'
import Layout from '../../layout/Layout'
import { useParams } from 'react-router-dom'

const Container = styled(Box)(({ theme }) => ({
    width: '70%',
    height: '100%',
    margin: '100px auto 0 auto',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        margin: '75px auto 0 auto',
    }
}))

const Heading = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600,
    color: '#594949',
    margin: 20,
    [theme.breakpoints.down('md')]: {
        margin: 10
    }
}))

const Form = styled('form')(({ theme }) => ({
    margin: '25px 0 0 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    '& > div': {
        width: '90%',
    }
}))

const SelectImage = styled(Box)(({ theme }) => ({
    width: '90%',
    padding: 15,
    border: '1px solid grey',
    borderRadius: 5,
    cursor: 'pointer',
    textAlign: 'center',
    color: 'gray',
    transition: 'all 0.25s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
        background: 'lightgray'
    },
    ':active': {
        background: '#f2f2f2'
    },
    [theme.breakpoints.down('md')]: {
        fontSize: 16
    },
    '&>svg': {
        margin: '0 5px 0 0'
    }
}))

const SEOInformaton = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 20,
    '& > div': {
        width: '90%',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        '& > div': {
            width: '100%',
        },
        gap: 10
    }
}))

const ActionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 25,
    margin: 15,
    justifyContent: 'space-between',
    '&>button': {
        width: '50%',
        padding: 10
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
        '&>button': {
            width: '100%',
            padding: 10
        },
        gap: 14,
        margin: 10
    }
}))

const ImageBox = styled(Box)(({ theme }) => ({
    width: '100%',
    transition: 'all 2.5s ease-out',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '& > img': {
        height: '268px',
        maxWidth: '100%',
        objectFit: 'cover',
        borderRadius: 5,
    }
}))

function UpdateNewsForm() {

    const { id } = useParams()
    const [news, setNews] = useState({})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [meta, setMeta] = useState('')
    const [keywords, setKeywords] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (image) {
                if (!image?.type?.includes('image')) {
                    return toast.error('Image files only accepted.')
                }
            }
            let compressedFile;
            if (image) {
                compressedFile = await imageCompression(image, { maxSizeMB: 1 });
            }
            const data = new FormData();
            compressedFile && data.append('image', compressedFile)
            data.append('title', title)
            data.append('description', description)
            data.append('category', category)
            data.append('meta', meta)
            data.append('keywords', keywords)
            setLoading(true)
            const response = await axios.put(`/api/v1/news/update/${news?._id}`, data)
            response && setLoading(false)
            if (response?.status === 201) {
                toast.success(response?.data?.message)
                window.history.back()
            } else {
                toast.success(response?.data?.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error('something went wrong.')
        }
    }

    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await axios.get(`/api/v1/news/get-single-news/${id}`)
                if (response?.data?.success) {
                    setNews(response.data?.news)
                }
            } catch (error) {
                console.log(error);
                toast.error('something went wrong.')
            }
        }
        getNews()
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        setTitle(news?.title)
        setDescription(news?.description)
        setKeywords(news?.keywords)
        setMeta(news?.meta)
        setCategory(news?.category)
        // eslint-disable-next-line 
    }, [news])

    return (
        <Layout title={'Dashboard - Update News'} >
            <Container>
                <Heading>Edit News</Heading>
                <Form onSubmit={(e) => handleSubmit(e)} >
                    <label style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} htmlFor="file">
                        <SelectImage>
                            <Upload fontSize='medium' />
                            <Typography>Select Image</Typography>
                        </SelectImage>
                    </label>
                    <ImageBox>
                        {
                            image && !image?.type.includes('image') && <Typography style={{ fontSize: 14, color: 'red', }} >Only Images Allowed.</Typography>
                        }
                        {
                            image ? image?.type.includes('image') && <img src={URL.createObjectURL(image)} alt='' /> : <img src={`/api/v1/news/image/${news?.image}`} alt='' />
                        }
                    </ImageBox>
                    <TextField onChange={(e) => setImage(e.target.files[0])} sx={{ display: 'none' }} id='file' type='file' />
                    <TextField value={category} error={category && category?.length < 3 && true} required onChange={(e) => setCategory(e.target.value)} label={'Select Category'} select >
                        {
                            categories?.filter(cate => cate.name !== 'All News').map(category => (
                                <MenuItem value={category.slug} key={category.slug} >{category.name}</MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField value={title} placeholder='Title must be 3 characters long' error={title && title?.length < 3 && true} onChange={(e) => setTitle(e.target.value)} required label='Enter News Title' />
                    <TextField value={description} placeholder='Description must be 3 characters long' error={description && description?.length < 3 && true} required onChange={(e) => setDescription(e.target.value)} label='Enter News Description' multiline minRows={10} />
                    <SEOInformaton>
                        <TextField value={meta} placeholder='Enter Meta Description' error={meta && meta?.length < 3 && true} onChange={(e) => setMeta(e.target.value)} multiline minRows={5} label='Enter Meta Description' />
                        <TextField value={keywords} placeholder='Enter Related Keywords Seprated by (",")' error={keywords && keywords?.length < 1 && true} onChange={(e) => setKeywords(e.target.value)} multiline minRows={5} label='Provide Related Keywords' />
                    </SEOInformaton>
                    <ActionBox>
                        <Button onClick={() => window.history.back()} sx={{ color: 'grey', borderColor: '#000' }} variant='outlined' >Cancel Edit</Button>
                        <Button type='submit' variant='contained' >{loading ? 'Editing..' : 'Edit News'}</Button>
                    </ActionBox>
                </Form>
            </Container>
        </Layout>
    )
}

export default memo(UpdateNewsForm)