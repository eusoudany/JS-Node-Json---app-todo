const { select, input, checkbox } = require('@inquirer/prompts');

const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas";

let metas 

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8");
        metas = JSON.parse(dados)
    }
    catch (erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


const cadastrarMeta = async () => {
    const meta = await input({message:"Digite a meta"})
    
    if (meta.length == 0){
        mensagem = "Por favor, digite a meta";
        return 
    }

    metas.push(
        { value: meta, checked: false }
    )

    mensagem = "Meta cadastrada com sucesso!"
    
}

const listarMetas = async () => {
   const respostas = await checkbox ({
   message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
   choices: [...metas],
   instructions: false,
})

metas.forEach((m) => {
    m.checked = false
 })

 if(respostas.length == 0){
    mensagem = "Nenhuma meta selecionada";
    return
 }


 respostas.forEach((resposta) => {
    const meta = metas.find((m) => { //find = procurar, ele vai verificar se a resposta é igual a meta
        return m.value == resposta 
    })
    meta.checked = true //marca a resposta como verdadeiro
 })
mensagem = "Metas marcadas como concluidas";

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    })
    if (realizadas.length == 0){
        mensagem = "Não existem metas realizadas";
        return;
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas]//salvando um novo array

    })
    
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true;
    })

    if (abertas.length == 0){
        mensagem = "Não existem metas abertas! :"
        return
    }
    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
    
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itemsADeletar = await checkbox({
        message: "Selecione item para deletar:",
        choices: [...metasDesmarcadas],
        instructions: false,
    });

    if (itemsADeletar.length == 0){
        mensagem = "Nenhum item para deletar!";
        return;
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value !== item;
        });
    });
    mensagem = "metas deletadas com sucesso!";
    
}

const mostrarMensagem = () => {
    console.clear();
    
    if(mensagem != ""){
        console.log(mensagem);
        console.log(""); //quebra de linha
        mensagem = ""
        
    }
}

const start = async () =>{
    await carregarMetas()

    while (true) {
        mostrarMensagem()
        await salvarMetas()
        
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
            name: "Metas Abertas",
            value: "abertas"
        },
        {
            name: "Deletar Metas",
            value: "deletar"
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
    case "deletar":
        await deletarMetas()
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