import { createSlice } from "@reduxjs/toolkit";
import { CardStatusType, CardType, PropInfoCardCombateType, SetCardsStateType } from "../../types/types";
import setAtributos from "../../helpers/setAtributos";
const initialState : SetCardsStateType = {
    timeInimigo: [],
    timeJogador: [],
    preLoadTimeInimigo: [],
    preLoadTimeJogador: [],
    userReadyState: false,
    fakeCardsActive: false
}
export const setCardsSlice = createSlice({
    name: "setCards",
    initialState,
    reducers: {
        setTimeJogador: (state, action) => {
            state.timeJogador = action.payload;
        },
        setTimeInimigo: (state, action) => {
            state.timeInimigo = action.payload;
        },
        revelarInimigo: (state, action) => {
            const indexInimigo = state.timeInimigo.findIndex((inimigo) => inimigo.id === action.payload)
            state.timeInimigo[indexInimigo].escondido = false;
        },
        resolverConflito: (state, action) => {
            const atacante : PropInfoCardCombateType = action.payload.atacante;
            const defensor : PropInfoCardCombateType = action.payload.defensor;
            if(!atacante.valorAtributo || !defensor.valorAtributo)return;
            const indexInimigoDerrotado = state.timeInimigo.findIndex((inimigo) => inimigo.id === defensor.idCard);
            const indexJogadorDerrotado = state.timeJogador.findIndex((jogador) => jogador.id === atacante.idCard);
            if(atacante.valorAtributo > defensor.valorAtributo) {
                state.timeInimigo[indexInimigoDerrotado].morto = true;
            }
            else if(atacante.valorAtributo === defensor.valorAtributo) {
                state.timeInimigo[indexInimigoDerrotado].morto = true;
                state.timeJogador[indexJogadorDerrotado].morto = true;
            }
            else {
                state.timeJogador[indexJogadorDerrotado].morto = true;
            }
        },
        upgradeTrunfo: (state, action) => {
            const cardToUpgrade : CardType | undefined = state.timeJogador.find((card) => card.id === action.payload);
            if (cardToUpgrade) {
                const novosStatus : CardStatusType = setAtributos(true);
                cardToUpgrade.trunfo = true;
                cardToUpgrade.destreza = novosStatus.destreza;
                cardToUpgrade.forca = novosStatus.forca;
                cardToUpgrade.inteligencia = novosStatus.inteligencia;
            };
        },
        setPreLoadTimeJogador: (state, action) => {
            state.preLoadTimeJogador = action.payload;
        },
        setPreLoadTimeInimigo: (state, action) => {
            state.preLoadTimeInimigo = action.payload;
        },
        setUserReadyState: (state, action) => {
            state.userReadyState = action.payload;
        },
        setFakeCardsState: (state, action) => {
            state.fakeCardsActive = action.payload;
        }
    }
});
export const { setTimeJogador, setTimeInimigo, resolverConflito, revelarInimigo, setPreLoadTimeJogador, setPreLoadTimeInimigo, setUserReadyState, setFakeCardsState, upgradeTrunfo } = setCardsSlice.actions;
export default setCardsSlice.reducer;