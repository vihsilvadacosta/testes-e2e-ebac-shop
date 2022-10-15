/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import enderecoPage from "../support/page_objects/endereco.page"
const SelecionarProdutos = require('../support/commands')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Com usuário que não deseja se cadastrar', () => {
        var quantidade = 4
        //selecionar produto
        cy.selecaoProdutos('Atlas Fitness Tank', 'S', 'Blue', quantidade)
        cy.get('.woocommerce-message').should('contain',quantidade,'x “Atlas Fitness Tank” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        enderecoPage.faturamentoDetalhado('Vitória', 'Costa','EBAC','Brasil','Rua Luiz Fernandes', '64', 'São Paulo', 'SãO Paulo', '08531000', '988173100','teste@teste.com')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.' )
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Com usuário que deseja se cadastrar', () => {
        let emailFaker = faker.internet.email()
        var quantidade = 4
        cy.selecaoProdutos('Atlas Fitness Tank', 'S', 'Blue', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade,'× “Atlas Fitness Tank” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        enderecoPage.faturamentoComCadastro('Vitória', 'Costa','EBAC','Brasil','Rua Luiz Fernandes', '64', 'São Paulo', 'SãO Paulo', '08531000', '988173100',emailFaker, 'teste45678@123')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.' )
    })


})