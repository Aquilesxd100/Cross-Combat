import checkDisneyIMG from "../../helpers/checkDisneyIMG";
import comprimirNome from "../../helpers/comprimirNome";
import setAtributos from "../../helpers/setAtributos";
import setTrunfo from "../../helpers/setTrunfo";
import { CardStatusType, CardType } from "../../types/types";

async function gerarCardDisney(nomesCardsRegistrados : Array<string>, tipoCard : string) {
    let cardGerado : CardType | undefined = undefined;
    while(!cardGerado) {
        const idAleatorio : number = Math.trunc(Math.random() * 7438);
        let checkIMG : any = false;

        await fetch(`https://superheroapi.com/api/2613840595440470/100`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
            })
            .then((res) => res.json())
            .then(data => console.log(data))

        await fetch(`https://api.disneyapi.dev/characters/${idAleatorio}`)
            .then((res) => res.json())
            .then(async function(data) {
                checkIMG = await checkDisneyIMG(data.imageUrl);
                data.name = data.name.length > 18 ? comprimirNome(data.name) : data.name;
                return data;
            })
            .then((data) => {
                console.log(data);
                if(data.imageUrl !== undefined && checkIMG && !nomesCardsRegistrados.some(nome => nome === data.name)) {
                    const trunfoStatus : boolean = setTrunfo();
                    const statusGerados : CardStatusType = setAtributos(trunfoStatus); 
                    cardGerado = {
                        id: crypto.randomUUID(),
                        escondido: tipoCard === "inimigo" ? true : false,
                        morto: false,
                        trunfo: trunfoStatus,
                        universo: "Disney",
                        nome: data.name,
                        imagem: data.imageUrl,
                        forca: statusGerados.forca,
                        destreza: statusGerados.destreza,
                        inteligencia: statusGerados.inteligencia
                    }
                }
            })
            .catch((error) => console.log(error))
    };
    return cardGerado;
};
export default gerarCardDisney;