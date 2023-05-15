import setAtributos from "../../helpers/setAtributos";
import setTrunfo from "../../helpers/setTrunfo";
import { CardStatusType, CardType } from "../../types/types";

async function gerarCardHeroi(qntCardsAGerar : number, tipoCard : string, nomesCardsRegistrados : Array<string>) {
    const infosAPI : any = await fetch(`https://cross-combat-api.onrender.com/gerarHerois/${qntCardsAGerar}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            nomesAtuais: nomesCardsRegistrados
        })
    })
    .then((res) => res.json())
    .then((data : Array<any>) => data)
    .catch((error) => console.log(error));
    if (!infosAPI) {
        return;
    };
    console.log(infosAPI)
    const cardsGerados : Array<CardType> = infosAPI.map((cardBruto : any) => {
        const trunfoStatus : boolean = setTrunfo();
        const statusGerados : CardStatusType = setAtributos(trunfoStatus); 
        return({
            id: crypto.randomUUID(),
            idAPI: cardBruto.id,
            escondido: tipoCard === "inimigo" ? true : false,
            morto: false,
            trunfo: trunfoStatus,
            universo: "Heróis",
            nome: cardBruto.name,
            imagem: cardBruto.image.url,
            forca: statusGerados.forca,
            destreza: statusGerados.destreza,
            inteligencia: statusGerados.inteligencia
        });
    });
    return cardsGerados;
};
export default gerarCardHeroi;