import { Box, Button, Typography, styled } from '@mui/material'
import { lazy, memo, Suspense } from 'react'
import LoadingSkelton from '../../components/Skeleton'
const DashboardArticle = lazy(() => import('./DashboardArticle'))

const Container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        margin: '10px 0 0 0'
    }
}))

const EmptyMessage = styled(Box)(({ theme }) => ({
    height: '75vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > p': {
        color: 'grey'
    }
}))

const LoadMoreBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > button': {
        background: '#f2f2f2',
        color: '#000',
        ':hover': {
            background: 'grey'
        }
    }
}))

const DashboardArticles = ({ data, setPage, loading }) => {

    return (
        <Container>
            {
                data?.length <= 0 ?
                    <EmptyMessage>
                        <Typography>No News To Display</Typography>
                    </EmptyMessage>
                    :

                    data && data?.map(data => (
                        <Suspense fallback={<LoadingSkelton />} key={data?._id} >
                            <DashboardArticle data={data} />
                        </Suspense>
                    ))
            }
            {data?.length >= 5 &&
                <LoadMoreBox>
                    <Button variant='contained' onClick={() => setPage(page => page + 1)} >
                        {
                            loading ?
                                'Loading..'
                                :
                                'Load More'
                        }
                    </Button>
                </LoadMoreBox>
            }
        </Container>
    )
}

export default memo(DashboardArticles)