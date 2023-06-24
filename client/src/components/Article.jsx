import { Card, CardContent, Grid, Typography, styled } from '@mui/material'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const Image = styled('img')(({ theme }) => ({
    height: '268px',
    width: '88%',
    objectFit: 'cover',
    borderRadius: 5,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}))

const Component = styled(Card)(({ theme }) => ({
    boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
    marginBottom: 20
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
    cursor: 'pointer'
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

const Article = ({ news }) => {

    const navigate = useNavigate()

    return (
        <Component className='AnimatedCard'>
            <Container >
                <Grid container>
                    <Grid lg={5} sm={5} xs={12} item>
                        <Image onClick={() => navigate(`/news/${news?._id}`)} loading='lazy' src={`/api/v1/news/image/${news?.image}`} alt='the related to article pic' />
                    </Grid>
                    <RightContainer lg={7} md={7} sm={7} xs={12} item>
                        <Text onClick={() => navigate(`/news/${news?._id}`)} >{news?.title?.slice(0, 100) + '...'}</Text>
                        <Autor>
                            <b>written</b> by {news?.author} / {new Date(news?.createdAt).toDateString()}
                        </Autor>
                        <Description>{news?.description?.slice(0, 350) + '...'}</Description>
                        <ReadMore onClick={() => navigate(`/news/${news?._id}`)} >Read more..</ReadMore>
                    </RightContainer>
                </Grid>
            </Container>
        </Component>
    )
}

export default memo(Article)