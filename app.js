/**
 * APLICAÇÃO DA VITRINE DE MÓVEIS RJ
 * Responsável por filtros, busca, ordenação, modal de detalhes,
 * carrinho de orçamentos e direcionamento para o WhatsApp (21) 96455-1053
 */

// Configurações e descrições detalhadas de cada categoria (Estilo Rufer)
const CATEGORIAS_CONFIG = {
  'todos': {
    titulo: 'Todos os Móveis no Atacado RJ',
    descricao: 'Explore nossa linha completa de móveis direto de fábrica para sala, quartos, cozinha e estofados com pronta entrega no Rio de Janeiro.',
    subcategorias: [
      { nome: 'Todos os Móveis', filtro: '' },
      { nome: 'Estofados & Sofás', filtro: 'sof[aá]|poltrona|estofado|chaise' },
      { nome: 'Sala de TV', filtro: 'rack|painel|home|bancada|caf[eé]|tv' },
      { nome: 'Quarto Casal', filtro: 'casal|queen|king|roupeiro' },
      { nome: 'Quarto Solteiro', filtro: 'solteiro' },
      { nome: 'Cozinha', filtro: 'cozinha|balc[aã]o|a[eé]reo|paneleiro' },
      { nome: 'Sala de Jantar', filtro: 'mesa|cadeira|buffet|aparador|jantar' }
    ]
  },
  'Estofados e Sofás': {
    titulo: 'Estofados no Atacado RJ',
    descricao: 'Oferecemos uma linha completa de sofás retráteis, modelos de canto, sofá-cama e poltronas para atender diferentes espaços, preferências e estilos.',
    subcategorias: [
      { nome: 'Estofados (Todos)', filtro: '' },
      { nome: 'Sofá Retrátil', filtro: 'retr[aá]til|reclin[aá]vel' },
      { nome: 'Sofá Retrátil sem Caixa', filtro: 'sem caixa' },
      { nome: 'Sofá 3 e 2 Lugares', filtro: 'lugares|3 e 2|3x2' },
      { nome: 'Sofá com Chaise', filtro: 'chaise' },
      { nome: 'Sofá de Canto', filtro: 'canto' },
      { nome: 'Sofá-cama', filtro: 'sof[aá]\\s*-?\\s*cama|cama' },
      { nome: 'Poltronas', filtro: 'poltrona' },
      { nome: 'Sofá por Cor', filtro: 'veludo|veludinho|linho|marrom|cinza|azul|preto|chumbo|grafite|bege|terracota' }
    ]
  },
  'Sala de TV': {
    titulo: 'Sala de TV no Atacado RJ',
    descricao: 'Encontre os melhores painéis para TV até 75", racks com detalhes ripados em 3D, bancadas e cantinhos do café com design elegante.',
    subcategorias: [
      { nome: 'Sala de TV (Todos)', filtro: '' },
      { nome: 'Painel para TV', filtro: 'painel' },
      { nome: 'Rack e Bancada', filtro: 'rack|bancada' },
      { nome: 'Home Suspenso', filtro: 'home' },
      { nome: 'Cantinho do Café', filtro: 'café|cafe' },
      { nome: 'Mesas de Apoio e Centro', filtro: 'apoio|centro|mesa' }
    ]
  },
  'Quarto Casal': {
    titulo: 'Quarto Casal no Atacado RJ',
    descricao: 'Guarda-roupas espaçosos de 6 a 10 portas com espelho e pés, camas casal resistentes, colchões ortopédicos e cômodas funcionais.',
    subcategorias: [
      { nome: 'Quarto Casal (Todos)', filtro: '' },
      { nome: 'Guarda-roupa Casal', filtro: 'guarda-roupa|roupeiro' },
      { nome: 'Cama Casal e Box', filtro: 'cama|box' },
      { nome: 'Colchão Casal', filtro: 'colchão|colchao' },
      { nome: 'Cômodas e Sapateiras', filtro: 'cômoda|comoda|sapateira' },
      { nome: 'Cabeceiras', filtro: 'cabeceira' }
    ]
  },
  'Quarto Solteiro': {
    titulo: 'Quarto Solteiro no Atacado RJ',
    descricao: 'Móveis práticos para quartos individuais e juvenis: roupeiros compactos, escrivaninhas para estudo, camas solteiro e colchões certificados.',
    subcategorias: [
      { nome: 'Quarto Solteiro (Todos)', filtro: '' },
      { nome: 'Guarda-roupa Solteiro', filtro: 'guarda-roupa|roupeiro' },
      { nome: 'Cama Solteiro e Box', filtro: 'cama|box' },
      { nome: 'Colchão Solteiro', filtro: 'colchão|colchao' },
      { nome: 'Escrivaninha e Mesa de Estudo', filtro: 'escrivaninha|office|mesa' },
      { nome: 'Penteadeira', filtro: 'penteadeira' }
    ]
  },
  'Mesa de Jantar': {
    titulo: 'Mesa de Jantar no Atacado RJ',
    descricao: 'Mesas de jantar sofisticadas de 4, 6 e 8 lugares, cadeiras confortáveis estofadas, bases e aparadores buffets para seu lar.',
    subcategorias: [
      { nome: 'Mesa de Jantar (Todos)', filtro: '' },
      { nome: 'Mesas de Jantar', filtro: 'mesa' },
      { nome: 'Mesa 4 Cadeiras', filtro: '4 cadeiras|4 cad' },
      { nome: 'Mesa 6 Cadeiras', filtro: '6 cadeiras|6 cad' },
      { nome: 'Cadeiras', filtro: 'cadeira' },
      { nome: 'Bases e Tampos', filtro: 'base|tampo' },
      { nome: 'Buffet e Aparador', filtro: 'buffet|aparador' }
    ]
  },
  'Sala de Jantar': {
    titulo: 'Mesa de Jantar no Atacado RJ',
    descricao: 'Mesas de jantar sofisticadas de 4, 6 e 8 lugares, cadeiras confortáveis estofadas, bases e aparadores buffets para seu lar.',
    subcategorias: [
      { nome: 'Mesa de Jantar (Todos)', filtro: '' },
      { nome: 'Mesas de Jantar', filtro: 'mesa' },
      { nome: 'Mesa 4 Cadeiras', filtro: '4 cadeiras|4 cad' },
      { nome: 'Mesa 6 Cadeiras', filtro: '6 cadeiras|6 cad' },
      { nome: 'Cadeiras', filtro: 'cadeira' },
      { nome: 'Bases e Tampos', filtro: 'base|tampo' },
      { nome: 'Buffet e Aparador', filtro: 'buffet|aparador' }
    ]
  },
  'Cozinha': {
    titulo: 'Cozinha no Atacado RJ',
    descricao: 'Armários aéreos funcionais, balcões de pia e cozinha, torres quentes para micro-ondas e fornos e cozinhas moduladas.',
    subcategorias: [
      { nome: 'Cozinha (Todos)', filtro: '' },
      { nome: 'Armários Aéreos', filtro: 'aéreo|aereo' },
      { nome: 'Balcões de Cozinha', filtro: 'balcão|balcao' },
      { nome: 'Torres Quentes e Paneleiros', filtro: 'torre|paneleiro' },
      { nome: 'Cozinha Completa', filtro: 'cozinha' }
    ]
  },
  'Novidades': {
    titulo: 'Novidades & Lançamentos RJ',
    descricao: 'Os lançamentos mais recentes do mercado com as tendências em ripado 3D, linho e cores contemporâneas.',
    subcategorias: [
      { nome: 'Todas as Novidades', filtro: '' },
      { nome: 'Lançamentos', filtro: 'lançamento|novo|tendência|2026' },
      { nome: 'Pronta Entrega RJ', filtro: 'pronta entrega|estoque' }
    ]
  },
  'Promocoes': {
    titulo: 'Promoções e Oportunidades',
    descricao: 'Móveis com valores especiais à vista e facilidade de pagamento em até 10x sem juros no cartão de crédito.',
    subcategorias: [
      { nome: 'Todas as Promoções', filtro: '' },
      { nome: 'Super Ofertas', filtro: 'oferta|promocao' },
      { nome: 'Melhores Preços', filtro: '' }
    ]
  },
  'Modulados': {
    titulo: 'Móveis Modulados no Atacado RJ',
    descricao: 'Armários e prateleiras modulares para compor seu ambiente sob medida com excelente aproveitamento de espaço.',
    subcategorias: [
      { nome: 'Todos os Modulados', filtro: '' },
      { nome: 'Armários Modulados', filtro: 'módulo|modulo|armário' },
      { nome: 'Prateleiras e Nichos', filtro: 'prateleira|nicho' }
    ]
  }
};

