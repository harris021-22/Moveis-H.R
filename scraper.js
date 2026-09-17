/**
 * EXTRATOR DE CATÁLOGO COMPLETO - RUFER MÓVEIS
 * Margem aplicada: +35% (configurável)
 * Contato WhatsApp: (21) 96455-1053
 *
 * Suporta paginação completa (?page=1, ?page=2...), gerenciamento de cookies de sessão,
 * normalização inteligente de departamentos e enriquecimento de medidas (largura, altura, profundidade).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// =========================================================================
// CONFIGURAÇÕES
// =========================================================================
const CONFIG = {
    MARGEM_LUCRO: 1.35,
    WHATSAPP_NUMERO: "5521964551053",
    WHATSAPP_FORMATADO: "(21) 96455-1053",

    // Categorias e subcategorias com varredura paginada
    CATEGORIAS: [
        // 1. Estofados e Sofás (Garante 100% dos modelos: retráteis, canto, chaise, cama, poltronas)
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/estofados/", maxPaginas: 10 },
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/sofa-retratil/", maxPaginas: 8 },
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/sofa-retratil-sem-caixa/", maxPaginas: 4 },
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/sofa-3-e-2-lugares/", maxPaginas: 4 },
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/estofados/sofa-com-chaise/", maxPaginas: 3 },
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/estofados/sofa-de-canto/", maxPaginas: 3 },
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/estofados/sofa-cama/", maxPaginas: 3 },
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/estofados/poltronas/", maxPaginas: 4 },
        { nome: "Estofados e Sofás", url: "https://www.rufer.com.br/estofados/sofa-por-cor/", maxPaginas: 4 },

        // 2. Sala de TV
        { nome: "Sala de TV", url: "https://www.rufer.com.br/sala-de-tv/", maxPaginas: 6 },
        { nome: "Sala de TV", url: "https://www.rufer.com.br/sala-de-tv/rack-painel-home/", maxPaginas: 4 },
        { nome: "Sala de TV", url: "https://www.rufer.com.br/rack-para-sala/", maxPaginas: 4 },
        { nome: "Sala de TV", url: "https://www.rufer.com.br/buffet-para-sala/", maxPaginas: 3 },
        { nome: "Sala de TV", url: "https://www.rufer.com.br/sala-de-tv/cantinho-do-cafe/", maxPaginas: 3 },

        // 3. Quarto Casal
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/", maxPaginas: 12 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/roupeiro-casal/", maxPaginas: 8 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/base-box-casal/", maxPaginas: 4 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/cama-casal/", maxPaginas: 4 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/colchao-casal/", maxPaginas: 4 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/cabeceira-casal/", maxPaginas: 4 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/box-queen-1-58m/", maxPaginas: 3 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/colchao-queen-1-58m/", maxPaginas: 3 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/cama-queen-1-58m/", maxPaginas: 3 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/comodas/", maxPaginas: 4 },
        { nome: "Quarto Casal", url: "https://www.rufer.com.br/quarto-casal/criado-mudo/", maxPaginas: 3 },

        // 4. Quarto Solteiro
        { nome: "Quarto Solteiro", url: "https://www.rufer.com.br/quarto-solteiro/", maxPaginas: 8 },
        { nome: "Quarto Solteiro", url: "https://www.rufer.com.br/quarto-solteiro/guarda-roupa-solteiro/", maxPaginas: 4 },
        { nome: "Quarto Solteiro", url: "https://www.rufer.com.br/quarto-solteiro/base-box-solteiro/", maxPaginas: 4 },
        { nome: "Quarto Solteiro", url: "https://www.rufer.com.br/quarto-solteiro/cama-solteiro/", maxPaginas: 4 },
        { nome: "Quarto Solteiro", url: "https://www.rufer.com.br/quarto-solteiro/colchao-solteiro/", maxPaginas: 4 },
        { nome: "Quarto Solteiro", url: "https://www.rufer.com.br/quarto-solteiro/cabeceira-solteiro/", maxPaginas: 4 },
        { nome: "Quarto Solteiro", url: "https://www.rufer.com.br/quarto-solteiro/penteadeira/", maxPaginas: 3 },

        // 5. Mesa de Jantar
        { nome: "Mesa de Jantar", url: "https://www.rufer.com.br/mesa-de-jantar/", maxPaginas: 8 },
        { nome: "Mesa de Jantar", url: "https://www.rufer.com.br/mesa-de-jantar/mesa-de-jantar-4-cadeiras/", maxPaginas: 4 },
        { nome: "Mesa de Jantar", url: "https://www.rufer.com.br/mesa-de-jantar/mesa-de-jantar-6-cadeiras/", maxPaginas: 4 },
        { nome: "Mesa de Jantar", url: "https://www.rufer.com.br/cadeiras-e-bases/", maxPaginas: 4 },
        { nome: "Mesa de Jantar", url: "https://www.rufer.com.br/sala-de-jantar-e-tv/cadeiras-e-mesas/cadeiras/", maxPaginas: 4 },

        // 6. Cozinha
        { nome: "Cozinha", url: "https://www.rufer.com.br/cozinha/", maxPaginas: 6 },
        { nome: "Cozinha", url: "https://www.rufer.com.br/cozinha-completa-e-kit/", maxPaginas: 4 },
        { nome: "Cozinha", url: "https://www.rufer.com.br/modulos-de-cozinha/", maxPaginas: 4 },
        { nome: "Cozinha", url: "https://www.rufer.com.br/cozinha/armario-de-cozinha/", maxPaginas: 4 },
        { nome: "Cozinha", url: "https://www.rufer.com.br/cozinha/mesas-de-cozinha/", maxPaginas: 3 },

        // 7. Escritório
        { nome: "Escritório", url: "https://www.rufer.com.br/escritorio/", maxPaginas: 4 },
        { nome: "Escritório", url: "https://www.rufer.com.br/escritorio/mesa-para-computador/", maxPaginas: 3 },
        { nome: "Escritório", url: "https://www.rufer.com.br/escritorio/armarios-multiuso/", maxPaginas: 3 },

        // 8. Modulados
        { nome: "Modulados", url: "https://www.rufer.com.br/modulados/", maxPaginas: 3 },

        // 9. Novidades & Promoções
        { nome: "Novidades", url: "https://www.rufer.com.br/novidades/", maxPaginas: 3 },
        { nome: "Promocoes", url: "https://www.rufer.com.br/promocao/", maxPaginas: 3 }
    ]
};

// Gerenciador de Sessão HTTP com Cookies
const SESSION = {
    cookie: ''
};

function fetchWithSession(url, referer = 'https://www.rufer.com.br/') {
    return new Promise((resolve) => {
        try {
            const u = new URL(url);
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
                'Referer': referer,
                'sec-ch-ua': '"Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'upgrade-insecure-requests': '1'
            };

            if (SESSION.cookie) {
                headers['Cookie'] = SESSION.cookie;
            }

            const req = https.get({
                hostname: u.hostname,
                path: u.pathname + u.search,
                headers: headers,
                timeout: 10000
            }, (res) => {
                if (res.headers['set-cookie']) {
                    const cookieStr = res.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
                    SESSION.cookie = cookieStr;
                }

                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    return fetchWithSession(res.headers.location, url).then(resolve);
                }

                let data = '';
                res.setEncoding('latin1');
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data }));
            });

            req.on('timeout', () => { req.destroy(); resolve({ status: 0, data: '' }); });
            req.on('error', () => resolve({ status: 0, data: '' }));
        } catch (e) {
            resolve({ status: 0, data: '' });
        }
    });
}

function parsePreco(str) {
    if (!str) return 0;
    const clean = str.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(clean) || 0;
}

function formataReal(val) {
    return 'R$ ' + Number(val).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formataMedida(numRaw, unitRaw) {
    if (!numRaw) return '';
    let numStr = numRaw.replace('.', ',');
    let num = parseFloat(numRaw.replace(',', '.'));
    let unidade = unitRaw ? unitRaw.toLowerCase() : (num < 10 ? 'm' : 'cm');
    return `${numStr} ${unidade}`;
}

function extrairMedidasPrecisas(html, titulo) {
    let medidas = { largura: '', altura: '', profundidade: '' };

    if (html) {
        const semScripts = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');

        const descMatch = semScripts.match(/id="descricao"[\s\S]*?<div class="tab-content">([\s\S]*?)<\/div>/i) ||
                          semScripts.match(/class="[^"]*description[^"]*"[\s\S]*?<\/div>/i);

        const texto = descMatch ? descMatch[0] : semScripts;

        const num = "([0-9]+(?:[.,][0-9]+)?)[ ]*(m|cm)?(?![a-z])";
        const rules = [
            { key: "largura", re: new RegExp("(?:Larg(?:ura|[.])?)[ ]*(?:total)?[ ]*:?[ ]*" + num, "i") },
            { key: "profundidade", re: new RegExp("(?:Prof(?:undidade|[.])?|Comp(?:rimento|[.])?)[ ]*(?:total)?[ ]*:?[ ]*" + num, "i") },
            { key: "altura", re: new RegExp("(?:Alt(?:ura|[.])?)[ ]*(?:total)?[ ]*:?[ ]*" + num, "i") }
        ];

        rules.forEach(r => {
            const m = texto.match(r.re);
            if (m && m[1]) {
                medidas[r.key] = formataMedida(m[1], m[2]);
            }
        });
    }

    if (!medidas.largura) {
        const metrosMatch = (titulo || '').match(/(\d+[,\.]\d+)\s*m/i);
        if (metrosMatch) {
            medidas.largura = metrosMatch[1].replace('.', ',') + ' m';
        }
    }

    const dimensaoMatch = (titulo || '').match(/(\d+)\s*[xX]\s*(\d+)(?:\s*[xX]\s*(\d+))?\s*(?:cm)?/i);
    if (dimensaoMatch) {
        if (!medidas.largura && dimensaoMatch[1]) medidas.largura = dimensaoMatch[1] + ' cm';
        if (!medidas.profundidade && dimensaoMatch[2]) medidas.profundidade = dimensaoMatch[2] + ' cm';
        if (!medidas.altura && dimensaoMatch[3]) medidas.altura = dimensaoMatch[3] + ' cm';
    }

    return medidas;
}

function extrairFabricante(titulo) {
    const fabricantes = [
        'Valdemóveis', 'HB Móveis', 'Bianchi', 'Ortobom', 'Notável', 'Bom Lar',
        'Art Assento', 'Madesa', 'Kappesberg', 'Santos Andirá', 'Demóbile',
        'DJ Móveis', 'Herval', 'Castor', 'Probel', 'Lineas Brasil', 'Viero',
        'Lopas', 'Gelius', 'Salleto', 'Permobili', 'Paropas', 'D Doro', 'JB Bechara',
        'JCM Móveis', 'Minas Plac', 'Poquema', 'Poliman', 'Colibri', 'Anjos'
    ];
    for (const f of fabricantes) {
        if ((titulo || '').toLowerCase().includes(f.toLowerCase())) {
            return f;
        }
    }
    return 'Móveis Selecionados';
}

function normalizarCategoria(url, titulo, catOriginal) {
    const t = (titulo || '').toLowerCase();
    const u = (url || '').toLowerCase();

    // 1. Estofados e Sofás
    if (u.includes('estofado') || u.includes('sofa') || u.includes('poltrona') ||
        /sof[aá]|poltrona|estofado|chaise|recamier/i.test(t)) {
        return 'Estofados e Sofás';
    }

    // 2. Mesa de Jantar
    if (u.includes('mesa-de-jantar') || u.includes('cadeiras-e-bases') ||
        /mesa de jantar|cadeira|buffet|aparador|conjunto sala de jantar/i.test(t)) {
        return 'Mesa de Jantar';
    }

    // 3. Sala de TV
    if (u.includes('sala-de-tv') || u.includes('rack') || u.includes('painel') || u.includes('home') ||
        /painel|rack|bancada|home suspenso|cantinho do caf[eé]/i.test(t)) {
        return 'Sala de TV';
    }

    // 4. Quarto Solteiro
    if (u.includes('solteiro') || /solteiro/i.test(t)) {
        return 'Quarto Solteiro';
    }

    // 5. Quarto Casal
    if (u.includes('casal') || u.includes('queen') || u.includes('king') ||
        /casal|queen|king|roupeiro|guarda-roupa|cabeceira|c[oô]moda/i.test(t)) {
        return 'Quarto Casal';
    }

    // 6. Cozinha
    if (u.includes('cozinha') || /cozinha|arm[aá]rio de cozinha|balc[aã]o|a[eé]reo|paneleiro|torre quente/i.test(t)) {
        return 'Cozinha';
    }

    // 7. Escritório
    if (u.includes('escritorio') || /escrivaninha|mesa para computador|multiuso|office/i.test(t)) {
        return 'Escritório';
    }

    // 8. Modulados
    if (u.includes('modulado') || /m[oó]dulo|modulado/i.test(t)) {
        return 'Modulados';
    }

    return catOriginal || 'Outros Móveis';
}

function gerarMensagemWhatsapp(titulo, fabricante, precoVendaFormatado, dimensoes) {
    let dimStr = '';
    const partes = [];
    if (dimensoes && dimensoes.largura) partes.push(`Largura: ${dimensoes.largura}`);
    if (dimensoes && dimensoes.altura) partes.push(`Altura: ${dimensoes.altura}`);
    if (dimensoes && dimensoes.profundidade) partes.push(`Profundidade: ${dimensoes.profundidade}`);
    if (partes.length > 0) {
        dimStr = `📏 *Medidas:* ${partes.join(' | ')}\n`;
    }

    const texto = 
        `Olá! Tenho interesse no seguinte móvel do catálogo:\n\n` +
        `📦 *Produto:* ${titulo}\n` +
        `🏷️ *Fabricante:* ${fabricante}\n` +
        `💰 *Valor do Móvel:* ${precoVendaFormatado}\n` +
        dimStr +
        `\n⚠️ *Obs:* Ciente de que o frete e a montagem NÃO estão inclusos no valor e são sob consulta por região e produto.\n` +
        `📍 *Por favor, informe o valor do frete e montagem para:*\nBairro / Cidade: [Digite seu bairro ou CEP aqui]`;

    return `https://wa.me/${CONFIG.WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

async function iniciarExtracao() {
    console.log('=====================================================');
    console.log('  INICIANDO EXTRAÇÃO COMPLETA DA RUFER MÓVEIS');
    console.log(`  Margem configurada: +${((CONFIG.MARGEM_LUCRO - 1) * 100).toFixed(0)}%`);
    console.log(`  WhatsApp configurado: ${CONFIG.WHATSAPP_FORMATADO}`);
    console.log('=====================================================\n');

    // Carrega cache de medidas anteriores para acelerar
    const cacheDimensoes = new Map();
    const caminhoJsonAnterior = path.join(__dirname, 'produtos.json');
    if (fs.existsSync(caminhoJsonAnterior)) {
        try {
            const anteriores = JSON.parse(fs.readFileSync(caminhoJsonAnterior, 'utf8'));
            anteriores.forEach(p => {
                if (p.id && p.dimensoes && (p.dimensoes.altura || p.dimensoes.profundidade)) {
                    cacheDimensoes.set(String(p.id), p.dimensoes);
                }
            });
            console.log(`[CACHE] ${cacheDimensoes.size} produtos com medidas reaproveitadas do catálogo anterior.`);
        } catch (e) {}
    }

    // Inicializa sessão
    await fetchWithSession('https://www.rufer.com.br/');

    const mapaProdutos = new Map();

    // FASE 1: Varredura de páginas
    for (let c = 0; c < CONFIG.CATEGORIAS.length; c++) {
        const cat = CONFIG.CATEGORIAS[c];
        console.log(`\n[${c + 1}/${CONFIG.CATEGORIAS.length}] Categoria: ${cat.nome} (${cat.url})`);

        let pagina = 1;
        let primeiraIdNaPaginaAnterior = '';

        while (pagina <= (cat.maxPaginas || 10)) {
            const url = pagina === 1 ? cat.url : `${cat.url}?page=${pagina}`;
            const res = await fetchWithSession(url, cat.url);

            if (res.status !== 200 || !res.data) {
                break;
            }

            const chunks = res.data.split('storefront-cards collection-grid-card product-card');
            const qtdNaPagina = chunks.length - 1;
            if (qtdNaPagina <= 0) break;

            // Extrai primeiro ID para detectar se a loja começou a repetir a última página
            const primeiroTm = chunks[1].match(/class="product-card-title[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>/i);
            const primeiroLink = primeiroTm ? primeiroTm[1].trim() : '';
            if (pagina > 1 && primeiroLink === primeiraIdNaPaginaAnterior) {
                // Chegou ao fim da paginação real
                break;
            }
            primeiraIdNaPaginaAnterior = primeiroLink;

            let novosNestaPagina = 0;
            for (let j = 1; j < chunks.length; j++) {
                const chunk = chunks[j];
                const tm = chunk.match(/class="product-card-title[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
                if (!tm) continue;

                const linkOriginal = tm[1].trim();
                const titulo = tm[2].replace(/<[^>]+>/g, '').trim();

                const idMatch = linkOriginal.match(/-p(\d+)$/) || chunk.match(/data-id="(\d+)"/);
                const idProduto = String(idMatch ? idMatch[1] : linkOriginal);

                const im = chunk.match(/class="[^"]*first-image-thumbnail[^"]*"[^>]*src="([^"]+)"/i) ||
                           chunk.match(/<img[^>]+src="([^"]+produtos[^"]+)"/i);
                let imagemUrl = im ? im[1] : '';
                if (imagemUrl.startsWith('//')) imagemUrl = 'https:' + imagemUrl;

                const im2 = chunk.match(/class="[^"]*second-image-thumbnail[^"]*"[^>]*src="([^"]+)"/i);
                let imagemSecundaria = im2 ? im2[1] : '';
                if (imagemSecundaria.startsWith('//')) imagemSecundaria = 'https:' + imagemSecundaria;

                const pm = chunk.match(/class="price" data-element="sale-price">[\s\S]*?<p>(R\$\s*[\d\.,]+)<\/p>/i) ||
                           chunk.match(/class="best-price">(R\$\s*[\d\.,]+)<\/span>/i) ||
                           chunk.match(/class="price"[^>]*>[\s\S]*?(R\$\s*[\d\.,]+)/i);

                const precoTexto = pm ? pm[1] : '';
                const precoCusto = parsePreco(precoTexto);

                let precoVenda = 0;
                let precoVendaFormatado = 'Sob consulta';
                let precoParcelado = '';

                if (precoCusto > 0) {
                    precoVenda = Math.round(precoCusto * CONFIG.MARGEM_LUCRO * 100) / 100;
                    precoVendaFormatado = formataReal(precoVenda);
                    const parcela10x = (precoVenda / 10).toFixed(2).replace('.', ',');
                    precoParcelado = `10x de R$ ${parcela10x} sem juros`;
                }

                let tagDestaque = "Pronta Entrega";
                if (chunk.includes('rufer-badge-mounted')) {
                    tagDestaque = "Entregue Montado";
                } else if (chunk.includes('immediate-delivery') || chunk.includes('Em Estoque')) {
                    tagDestaque = "Em Estoque RJ";
                }

                const catNormalizada = normalizarCategoria(cat.url, titulo, cat.nome);
                const fabricante = extrairFabricante(titulo);
                const dimensoes = cacheDimensoes.get(idProduto) || extrairMedidasPrecisas('', titulo);
                const linkWhatsapp = gerarMensagemWhatsapp(titulo, fabricante, precoVendaFormatado, dimensoes);

                const itemData = {
                    id: idProduto,
                    titulo: titulo,
                    categoria: catNormalizada,
                    fabricante: fabricante,
                    imagem: imagemUrl,
                    imagemSecundaria: imagemSecundaria || imagemUrl,
                    precoCustoOriginal: precoCusto,
                    precoVenda: precoVenda,
                    precoVendaFormatado: precoVendaFormatado,
                    precoParcelado: precoParcelado,
                    tagDestaque: tagDestaque,
                    dimensoes: dimensoes,
                    linkOriginal: linkOriginal,
                    linkWhatsapp: linkWhatsapp
                };

                if (!mapaProdutos.has(idProduto)) {
                    mapaProdutos.set(idProduto, itemData);
                    novosNestaPagina++;
                } else {
                    const existente = mapaProdutos.get(idProduto);
                    if (existente.categoria === 'Outros Móveis' || existente.categoria === 'Novidades' || existente.categoria === 'Promocoes') {
                        existente.categoria = catNormalizada;
                    }
                }
            }

            console.log(`  -> Pág ${pagina}: ${qtdNaPagina} itens (${novosNestaPagina} novos únicos adicionados). Total: ${mapaProdutos.size}`);
            if (qtdNaPagina < 36) break; // Última página
            pagina++;
            await new Promise(r => setTimeout(r, 120));
        }
    }

    const listaFinal = Array.from(mapaProdutos.values());
    console.log('\n=====================================================');
    console.log(`FASE 1 CONCLUÍDA: ${listaFinal.length} produtos únicos coletados!`);
    console.log('=====================================================\n');

    // FASE 2: Enriquecer apenas os produtos que ainda não têm altura/profundidade no cache
    const pendentes = listaFinal.filter(p => !p.dimensoes.altura && !p.dimensoes.profundidade && p.linkOriginal);
    console.log(`FASE 2: Enriquecendo medidas para ${pendentes.length} produtos pendentes...`);

    const BATCH_SIZE = 15;
    let procCount = 0;
    for (let b = 0; b < pendentes.length; b += BATCH_SIZE) {
        const lote = pendentes.slice(b, b + BATCH_SIZE);
        await Promise.all(lote.map(async prod => {
            const pageRes = await fetchWithSession(prod.linkOriginal);
            if (pageRes && pageRes.data) {
                const novasDimensoes = extrairMedidasPrecisas(pageRes.data, prod.titulo);
                prod.dimensoes = novasDimensoes;
                prod.linkWhatsapp = gerarMensagemWhatsapp(prod.titulo, prod.fabricante, prod.precoVendaFormatado, novasDimensoes);
            }
            procCount++;
        }));
        process.stdout.write(`\rProgresso das medidas: ${procCount}/${pendentes.length} (${Math.round((procCount / (pendentes.length || 1)) * 100)}%)...`);
        await new Promise(r => setTimeout(r, 100));
    }
    console.log('\nMedidas concluídas!');

    // Salva produtos.json
    const caminhoJson = path.join(__dirname, 'produtos.json');
    fs.writeFileSync(caminhoJson, JSON.stringify(listaFinal, null, 2), 'utf8');
    console.log(`\n[OK] Arquivo JSON gerado: ${caminhoJson} (${listaFinal.length} produtos)`);

    // Salva produtos.js
    const caminhoJs = path.join(__dirname, 'produtos.js');
    const jsContent = `// Catálogo de Móveis extraído da Rufer\n// Atualizado em: ${new Date().toLocaleString('pt-BR')}\nwindow.CATALOGO_MOVEIS = ${JSON.stringify(listaFinal, null, 2)};\n`;
    fs.writeFileSync(caminhoJs, jsContent, 'utf8');
    console.log(`[OK] Arquivo JS gerado: ${caminhoJs}`);

    console.log('\nCatálogo completamente atualizado com sucesso!');
}

iniciarExtracao();
