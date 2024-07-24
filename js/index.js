let idAtividade = 0;
let quadroToDo = document.getElementById('quadroToDo');
let quadroInProgress = document.getElementById('quadroInProgress');
let quadroDone = document.getElementById('quadroDone');
var requiredTitulo = document.getElementById('requiredTitulo');
var requiredData = document.getElementById('requiredData');
var requiredDescricao = document.getElementById('requiredDescricao');

function exibirFormularioNovaAtividade() {

    var formularioNovaAtividade = document.getElementById("formularioNovaAtividade"); 
    formularioNovaAtividade.classList.remove('oculto');
}

function cancelarNovaAtividade() {
    var inputTituloAtividade = document.getElementById('tituloAtividade');
    var inputDataAtividade = document.getElementById('dataAtividade');
    var inputDescricaoAtividade = document.getElementById('descricaoAtividade');

    inputTituloAtividade.value = "";
    inputDataAtividade.value = "";
    inputDescricaoAtividade.value = "";

    requiredDescricao.classList.add('oculto');
    requiredData.classList.add('oculto');
    requiredTitulo.classList.add('oculto');

    formularioNovaAtividade.classList.add('oculto');
}

function adicionarNovaAtividade() {
    var formularioNovaAtividade = document.getElementById("formularioNovaAtividade"); 

    var inputTituloAtividade = document.getElementById('tituloAtividade');
    var inputDataAtividade = document.getElementById('dataAtividade');
    var inputDescricaoAtividade = document.getElementById('descricaoAtividade');

    var valorInputTituloAtividade = inputTituloAtividade.value;
    var valorInputDataAtividade = inputDataAtividade.value;
    var valorInputDescricaoAtividade = inputDescricaoAtividade.value;

    var inputTituloOk = (valorInputTituloAtividade !== "") && (valorInputTituloAtividade !== null) && (valorInputTituloAtividade !== undefined);
    var inputDataOk = (valorInputDataAtividade !== "") && (valorInputDataAtividade !== null) && (valorInputDataAtividade !== undefined);
    var inputDescricaoOk = (valorInputDescricaoAtividade !== "") && (valorInputDescricaoAtividade !== null) && (valorInputDescricaoAtividade !== undefined);

    
    if(inputTituloOk && inputDataOk && inputDescricaoOk){
        ++idAtividade;

        let novoItem = `<div id="${idAtividade}" class="conteudo conteudoToDo">
                    <div class="headerConteudo">
                        <div class="tituloConteudo">
                            ${valorInputTituloAtividade}
                        </div>
                        <button onclick="deletarItem(${idAtividade})" class="bnt-delete" style="font-size: 20px;"><i class="mdi mdi-delete-outline"></i></button>
                    </div>
                    
                    <div class="descricaoConteudo">
                        ${valorInputDescricaoAtividade}
                    </div>
                    <div class="dataConteudo">
                        ${valorInputDataAtividade}
                    </div>

                    <div style="display: flex; justify-content: end;" class="botaoConteudo" id="botaoConteudo_${idAtividade}">
                        <button class="bnt-generico" onclick="avancarAtividade(${idAtividade})">Avançar <i class="mdi mdi-arrow-right"></i></button>
                    </div>
                </div>`


        quadroToDo.innerHTML += novoItem;
        
        inputTituloAtividade.value = "";
        inputDataAtividade.value = "";
        inputDescricaoAtividade.value = "";


        requiredDescricao.classList.add('oculto');
        requiredData.classList.add('oculto');
        requiredTitulo.classList.add('oculto');
        formularioNovaAtividade.classList.add('oculto');

    }else{
        if(!inputTituloOk) {
            requiredTitulo.classList.remove('oculto');
        }else{
            requiredTitulo.classList.add('oculto');
        }
    
        if(!inputDataOk) {
            requiredData.classList.remove('oculto');
        }else{
            requiredData.classList.add('oculto');
        }
    
        if(!inputDescricaoOk) {
            requiredDescricao.classList.remove('oculto');
        }else{
            requiredDescricao.classList.add('oculto');
        }
    }

}

function avancarAtividade(id){

    var item = document.getElementById(id);

    var classe = item.getAttribute('class');

    let novoItemAvancar = item;

    var divBotaoConteudo = document.getElementById('botaoConteudo_'+id);

    if(classe == "conteudo conteudoToDo"){
        
        novoItemAvancar.classList.remove('conteudoToDo');
        novoItemAvancar.classList.add('conteudoInProgress');
        divBotaoConteudo.innerHTML = `<button class="bnt-generico" onclick="voltarAtividade(${id})"><i class="mdi mdi-arrow-left"></i> Voltar</button>
                        <button class="bnt-generico" onclick="avancarAtividade(${id})">Avançar <i class="mdi mdi-arrow-right"></i></button>`
        divBotaoConteudo.style = "";
        quadroInProgress.innerHTML += novoItemAvancar.outerHTML;

        item.remove();
    }else if(classe == "conteudo conteudoInProgress"){
        novoItemAvancar.classList.remove('conteudoInProgress');
        novoItemAvancar.classList.add('conteudoDone');
        divBotaoConteudo.innerHTML = `<button class="bnt-generico" onclick="voltarAtividade(${id})"><i class="mdi mdi-arrow-left"></i> Voltar</button>`
        divBotaoConteudo.setAttribute("style", "display: flex; justify-content: baseline;");
        quadroDone.innerHTML += novoItemAvancar.outerHTML;

        item.remove();
    }



}

function voltarAtividade(id){

    var item = document.getElementById(id);

    var classe = item.getAttribute('class');

    let novoItemVoltar = item;

    var divBotaoConteudo = document.getElementById('botaoConteudo_'+id);

    if(classe == "conteudo conteudoDone"){
        
        novoItemVoltar.classList.remove('conteudoDone');
        novoItemVoltar.classList.add('conteudoInProgress');
        divBotaoConteudo.innerHTML = `<button class="bnt-generico" onclick="voltarAtividade(${id})"><i class="mdi mdi-arrow-left"></i> Voltar</button>
                        <button class="bnt-generico" onclick="avancarAtividade(${id})">Avançar <i class="mdi mdi-arrow-right"></i></button>`
        divBotaoConteudo.style = "";
        quadroInProgress.innerHTML += novoItemVoltar.outerHTML;

        item.remove();
    }else if(classe == "conteudo conteudoInProgress"){
        novoItemVoltar.classList.remove('conteudoInProgress');
        novoItemVoltar.classList.add('conteudoToDo');
        divBotaoConteudo.innerHTML = `<button class="bnt-generico" onclick="avancarAtividade(${id})">Avançar <i class="mdi mdi-arrow-right"></i></button>`
        divBotaoConteudo.setAttribute("style", "display: flex; justify-content: end;");
        quadroToDo.innerHTML += novoItemVoltar.outerHTML;

        item.remove();
    }



}

function deletarItem(id){
    var confirmacao = confirm("Deseja realmente deletar o item?");

    if(confirmacao==true){
        var itemRemover = document.getElementById(id);

        itemRemover.remove();
    }
}