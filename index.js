const { select } = require('@inquirer/prompts')

const start = async () =>{

    while (true) {
        
    
  const opcao = await select ({ //awit = aguardar
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
            name: "Sair",
            value: "sair"
        }
    ]

  })


   switch (opcao) {
    case "cadastrar":
        console.log("Vamos Cadastrar")
        break;
    case "listar":
        console.log("Vamos listar")
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