const { select, input, checkbox } = require('@inquirer/prompts')

let meta ={
    value:"Beber Agua",
    checked: false,
}
let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message:"Digite a meta"})
    
    if (meta.length == 0){
        console.log("Por favor, digite a meta");
        return 
    }

    metas.push(
        { value: meta, chacked: false }
    )
}

const listarMetas = async () => {
   const respostas = await checkbox ({
   message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
   choices: [...metas],
   instructions: false,
})
 if(respostas.length == 0){
    console.log("Nenhuma meta selecionada");
    return
 }


 metas.forEach((m) => {
    m.checked = false
 })

 respostas.forEach((resposta) => {
    const meta = metas.find((m) => { //find = procurar, ele vai verificar se a resposta é igual a meta
        return m.value == resposta 
    })
    meta.checked = true //marca a resposta como verdadeiro
 })
console.log("Metas marcadas como concluidas");

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if (realizadas.length == 0){
        console.log("Não existem metas realizadas");
        return 
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas] //salvando um novo array

    })
    
}

const start = async () =>{

    while (true) {
        
  const opcao = await select ({ //awit = aguardar (toda vez que tem await, tem que dizer que é async)
    message : "Menu >",
    choices: [ //opcoes de escolhas
        {
            name: "Cadastrar meta",
            value: "cadastrar"
        },
        {
            name: "Listar Metas",
            value: "listar"
        },
        {
        name: "Metas Realizadas",
        value: "realizadas"
        },
        {
            name: "Sair",
            value: "sair"
        }
    ]

  })


   switch (opcao) {
    case "cadastrar":
        await cadastrarMeta()
        console.log(metas);
        break;
    case "listar":
        await listarMetas()
        break;
    case "realizadas":
        await metasRealizadas()
        break;
    case "abertas":
        await metasAbertas()
        break;
    case "sair":
        console.log("Até a proxima");
        
        return
    default:
        break;
   }
}
}
start();