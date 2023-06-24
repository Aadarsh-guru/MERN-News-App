import { Box, Button, Dialog, styled, TextField, Typography, } from "@mui/material"
import { useData } from "../context/DataProvider"
import { useAuth } from '../context/AuthProvider'
import { useState } from "react"
import EmptyProfileImage from '../assets/account.png'
import { AddAPhoto } from '@mui/icons-material'
import LoginPageImage from '../assets/login-image.png'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import imageCompression from 'browser-image-compression';


const StyleDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            width: "100%",
            height: '100%',
            maxWidth: "70vw",
            maxHeight: '70vh',
            [theme.breakpoints.down('md')]: ({
                maxWidth: "100vw",
                maxHeight: '60vh',
            }),
            [theme.breakpoints.down('sm')]: ({
                maxWidth: "100vw",
                maxHeight: '75vh',
            }),
        },
    },
}))

const RegisterWrapper = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
    }
}))

const RegisterLeftBox = styled(Box)(({ theme }) => ({
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: ({
        width: '100%',
        height: '30%',
        '& > label ': {
            textAlign: 'center'
        }
    }),
}))

const RegisterRightBox = styled(Box)(({ theme }) => ({
    width: '50%',
    height: '100%',
    [theme.breakpoints.down('sm')]: ({
        width: '100%',
        height: '70%'
    }),
}))

const LoginWrapper = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    display: 'flex'
}))

