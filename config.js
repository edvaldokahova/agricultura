/* PLANILHA DO AGRICULTOR · CONFIGURAÇÃO ÚNICA
   Preencha aqui os links e os preços. Todas as páginas leem este ficheiro. */
window.AGRO = {
  checkout: "https://okandapay.com/checkout/planilha-do-agricultor-angolano-mvjjv6jg?pid=95404ee9-36d6-40fa-8d86-bee9c2b04986",  // checkout Okanda Pay (7.997 Kz)
  checkoutCupao: "",       // link do checkout já com o cupão (só se a Okanda der um link próprio)
  cupao: "LANCAMENTO15",   // código do cupão criado na Okanda
  modoCheckout: "popup",   // "popup" = abre por cima da página; "pagina" = abre o checkout normalmente
  precos: { normal: 21997, hoje: 7997, desconto: 0.25 },
  pixel: "",               // ID do Meta Pixel (só carrega se o visitante aceitar cookies)
  suporte: { whatsapp: "244955968159", email: "autotaxapro@bilonai.com" },
  vendedor: "A Bilonai Group"
};
