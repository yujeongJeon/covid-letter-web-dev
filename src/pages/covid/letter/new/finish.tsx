import styled from '@emotion/styled'
import tw from 'twin.macro'
import {observer} from 'mobx-react-lite'
import {useLetterStore} from '$contexts/StoreContext'
import {getCurrentDate} from '$utils/date'
import {StickerFactory} from '$components/sticker/stickerFactory'
import {useProfileContext} from '$contexts/ProfileContext'

const Finish = () => {
    const {title, optionText, sticker} = useLetterStore()
    const {profile} = useProfileContext()
    return (
        <Container>
            <h3>
                편지 작성을 완료했어! <br /> 소중히 보관했다가 <br /> 안전하게 보내줄게 :)
            </h3>
            <ResultWrapper>
                <DescriptionWrapper>
                    <p className="title-wrapper">
                        <span className="title">{title}</span>
                        <span className="title-sticker">{StickerFactory(sticker.type, '2.4rem')}</span>
                    </p>
                    <LetterDescription>
                        <div className="desc-wrapper">
                            <span className="name">To. {profile?.name}</span>
                            <span className="email">{profile?.email}</span>
                            <span className="option">발송 기준</span>
                            <span className="option-text">{optionText}</span>
                        </div>
                        <div className="img-square">이미지 테스트</div>
                    </LetterDescription>
                </DescriptionWrapper>
                <Divider />
                <ResponderWrapper>
                    <p className="create-date">{getCurrentDate()}</p>
                    <p className="letter-responder">{profile?.name}</p>
                </ResponderWrapper>
            </ResultWrapper>
            <ConfirmButton>편지 기다리기</ConfirmButton>
        </Container>
    )
}

const Container = styled.div`
    ${tw`tw-bg-beige-300 tw-flex tw-flex-col`}
    height: calc(100vh - 5.2rem);
    margin: 0 auto;
    h3 {
        ${tw`tw-font-ohsquare-air tw-text-primary-green-500`}
        text-align: center;
        font-size: 2rem;
        line-height: 3.2rem;
        margin-top: 8.8rem;
        margin-bottom: 12.3rem;
    }
`

const ResultWrapper = styled.section`
    ${tw`tw-bg-grey-000 tw-flex tw-flex-col tw-justify-between`}
    width: 100%;
    max-width: 42rem;
    max-height: calc(100vh - 23.6rem);
    min-height: 50%;
    position: fixed;
    bottom: 5.2rem;
    border-radius: 1rem 1rem 0 0;
    padding: 4rem 2.4rem 3.8rem;
`

const DescriptionWrapper = styled.article`
    .title-wrapper {
        display: inline-flex;
        width: 100%;
    }
    .title {
        ${tw`tw-text-grey-800 tw-truncate`}
        font-size: 1.6rem;
        line-height: 2.5rem;
        margin-right: 1.2rem;
        max-width: calc(100% - 2.4rem);
    }
    .title-sticker {
        flex-shrink: 0;
    }
`
const LetterDescription = styled.div`
    ${tw`tw-flex tw-justify-between`}
    letter-spacing: -0.015em;
    margin-top: 3.4rem;
    margin-bottom: 3.2rem;
    .desc-wrapper {
        ${tw`tw-flex-col`}
        display: inherit;
        font-size: 1.4rem;
        line-height: 2.2rem;

        .name {
            ${tw`tw-font-ohsquare-air`}
        }
        .email {
            ${tw`tw-font-nanumBarunGothic tw-text-grey-600`}
            margin-top: 0.4rem;
        }
        .option {
            ${tw`tw-font-ohsquare-air tw-text-grey-600`}
            font-size: 1.4rem;
            line-height: 2.2rem;
            margin-top: 1.6rem;
        }
        .option-text {
            ${tw`tw-font-ohsquare-air tw-text-grey-800`}
            font-size: 1.4rem;
            line-height: 2.2rem;
        }
    }
`

const Divider = styled.hr`
    ${tw`tw-border-grey-200`}
    border-top-width: 0.3rem;
    margin-bottom: 3.2rem;
`

const ResponderWrapper = styled.article`
    .create-date {
        ${tw`tw-font-ohsquare-air tw-text-grey-600`}
        text-align: right;
        font-size: 1.4rem;
        line-height: 2.2rem;
    }
    .letter-responder {
        ${tw`tw-font-ohsquare-air tw-text-grey-800`}
        text-align: right;
        font-size: 1.4rem;
        line-height: 2.2rem;
    }
`

const ConfirmButton = styled.button`
    ${tw`tw-fixed tw-bg-primary-green-500 tw-bottom-0 tw-text-grey-000 tw-font-bold`}
    max-width: 42rem;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    line-height: 2.5rem;
`

export default observer(Finish)
