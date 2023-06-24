import { Box, Typography, styled } from '@mui/material'
import Layout from '../layout/Layout'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { LinkedinShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton } from 'react-share';
import { LinkedIn, Telegram, Twitter, WhatsApp } from '@mui/icons-material'

const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    height: '100%',
    margin: '100px auto 0 auto',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    background: '#f2f2f2',
    padding: '20px 50px',
    borderRadius: 20,
    [theme.breakpoints.down('md')]: {
        width: '100%',
        margin: '50px auto 0 auto',
        padding: '20px 10px',
        textAlign: 'center',
        borderRadius: 0,
    }
}))

const Title = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
});

const Description = styled(Typography)({
    fontSize: '18px',
    marginBottom: '20px',
});

const Author = styled(Typography)({
    fontSize: '16px',
    fontStyle: 'italic',
});

const NewsDate = styled(Typography)({
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
});

const ShareIcons = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '50xpx',
    background: 'lightgray',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: '10px 0',
    '& > button > svg': {
        ':hover': {
            color: '#2466ad'
        },
        ':active': {
            color: '#2466ad'
        }
    }
}))

const News = () => {

    const { id } = useParams()
    const [news, setNews] = useState({})

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

    return (
        <Layout
            title={`${news?.title?.charAt(0).toUpperCase().concat(news?.title?.substring(1, 30))}`}
            description={`${news?.meta}`}
            keywords={`${news?.keywords}`}
        >
            <Container>
                <Title >{news?.title}</Title>
                <Author >Author: {news?.author}</Author>
                <NewsDate >Date: {new Date(news?.createdAt).toDateString()}</NewsDate>
                <Description>{news?.description}</Description>
                <ShareIcons>
                    <TwitterShareButton title={news?.title} url={`${window.location.href}`} >
                        <Twitter />
                    </TwitterShareButton>
                    <WhatsappShareButton title={news?.title} url={`${window.location.href}`} >
                        <WhatsApp />
                    </WhatsappShareButton>
                    <LinkedinShareButton title={news?.title} url={`${window.location.href}`}>
                        <LinkedIn />
                    </LinkedinShareButton>
                    <TelegramShareButton title={news?.title} url={`${window.location.href}`} >
                        <Telegram />
                    </TelegramShareButton>
                </ShareIcons>
            </Container>
        </Layout>
    )
}

export default News