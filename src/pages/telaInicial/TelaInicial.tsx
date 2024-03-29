import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IMGLogo from "../../resources/images/logo.png";
import botaoPadrao from "../../resources/images/botao-padrao.png";
import { RootState, useStoreDispatch } from "../../redux/store/configureStore";
import { setFakeCardsState, setTimeInimigo, setTimeJogador, setUserReadyState } from "../../redux/slices/setCardsSlice";
import { useEffect, useRef, useState } from "react";
import { activateEffect, changeMusic } from "../../redux/slices/soundSlice";
import { setPendingStartAnimation } from "../../redux/slices/extraAnimationsSlice";
import { clearAllModalStates } from "../../redux/slices/modalSlice";

function TelaInicial() {
    const navigate = useNavigate();
    const dispatch = useStoreDispatch();
    const botaoContinuar : any = useRef();
    const { saveGame } = useSelector((state : RootState) => state.saveGame);
    const { musicType } = useSelector((state : RootState) => state.sounds);
    const [checkUserResolution, setCheckUserResolution] = useState(0);

    useEffect(() => {
        dispatch(setPendingStartAnimation(true));
        dispatch(setUserReadyState(false));
        dispatch(clearAllModalStates());
        dispatch(setTimeJogador([]));
        dispatch(setTimeInimigo([]));
        dispatch(setFakeCardsState(false));
    }, []);

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

    const loadSaveGameHandler = () => {
        if (saveGame) {
            dispatch(activateEffect('botaoPadrao'))
            dispatch(setTimeJogador([]));
            dispatch(setTimeInimigo([]));
            navigate(`/combate`);
        } else {
            dispatch(activateEffect('botaoNegativo'))
        }
    };

    useEffect(() => {
        if (musicType !== 'selecao') {
            dispatch(changeMusic('selecao'));
        }
    }, [musicType])

    useEffect(() => {
        if (!saveGame) {
            botaoContinuar.current.classList.add("pretoEBranco");
            botaoContinuar.current.classList.add("cursor-padrao");
            botaoContinuar.current.classList.remove("hover:brightness-110");
            botaoContinuar.current.classList.remove("brightness-[0.85]");
        };
    }, [saveGame])

    return (
        <div className="h-full w-full px-2.5 pb-2.5 flex flex-col">
            <header className="h-3/6 w-full flex justify-center relative">
                <img src={IMGLogo} className="h-6/7 -top-4 relative off-user-selection" alt="logo-cross-combat"/>
            </header>
            <main className="h-3/6 w-full flex justify-start items-center flex-col">
                <button className="min-w-[35%] w-80 min-h-[27%] h-20 bg-100% bg-no-repeat my-2 text-[3.7vw] font-bold brightness-[0.85] hover:brightness-110 off-user-selection" style={{backgroundImage: `url(${botaoPadrao})`}} onClick={(() => { navigate(`/selecao`); dispatch(activateEffect('botaoPadrao')) })}><h3 className="gradiente-laranja">NOVO JOGO</h3></button>
                <button className="min-w-[35%] w-80 min-h-[27%] h-20 bg-100% bg-no-repeat my-2 text-[3.7vw] font-bold brightness-[0.85] hover:brightness-110 off-user-selection" style={{backgroundImage: `url(${botaoPadrao})`}} onClick={(() => { loadSaveGameHandler() })} ref={botaoContinuar}><h3 className="gradiente-laranja">CONTINUAR</h3></button>
            </main>
        </div>
    );
}

export default TelaInicial;
