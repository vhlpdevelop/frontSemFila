const objects = [
  {
    title: "ajuda-MeuNegocio",
    header: "Como incluir meu negócio?",
    item: [
      {
        title: "Primeiro passo",
        text: "Registre-se no portal da SemFila, utilize seus dados e conclua a verificação por email.",
      },
      {
        title: "Segundo passo",
        text: "Aguardar, após a SemFila verificar seus dados são válidos você poderá acessar o portal livremente.",
      }
    ],
  },
  {
    title: "ajuda-Pagamento",
    header: "Funcionamento do Pagamento",
    item: [
      {
        title: "Venda do Produto",
        text: "Cada produto que sua loja passar no QrCode você completará a venda.<br/> Isto é, para todo produto que você ler no QrCode e que pertença a sua loja."+
        " <br/><br/> A SemFila recebe 5% já inclusos a taxa pix e cartão.",
      },
      {
        title: "Recebimento",
        text: "Acesse no portal a aba Financeiro. Esta aba mostrará seu registro de vendas.<br/> Todo QrCode lido estará registrado nesta Aba.<br/><br/> Para receber as vendas pedidas, existe um tempo mínimo de 4 dias."
        +" Clique em Receber.",
      },
      {
        title: "Contrato",
        text: "Toda empresa existe seu contrato, ele pode ser alterado pela SemFila enviando um pedido de alteração por Email. <br/>Quando mais você vende, melhor a chance de obter um contrato melhor. Lembre-se um contrato melhor significa menos taxa e mais opções para você."
      }
    ],
  },
  {
    title: "ajuda-ComoComeçar",
    header: "Como começar?",
    item: [
      {
        title: "Criando ou não sua conta",
        text: "Isso mesmo, pra você usar não precisa de uma conta, mas é extremamente recomendado que você tenha uma conta.<br/><br/> A conta serve para armazenar seus QrCodes e cupons. <br/><br/> Assim "+
        "você não corre perigo de perder eles e pode acessar em qualquer lugar.",
      },
      {
        title: "Comprando no Cardapio",
        text: "Você pode utilizar pix ou cartão. <br/><br/> Após a compra ser efetuada você receberá seu QrCode, pronto para ser usado!",
      },
      {
        title: "Seus QrCodes",
        text: "A qualquer momento você pode acessar seus QrCodes, até mesmo em outro cardapio, mas lembrando que não poderá usar um QrCode diferente para outro cardapio. <br/><br/> Seu QrCode "+
        "mostrará o tempo de expiração, nome da loja que comprou e a quantidade de itens que possui.<br/> <br/> Ao usa-lo lembre de avisar ao atendente quantas unidades está retirando. "
      },
      {
        title: "Retirando seu produto",
        text: "Após a compra estiver efetuada e QrCode estiver disponível, vá ate um atendente do local e mostre o QrCode e quantas unidades quer retirar. Pronto e fácil. <br/><br/>"+
        " Caso deseja reclamar, envie um email para a SemFila com titulo: Reclamação - NOME DA LOJA <br/> e nos diga o que ocorreu para darmos inicio ao processo de punimento."
      }
    ],
  },
  {
    title: "ajuda-NossoProduto",
    header: "A SemFila",
    item: [
      {
        title: "Como funciona?",
        text: "Vendemos os produtos dos cardapios que Usuários criam. Somos uma empresa prestadora de serviço. Tudo é gratuito e sustentamos a empresa com uma taxa de 5% de cada venda. <br/>"
        +"<br/> Usuários criam seus produtos e transforma-mos eles em QrCodes de rápido acesso. Assim fica fácil vender.",
      },
      {
        title: "Qual intuito",
        text: "A todo momento a cultura está se modificando e a tecnologia está sempre acompanhando. Agora que QrCode chegou, por quê não usa-lo na hora de comprar de vez?<br/><br/>"
        +"Rápido e prático para acabar com as filas.",
      },
      {
        title: "Surgimento",
        text: "Festas, bares, restaurantes, praças de alimentação, cinema. Em todos os lugares comerciais existem filas onde você precisa comprar e ainda aguardar o atendimento. <br/><br/>"
        +"E se fosse possível reduzir essa situação? tornar ela mais rápida, assim focar apenas no essencial, trazer o produto até você. <br/> Assim surgiu a ideia SemFila."
      },
    ],
  },
  {
    title: "ajuda-Afiliados",
    header: "Torne-se um Afiliado",
    item: [
      {
        title: "Afiliado",
        text: "",
      },
      {
        title: "Tornando-se um",
        text: "",
      },
    ],
  },
  {
    title: "ajuda-Problema",
    header: "Ajuda",
    item: [
      {
        title: "Uma loja não trouxe meu produto",
        text: "Abra uma reclamação imediatamente para a SemFila iniciar o processo, envie um Email para a SemFila. <br/><br/>"
        +"Titulo: RECLAMACAO - NOME DA LOJA <br/><br/> Descreva o que aconteceu. No fim seu nome, qual dispositivo e se possui uma conta.",
      },
      {
        title: "Uma loja retirou mais itens que solicitei",
        text: "Abra uma reclamação imediatamente para a SemFila iniciar o processo, envie um Email para a SemFila. <br/><br/>"
        +"Titulo: RECLAMACAO - NOME DA LOJA <br/><br/> Descreva o que aconteceu. No fim seu nome, qual dispositivo e se possui uma conta.",
      },
      {
        title: "Meu QrCode expirou",
        text: "Verifique sempre se você comprou um item em promoção, eles podem expirar mais rapidamente. Mas não se desespere! <br/> <br/>"
        +"Nesse caso, você recebe seu dinheiro devolta. Após o item expirar, clique para atualizar utilizando a seta no canto superior direito.<br/><br/>"
        +"Você receberá uma mensagem informando que será estornado. Caso ocorra um erro envie um Email para a SemFila.",
      },
      {
        title: "Não consigo acessar minha Conta",
        text: "Primeiramente verifique sua senha e seu email de acesso. Caso não consiga:<br/><br/>"
        +"Envie um Email para a SemFila. <br/><br/>"
        +"CONTA - NÃO CONSIGO ACESSAR <br/><br/> Descreva o que aconteceu. No fim seu nome, qual dispositivo e se possui uma conta.",
      },
      {
        title: "Minha conta empresarial foi negada",
        text: "Caso você receba este email, sinto muito. Seus dados para abrir uma conta empresarial foram negados. Re-leia sobre o email recebido.",
      },
      {
        title: "Um problema aconteceu",
        text: "Caso nenhum dos problemas acima descreve o seu, envie um Email para a SemFila. <br/><br/>"
        +"Titulo: PROBLEMA - UM BREVE CONTEXTO <br/><br/> Descreva o que aconteceu. No fim seu nome, qual dispositivo e se possui uma conta.",
      },
    ],
  },
];
const helper = {
  searchHelper: (item) => {
    for (let i = 0; i < objects.length; i++) {
      if (item === objects[i].title) {
        return objects[i];
      }
    }
    return null;
  },
};

export default helper;
