
const corFundoCartao = document.querySelector("#corFundoCartao")
const mensagem = document.querySelector("#mensagem")
const corTexto = document.querySelector("#corTexto")
const tamanho = document.querySelector("#tamanho")
const imagem = document.querySelector("#imagem")

const cartao = document.querySelector("#cartao")
const textoCartao = document.querySelector("#textoCartao")
const cartaoImagem = document.querySelector("#cartaoImagem")
const emoji = document.querySelector("#emoji")
const emojiCartao = document.querySelector("#emojiCartao")



emoji.addEventListener("change", function(){

emojiCartao.innerText = emoji.value

})

corFundoCartao.addEventListener("change", function(){

if(corFundoCartao.value == "aniversario"){

cartao.style.background = "#ffe4b5"

}

if(corFundoCartao.value == "natal"){

cartao.style.background = "#ff4d4d"

}

if(corFundoCartao.value == "pascoa"){

cartao.style.background = "#d8b4f8"

}

})

mensagem.addEventListener("input", function(){

textoCartao.innerText = mensagem.value

})

corTexto.addEventListener("input", function(){

textoCartao.style.color = corTexto.value

})

tamanho.addEventListener("input", function(){

textoCartao.style.fontSize = tamanho.value + "px"

})

imagem.addEventListener("input", function(){

cartaoImagem.src = imagem.value

}) 


