import { useNavigate } from "react-router-dom"
import { RootState, useStoreDispatch } from "../../redux/store/configureStore";
import IMGtituloMenu from "../../resources/images/titulo-fundo-maior.png";
import IMGbotaoVoltar from "../../resources/images/botao-voltar.png";
import IMGCardDisney from "../../resources/images/disney.png";
import IMGCardAnimes from "../../resources/images/animes.png";
import IMGCardHerois from "../../resources/images/herois.png";
import IMGCardMisturado from "../../resources/images/misturado.png";
import { setPlayerCardType } from "../../redux/slices/playerCardTypeSlice";
import { deleteSaveGame } from "../../redux/slices/saveGameSlice";
import { setFakeCardsState, setTimeInimigo, setTimeJogador, setUserReadyState } from "../../redux/slices/setCardsSlice";
import { setPontuacao, setCristais } from "../../redux/slices/pontuacaoSlice";
import { useEffect, useState } from "react";
import { activateEffect, changeMusic } from "../../redux/slices/soundSlice";
import { useSelector } from "react-redux";
import { setPendingStartAnimation } from "../../redux/slices/extraAnimationsSlice";
import { clearAllModalStates } from "../../redux/slices/modalSlice";

function TelaSelecao() {
    const dispatch = useStoreDispatch();
    const navigate = useNavigate();
    const { musicType } = useSelector((state : RootState) => state.sounds)
    const [hoverSoundEffectsON, setHoverSoundEffectsON] = useState(false);
    const [checkUserResolution, setCheckUserResolution] = useState(0);

    useEffect(() => {
        const larguraUsuario : number = window.innerWidth;
        const alturaUsuario : number = window.innerHeight;
        if (alturaUsuario * 1.23 > larguraUsuario || alturaUsuario <= 450) {
            navigate('/erro');
        };

        const handleResize = () => {
            setCheckUserResolution(Math.random());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [checkUserResolution]);

    useEffect(() => {
        dispatch(setPendingStartAnimation(true));
        dispatch(setUserReadyState(false));
        dispatch(clearAllModalStates());
        dispatch(setTimeJogador([]));
        dispatch(setTimeInimigo([]));
        dispatch(setFakeCardsState(false));
        setTimeout(() => { setHoverSoundEffectsON(true) }, 50)
    }, [])

    const linkHandler = (link : string) => {
        navigate(link);
    };

    const playHoverSoundEffect = (soundType : string) => {
        if (hoverSoundEffectsON) {
            dispatch(activateEffect(soundType));
        };
    };

    const selecaoHandler = (cardType : string) => {
        dispatch(activateEffect('botaoSelecaoUniverso'));
        dispatch(setPontuacao(0));
        dispatch(setCristais(0));
        dispatch(setTimeJogador([]));
        dispatch(setTimeInimigo([]));
        dispatch(setPlayerCardType(cardType));
        dispatch(deleteSaveGame());
        linkHandler('/combate');
    };

    useEffect(() => {
        if (musicType !== 'selecao') {
            dispatch(changeMusic('selecao'));
        }
    }, [musicType])

    return (
        <div className="h-full w-full px-2.5 pb-2.5 flex flex-col">
            <header className="h-[35%] w-full flex justify-end items-center relative">
                <div className="px-[14vw] py-[3vw] bg-100%" style={{ backgroundImage : `url(${IMGtituloMenu})`}}>
                    <h3 className="font-light text-[calc(2vw+16px)] text-[#FFA64D] off-user-selection">De qual universo<br />será o seu time?</h3>
                </div>
                <button onClick={(() => { linkHandler('/telainicial'); dispatch(activateEffect('botaoPadrao')) })} className="h-[10vw] w-[10vw] bg-100% mr-[15vw] ml-[2vw] brightness-[0.85] hover:brightness-105" style={{backgroundImage: `url(${IMGbotaoVoltar})`}}></button>
            </header>
            <main className="h-[65%] w-full flex justify-center items-center">
                <div onClick={(() => { selecaoHandler('disney') })} onMouseEnter={(() => { playHoverSoundEffect('selecaoHover') })} className="w-[23vw] min-h-[60vh] h-[56vh] mx-1.5 bg-100% relative brightness-[0.7] hover:brightness-[1] hover:scale-[1.02] cursor-pointer" style={{backgroundImage: `url(${IMGCardDisney})`}}>
                    <h4 className="text-[#99B2FF] text-cardsSEL off-user-selection">Disney</h4>
                </div>
                <div onClick={(() => { selecaoHandler('animes') })} onMouseEnter={(() => { playHoverSoundEffect('selecaoHover') })} className="w-[23vw] min-h-[60vh] h-[56vh] mx-1.5 bg-100% relative brightness-[0.7] hover:brightness-[1] hover:scale-[1.02] cursor-pointer" style={{backgroundImage: `url(${IMGCardAnimes})`}}>
                    <h4 className="text-cardsSEL text-[#FFFFFF] off-user-selection">Animes</h4>
                </div>
                <div onClick={(() => { selecaoHandler('herois') })} onMouseEnter={(() => { playHoverSoundEffect('selecaoHover') })} className="w-[23vw] min-h-[60vh] h-[56vh] mx-1.5 bg-100% relative brightness-[0.7] hover:brightness-[1] hover:scale-[1.02] cursor-pointer" style={{backgroundImage: `url(${IMGCardHerois})`}}>
                    <h4 className="text-cardsSEL heroi-gradiente off-user-selection">Heróis</h4>
                </div>
                <div onClick={(() => { selecaoHandler('aleatorio') })} onMouseEnter={(() => { playHoverSoundEffect('selecaoHover') })} className="w-[23vw] min-h-[60vh] h-[56vh] mx-1.5 bg-100% relative brightness-[0.7] hover:brightness-[1] hover:scale-[1.02] cursor-pointer" style={{backgroundImage: `url(${IMGCardMisturado})`}}>
                    <h4 className="text-cardsSEL text-[#D6A96B] off-user-selection">Misturado</h4>
                </div>
            </main>
        </div>
    )
};
export default TelaSelecao;