import {promises as fs} from 'fs' 

//=============================================================================//


async function readData(){
  // Realiza a leitura do arquivo JSON  

  try{ // Usando TRY/CATCH para saber se a leitura do arquivo esta correta
    const data = JSON.parse(await fs.readFile('./estados-cidades-atividade.json'))
    return data
  }
  catch(err){
    console.log('Falha na leitura do arquivo ->estados-cidades-atividade.json<-')
  }

}


//=============================================================================//


async function writeStates(){
  // Lista todos os estados contidos dentro do arquivo

  const states = await readData() // Leitura do JSON e armazendo 

  const write = states.map((state) => { // Fazendo um MAP para listar somente o nome dos estados
    return {
      estado: state.nome // Retorna somente os estados com os seus respectivos nomes
    }
  })

  // console.log(write)  // Mostra os estados que foram coletados
  return write // Retorna os dados para serem utilizados abaixo
}

// writeStates()


//=============================================================================//


async function doStartsWith(){
  // Lista todos os estados que começam com a letra A

  const onlyStates = await writeStates() // Reutilizei para nao vir junto com as cidades 

  const totalStates = onlyStates.reduce((valueSum) => { // Algoritmo fazendo um LEN para objetos de forma generica
    return valueSum += 1
  }, 0)

  for(let i = 0; i <= totalStates - 1 ; i++ ){  // Foi utilizado o -1 para nao estourar o limite do objeto

    if (onlyStates[i].estado.startsWith('A')){  // Fazendo verificação para mostrar no console
      console.log(onlyStates[i])  // Pode fazer alterações para retornar esse valor e reciclar
    }
  }

}

// doStartsWith()


//=============================================================================//


async function doSort(){
  // Ordena os estados de acordo com o tamanho das palavras

  const states = await writeStates() // Reutilizei para nao vir junto com as cidades

  const ordenados = states.sort((a, b) =>{
    return a.estado.length - b.estado.length    // ordena pelo tamanho dos nomes menor para maior
    })

  console.log(ordenados) // Mostra no terminal
}

// doSort()


//=============================================================================//


async function citiesSP(){
  const states = await readData()

  const citySP = states.find((state) =>{   // Procura pelo estado 'São Paulo' e coleta os seus dados
    return state.nome === 'São Paulo' 
  })

  const cities = citySP.cidades // Coloca as cidades dentro de um array

  console.log(cities)
}

// citiesSP()


//=============================================================================//


async function citiesMA(){
  // Lista as cidades de maranhão que possuem mais de 6 letras

  const states = await readData()

  const cityMA = states.find((state) =>{   // Procura pelo estado 'Maranhão' e coleta os seus dados
    return state.nome === 'Maranhão' 
  })
  
  const cities = cityMA.cidades // Coloca em um vetor as cidades de Maranhão

  const citiesMA6 = cities.filter((city) =>{ // Filtra as cidades que tem mais de 6 letras
    return city.length > 6
  })

  const ordenados = citiesMA6.sort((a, b) =>{
    return a.length - b.length    // ordena pelo tamanho dos nomes  para ficar vizualmente melhor
  })

  console.log(ordenados)
}

// citiesMA()


//=============================================================================//


async function countCities(){
  // Informa o nome dos estados e a quantidade de cidades que eles possuem

  const states = await readData()

  const stateCities = states.map(
    (state) =>{ 
        return{ 
        estado: state.nome, // Coleta o nome do estado
        cidades: `${state.cidades.length}` // Calcula a quantidade de cidades 
        }
      }) // OBS: devolve em formato de objeto

      console.log(stateCities)

}

// countCities()


//=============================================================================//


async function citiesBA(){
  // Lista as cidades da bahia com menos de 5 letras

  const states = await readData()

  const cityBA = states.find((state) =>{   // Procura pelo estado 'Bahia' e coleta os seus dados
    return state.nome === 'Bahia' 
  })
  
  const cities = cityBA.cidades // Coloca em um vetor as cidades de Maranhão

  const citiesBA5 = cities.filter((city) =>{ // Filtra as cidades que tem mais de 6 letras
    return city.length < 5
  })

  const ordenados = citiesBA5.sort((a, b) =>{
    return a.length - b.length    // ordena pelo tamanho dos nomes  para ficar vizualmente melhor
  })

  console.log(ordenados)

}

// citiesBA()


//=============================================================================//