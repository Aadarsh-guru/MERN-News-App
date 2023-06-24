import { Box, Button, Typography, styled } from '@mui/material'
import { Suspense, lazy, memo } from 'react'
import LoadingSkelton from './Skeleton'
const Article = lazy(() => import('./Article'))

const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: '75px'
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

const Articles = ({ data, setPage, loading }) => {

  return (
    <Container>
      {
        data && data?.length <= 0 ?
          <EmptyMessage>
            <Typography>No News To Display</Typography>
          </EmptyMessage>
          :
          data && data?.map(news => (
            <Suspense fallback={<LoadingSkelton />} key={news?._id} >
              <Article news={news} />
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

export default memo(Articles)
