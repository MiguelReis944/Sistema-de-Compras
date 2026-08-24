class Produto {
      constructor(nome, preco, quantidade, comprado) {
        this.nome = nome;
        this.preco = parseFloat(preco);
        this.quantidade = parseInt(quantidade);
        this.comprado = comprado;
      }
    }

    class Pedido {
      constructor() {
        this.pedido = [];
      }

      novoProduto(nome, preco, quantidade) {
        const produto = new Produto(nome, preco, quantidade, false);
        this.pedido.push(produto);
      }

      editarProduto(index, nome, preco, quantidade) {
        if (index >= 0 && index < this.pedido.length) {
          this.pedido[index].nome = nome;
          this.pedido[index].preco = parseFloat(preco);
          this.pedido[index].quantidade = parseInt(quantidade);
          return true;
        }
        return false;
      }

      excluirProduto(index) {
        if (index >= 0 && index < this.pedido.length) {
          this.pedido.splice(index, 1);
          return true;
        }
        return false;
      }

      finalizarCompra() {
        this.pedido.forEach(produto => {
          produto.comprado = true;
        });
      }

      getTotalProdutos() {
        return this.pedido.length;
      }

      getProdutosComprados() {
        return this.pedido.filter(p => p.comprado).length;
      }

      getProdutosPendentes() {
        return this.pedido.filter(p => !p.comprado).length;
      }

      getValorTotalPendente() {
        return this.pedido
          .filter(p => !p.comprado)
          .reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
      }
    }

    const sistema = new Pedido();

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function formatarMoeda(valor) {
      return 'R$ ' + valor.toFixed(2).replace('.', ',');
    }

    function atualizarEstatisticas() {
      document.getElementById('stat-total').textContent = sistema.getTotalProdutos();
      document.getElementById('stat-comprados').textContent = sistema.getProdutosComprados();
      document.getElementById('stat-pendentes').textContent = sistema.getProdutosPendentes();
      document.getElementById('stat-valor').textContent = formatarMoeda(sistema.getValorTotalPendente());
    }

    function renderProdutos() {
      const listaEl = document.getElementById('lista-produtos');
      listaEl.innerHTML = '';

      if (sistema.pedido.length === 0) {
        listaEl.innerHTML = `
          <tr>
            <td colspan="6">
              <div class="empty">
                <div class="empty-icon">🛒</div>
                <p>Nenhum produto adicionado</p>
                <p style="font-size: 12px; margin-top: 5px;">Use o formulário acima para adicionar produtos</p>
              </div>
            </td>
          </tr>
        `;
      } else {
        sistema.pedido.forEach((produto, index) => {
          const tr = document.createElement('tr');
          const subtotal = produto.preco * produto.quantidade;
          const statusClass = produto.comprado ? 'badge-completed' : 'badge-pending';
          const statusText = produto.comprado ? 'Comprado' : 'Pendente';
          
          tr.innerHTML = `
            <td>
              <div class="product-name">${escapeHtml(produto.nome)}</div>
            </td>
            <td>${produto.quantidade}X</td>
            <td>
              <div>${formatarMoeda(produto.preco)}</div>
            </td>
            <td>
              <div class="subtotal">${formatarMoeda(subtotal)}</div>
            </td>
            <td><span class="badge ${statusClass}">${statusText}</span></td>
            <td>
              <button class="btn btn-edit" onclick="abrirModalEdicao(${index})">Editar</button>
              <button class="btn btn-delete" onclick="excluirProduto(${index})">Excluir</button>
            </td>
          `;
          listaEl.appendChild(tr);
        });
      }

      document.getElementById('valor-total').textContent = formatarMoeda(sistema.getValorTotalPendente());
      atualizarEstatisticas();
    }

    document.getElementById('form-produto').addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('produto-nome').value.trim();
      const preco = parseFloat(document.getElementById('produto-preco').value);
      const quantidade = parseInt(document.getElementById('produto-quantidade').value);

      if (preco <= 0 || quantidade <= 0) {
        alert('Preço e quantidade devem ser valores positivos.');
        return;
      }

      sistema.novoProduto(nome, preco, quantidade);
      e.target.reset();
      renderProdutos();
    });

    function abrirModalEdicao(index) {
      const produto = sistema.pedido[index];
      if (!produto) return;

      document.getElementById('edicao-index').value = index;
      document.getElementById('edicao-nome').value = produto.nome;
      document.getElementById('edicao-preco').value = produto.preco;
      document.getElementById('edicao-quantidade').value = produto.quantidade;
      
      document.getElementById('modal-edicao').style.display = 'flex';
    }

    function fecharModal() {
      document.getElementById('modal-edicao').style.display = 'none';
    }

    document.getElementById('form-edicao').addEventListener('submit', (e) => {
      e.preventDefault();
      const index = parseInt(document.getElementById('edicao-index').value);
      const nome = document.getElementById('edicao-nome').value.trim();
      const preco = parseFloat(document.getElementById('edicao-preco').value);
      const quantidade = parseInt(document.getElementById('edicao-quantidade').value);

      if (preco <= 0 || quantidade <= 0) {
        alert('Preço e quantidade devem ser valores positivos.');
        return;
      }

      if (sistema.editarProduto(index, nome, preco, quantidade)) {
        fecharModal();
        renderProdutos();
      }
    });

    function excluirProduto(index) {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        if (sistema.excluirProduto(index)) {
          renderProdutos();
        }
      }
    }

    function finalizarCompra() {
      if (sistema.pedido.length === 0) {
        alert('Nenhum produto no pedido.');
        return;
      }

      if (sistema.getProdutosPendentes() === 0) {
        alert('Todos os produtos já foram comprados!');
        return;
      }

      if (confirm(`Finalizar compra?\nTotal: ${formatarMoeda(sistema.getValorTotalPendente())}`)) {
        sistema.finalizarCompra();
        renderProdutos();
      }
    }

    window.onclick = function(event) {
      const modal = document.getElementById('modal-edicao');
      if (event.target === modal) {
        fecharModal();
      }
    }

    renderProdutos();
