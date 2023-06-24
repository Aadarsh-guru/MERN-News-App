import { Box, Button, Dialog, styled, TextField, Typography, } from "@mui/material"
import { useData } from "../context/DataProvider"
import { useAuth } from '../context/AuthProvider'
import { useEffect, useState } from "react"
import EmptyProfileImage from '../assets/account.png'
import ConfirmDialog from './ConfirmDialog'
import { AddAPhoto } from '@mui/icons-material'
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
    margin: '15px auto',
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
    margin: '15px',
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

const AccountDeleteButton = styled(Button)(({ theme }) => ({
    fontSize: 16,
    margin: '0 auto',
    textTransform: 'capitalize',
    color: 'GrayText',
    transition: 'all 0.25s ease-in',
    ':hover': {
        color: 'red',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

const AccountDeleteMobileButton = styled(Button)(({ theme }) => ({
    fontSize: 16,
    margin: '0 auto',
    textTransform: 'capitalize',
    color: 'GrayText',
    display: 'none',
    ':hover': {
        color: 'red',
        fontWeight: 600
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}))

const Login = () => {

    const { openUpdateUserDialog, setOpenUpdateUserDialog } = useData()
    const { auth, setAuth } = useAuth()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [profile, setProfile] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault()
        let compressedFile = null;
        try {
            if (profile) {
                if (!profile?.type.includes('image')) {
                    return toast.error('Profile should be an image.')
                }
                compressedFile = await imageCompression(profile, { maxSizeMB: 1 });
            }
            if (newPassword) {
                if (newPassword?.length < 6) {
                    return toast.error('New Password Must Be 6 Characters Long.')
                }
            }
            const formData = new FormData()
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('email', email)
            formData.append('password', password)
            newPassword && formData.append('newPassword', newPassword)
            profile && formData.append('profile', compressedFile)
            setLoading(true)
            const response = await axios.put('/api/v1/user/update', formData)
            response && setLoading(false)
            if (response.status === 201) {
                setOpenUpdateUserDialog(!openUpdateUserDialog)
                setAuth({})
                localStorage.removeItem('auth')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            if (!password) {
                return toast.error('Current password is reqired.')
            }
            const response = await axios.post(`/api/v1/user/delete-user`, { email, password })
            if (response.status === 202) {
                toast.success(response.data.message)
                setOpenUpdateUserDialog(!openUpdateUserDialog)
                setAuth({})
                localStorage.removeItem('auth')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setFirstName(auth?.user?.firstName)
        setLastName(auth?.user?.lastName)
        setEmail(auth?.user?.email)
        // eslint-disable-next-line
    }, [openUpdateUserDialog])

    return (
        <StyleDialog open={openUpdateUserDialog} onClose={() => setOpenUpdateUserDialog(!openUpdateUserDialog)}>
            <RegisterWrapper>
                <RegisterLeftBox>
                    <MobileHeading>Update</MobileHeading>
                    <label htmlFor="profile">
                        {profile ? <Image src={profile && URL.createObjectURL(profile)} alt="" /> : <Image src={auth?.user?.profile ? `/api/v1/user/user-profile/${auth?.user?.profile}` : EmptyProfileImage} alt="" />}
                        <AddImageText>Add Profile Picture <AddAPhoto fontSize="small" /> </AddImageText>
                        {profile && !profile?.type.includes('image') && <Error>Only Image Flies .jpg, .jpeg, .png are accepted</Error>}
                    </label>
                    <Info>
                        "Note - After Successfull Update You'll be loged out. and you'll have to login again with updated details, to see all changes. in case you want to delete your account Permanantly then Current password is required. and All the Data Related to your account will be deleted."
                    </Info>
                    <AccountDeleteButton onClick={() => setConfirm(!confirm)} >
                        Delete Account Permanantly.
                    </AccountDeleteButton>
                    <StyledButoon onClick={() => setOpenUpdateUserDialog(!openUpdateUserDialog)} >
                        Cancel Changes
                    </StyledButoon>
                </RegisterLeftBox>
                <RegisterRightBox>
                    <LaptopHeading>Update</LaptopHeading>
                    <Form onSubmit={(e) => handleUpdate(e)} >
                        <TextField type='text' value={firstName} variant='standard' label='First Name' required onChange={(e) => setFirstName(e.target.value)} />
                        {firstName && firstName?.length < 3 && <Error>First name must be 3 charecters long.</Error>}
                        <TextField type='text' value={lastName} variant='standard' label='Last Name' required onChange={(e) => setLastName(e.target.value)} />
                        {lastName && lastName?.length < 3 && <Error>Last name must be 3 long.</Error>}
                        <TextField type='email' disabled value={email} variant='standard' label='Email' required onChange={(e) => setEmail(e.target.value)} />
                        <TextField type="password" variant="standard" label='Current Password' required onChange={(e) => setPassword(e.target.value)} />
                        <TextField type="text" variant="standard" label='New Password' onChange={(e) => setNewPassword(e.target.value)} />
                        {newPassword && newPassword?.length < 6 && <Error>Password must be 6 charecters long.</Error>}                        <TextField type="file" style={{ display: 'none' }} id="profile" onChange={(e) => setProfile(e.target.files[0])} />
                        <Button type='submit' disabled={loading && true} variant='contained'>{loading ? 'Updating..' : 'Update'}</Button>
                        <AccountDeleteMobileButton onClick={() => setConfirm(!confirm)} >
                            Delete Your Account
                        </AccountDeleteMobileButton>
                        <MobileStyledButton onClick={() => setOpenUpdateUserDialog(!openUpdateUserDialog)} >
                            Cancel Changes
                        </MobileStyledButton>
                    </Form>
                </RegisterRightBox>
            </RegisterWrapper>
            <ConfirmDialog open={confirm} setOpen={setConfirm} handleDelete={handleDelete} />
        </StyleDialog >
    )
}

export default Login
