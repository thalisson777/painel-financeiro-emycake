const API_URL = 'https://b81aa6f1-aa4b-4d9a-99bc-d8673fcd9925-00-hxzai5bvpbaa.spock.replit.dev/';

async function carregarLancamentos() {
  const res = await fetch(`${API_URL}/resumo`);
  const dados = await res.json();

  const lista = document.getElementById("lista-lancamentos");
  lista.innerHTML = "";

  dados.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.tipo.toUpperCase()}: ${item.descricao} - R$ ${item.valor}`;
    lista.appendChild(li);
  });
}

document.getElementById("form-lancamento").addEventListener("submit", async (e) => {
  e.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  const payload = { descricao, valor, tipo };

  await fetch(`${API_URL}/lancamento`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  carregarLancamentos();
  e.target.reset();
});

carregarLancamentos();
