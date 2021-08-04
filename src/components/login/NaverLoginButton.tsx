import {withAxios} from '$utils/fetcher/withAxios'
import {HOST_URL} from '$config'
import {AuthorizeResponse} from '$types/login/naver'
import ROUTES from '$constants/routes'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import SvgNaver from 'assets/NaverLogo'
import {useAlertStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'

const commonTw = tw`
    tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center
`

const Button = styled.button`
    width: 100%;
    padding: 1.85rem 0;
    color: #767678;
    border: 1px solid #e6e6ea;
`

const buttonTw = tw`
tw-font-ohsquare tw-font-bold tw-text-base tw-bg-grey-000
`

interface NaverLoginButtonProps {
    returnUrl: string
}

const NaverLoginButton = ({returnUrl}: NaverLoginButtonProps) => {
    const {alert} = useAlertStore()

    const handleLogin = async () => {
        try {
            const res = await withAxios<AuthorizeResponse>({
                url: `/login/naver/authorize`,
                method: 'get',
                params: {
                    redirect_uri: encodeURIComponent(
                        `${HOST_URL}${ROUTES.BRIDGE}/naver?returnUrl=${encodeURIComponent(returnUrl)}`,
                    ),
                },
            })

            const {redirectUrl} = res
            window.location.replace(`${redirectUrl}`)
        } catch (e) {
            alert({
                title: '로그인에 실패했습니다.',
            })
        }
    }
    return (
        <Button css={{...buttonTw, ...commonTw}} onClick={() => handleLogin()}>
            <SvgNaver style={{marginRight: '24px'}} />
            네이버로 계속하기
        </Button>
    )
}

export default observer(NaverLoginButton)
