<h1>DevMarket-Front-End</h1>

<h2>Como é a aplicação?</h2>

<p>Projeto que cria, mostra, edita e remove produtos, um CRUD com upload de imagem</p>

<h2>Tecnologias e ferramentas</h2>

<ul>
  <li>ReactJS</li>
  <li>TypeScript</li>
  <li>react-icons</li>
</ul>

<h2>Instalação e uso</h2>

<h3>Requisitos</h3>
<p>No seu computador, com sistema operacional windows, tem que ter o <a href="https://nodejs.org/pt-br/download/">Node</a> instalado.</p>

<p>Cria uma pasta onde irá baixar os códigos. Após criar a pasta siga os passos abaixo:</p>

```
# No terminal da pasta criada, copie o repositório com o seguinte comando
$ git clone https://github.com/bruno-nakahara/DevMarket-Front-End.git

# Após clonar o repositório, pelo terminal, entra na pasta usando o comando
$ cd DevMarket-Front-End

# Instale as dependências utilizando o comando 
$ yarn install

# Se tem todas as dependências, então rode a aplicação com
$ yarn start

# e pronto! Front-end da Aplicação rodando.

```
<p>Caso necessita mudar a porta 80 e host "http://127.0.0.1:80" que o react utiliza por default  para fazer fetch, abra a pasta "src/contexts/" no arquivo "ProductsContext.tsx" muda a url do fetch</p>