const LoginLeftBox = styled(Box)(({ theme }) => ({
    width: '50%',
    height: '100%',
    backgroundImage: `url(${LoginPageImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: ({
        display: 'none'
    }),
}))

const LoginRightBox = styled(Box)(({ theme }) => ({
    width: '50%',
    height: '100%',
    background: '#f2f2f2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
        background: '#ffffff',
        width: '80%',
        borderRadius: 25,
        boxShadow: '1px 1px grey',
        textAlign: 'center',
        '& > p': {
            margin: '20px 0 0 0'
        },
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            borderRadius: 15
        }
    },
    [theme.breakpoints.down('sm')]: ({
        width: '100%'
    }),
}))

const Image = styled('img')(({ theme }) => ({
    height: '250px',
    width: '250px',
    borderRadius: '50%',
    border: '1px solid lightgrey',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        height: '75px',
        width: '75px',
        borderRadius: '50%',
        border: '1px solid lightgrey',
    }
}))

const AddImageText = styled(Typography)({
    padding: '5px 0px',
    fontSize: 14,
    color: '#2466ad',
    ':hover': {
        color: 'grey'
    },
    '& > svg': {
        fontSize: 14,
    },
    cursor: 'pointer',
    textAlign: 'center'
})

const Info = styled(Typography)(({ theme }) => ({
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))

const StyledButoon = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    margin: '30px auto',
    textTransform: 'capitalize',
    color: 'GrayText',
    cursor: 'pointer',
    ':hover': {
        color: '#2466ad',
    },
    ':active': {
        color: 'grey'
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

const MobileHeading = styled(Typography)(({ theme }) => ({
    margin: 10,
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#2466ad',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}))

const LaptopHeading = styled(Typography)(({ theme }) => ({
    margin: '20px',
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#2466ad',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

const Form = styled('form')(({ theme }) => ({
    padding: '10px 20px',
    '& > div': {
        width: '100%',
        margin: '24px 0 0 0'
    },
    '& button': {
        width: '100%',
        margin: '24px 0 0 0',

    }
}))

const MobileStyledButton = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    margin: '30px',
    textTransform: 'capitalize',
    color: 'GrayText',
    cursor: 'pointer',
    display: 'none',
    textAlign: 'center',
    ':hover': {
        color: '#2466ad',
    },
    ':active': {
        color: 'grey'
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}))

const Error = styled(Typography)(({ theme }) => ({
    fontSize: 10,
    color: 'red',
    fontWeight: 600,
    margin: '2px 0 0 0'
}))

const Login = () => {

    const { openLoginDialog, setOpenLoginDialog } = useData()
    const { setAuth } = useAuth()
    const [toggleForm, setToggleForm] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profile, setProfile] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        let compressedFile = null;
        try {
            if (profile) {
                if (!profile?.type.includes('image')) {
                    return toast.error('Profile should be an image.')
                }
                compressedFile = await imageCompression(profile, { maxSizeMB: 1 });
            }
            if (password !== confirmPassword) {
                return toast.error('Password and confirm password is not matching.')
            }
            if (password?.length < 6) {
                return toast.error('Password Must Be 6 Characters Long.')
            }
            const formData = new FormData()
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('email', email)
            formData.append('password', password)
            profile && formData.append('profile', compressedFile)
            setLoading(true)
            const response = await axios.post('/api/v1/auth/register', formData)
            response && setLoading(false)
            response && toast.success(response.data.message)
            if (response.status === 201) {
                setToggleForm(!toggleForm)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
            setLoading(false)
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post('/api/v1/auth/login', { email, password })
            response && setLoading(false)
            if (response.data.success) {
                setAuth(response.data)
                localStorage.setItem('auth', JSON.stringify(response.data))
                toast.success(response.data.message)
                setOpenLoginDialog(!openLoginDialog)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
            setLoading(false)
        }
    }

    return (
        <StyleDialog open={openLoginDialog} onClose={() => setOpenLoginDialog(!openLoginDialog)}>
            {
                toggleForm ?
                    (
                        <RegisterWrapper>
                            <RegisterLeftBox>
                                <MobileHeading>Register</MobileHeading>
                                <label htmlFor="profile">
                                    <Image src={profile ? URL.createObjectURL(profile) : EmptyProfileImage} />
                                    <AddImageText>Add Profile Picture <AddAPhoto fontSize="small" /> </AddImageText>
                                    {profile && !profile?.type.includes('image') && <Error>Only Image Flies .jpg, .jpeg, .png are accepted</Error>}
                                </label>
                                <Info>
                                    " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptate quaerat dolore possimus? Exercitationem non, neque, officia quaerat tenetur nostrum repellendus eum dolores possimus ipsam reprehenderit fugiat maiores at vel sit similique molestiae vero distinctio quod autem, ea mollitia debitis. Nihil fugiat earum doloribus vero quia aspernatur veniam culpa est. "
                                </Info>
                                <StyledButoon onClick={() => setToggleForm(!toggleForm)} >
                                    Already! have An Account? then <Box component='span' style={{ color: '#2466ad', marginLeft: 5 }} >Sign In</Box>
                                </StyledButoon>
                            </RegisterLeftBox>
                            <RegisterRightBox>
                                <LaptopHeading>Register</LaptopHeading>
                                <Form onSubmit={(e) => handleRegister(e)} >
                                    <TextField type='text' variant='standard' label='First Name' required onChange={(e) => setFirstName(e.target.value)} />
                                    {firstName && firstName?.length < 3 && <Error>First name must be 3 charecters long.</Error>}
                                    <TextField type='text' variant='standard' label='Last Name' required onChange={(e) => setLastName(e.target.value)} />
                                    {lastName && lastName?.length < 3 && <Error>Last name must be 3 long.</Error>}
                                    <TextField type='email' variant='standard' label='Email' required onChange={(e) => setEmail(e.target.value)} />
                                    <TextField type="password" variant="standard" label='Password' required onChange={(e) => setPassword(e.target.value)} />
                                    {password && password?.length < 6 && <Error>Password must be 6 charecters long.</Error>}
                                    <TextField type="password" variant="standard" label='Confirm Password' required onChange={(e) => setConfirmPassword(e.target.value)} />
                                    {confirmPassword && confirmPassword !== password && <Error>Password is not matching.</Error>}
                                    <TextField type="file" style={{ display: 'none' }} id="profile" onChange={(e) => setProfile(e.target.files[0])} />
                                    <Button type='submit' disabled={loading && true} variant='contained'>{loading ? 'Registering..' : 'Register'}</Button>
                                    <MobileStyledButton onClick={() => setToggleForm(!toggleForm)} >
                                        Have An Account? <Box component='span' style={{ color: '#2466ad', marginLeft: 5 }} >Sign In</Box>
                                    </MobileStyledButton>
                                </Form>
                            </RegisterRightBox>
                        </RegisterWrapper>
                    )
                    :
                    (
                        <LoginWrapper>
                            <LoginLeftBox>
                                <Typography variant="h2" >Welcome Back</Typography>
                                <Typography variant="h5" >We would be glad to serve you again.</Typography>
                            </LoginLeftBox>
                            <LoginRightBox>
                                <Box>
                                    <LaptopHeading>Sign In</LaptopHeading>
                                    <MobileHeading>Sign In</MobileHeading>
                                    <Form onSubmit={(e) => handleSignIn(e)} >
                                        < TextField type="email" variant="standard" label='Email' required onChange={(e) => setEmail(e.target.value)} />
                                        < TextField type="password" variant="standard" label='Password' required onChange={(e) => setPassword(e.target.value)} />
                                        <Button disabled={loading && true} variant="contained" type="submit" >{loading ? 'Signing in...' : 'Sign in'}</Button>
                                    </Form>
                                    <StyledButoon style={{ margin: '20px auto' }} onClick={() => setToggleForm(!toggleForm)} >
                                        Don't! have Account? <Box component='span' style={{ color: '#2466ad', marginLeft: 5 }} >Sign Up</Box>
                                    </StyledButoon>
                                    <MobileStyledButton style={{ margin: '20px auto' }} onClick={() => setToggleForm(!toggleForm)} >
                                        Create Account? <Box component='span' style={{ color: '#2466ad', marginLeft: 5 }} >Sign Up</Box>
                                    </MobileStyledButton>
                                </Box>
                            </LoginRightBox>
                        </LoginWrapper>
                    )
            }
        </StyleDialog >
    )
}

export default Login
