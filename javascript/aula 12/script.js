let pessoas = [
    {
      nome:"Mateus",
      idade:27
    },
    {
      nome:"Marcos",
      idade:26
    },
    {
      nome:"Maria",
      idade: 32
    },
    {
      nome:"João",
      idade:35
    }
  ]
  
  pessoas.forEach((p)=>{
    console.log(`nome:${p.nome}` )
    console.log(`idade:${p.idade}` )
    console.log("-------------------")
  })
  
  let pessoasFiltradas  = pessoas.filter((p)=>{
    return (p.nome[1]=="a")
  })
  
  console.log(pessoasFiltradas)