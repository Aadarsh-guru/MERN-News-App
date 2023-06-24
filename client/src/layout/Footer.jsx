import { Box, Typography, styled } from '@mui/material'
import HeaderImage from '../assets/logo_inshorts.png'
import { Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material'

const Container = styled(Box)(({ theme }) => ({
    height: '10vh',
    width: '100%',
    background: '#303036',
    [theme.breakpoints.down('md')]: {
        height: '20vh'
    }
}))

const Wrapper = styled(Box)(({ theme }) => ({
    width: "60%",
    height: '100%',
    margin: "40px auto 0 auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    padding: 10,
    [theme.breakpoints.down('md')]: {
        width: '75%',
        flexDirection: 'column'
    },
    [theme.breakpoints.down('sm')]: {
        width: '85%',
        flexDirection: 'column'
    }
}))


const Image = styled('img')(({ theme }) => ({
    height: "55px",
    cursor: 'pointer',
    borderRadius: 10,
    ':hover': {
        background: '#fff',
    }
}))

const Icons = styled(Box)(({ theme }) => ({
    '& > svg': {
        margin: '0 10px',
        cursor: 'pointer',
        ':hover': {
            color: '#fff'
        },
        ':active': {
            color: 'red'
        }
    },
    [theme.breakpoints.down('md')]: {
        marginTop: 10
    },
}))

const Email = styled(Typography)(({ theme }) => ({
    color: 'grey',
    ':hover': {
        color: "#fff"
    }
}))

const Footer = () => {

    return (
        <>
            <Container>
                <Wrapper>
                    <Image onClick={() => window.open(window.location.origin)} src={HeaderImage} alt="logo" />
                    <Email ><a style={{ textDecoration: 'none', color: 'inherit' }} href="http://aadarshguru.com" target="_blank" rel="noopener noreferrer">Copyright © aadarshguru.com</a> </Email>
                    <Icons>
                        <Twitter onClick={() => window.open('https://twitter.com/Aadarsh_guru', '_blank')} />
                        <LinkedIn onClick={() => window.open('https://www.linkedin.com/in/aadarsh-guru/', '_blank')} />
                        <Instagram onClick={() => window.open('https://instagram.com/aadarsh_guru/', '_blank')} />
                        <YouTube onClick={() => window.open('http://youtube.com/@Aadarsh-guru/', '_blank')} />
                    </Icons>
                </Wrapper>
            </Container>
        </>
    )
}

export default Footer