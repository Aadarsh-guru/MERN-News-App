import { Box, Button, MenuItem, TextField, Typography, styled } from '@mui/material'
import { categories } from '../../constants/sidebarData'
import { Upload } from '@mui/icons-material'
import { useState, memo } from 'react'
import { useAuth } from '../../context/AuthProvider'
import toast from 'react-hot-toast'
import imageCompression from 'browser-image-compression';
import axios from 'axios'

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
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
        width: '30%',
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

function CreateNewsForm({ setCategoryTab, setTab }) {

    const { auth } = useAuth()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [meta, setMeta] = useState('')
    const [keywords, setKeywords] = useState('')
    const [type, setType] = useState('publish')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!image) {
                return toast.error('Image is Required.')
            }
            if (!image?.type?.includes('image')) {
                return toast.error('Image files only accepted.')
            }
            const compressedFile = await imageCompression(image, { maxSizeMB: 1 });
            const data = new FormData();
            data.append('image', compressedFile)
            data.append('title', title)
            data.append('description', description)
            data.append('category', category)
            data.append('meta', meta)
            data.append('keywords', keywords)
            data.append('type', type)
            data.append('author', `${auth?.user?.firstName + " " + auth?.user?.lastName}`)
            setLoading(true)
            const response = await axios.post(`/api/v1/news/create`, data)
            response && setLoading(false)
            if (response?.status === 201) {
                toast.success(response?.data?.message)
                type === 'bin' ? setTab('bin') : type === 'draft' ? setTab('draft') : setTab('');
                type === 'publish' && setCategoryTab(category)
            } else {
                toast.success(response?.data?.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error('something went wrong.')
        }
    }


    return (
        <Container>
            <Heading>Create News</Heading>
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
                        image && image?.type.includes('image') && <img src={URL.createObjectURL(image)} alt='' />
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
                <TextField placeholder='Title must be 3 characters long' error={title && title?.length < 3 && true} onChange={(e) => setTitle(e.target.value)} required label='Enter News Title' />
                <TextField placeholder='Description must be 3 characters long' error={description && description?.length < 3 && true} required onChange={(e) => setDescription(e.target.value)} label='Enter News Description' multiline minRows={10} />
                <SEOInformaton>
                    <TextField placeholder='Enter Meta Description' error={meta && meta?.length < 3 && true} onChange={(e) => setMeta(e.target.value)} multiline minRows={5} label='Enter Meta Description' />
                    <TextField placeholder='Enter Related Keywords Seprated by (",")' error={keywords && keywords?.length < 1 && true} onChange={(e) => setKeywords(e.target.value)} multiline minRows={5} label='Provide Related Keywords' />
                </SEOInformaton>
                <ActionBox>
                    <Button disabled={loading && true} type='submit' onClick={() => setType('bin')} sx={{ color: 'red', borderColor: 'red' }} variant='outlined' >{(loading && type === 'bin') ? 'Moving to bin.. ' : 'Move To Bin'}</Button>
                    <Button disabled={loading && true} type='submit' onClick={() => setType('draft')} sx={{ color: 'green', borderColor: 'green' }} variant='outlined' >{(loading && type === 'draft') ? 'saving draft..' : "Save Draft"}</Button>
                    <Button disabled={loading && true} type='submit' onClick={() => setType('publish')} variant='contained' >{(loading && type === 'publish') ? 'Publishing..' : 'Publish Now'}</Button>
                </ActionBox>
            </Form>
        </Container>
    )
}

export default memo(CreateNewsForm)