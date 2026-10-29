'use strict';
// Referências conceituais; o histórico de uso foi informado pelo responsável pela apresentação.
const REFERENCES = [
 {
  "id": "prompts",
  "topic": "Construção de prompts",
  "publisher": "Alura",
  "title": "Engenharia de prompt: princípios e técnicas",
  "url": "https://www.alura.com.br/artigos/engenharia-prompt",
  "note": "Explica como formular instruções claras, fornecer contexto e refinar pedidos feitos à IA."
 },
 {
  "id": "requirements",
  "topic": "Especificação de software",
  "publisher": "UFSC",
  "title": "Lista de verificação: especificação de requisitos de software",
  "url": "https://www.inf.ufsc.br/~jean.hauck/guias/29110/Norma%20ISO%2029110%20Perfil%20de%20Entrada%20B%C3%A1sico/guidances/checklists/especificao_de_requisitos_de_software_120EB841.html",
  "note": "Material de apoio para revisar requisitos: clareza, consistência, completude, rastreabilidade e possibilidade de verificação."
 },
 {
  "id": "mcp",
  "topic": "MCP e contexto técnico",
  "publisher": "Alura",
  "title": "MCP: o que é, como funciona e principais diferenças",
  "url": "https://www.alura.com.br/artigos/mcp-o-que-e",
  "note": "Apresenta a conexão entre aplicações de IA, ferramentas e dados externos, incluindo consultas a bancos de dados."
 },
 {
  "id": "codex",
  "topic": "Codex e ferramentas conectadas",
  "publisher": "Alura",
  "title": "Codex: maximizando a produtividade",
  "url": "https://www.alura.com.br/formacao-codex-maximizando-a-produtividade",
  "note": "A apresentação pública da formação descreve o uso do Codex em projetos, automações e integrações com MCP. As aulas completas exigem acesso à plataforma."
 },
 {
  "id": "lovable",
  "topic": "Criação de aplicações com IA",
  "publisher": "Alura",
  "title": "Lovable: guia para criar apps com IA",
  "url": "https://www.alura.com.br/artigos/lovable",
  "note": "Explica o uso de descrições em linguagem natural para criar e ajustar aplicações. O uso integrado ao ChatGPT nesta timeline faz parte do relato da experiência."
 },
 {
  "id": "sdd",
  "topic": "Desenvolvimento orientado por especificações",
  "publisher": "Alura",
  "title": "Spec-Driven Development: desenvolvimento assistido por agentes",
  "url": "https://www.alura.com.br/curso-online-spec-driven-development-desenvolvimento-assistido-por-agentes?c=Naruhodo",
  "note": "A ementa pública relaciona especificações, desenvolvimento com agentes e validação de requisitos por testes. As aulas completas exigem acesso à plataforma."
 }
];
const EXPLANATIONS = {
 lovable:{title:'Lovable',definition:'Cria e ajusta aplicações a partir de descrições em linguagem natural.',usage:['Usado separadamente do ChatGPT.','Integrado ao ChatGPT.','Integração com ChatGPT mantida.'],sources:['lovable']},
 integration:{title:'Integração Lovable + ChatGPT',definition:'Permite levar o contexto da conversa no ChatGPT à criação de um projeto no Lovable.',usage:['A integração não foi utilizada na primeira adaptação.','A integração passa a fazer parte das ferramentas utilizadas na segunda adaptação.','A integração permanece entre as ferramentas utilizadas na terceira adaptação.'],sources:['lovable']},
 chatgpt:{title:'ChatGPT',definition:'Assistente de IA para conversar, organizar informações e revisar textos.',usage:['Utilizado apenas pelo chat, sem integração com Lovable.','Usado na elaboração dos prompts, com integração ao Lovable.','Usado na elaboração dos prompts, com integração ao Lovable.'],sources:['prompts']},
 codex:{title:'ChatGPT Codex(IDE)',definition:'Assistente de IA no ambiente de desenvolvimento, com acesso ao contexto do projeto e a ferramentas conectadas.',usage:['Não foi informado como ferramenta desta etapa.','Conectado por MCP para consultar informações técnicas.','Mantém o acesso a informações técnicas por MCP.'],sources:['codex','mcp']},
 mcp:{title:'MCP · Model Context Protocol',definition:'Protocolo que conecta aplicações de IA a ferramentas e dados de outros sistemas.',usage:['Não foi informado como recurso desta etapa.','Usado no ChatGPT Codex(IDE) para consultar contexto técnico.','Usado no ChatGPT Codex(IDE) para consultar referências técnicas do sistema.'],example:'Exemplo: consultar a estrutura de uma tabela ou o conteúdo de uma rotina, conforme os recursos disponíveis na conexão.',sources:['mcp']},
 llm:{title:'LLM · Modelo de linguagem',definition:'Modelo de linguagem que interpreta as instruções e o contexto para gerar respostas.',usage:['Modelo informado nesta adaptação: Sol.','Modelo informado nesta adaptação: Sol.','Modelo informado nesta adaptação: Astra.'],example:'Os nomes seguem o histórico informado para esta apresentação.',sources:['prompts']},
 prompt:{title:'O que é um prompt?',definition:'É o conjunto de instruções e informações usado para orientar a resposta da IA. Definir a tarefa, o contexto, as restrições e o formato esperado torna o pedido mais claro.',usage:['Aqui, os prompts delimitam a estrutura das versões curta e completa.','Aqui, a versão completa reorganiza as orientações; o prompt curto permanece igual.','Aqui, as orientações são refinadas para tratar lacunas, regras e contexto técnico.'],sources:['prompts']},
 specification:{title:'Especificação e requisitos',definition:'Nesta apresentação, a especificação organiza a demanda e os requisitos que orientam desenvolvimento e QA. Bons requisitos precisam ser claros, consistentes, rastreáveis e verificáveis.',usage:['A estrutura separa as informações conforme a complexidade da demanda.','A reorganização reduz repetições e destaca definições pendentes.','As regras numeradas e os critérios de aceite ajudam a relacionar o comportamento definido às verificações da entrega.'],sources:['requirements']}
};
function contextEscape(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
let toolsStep=0;
function renderTools(current){
 toolsStep=current;
 document.querySelector('#tools-stage').textContent=`${current+1}ª ADAPTAÇÃO`;
 document.querySelector('#model-value').textContent=current===2?'Astra':'Sol';
 const items=[{name:'Lovable',key:'lovable'},{name:'ChatGPT',key:'chatgpt'}];
 if(current>0)items.push({name:'ChatGPT Codex(IDE)',key:'codex'});
 document.querySelector('#tool-list').innerHTML=items.map(item=>`<li><button class="tool-button" data-explain="${item.key}" aria-haspopup="dialog"><span>${item.name}</span><span class="chip-help" aria-hidden="true">?</span></button></li>`).join('');
 document.querySelector('#tool-connections').innerHTML=current===0
  ? '<span>Lovable e ChatGPT usados separadamente.</span>'
  : '<button data-explain="integration" aria-haspopup="dialog">Lovable integrado ao ChatGPT <span aria-hidden="true">↗</span></button><span class="connection-divider" aria-hidden="true">·</span><button data-explain="mcp" aria-haspopup="dialog">Codex com MCP <span aria-hidden="true">↗</span></button>';
}
document.querySelector('#reference-list').innerHTML=REFERENCES.map(r=>`<li id="ref-${r.id}"><span class="reference-topic">${r.topic}</span><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.publisher} · ${r.title} <span aria-hidden="true">↗</span></a><p>${r.note}</p></li>`).join('');
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-explain]');if(!button)return;
 const info=EXPLANATIONS[button.dataset.explain];if(!info)return;
 document.querySelector('#help-title').textContent=info.title;
 document.querySelector('#help-definition').textContent=info.definition;
 document.querySelector('#help-usage-title').textContent=`Nesta experiência · ${toolsStep+1}ª adaptação`;
 document.querySelector('#help-usage').textContent=info.usage[toolsStep];
 document.querySelector('#help-example').hidden=!info.example;
 document.querySelector('#help-example').textContent=info.example||'';
 document.querySelector('#help-links').innerHTML=info.sources.map(id=>{const r=REFERENCES.find(r=>r.id===id);return `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.publisher} · ${r.title} ↗</a>`;}).join('');
 const dialog=document.querySelector('#tool-help');dialog.showModal();dialog.scrollTop=0;
});
