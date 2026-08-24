# Sistema de Pedidos - Gestão de Compras

Sistema de gestão de pedidos com tema escuro moderno. Permite criar listas de compras, acompanhar status dos itens e controlar valores.

## Funcionalidades

### Produtos
- Adicionar produtos (nome, preço, quantidade)
- Editar produtos existentes
- Excluir produtos do pedido
- Visualização com subtotais por item

### Status
- Produtos marcados como "Pendente" ou "Comprado"
- Finalização de compra em lote
- Acompanhamento visual por badges coloridos

### Estatísticas em Tempo Real
- Total de itens no pedido
- Produtos comprados
- Produtos pendentes
- Valor total pendente

### Valores
- Cálculo automático de subtotais
- Total pendente atualizado automaticamente
- Formatação em moeda brasileira (R$)

## Como usar

1. Abra o arquivo `index.html` no navegador
2. Adicione produtos com nome, preço e quantidade
3. Edite ou exclua itens conforme necessário
4. Acompanhe os valores no rodapé da lista
5. Clique em "Finalizar Compra" quando concluir

## Validações

- Preço deve ser maior que zero
- Quantidade deve ser no mínimo 1
- Não permite editar/excluir quando lista vazia
- Confirmação antes de excluir ou finalizar

## Interface

- Tema escuro moderno
- Modal para edição
- Estatísticas em cards
- Total sempre visível
- Responsivo para mobile

## Tecnologias

- HTML
- CSS
- JavaScript puro (sem dependências)
