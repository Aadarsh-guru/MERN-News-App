import Layout from '../layout/Layout'
import { Box, Typography, styled } from '@mui/material'
import ContactImage from '../assets/contactus.jpeg'

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
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '500px',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    }
}))

const Message = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    margin: '0 20px',
    fontSize: 20,
    fontWeight: 600,
    color: 'grey'
}))


const Contact = () => {
    return (
        <Layout title={'Contact US - Inshorts'}>
            <Container>
                <Title>
                    Contact Us
                </Title>
                <Description>
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            padding: '10px'
                        }}>
                        <img style={{ height: '100%', width: '100%', borderRadius: 10 }} src={ContactImage} alt="" />
                    </Box>
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px',
                            '&> p': {
                                fontSize: '18px',
                                textAlign: 'center'
                            }
                        }}
                    >
                        <Typography>Phone - +918871860855 </Typography>
                        <Typography>Email - aadarshgurug@gmail.com</Typography>
                        <Typography>Address - Sahajpur road Deori Sagar Madhya Pradesh India</Typography>
                    </Box>
                </Description>
                <Message>
                    Thank You!
                </Message>
            </Container>
        </Layout>
    )
}

export default Contact