// Estado Global
const STATE = {
  produtos: [],
  produtosFiltrados: [],
  categoriaAtiva: 'todos',
  subcategoriaAtiva: null,
  precoMaximo: 4000,
  somentePromocoes: false,
  termoBusca: '',
  ordenacao: 'padrao',
  colunasGrid: typeof window !== 'undefined' && window.innerWidth <= 768 ? 2 : 3,
  colunaAlteradaManualmente: false,
  itensPorPagina: 36,
  limiteExibicao: 36,
  carrinho: JSON.parse(localStorage.getItem('orcamento_moveis') || '[]'),
  whatsappNumero: '5521964551053'
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  configurarEventos();
  atualizarInterfaceCarrinho();
});

// Carrega os produtos de produtos.js ou produtos.json
async function carregarProdutos() {
  const counterEl = document.getElementById('productCounter');
  
  // Prioridade 1: Dados carregados diretamente pelo script produtos.js
  if (window.CATALOGO_MOVEIS && Array.isArray(window.CATALOGO_MOVEIS) && window.CATALOGO_MOVEIS.length > 0) {
    STATE.produtos = window.CATALOGO_MOVEIS;
    inicializarCatalogo();
    return;
  }

  // Prioridade 2: Tentar fetch caso esteja rodando sob um servidor local
  try {
    const res = await fetch('produtos.json');
    if (res.ok) {
      STATE.produtos = await res.json();
      inicializarCatalogo();
      return;
    }
  } catch (err) {
    console.warn('Fetch local falhou, aguardando dados globais...', err);
  }

  counterEl.textContent = 'Não foi possível carregar os produtos. Execute atualizar_catalogo.bat para gerar a lista.';
}

function inicializarCatalogo() {
  renderizarSidebarCategorias();
  atualizarBannerCategoria();
  aplicarFiltros();
}

