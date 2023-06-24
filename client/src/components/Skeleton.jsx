import { Card, CardContent, Grid, styled, Skeleton } from '@mui/material'

const Component = styled(Card)(({ theme }) => ({
    marginBottom: 20,
    boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
}))

const Container = styled(CardContent)(({ theme }) => ({
    padding: '8px',
    paddingBottom: '4px !important'
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

const ImageSkeleton = styled(Skeleton)(({ theme }) => ({
    height: '268px',
    width: '88%',
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}))

const LoadingSkelton = () => {
    return (
        <Component>
            <Container>
                <Grid container>
                    <Grid lg={5} sm={5} xs={12} item>
                        <ImageSkeleton variant='rectangular' />
                    </Grid>
                    <RightContainer lg={7} md={7} sm={7} xs={12} item>
                        <Skeleton variant='rectangular' style={{ width: '100%', height: '80px', margin: '10px 0' }} />
                        <Skeleton variant='rectangular' style={{ width: '100%', height: '40px', margin: '10px 0' }} />
                        <Skeleton variant='rectangular' style={{ width: '100%', height: '30px', margin: '10px 0' }} />
                        <Skeleton variant='rectangular' style={{ width: '100%', height: '20px', margin: '10px 0' }} />
                        <Skeleton variant='rectangular' style={{ width: '100%', height: '10px', margin: '10px 0' }} />
                    </RightContainer>
                </Grid>
            </Container>
        </Component>
    )
}

export default LoadingSkelton