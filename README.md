
# 📊 Simulador de Investimentos em FIIs (Excel)

Este projeto foi desenvolvido como parte prática dos estudos de análise financeira e automação com IA, com foco na simulação de aportes mensais em Fundos de Investimento Imobiliário (FIIs) utilizando o Excel.

## 🎯 Objetivo

Facilitar o planejamento financeiro ao permitir simulações simples e rápidas de como aportes mensais em FIIs podem crescer ao longo do tempo, considerando taxas de rendimento realistas.

## 🛠 Funcionalidades

✔ Campos editáveis destacados para fácil personalização:  
- Valor do investimento mensal  
- Tempo de investimento em anos  
- Taxa de rendimento mensal (%)  

✔ Cálculos Automáticos:  
- Patrimônio acumulado ao final do período (função VF)  
- Dividendos mensais estimados (1% do patrimônio)  

✔ Tabela de Cenários pronta com projeções para: 2, 5, 10, 20 e 30 anos  
✔ Formatação visual profissional (bordas, moeda, cores suaves)  

## 📁 Estrutura do Repositório

```
simulador-investimentos-fii-excel/
├── README.md
└── fiisimulator.js
```

## 🚀 Como Usar

1. Clone o repositório:  
   `git clone https://github.com/MRCahu/simulador-investimentos-fii-excel.git`  

2. Preencha os campos destacados em amarelo com seus valores desejados.

3. Veja os resultados automáticos e as projeções dos cenários.

## ▶️ Executar o componente React

Para visualizar o componente `fiisimulator.js` em funcionamento fora do Excel, é
possível utilizar o [Vite](https://vitejs.dev/) para subir uma pequena aplicaçã
o React. Um exemplo de `package.json` é mostrado abaixo:

```json
{
  "name": "fii-simulator",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.4.3",
    "vite": "^4.0.0"
  }
}
```

Depois de salvar o arquivo acima, instale as dependências com:

```bash
npm install
```

Em seguida crie um ponto de entrada como `index.jsx` importando `FIISimulator` e
rode:

```bash
npm run dev
```

O Vite irá iniciar o servidor de desenvolvimento e o componente poderá ser visto no navegador.

## 💡 Tecnologias e Aprendizados

- Excel para simulação financeira  
- Fórmulas financeiras como VF (Valor Futuro)  
- Boas práticas de estruturação de repositórios no GitHub  
- Documentação clara e acessível  

## 🤝 Contribuições

Sinta-se à vontade para sugerir melhorias ou abrir issues!  

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.
