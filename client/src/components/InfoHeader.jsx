import React from 'react'
import { Box, Typography, styled } from '@mui/material';
import appleStore from '../assets/appstore.png'
import googleStore from '../assets/playstore.png'

const Container = styled(Box)(({ theme }) => ({
  background: "#f44336",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  height: "48px",
  marginBottom: "30px",
  marginTop: '90px',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Image = styled('img')({
  height: 34,
  '&:last-child': {
    margin: '0 50px 0 20px'
  }
})

const Text = styled(Typography)({
  fontSize: 14,
  fontWeight: 300,
  marginLeft: 50
})

const InfoHeader = () => {
  return (
    <Container>
      <Text>
        For the best experience use inshorts app on your smartphone
      </Text>
      <Box style={{ display: 'flex', marginLeft: 'auto' }}>
        <Image src={appleStore} alt="applestore" />
        <Image src={googleStore} alt="googlestore" />
      </Box>
    </Container>
  )
}

export default InfoHeader