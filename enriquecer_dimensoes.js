/**
 * SCRIPT DE ENRIQUECIMENTO DE DIMENSÕES
 * Percorre todos os produtos em produtos.json, acessa a página original da Rufer
 * e extrai com precisão as medidas reais (Largura, Altura, Profundidade/Comprimento).
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ARQ_JSON = path.join(__dirname, 'produtos.json');
const ARQ_JS = path.join(__dirname, 'produtos.js');
const WHATSAPP_NUMERO = "5521964551053";

function fetchPage(url) {
    return new Promise((resolve) => {
        try {
            const u = new URL(url);
            const options = {
                hostname: u.hostname,
                path: u.pathname + u.search,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8'
                },
                timeout: 10000
            };

            const req = https.get(options, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    return fetchPage(res.headers.location).then(resolve);
                }
                let data = '';
                res.setEncoding('utf-8');
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(data));
            });

            req.on('timeout', () => { req.destroy(); resolve(''); });
            req.on('error', () => resolve(''));
        } catch (e) {
            resolve('');
        }
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
        // 1. Remove scripts e styles para evitar falsos positivos
        const semScripts = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');

        // 2. Foca no bloco de descrição do produto se existir
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

    // Fallbacks pelo título se não encontrou na página
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

function gerarMensagemWhatsapp(item) {
    let dimTexto = '';
    const dims = item.dimensoes;
    if (dims) {
        const partes = [];
        if (dims.largura) partes.push(`Largura: ${dims.largura}`);
        if (dims.altura) partes.push(`Altura: ${dims.altura}`);
        if (dims.profundidade) partes.push(`Profundidade: ${dims.profundidade}`);
        if (partes.length > 0) {
            dimTexto = `📏 *Medidas:* ${partes.join(' | ')}\n`;
        }
    }

    const msg = encodeURIComponent(
        `Olá! Tenho interesse no seguinte móvel:\n\n` +
        `📦 *Produto:* ${item.titulo}\n` +
        `🏷️ *Fabricante:* ${item.fabricante}\n` +
        `💰 *Valor:* ${item.precoVendaFormatado}\n` +
        dimTexto +
        `\nGostaria de saber o prazo de entrega e formas de pagamento!`
    );

    return `https://wa.me/${WHATSAPP_NUMERO}?text=${msg}`;
}

async function sincronizarTodasDimensoes() {
    console.log('Lendo catálogo atual...');
    const produtos = JSON.parse(fs.readFileSync(ARQ_JSON, 'utf8'));
    console.log(`Total de produtos para processar: ${produtos.length}`);

    const CONCURRENCY = 15;
    let processados = 0;
    let comDimensoesCompletas = 0;
    const inicio = Date.now();

    for (let i = 0; i < produtos.length; i += CONCURRENCY) {
        const lote = produtos.slice(i, i + CONCURRENCY);
        
        await Promise.all(lote.map(async (prod) => {
            if (prod.linkOriginal) {
                const html = await fetchPage(prod.linkOriginal);
                const novasDimensoes = extrairMedidasPrecisas(html, prod.titulo);
                
                prod.dimensoes = novasDimensoes;
                prod.linkWhatsapp = gerarMensagemWhatsapp(prod);

                if (novasDimensoes.largura && novasDimensoes.altura && novasDimensoes.profundidade) {
                    comDimensoesCompletas++;
                }
            }
            processados++;
        }));

        process.stdout.write(`\rProgresso: ${processados}/${produtos.length} produtos analisados (${Math.round((processados / produtos.length) * 100)}%)...`);
    }

    console.log('\n\nSalvando produtos.json e produtos.js...');
    fs.writeFileSync(ARQ_JSON, JSON.stringify(produtos, null, 2), 'utf8');

    const jsContent = `// Catálogo de Móveis extraído da Rufer\n// Atualizado com dimensões completas em: ${new Date().toLocaleString('pt-BR')}\nwindow.CATALOGO_MOVEIS = ${JSON.stringify(produtos, null, 2)};\n`;
    fs.writeFileSync(ARQ_JS, jsContent, 'utf8');

    const tempoTotal = ((Date.now() - inicio) / 1000).toFixed(1);
    console.log(`\n=====================================================`);
    console.log(`ENRIQUECIMENTO CONCLUÍDO COM SUCESSO!`);
    console.log(`Tempo decorrido: ${tempoTotal}s`);
    console.log(`Produtos com medidas completas: ${comDimensoesCompletas}/${produtos.length}`);
    console.log(`=====================================================`);
}

sincronizarTodasDimensoes().catch(console.error);
