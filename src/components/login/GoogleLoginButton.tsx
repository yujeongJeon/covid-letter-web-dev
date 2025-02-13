import {withAxios} from '$utils/fetcher/withAxios'
import {GOOGLE} from '$config'
import {GoogleLoginResponse, useGoogleLogin} from 'react-google-login'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import GoogleLogo from 'assets/logos/GoogleLogo'
import {LoginToken} from '$types/response/login'
import {FontNanumBarunGothic} from '$styles/utils/font'

const commonTw = tw`
    tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center
`

const Button = styled.button`
    ${commonTw}
    ${FontNanumBarunGothic('semibold')}
    ${tw`tw-text-base`}
    width: 100%;
    padding: ${({isMobile}: {isMobile: boolean}) => (isMobile ? '1.5rem 0' : '1.5rem 0')};
    color: #fff;
    background-color: #dc4e41;
    border: 1px solid #dc4e41;
`

interface GoogleLoginButtonProps {
    returnUrl: string
    isMobile: boolean
}

const GoogleLoginButton = ({returnUrl, isMobile}: GoogleLoginButtonProps) => {
    const onSuccess = async ({googleId, profileObj}: Partial<GoogleLoginResponse>) => {
        const sessionResult = await withAxios<LoginToken>({
            url: '/login',
            method: 'POST',
            data: {
                identifier: googleId,
                email: profileObj?.email,
                name: profileObj?.name,
            },
        })

        if (sessionResult) {
            const {accessToken, tokenExpirationTime} = sessionResult

            const redirectUrl = await withAxios<string>({
                url: '/login/google/cookie',
                method: 'POST',
                data: {
                    accessToken,
                    tokenExpirationTime,
                    returnUrl,
                },
            })

            window.location.replace(redirectUrl)
        }
    }
    const onFailure = (error: unknown) => {
        console.error(error)
    }
    const {signIn} = useGoogleLogin({
        clientId: GOOGLE.CLIENT_ID,
        onSuccess,
        onFailure,
    })
    return (
        <Button onClick={signIn} isMobile={isMobile}>
            <GoogleLogo style={{marginRight: '24px'}} />
            Google로 계속하기
        </Button>
    )
}

export default GoogleLoginButton
