import { Box, CircularProgress, styled } from '@mui/material'
import Layout from '../layout/Layout'
import DashboardNavigation from '../components/dashboard-components/DashboardNavigation';
import CreateNewsForm from '../components/dashboard-components/CreateNewsForm'
import { Suspense, lazy, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
const DashboardArticles = lazy(() => import('../components/dashboard-components/DashboardArticles'))

const Container = styled(Box)(({ theme }) => ({
    width: '96%',
    margin: '90px auto 0 auto',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: '70px auto 0 auto',
        flexDirection: 'column',
        width: '90%',
    },
}))

const SideBar = styled(Box)(({ theme }) => ({
    width: '25%',
    height: '100%',
    position: 'fixed',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        position: 'static',
        borderBottom: '1px solid grey',
        paddingBottom: 15,
    },
}))

const Content = styled(Box)(({ theme }) => ({
    width: '75%',
    height: '100%',
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 0,
    },
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

const Dashboard = () => {

    const { auth } = useAuth()
    const [tab, setTab] = useState('')
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState('all-news')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchData, setFetchData] = useState(false)

    useEffect(() => {
        setPage(1)
        setData([])
        setFetchData(!fetchData)
        // eslint-disable-next-line
    }, [category, tab])

    useEffect(() => {
        const getAllNews = async () => {
            try {
                setLoading(true)
                const response = await axios.get(tab ? `/api/v1/news/user-type-news/${tab}/${page}` : `/api/v1/news/user-category-news/${category}/${page}`)
                if (response.data?.success) {
                    setData([...data, ...response.data?.news])
                }
            } catch (error) {
                console.log(error);
                toast.error('something went wrong')
            } finally {
                setLoading(false)
            }
        }
        auth && getAllNews();
        // eslint-disable-next-line
    }, [auth, fetchData, page])

    return (
        <Layout title={`Dashboard ${tab ? tab.charAt(0).toUpperCase().concat(tab.substring(1)) : category.charAt(0).toUpperCase().concat(category.substring(1))} - Inshorts`} >
            <Container>
                <SideBar>
                    <DashboardNavigation category={category} setCategory={setCategory} tab={tab} setTab={setTab} />
                </SideBar>
                <Content>
                    {
                        tab === 'create' ?
                            (
                                <CreateNewsForm setCategoryTab={setCategory} setTab={setTab} />
                            )
                            :
                            (
                                <>
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
                                                    <DashboardArticles data={data} setPage={setPage} loading={loading} />
                                                </Suspense>
                                            )
                                    }
                                </>
                            )
                    }
                </Content>
            </Container>
        </Layout>
    )
}

export default Dashboard 