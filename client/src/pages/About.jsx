import { Box, Typography, styled } from '@mui/material'
import Layout from '../layout/Layout'

const Container = styled(Box)(({ theme }) => ({
    width: '70%',
    height: '100%',
    background: 'lightgrey',
    padding: '20px 50px',
    borderRadius: 20,
    margin: '100px auto 0 auto',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '20px 10px',
        borderRadius: 0,
        margin: '60px auto 0 auto',
    }
}))

const Title = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: 50,
    [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
        fontWeight: '500',
        marginBottom: 20
    },
}))

const Description = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: 20,
}))

const Message = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    margin: '0 20px',
    fontSize: 20,
    fontWeight: 600,
    color: 'grey'
}))

const About = () => {
    return (
        <Layout title={'About US - Inshorts'} >
            <Container>
                <Title>
                    About Us
                </Title>
                <Description>
                    I am a hustler who always ready to learn new thing, in order to sharpen my saw everyday i prefer reding books and I also love to share with people all the knowledge I have gained till now, it helps me to keep my vision present in my mind.

                    In order to become a contributor I write blogs based on the things I'm learning, I'm a enthusiast programer and a MERN-stack developer, learning and creating tech is one of the thing which really excites me, along with tech I'm learning interpersonal skills and also keep interest in psychology and intellectual things.

                    I have strong believe that the only thing which makes human being shine is right education so to add value in their lives I make efforts to make people aware about tech and encourage people to get educated.

                    Whenever I get free time I usually spend my time with nature other than this I love to talk to my own self, and write tweets too.</Description>
                <Message>
                    Thank You!
                </Message>
            </Container>
        </Layout>
    )
}

export default About