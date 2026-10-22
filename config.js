/* PLANILHA DO AGRICULTOR · CONFIGURAÇÃO ÚNICA
   Preencha aqui os links e os preços. Todas as páginas leem este ficheiro. */
window.AGRO = {
  checkout: "",            // link do checkout Okanda Pay (preço de 7.997 Kz)
  checkoutCupao: "",       // link do checkout já com o cupão de 40% (se a Okanda der um link próprio)
  cupao: "AGRO40",         // código do cupão de 40% (o que configurar na Okanda)
  modoCheckout: "popup",   // "popup" = abre por cima da página; "pagina" = abre o checkout normalmente
  precos: { normal: 21997, hoje: 7997, desconto: 0.40 },
  pixel: "",               // ID do Meta Pixel (só carrega se o visitante aceitar cookies)
  suporte: { whatsapp: "244955968159", email: "autotaxapro@bilonai.com" },
  vendedor: "A Bilonai Group"
};