// Configuração dos ouvintes de eventos da interface
function configurarEventos() {
  // 1. Abas de Categorias Superiores (Tabs)
  const tabs = document.querySelectorAll('.cat-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const cat = e.currentTarget.dataset.category;
      selecionarCategoria(cat, null);
    });
  });

  // 2. Subitens do Menu Suspenso (Dropdown)
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const cat = e.currentTarget.dataset.category;
      const sub = e.currentTarget.dataset.sub;
      selecionarCategoria(cat, sub);
    });
  });

  // 3. Campo de Pesquisa
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  searchInput.addEventListener('input', (e) => {
    STATE.termoBusca = e.target.value.toLowerCase().trim();
    clearBtn.style.display = STATE.termoBusca ? 'block' : 'none';
    aplicarFiltros();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    STATE.termoBusca = '';
    clearBtn.style.display = 'none';
    aplicarFiltros();
    searchInput.focus();
  });

  // 4. Seletor de Ordenação
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    STATE.ordenacao = e.target.value;
    aplicarOrdenacao();
    renderizarProdutos();
  });

  // 5. Alternador de Colunas da Grade (2, 3, 4 colunas)
  const viewBtns = document.querySelectorAll('.btn-view');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      viewBtns.forEach(b => b.classList.remove('active'));
      const t = e.currentTarget;
      t.classList.add('active');
      const cols = t.dataset.cols;
      const grid = document.getElementById('productsGrid');
      grid.classList.remove('cols-2', 'cols-3', 'cols-4');
      grid.classList.add(`cols-${cols}`);
      STATE.colunasGrid = parseInt(cols, 10);
      STATE.colunaAlteradaManualmente = true;
    });
  });

  // Aplica colunas padrão por dispositivo: 2 no mobile (<=768px), 3 no desktop
  aplicarColunasIniciais();
  window.addEventListener('resize', () => {
    if (!STATE.colunaAlteradaManualmente) {
      aplicarColunasIniciais();
    }
  });

  // 6. Slider de Faixa de Preço
  const priceInput = document.getElementById('priceRangeInput');
  const priceMaxLabel = document.getElementById('priceMaxLabel');
  const promoCheckbox = document.getElementById('onlyPromoCheckbox');
  const btnFilter = document.getElementById('btnApplyPriceFilter');

  if (priceInput) {
    priceInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      priceMaxLabel.textContent = 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    });
  }

  if (btnFilter) {
    btnFilter.addEventListener('click', () => {
      STATE.precoMaximo = parseFloat(priceInput.value);
      STATE.somentePromocoes = promoCheckbox ? promoCheckbox.checked : false;
      aplicarFiltros();
      fecharFiltrosMobile();
    });
  }

  // 7. Botão Mobile para Abrir/Fechar Filtros (drawer lateral)
  const btnMobileFilter = document.getElementById('btnToggleMobileFilter');
  if (btnMobileFilter) {
    btnMobileFilter.addEventListener('click', abrirFiltrosMobile);
  }

  const btnCloseMobile = document.getElementById('btnCloseMobileFilter');
  if (btnCloseMobile) {
    btnCloseMobile.addEventListener('click', fecharFiltrosMobile);
  }

  // 8. Botão Limpar Filtros do Estado Vazio
  document.getElementById('btnResetFilters').addEventListener('click', () => {
    selecionarCategoria('todos', null);
    searchInput.value = '';
    STATE.termoBusca = '';
    STATE.precoMaximo = 4000;
    if (priceInput) priceInput.value = 4000;
    if (priceMaxLabel) priceMaxLabel.textContent = 'R$ 4.000,00';
    if (promoCheckbox) promoCheckbox.checked = false;
    STATE.somentePromocoes = false;
    clearBtn.style.display = 'none';
    STATE.limiteExibicao = STATE.itensPorPagina;
    aplicarFiltros();
  });

  // 8.1. Botão Carregar Mais Móveis (Paginação Progressiva)
  const btnLoadMore = document.getElementById('btnLoadMore');
  if (btnLoadMore) {
    btnLoadMore.addEventListener('click', () => {
      STATE.limiteExibicao += STATE.itensPorPagina;
      renderizarProdutos();
    });
  }

  // 9. Modal de Detalhes
  document.getElementById('btnCloseModal').addEventListener('click', fecharModal);
  document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') fecharModal();
  });

  // 10. Drawer do Carrinho
  document.getElementById('btnOpenCart').addEventListener('click', abrirCarrinho);
  document.getElementById('btnCloseCart').addEventListener('click', fecharCarrinho);
  document.getElementById('cartDrawerOverlay').addEventListener('click', fecharCarrinho);
  document.getElementById('btnClearCart').addEventListener('click', esvaziarCarrinho);

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fecharModal();
      fecharCarrinho();
      document.getElementById('catalogSidebar').classList.remove('mobile-open');
    }
  });

  // 11. Overdrive: Ativa motor de inclinação 3D e reflexo dinâmico nos cards
  inicializarEfeitos3DOverdrive();
}

// Aplica colunas padrão por dispositivo: 2 no mobile (<=768px), 3 no desktop
function aplicarColunasIniciais() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const isMobile = window.innerWidth <= 768;
  const cols = isMobile ? '2' : '3';
  STATE.colunasGrid = parseInt(cols, 10);

  grid.classList.remove('cols-2', 'cols-3', 'cols-4');
  grid.classList.add(`cols-${cols}`);

  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cols === cols);
  });
}

