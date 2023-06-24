import Layout from '../layout/Layout'
import { Box, CircularProgress, styled } from '@mui/material';
import InfoHeader from '../components/InfoHeader'
import { useParams } from 'react-router-dom'
import { Suspense, lazy } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
const Articles = lazy(() => import('../components/Articles'))

const Container = styled(Box)(({ theme }) => ({
    width: "60%",
    margin: "40px auto 0 auto",
    [theme.breakpoints.down('md')]: {
        width: '75%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '85%'
    }
}))

const Loading = styled(Box)(({ theme }) => ({
    height: 'calc(100vh - 100px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        height: 'calc(100vh - 250px)',
    }
}))


const Home = () => {

    const { category } = useParams()
    const { auth } = useAuth()
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchData, setFetchData] = useState(false)

    useEffect(() => {
        setPage(1)
        setData([])
        setFetchData(!fetchData)
        // eslint-disable-next-line
    }, [category])

    useEffect(() => {
        const getAllNews = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/v1/news/get-news/${category}/${page}`)
                response && setLoading(false)
                if (response?.data?.success) {
                    setData([...data, ...response?.data?.news])
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                toast.error('something went wrong')
            }
        }
        getAllNews()
        // eslint-disable-next-line
    }, [auth, page, fetchData])

    return (
        <Layout title={`${(category).charAt(0).toUpperCase().concat(category.substring(1))} - Inshorts`} >
            <Container>
                <InfoHeader />
                {
                    loading ?
                        (
                            <Loading>
                                <CircularProgress />
                            </Loading>
                        )
                        :
                        (
                            <Suspense>
                                <Articles data={data} setPage={setPage} loading={loading} />
                            </Suspense>
                        )
                }
            </Container>
        </Layout>
    )
}

export default Home