// Seleciona Categoria e opcionalmente Subcategoria
function selecionarCategoria(categoria, subNome) {
  STATE.categoriaAtiva = categoria;

  const cfg = CATEGORIAS_CONFIG[categoria] || CATEGORIAS_CONFIG['todos'];
  if (subNome) {
    const sLower = subNome.toLowerCase();
    const achado = (cfg.subcategorias || []).find(s => {
      const nameLower = s.nome.toLowerCase();
      return nameLower === sLower || nameLower.includes(sLower) || sLower.includes(nameLower);
    });
    STATE.subcategoriaAtiva = achado || { nome: subNome, filtro: subNome };
  } else {
    STATE.subcategoriaAtiva = null;
  }

  // Atualiza classe ativa nas tabs superiores
  document.querySelectorAll('.cat-tab').forEach(tab => {
    if (tab.dataset.category === categoria) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Atualiza classe ativa nos dropdown items
  document.querySelectorAll('.dropdown-item').forEach(item => {
    if (subNome && item.dataset.category === categoria && (item.dataset.sub === subNome || (STATE.subcategoriaAtiva && item.dataset.sub === STATE.subcategoriaAtiva.nome))) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  renderizarSidebarCategorias();
  atualizarBannerCategoria();
  aplicarFiltros();
}

// Alterna subcategoria pelo checkbox do sidebar lateral (Igual ao print)
function selecionarSubcategoriaPorSidebar(subNome) {
  const cfg = CATEGORIAS_CONFIG[STATE.categoriaAtiva] || CATEGORIAS_CONFIG['todos'];
  const sLower = subNome.toLowerCase();
  const achado = (cfg.subcategorias || []).find(s => {
    const nameLower = s.nome.toLowerCase();
    return nameLower === sLower || nameLower.includes(sLower) || sLower.includes(nameLower);
  });

  if (STATE.subcategoriaAtiva && STATE.subcategoriaAtiva.nome === subNome) {
    // Se já estava selecionado, volta para todos da categoria
    STATE.subcategoriaAtiva = null;
  } else {
    STATE.subcategoriaAtiva = achado || { nome: subNome, filtro: subNome };
  }

  // Atualiza dropdown items correspondentes
  document.querySelectorAll('.dropdown-item').forEach(item => {
    if (STATE.subcategoriaAtiva && item.dataset.category === STATE.categoriaAtiva && 
       (item.dataset.sub === STATE.subcategoriaAtiva.nome || (achado && item.dataset.sub === achado.nome))) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  renderizarSidebarCategorias();
  atualizarBannerCategoria();
  aplicarFiltros();
}

// Atualiza o Cabeçalho Informativo acima da grade
function atualizarBannerCategoria() {
  const cfg = CATEGORIAS_CONFIG[STATE.categoriaAtiva] || CATEGORIAS_CONFIG['todos'];
  const bannerTitle = document.getElementById('categoryBannerTitle');
  const bannerDesc = document.getElementById('categoryBannerDesc');

  if (STATE.subcategoriaAtiva && STATE.subcategoriaAtiva.nome && STATE.subcategoriaAtiva.filtro) {
    bannerTitle.innerHTML = `${cfg.titulo.split(' no')[0]} &rsaquo; <span>${escapeHtml(STATE.subcategoriaAtiva.nome)}</span>`;
  } else {
    bannerTitle.textContent = cfg.titulo;
  }

  bannerDesc.textContent = cfg.descricao;
}

// Renderiza a lista de categorias e subcategorias na barra lateral com checkboxes
function renderizarSidebarCategorias() {
  const container = document.getElementById('sidebarCategoryList');
  if (!container) return;

  const cfg = CATEGORIAS_CONFIG[STATE.categoriaAtiva] || CATEGORIAS_CONFIG['todos'];
  const subs = cfg.subcategorias || [];

  container.innerHTML = subs.map((sub, idx) => {
    const isChecked = (!STATE.subcategoriaAtiva && idx === 0) || 
                      (STATE.subcategoriaAtiva && STATE.subcategoriaAtiva.nome === sub.nome);

    return `
      <label class="sidebar-checkbox-item ${isChecked ? 'active' : ''}">
        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="selecionarSubcategoriaPorSidebar('${escapeHtml(sub.nome)}')">
        <span>${escapeHtml(sub.nome)}</span>
      </label>
    `;
  }).join('');
}

// Alterna colapso do card na barra lateral (+ / -)
function toggleSidebarSection(headerEl) {
  const content = headerEl.nextElementSibling;
  const icon = headerEl.querySelector('.collapse-icon');
  if (content.style.display === 'none') {
    content.style.display = 'block';
    icon.innerHTML = '&minus;';
  } else {
    content.style.display = 'none';
    icon.innerHTML = '&#43;';
  }
}

// Aplica filtros combinados (categoria, subcategoria, preço, busca)
function aplicarFiltros() {
  STATE.limiteExibicao = STATE.itensPorPagina;
  let itens = [...STATE.produtos];

  // 1. Filtro por Categoria Principal
  if (STATE.categoriaAtiva !== 'todos') {
    const catFiltro = STATE.categoriaAtiva.toLowerCase();
    if (STATE.categoriaAtiva === 'Novidades') {
      itens = itens.filter(i => (i.tagDestaque || '').toLowerCase().includes('estoque') || (i.tagDestaque || '').toLowerCase().includes('pronta'));
    } else if (STATE.categoriaAtiva === 'Promocoes') {
      itens = itens.filter(i => (i.precoCustoOriginal > 0 && i.precoVenda > 0));
    } else {
      itens = itens.filter(item => {
        const cat = (item.categoria || '').toLowerCase();
        const tit = (item.titulo || '').toLowerCase();

        if (catFiltro.includes('estofado') || catFiltro.includes('sofá') || catFiltro.includes('sofa')) {
          return cat.includes('estofado') || cat.includes('sof') || /sof[aá]|poltrona|estofado|chaise|recamier/i.test(tit);
        }
        if (catFiltro.includes('jantar')) {
          return cat.includes('jantar') || cat.includes('mesa') || /mesa|cadeira|buffet|aparador/i.test(tit);
        }
        if (catFiltro.includes('tv') || catFiltro.includes('sala')) {
          return cat.includes('tv') || cat.includes('sala') || /rack|painel|home|bancada|caf[eé]/i.test(tit);
        }
        if (catFiltro.includes('casal')) {
          return cat.includes('casal') || /casal|queen|king|roupeiro/i.test(tit);
        }
        if (catFiltro.includes('solteiro')) {
          return cat.includes('solteiro') || /solteiro/i.test(tit);
        }
        if (catFiltro.includes('cozinha')) {
          return cat.includes('cozinha') || /cozinha|balc[aã]o|a[eé]reo|paneleiro/i.test(tit);
        }
        if (catFiltro.includes('escrit')) {
          return cat.includes('escrit') || /escrivaninha|computador|office|multiuso/i.test(tit);
        }
        if (catFiltro.includes('modulad')) {
          return cat.includes('modulad') || /m[oó]dulo|modulado/i.test(tit);
        }
        return cat.includes(catFiltro) || tit.includes(catFiltro);
      });
    }
  }

  // 2. Filtro por Subcategoria Específica
  if (STATE.subcategoriaAtiva && STATE.subcategoriaAtiva.filtro) {
    const regex = new RegExp(STATE.subcategoriaAtiva.filtro, 'i');
    itens = itens.filter(item => {
      const texto = `${item.titulo} ${item.categoria}`.toLowerCase();
      return regex.test(texto);
    });
  }

  // 3. Filtro por Preço Máximo
  if (STATE.precoMaximo && STATE.precoMaximo < 4000) {
    itens = itens.filter(item => (item.precoVenda || 0) <= STATE.precoMaximo);
  }

  // 4. Somente Promoções / Pronta Entrega
  if (STATE.somentePromocoes) {
    itens = itens.filter(item => item.tagDestaque && (item.tagDestaque.includes('Estoque') || item.tagDestaque.includes('Pronta')));
  }

  // 5. Filtro por Busca de Texto
  if (STATE.termoBusca) {
    itens = itens.filter(item => {
      const texto = `${item.titulo} ${item.fabricante} ${item.categoria}`.toLowerCase();
      return texto.includes(STATE.termoBusca);
    });
  }

  STATE.produtosFiltrados = itens;
  aplicarOrdenacao();
  renderizarProdutos();
}

// Ordena a lista filtrada
function aplicarOrdenacao() {
  switch (STATE.ordenacao) {
    case 'menor-preco':
      STATE.produtosFiltrados.sort((a, b) => (a.precoVenda || 0) - (b.precoVenda || 0));
      break;
    case 'maior-preco':
      STATE.produtosFiltrados.sort((a, b) => (b.precoVenda || 0) - (a.precoVenda || 0));
      break;
    case 'nome-az':
      STATE.produtosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
      break;
    default:
      // Mantém a ordem original ou de relevância
      break;
  }
}

// Gera o link de WhatsApp para um produto individual com observação de frete/montagem sob consulta
function gerarLinkWhatsappProduto(item) {
  const preco = item.precoVendaFormatado || 'Consulte';
  const dims = item.dimensoes || {};
  let medidas = '';
  if (dims.largura || dims.altura || dims.profundidade) {
    const parts = [];
    if (dims.largura) parts.push(`Largura: ${dims.largura}`);
    if (dims.altura) parts.push(`Altura: ${dims.altura}`);
    if (dims.profundidade) parts.push(`Profundidade: ${dims.profundidade}`);
    medidas = `📏 *Medidas:* ${parts.join(' | ')}\n`;
  }

  const msg = 
    `Olá! Tenho interesse neste móvel do catálogo:\n\n` +
    `📦 *Produto:* ${item.titulo}\n` +
    `🏷️ *Fabricante:* ${item.fabricante || 'Móveis H.R'}\n` +
    `💰 *Valor anunciado:* ${preco}\n` +
    medidas +
    `\n⚠️ *Obs.:* Estou ciente de que frete e montagem não estão inclusos no valor do móvel e são sob consulta por região.\n` +
    `📍 *Poderia informar o valor do frete e montagem para:*\nBairro / CEP: [informe seu bairro ou CEP]`;

  return `https://wa.me/${STATE.whatsappNumero}?text=${encodeURIComponent(msg)}`;
}

// Renderiza os cards de produtos na grade com Paginação Progressiva
function renderizarProdutos() {
  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');
  const counterEl = document.getElementById('productCounter');
  const pagContainer = document.getElementById('paginationContainer');
  const pagInfo = document.getElementById('paginationInfo');

  const total = STATE.produtosFiltrados.length;
  const exibidos = Math.min(STATE.limiteExibicao, total);
  counterEl.textContent = `${exibidos} de ${total} móve${total === 1 ? 'l' : 'is'} com preço`;

  if (total === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    if (pagContainer) pagContainer.style.display = 'none';
    return;
  }

  empty.style.display = 'none';

  const visiveis = STATE.produtosFiltrados.slice(0, STATE.limiteExibicao);

  const cardsHtml = visiveis.map((item, index) => {
    const precoFormatado = item.precoVendaFormatado || 'Consulte';
    const parcela = item.precoParcelado ? `<div class="price-installments">${item.precoParcelado}</div>` : '';
    
    // Medidas resumidas na vitrine
    let dimTexto = '';
    if (item.dimensoes) {
      const parts = [];
      if (item.dimensoes.largura) parts.push(`L: ${item.dimensoes.largura}`);
      if (item.dimensoes.altura) parts.push(`A: ${item.dimensoes.altura}`);
      if (item.dimensoes.profundidade) parts.push(`P: ${item.dimensoes.profundidade}`);
      if (parts.length > 0) {
        dimTexto = `<div class="card-meta-dim" title="Largura | Altura | Profundidade"><i class="fa-solid fa-ruler-combined"></i> ${parts.join(' &bull; ')}</div>`;
      }
    }

    const tagClass = item.tagDestaque && item.tagDestaque.includes('Montado') ? 'mounted' : 'stock';
    const foto = item.imagem || 'https://via.placeholder.com/400?text=Sem+Foto';
    const linkWpp = gerarLinkWhatsappProduto(item);

    return `
      <div class="product-card" data-id="${item.id}">
        <div class="card-thumbnail-area" onclick="abrirModalPorId('${item.id}')">
          <span class="product-tag ${tagClass}">${item.tagDestaque || 'Pronta Entrega'}</span>
          <img class="product-image" src="${foto}" alt="${escapeHtml(item.titulo)}" loading="lazy" onerror="this.src='https://via.placeholder.com/400?text=Foto+Indisponivel'">
          <div class="card-sheen"></div>
          <button class="btn-card-quickview" type="button" onclick="abrirModalPorId('${item.id}')"><i class="fa-solid fa-eye"></i> Ver detalhes</button>
        </div>

        <div class="card-info">
          <span class="card-category">${escapeHtml(item.fabricante || item.categoria)}</span>
          <h3 class="card-title" onclick="abrirModalPorId('${item.id}')" title="${escapeHtml(item.titulo)}">
            ${escapeHtml(item.titulo)}
          </h3>

          ${dimTexto}

          <div class="card-price-area">
            <div class="price-retail">
              <span class="value">${precoFormatado}</span>
            </div>
            ${parcela}
          </div>

          <div class="card-actions">
            <a href="${linkWpp}" target="_blank" class="btn-card-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> Pedir no WhatsApp
            </a>
            
            <div class="card-sub-actions">
              <button class="btn-card-details" onclick="abrirModalPorId('${item.id}')" type="button">
                <i class="fa-solid fa-circle-info"></i> Ver detalhes
              </button>
              <button class="btn-card-add-cart" onclick="adicionarAoCarrinho('${item.id}')" title="Salvar no orçamento" type="button">
                <i class="fa-solid fa-cart-plus"></i> Salvar
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = cardsHtml;

  // Atualiza botão e mensagem de Paginação Progressiva
  if (pagContainer) {
    if (STATE.limiteExibicao < total) {
      pagContainer.style.display = 'flex';
      const restantes = total - STATE.limiteExibicao;
      if (pagInfo) {
        pagInfo.textContent = `Mostrando ${exibidos} de ${total} — faltam ${restantes} móve${restantes === 1 ? 'l' : 'is'}`;
      }
    } else {
      pagContainer.style.display = 'none';
    }
  }
}

// Variável global para rastrear o card de origem do modal para View Transitions
let activeModalCardId = null;

function isElementInViewport(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  return rect.top < windowHeight && rect.bottom > 0 && rect.left < windowWidth && rect.right > 0;
}

// Modal de Detalhes do Móvel com Transição Cinematográfica (View Transitions API)
function abrirModalPorId(id) {
  const item = STATE.produtos.find(p => String(p.id) === String(id));
  if (!item) return;

  activeModalCardId = id;
  const card = document.querySelector(`.product-card[data-id="${id}"]`);
  const cardImg = card ? card.querySelector('.product-image') : null;
  const modal = document.getElementById('productModal');
  const mainImg = document.getElementById('modalMainImage');

  const montarConteudoModal = () => {
    // Imagem principal e miniaturas
    mainImg.src = item.imagem || '';
    
    const badgeEl = document.getElementById('modalBadge');
    badgeEl.textContent = item.tagDestaque || 'Pronta Entrega';

    const thumbsContainer = document.getElementById('modalThumbnails');
    thumbsContainer.innerHTML = '';

    const fotos = [item.imagem];
    if (item.imagemSecundaria && item.imagemSecundaria !== item.imagem) {
      fotos.push(item.imagemSecundaria);
    }

    fotos.forEach((foto, i) => {
      const imgEl = document.createElement('img');
      imgEl.src = foto;
      imgEl.className = `thumb-item ${i === 0 ? 'active' : ''}`;
      imgEl.onclick = () => {
        mainImg.src = foto;
        document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        imgEl.classList.add('active');
      };
      thumbsContainer.appendChild(imgEl);
    });

    // Textos
    document.getElementById('modalCategory').textContent = item.categoria || 'Móveis';
    document.getElementById('modalManufacturer').textContent = item.fabricante || '';
    document.getElementById('modalTitle').textContent = item.titulo;
    
    // Preço
    const precoPuro = item.precoVendaFormatado ? item.precoVendaFormatado.replace('R$', '').trim() : '0,00';
    document.getElementById('modalPriceVal').textContent = precoPuro;
    document.getElementById('modalInstallment').textContent = item.precoParcelado || 'em até 10x sem juros no cartão';

    // Dimensões
    const dims = item.dimensoes || {};
    document.getElementById('dimLargura').textContent = dims.largura || 'Sob consulta';
    document.getElementById('dimAltura').textContent = dims.altura || 'Sob consulta';
    document.getElementById('dimProfundidade').textContent = dims.profundidade || 'Sob consulta';

    // Botão de compra no WhatsApp com aviso de frete e montagem sob consulta
    const buyBtn = document.getElementById('modalBuyWhatsappBtn');
    buyBtn.href = gerarLinkWhatsappProduto(item);

    // Botão de Adicionar ao Carrinho
    const addCartBtn = document.getElementById('modalAddToCartBtn');
    addCartBtn.onclick = () => {
      adicionarAoCarrinho(item.id);
      fecharModal();
      abrirCarrinho();
    };

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  // Se o navegador suporta View Transitions, faz a foto voar suavemente do card para o modal
  if (document.startViewTransition && cardImg) {
    cardImg.style.viewTransitionName = 'hero-furniture-image';
    const transition = document.startViewTransition(() => {
      cardImg.style.viewTransitionName = '';
      mainImg.style.viewTransitionName = 'hero-furniture-image';
      montarConteudoModal();
    });
    transition.finished.finally(() => {
      mainImg.style.viewTransitionName = '';
    });
  } else {
    montarConteudoModal();
  }
}

function fecharModal() {
  const modal = document.getElementById('productModal');
  const mainImg = document.getElementById('modalMainImage');
  const card = activeModalCardId ? document.querySelector(`.product-card[data-id="${activeModalCardId}"]`) : null;
  const cardImg = card ? card.querySelector('.product-image') : null;

  const ocultarModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  // Se o card de origem ainda estiver no campo de visão, a foto retorna elegantemente ao card
  if (document.startViewTransition && cardImg && isElementInViewport(card)) {
    mainImg.style.viewTransitionName = 'hero-furniture-image';
    const transition = document.startViewTransition(() => {
      mainImg.style.viewTransitionName = '';
      cardImg.style.viewTransitionName = 'hero-furniture-image';
      ocultarModal();
    });
    transition.finished.finally(() => {
      cardImg.style.viewTransitionName = '';
      activeModalCardId = null;
    });
  } else {
    ocultarModal();
    activeModalCardId = null;
  }
}

// ==========================================================================
// OVERDRIVE: MOTOR DE PARALLAX 3D E REFLEXO DINÂMICO NOS CARDS (60 FPS)
// ==========================================================================
function inicializarEfeitos3DOverdrive() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Só ativa efeito de inclinação física com mouse em desktop (poupa bateria e touch no mobile)
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  let currentCard = null;
  let rafId = null;
  let mouseX = 0;
  let mouseY = 0;
  let cardRect = null;

  function updateCardTransform() {
    if (!currentCard || !cardRect) return;

    const px = Math.min(Math.max((mouseX - cardRect.left) / cardRect.width, 0), 1);
    const py = Math.min(Math.max((mouseY - cardRect.top) / cardRect.height, 0), 1);

    // Inclinação física com centro de massa suave (max 7.5 graus)
    const tiltX = (0.5 - py) * 9;
    const tiltY = (px - 0.5) * 9;

    const imgOffsetX = (px - 0.5) * 14;
    const imgOffsetY = (py - 0.5) * 14;

    currentCard.style.setProperty('--sheen-x', `${(px * 100).toFixed(1)}%`);
    currentCard.style.setProperty('--sheen-y', `${(py * 100).toFixed(1)}%`);
    currentCard.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-8px)`;

    const img = currentCard.querySelector('.product-image');
    if (img) {
      img.style.transform = `scale(1.08) translate3d(${imgOffsetX.toFixed(1)}px, ${imgOffsetY.toFixed(1)}px, 20px)`;
    }

    rafId = null;
  }

  grid.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) {
      if (currentCard) resetCard(currentCard);
      currentCard = null;
      return;
    }

    if (currentCard !== card) {
      if (currentCard) resetCard(currentCard);
      currentCard = card;
      cardRect = card.getBoundingClientRect();
      currentCard.classList.add('card-tilting');
    }

    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!rafId) {
      rafId = requestAnimationFrame(updateCardTransform);
    }
  }, { passive: true });

  grid.addEventListener('mouseleave', () => {
    if (currentCard) {
      resetCard(currentCard);
      currentCard = null;
    }
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  function resetCard(card) {
    card.classList.remove('card-tilting');
    card.style.transform = '';
    card.style.removeProperty('--sheen-x');
    card.style.removeProperty('--sheen-y');
    const img = card.querySelector('.product-image');
    if (img) {
      img.style.transform = '';
    }
  }
}

// Carrinho de Orçamentos
function adicionarAoCarrinho(id) {
  const item = STATE.produtos.find(p => String(p.id) === String(id));
  if (!item) return;

  const existente = STATE.carrinho.find(c => String(c.id) === String(id));
  if (existente) {
    existente.quantidade += 1;
  } else {
    STATE.carrinho.push({
      id: item.id,
      titulo: item.titulo,
      precoVenda: item.precoVenda || 0,
      precoVendaFormatado: item.precoVendaFormatado || 'Consulte',
      imagem: item.imagem,
      quantidade: 1
    });
  }

  salvarCarrinho();
  atualizarInterfaceCarrinho();
  animarBotaoCarrinho();
}

function alterarQuantidadeItem(id, delta) {
  const item = STATE.carrinho.find(c => String(c.id) === String(id));
  if (!item) return;

  item.quantidade += delta;
  if (item.quantidade <= 0) {
    STATE.carrinho = STATE.carrinho.filter(c => String(c.id) !== String(id));
  }

  salvarCarrinho();
  atualizarInterfaceCarrinho();
}

function removerItemCarrinho(id) {
  STATE.carrinho = STATE.carrinho.filter(c => String(c.id) !== String(id));
  salvarCarrinho();
  atualizarInterfaceCarrinho();
}

function esvaziarCarrinho() {
  STATE.carrinho = [];
  salvarCarrinho();
  atualizarInterfaceCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem('orcamento_moveis', JSON.stringify(STATE.carrinho));
}

function atualizarInterfaceCarrinho() {
  const badge = document.getElementById('cartCountBadge');
  const totalHeader = document.getElementById('cartTotalHeader');
  const totalFooter = document.getElementById('cartTotalFooter');
  const itemsContainer = document.getElementById('cartItemsList');
  const finishBtn = document.getElementById('btnFinishOrderWhatsapp');

  const totalItens = STATE.carrinho.reduce((acc, cur) => acc + cur.quantidade, 0);
  const valorTotal = STATE.carrinho.reduce((acc, cur) => acc + (cur.precoVenda * cur.quantidade), 0);
  const valorFormatado = 'R$ ' + valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  badge.textContent = totalItens;
  totalHeader.textContent = valorFormatado;
  totalFooter.textContent = valorFormatado;

  const clearCartBtn = document.getElementById('btnClearCart');

  if (STATE.carrinho.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: #94a3b8;">
        <i class="fa-solid fa-basket-shopping" style="font-size: 40px; margin-bottom: 12px; color: #cbd5e1;"></i>
        <p style="font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 4px;">Seu orçamento está vazio</p>
        <span style="font-size: 12.5px; color: #94a3b8;">Clique em "Salvar" nos produtos para montar sua lista.</span>
      </div>
    `;
    finishBtn.style.opacity = '0.5';
    finishBtn.style.pointerEvents = 'none';
    if (clearCartBtn) clearCartBtn.disabled = true;
    return;
  }

  if (clearCartBtn) clearCartBtn.disabled = false;
  finishBtn.style.opacity = '1';
  finishBtn.style.pointerEvents = 'auto';

  // Monta lista de itens do carrinho
  itemsContainer.innerHTML = STATE.carrinho.map(item => `
    <div class="drawer-item">
      <img class="drawer-item-img" src="${item.imagem}" alt="${escapeHtml(item.titulo)}" onerror="this.src='https://via.placeholder.com/80?text=Movel'">
      <div class="drawer-item-info">
        <h4 class="drawer-item-title">${escapeHtml(item.titulo)}</h4>
        <div class="drawer-item-price">${item.precoVendaFormatado}</div>
        <div class="drawer-qty-ctrl">
          <button class="qty-btn" onclick="alterarQuantidadeItem('${item.id}', -1)" aria-label="Diminuir quantidade">&minus;</button>
          <span class="qty-num" aria-label="Quantidade: ${item.quantidade}">${item.quantidade}</span>
          <button class="qty-btn" onclick="alterarQuantidadeItem('${item.id}', 1)" aria-label="Aumentar quantidade">&#43;</button>
        </div>
      </div>
      <button class="btn-drawer-remove" onclick="removerItemCarrinho('${item.id}')" title="Remover item do orçamento" aria-label="Remover ${escapeHtml(item.titulo)} do orçamento">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  // Monta mensagem do WhatsApp com todos os itens do orçamento
  let textoWhatsapp = `Olá! Gostaria de solicitar um orçamento para os seguintes móveis da Móveis H.R:\n\n`;
  STATE.carrinho.forEach((item, index) => {
    textoWhatsapp += `${index + 1}. *${item.titulo}*\n   ${item.quantidade}x — Unitário: ${item.precoVendaFormatado}\n\n`;
  });
  textoWhatsapp += `💰 *Subtotal (só os móveis, sem frete):* ${valorFormatado}\n\n`;
  textoWhatsapp += `⚠️ *Obs.:* Estou ciente de que frete e montagem não estão inclusos e são sob consulta por região e produto.\n\n`;
  textoWhatsapp += `📍 *Poderia informar o frete e montagem para o meu endereço?*\nBairro / CEP: [informe seu bairro ou CEP]`;

  finishBtn.href = `https://wa.me/${STATE.whatsappNumero}?text=${encodeURIComponent(textoWhatsapp)}`;
}

function abrirCarrinho() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartDrawerOverlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function fecharCarrinho() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartDrawerOverlay').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function animarBotaoCarrinho() {
  const btn = document.getElementById('btnOpenCart');
  btn.style.transform = 'scale(1.1)';
  setTimeout(() => {
    btn.style.transform = '';
  }, 200);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

/* ==========================================================================
   DRAWER DE FILTROS MOBILE
   ========================================================================== */
function abrirFiltrosMobile() {
  const sidebar = document.getElementById('catalogSidebar');
  if (!sidebar) return;
  sidebar.classList.add('mobile-open');
  document.body.style.overflow = 'hidden';

  // Fechar ao clicar no overlay (fundo escuro — pseudo-element ::before)
  sidebar.addEventListener('click', fecharFiltrosMobilePorOverlay);
}

function fecharFiltrosMobile() {
  const sidebar = document.getElementById('catalogSidebar');
  if (!sidebar) return;
  sidebar.classList.remove('mobile-open');
  document.body.style.overflow = '';
  sidebar.removeEventListener('click', fecharFiltrosMobilePorOverlay);
}

function fecharFiltrosMobilePorOverlay(e) {
  // Fecha somente se o clique foi fora do painel (sidebar-inner)
  const inner = document.querySelector('#catalogSidebar .sidebar-inner');
  if (inner && !inner.contains(e.target)) {
    fecharFiltrosMobile();
  }
}

// Fechar filtros com Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharFiltrosMobile();
});
