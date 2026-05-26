import type { Locale } from './config';

export const SITE_URL = 'https://garoastudios.com';

/** OpenGraph locale codes for each app locale */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  br: 'pt_BR',
  es: 'es_ES',
  zh: 'zh_CN',
  ja: 'ja_JP',
};

/** HTML lang attribute / hreflang code for each app locale */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  br: 'pt-BR',
  es: 'es',
  zh: 'zh-Hans',
  ja: 'ja',
};

interface PageCopy {
  /** <title> — concise, keyword-led, under 60 chars */
  title: string;
  /** <meta description> — descriptive, under 160 chars, written to be useful to LLMs */
  description: string;
}

interface LocaleSeo {
  /** Brand-level tagline shown on the home page */
  brandTagline: string;
  home: PageCopy;
  games: PageCopy;
  press: PageCopy;
  jobs: PageCopy;
  links: PageCopy;
  /** Per-game descriptions (richer than the on-page blurb, kept under 160 chars) */
  gameMeta: Record<'rhythmania' | 'cartomante' | 'standByMe' | 'catLeatherJackets' | 'astroPig', PageCopy>;
}

export const SEO: Record<Locale, LocaleSeo> = {
  en: {
    brandTagline: 'Award-winning indie game studio from Rio de Janeiro, Brazil',
    home: {
      title: 'Garoa Studios — Indie Game Studio from Rio de Janeiro',
      description: 'Garoa Studios is an award-winning indie game developer based in Rio de Janeiro, Brazil, crafting experimental rhythm, narrative and puzzle games since 2018.',
    },
    games: {
      title: 'Our Games — Garoa Studios',
      description: 'Explore the full catalog of games by Garoa Studios — rhythm, narrative, physics and puzzle titles created in Rio de Janeiro and released on Steam, itch.io and Nuuvem.',
    },
    press: {
      title: 'Press & Media — Garoa Studios',
      description: 'Press kits, logos, screenshots and media coverage for Garoa Studios. Contact press@garoastudios.com for interviews and review copies.',
    },
    jobs: {
      title: 'Careers — Garoa Studios',
      description: 'Work with Garoa Studios, an award-winning indie game team in Rio de Janeiro. Follow us on social media for new openings.',
    },
    links: {
      title: 'Links — Garoa Studios',
      description: 'All the official links to Garoa Studios — stores, social networks and community channels in one place.',
    },
    gameMeta: {
      rhythmania: { title: 'RhythMania — Garoa Studios', description: 'RhythMania is a vibrant one-button rhythm anthology by Garoa Studios celebrating Brazilian musical styles. Coming soon to Steam and itch.io.' },
      cartomante: { title: 'Cartomante — Fortune Teller — Garoa Studios', description: 'A branching tarot-card visual novel with multiple endings. Read fortunes for eccentric clients. Available on Steam, itch.io and Nuuvem.' },
      standByMe: { title: 'Stand By Me — Garoa Studios', description: 'A colorful, groovy physics puzzle about caring for your friends, by Garoa Studios. Out now on Steam, itch.io and Nuuvem.' },
      catLeatherJackets: { title: 'Cat Leather Jackets — Garoa Studios', description: 'A graphic-novel-styled rhythm game about a teenage punk rock and ska punk band, by Garoa Studios. On Steam, itch.io and Nuuvem.' },
      astroPig: { title: 'Astro Pig — Garoa Studios', description: 'A 90s-inspired lo-fi adventure puzzle platformer about a piglet astronaut and his intelligent ship. Out now on Steam, itch.io and Nuuvem.' },
    },
  },
  br: {
    brandTagline: 'Estúdio independente premiado, do Rio de Janeiro',
    home: {
      title: 'Garoa Studios — Estúdio Indie de Jogos do Rio de Janeiro',
      description: 'A Garoa Studios é um estúdio independente premiado, sediado no Rio de Janeiro, criando jogos experimentais de ritmo, narrativa e puzzle desde 2018.',
    },
    games: {
      title: 'Nossos Jogos — Garoa Studios',
      description: 'Conheça todo o catálogo da Garoa Studios — jogos de ritmo, narrativa, física e puzzle feitos no Rio e lançados no Steam, itch.io e Nuuvem.',
    },
    press: {
      title: 'Imprensa — Garoa Studios',
      description: 'Press kits, logos, screenshots e cobertura de mídia da Garoa Studios. Fale com press@garoastudios.com para entrevistas e cópias de avaliação.',
    },
    jobs: {
      title: 'Vagas — Garoa Studios',
      description: 'Trabalhe com a Garoa Studios, estúdio indie premiado do Rio de Janeiro. Siga nossas redes sociais para saber de novas vagas.',
    },
    links: {
      title: 'Links — Garoa Studios',
      description: 'Todos os links oficiais da Garoa Studios — lojas, redes sociais e canais da comunidade em um só lugar.',
    },
    gameMeta: {
      rhythmania: { title: 'RitMania — Garoa Studios', description: 'RitMania é uma coletânea vibrante de minigames rítmicos de um botão com estilos musicais brasileiros, da Garoa Studios. Em breve no Steam e itch.io.' },
      cartomante: { title: 'Cartomante — Garoa Studios', description: 'Visual novel de tarô com múltiplos finais. Leia o destino de clientes excêntricos. Disponível no Steam, itch.io e Nuuvem.' },
      standByMe: { title: 'Stand By Me — Garoa Studios', description: 'Puzzle de física colorido e groovy sobre cuidar dos seus amigos, da Garoa Studios. Já disponível no Steam, itch.io e Nuuvem.' },
      catLeatherJackets: { title: 'Cat Leather Jackets — Garoa Studios', description: 'Jogo de ritmo em estilo graphic novel sobre uma banda adolescente de punk rock e ska, da Garoa Studios. No Steam, itch.io e Nuuvem.' },
      astroPig: { title: 'Astro Pig — Garoa Studios', description: 'Plataforma puzzle lo-fi com estética anos 90 sobre um porquinho astronauta e sua nave inteligente. No Steam, itch.io e Nuuvem.' },
    },
  },
  es: {
    brandTagline: 'Estudio indie de videojuegos premiado, de Río de Janeiro',
    home: {
      title: 'Garoa Studios — Estudio Indie de Videojuegos de Río',
      description: 'Garoa Studios es un estudio indie premiado con sede en Río de Janeiro, creando juegos experimentales de ritmo, narrativa y puzzle desde 2018.',
    },
    games: {
      title: 'Nuestros Juegos — Garoa Studios',
      description: 'Explora todo el catálogo de Garoa Studios — juegos de ritmo, narrativa, física y puzzle hechos en Río y publicados en Steam, itch.io y Nuuvem.',
    },
    press: {
      title: 'Prensa — Garoa Studios',
      description: 'Press kits, logos, capturas y cobertura mediática de Garoa Studios. Escribe a press@garoastudios.com para entrevistas y copias de prensa.',
    },
    jobs: {
      title: 'Empleo — Garoa Studios',
      description: 'Trabaja con Garoa Studios, estudio indie premiado de Río de Janeiro. Síguenos en redes para enterarte de nuevas vacantes.',
    },
    links: {
      title: 'Enlaces — Garoa Studios',
      description: 'Todos los enlaces oficiales de Garoa Studios — tiendas, redes sociales y canales de comunidad en un solo lugar.',
    },
    gameMeta: {
      rhythmania: { title: 'RitManía — Garoa Studios', description: 'RitManía es una colección vibrante de minijuegos rítmicos de un botón con géneros musicales brasileños. Pronto en Steam e itch.io.' },
      cartomante: { title: 'Cartomante - Fortune Teller — Garoa Studios', description: 'Novela visual de tarot con múltiples finales. Lee la suerte a clientes excéntricos. Disponible en Steam, itch.io y Nuuvem.' },
      standByMe: { title: 'Stand By Me — Garoa Studios', description: 'Puzzle de física colorido y groovy sobre cuidar a tus amigos, de Garoa Studios. Disponible en Steam, itch.io y Nuuvem.' },
      catLeatherJackets: { title: 'Cat Leather Jackets — Garoa Studios', description: 'Juego de ritmo con estilo de novela gráfica sobre una banda adolescente de punk rock y ska. En Steam, itch.io y Nuuvem.' },
      astroPig: { title: 'Astro Pig — Garoa Studios', description: 'Plataformas-puzzle lo-fi inspirado en los 90 sobre un cerdito astronauta y su nave inteligente. En Steam, itch.io y Nuuvem.' },
    },
  },
  zh: {
    brandTagline: '来自里约热内卢的获奖独立游戏工作室',
    home: {
      title: '细雨工作室 Garoa — 来自里约的独立游戏工作室',
      description: '细雨工作室（Garoa Studios）是一家位于里约热内卢的获奖独立游戏开发商，自2018年起创作实验性的节奏、叙事与解谜游戏。',
    },
    games: {
      title: '我们的游戏 — 细雨工作室 Garoa',
      description: '浏览细雨工作室的完整游戏目录——节奏、叙事、物理和解谜作品，均产自里约，登陆 Steam、itch.io 与 Nuuvem。',
    },
    press: {
      title: '媒体 — 细雨工作室 Garoa',
      description: '细雨工作室的新闻资料包、标志、截图与媒体报道。媒体咨询请联系 press@garoastudios.com。',
    },
    jobs: {
      title: '招聘 — 细雨工作室 Garoa',
      description: '加入位于里约的获奖独立游戏团队细雨工作室。请关注我们的社交媒体以获取新职位通知。',
    },
    links: {
      title: '链接 — 细雨工作室 Garoa',
      description: '细雨工作室的所有官方链接——商店、社交媒体与社区频道，集中在一处。',
    },
    gameMeta: {
      rhythmania: { title: '节奏曼狂 — 细雨工作室 Garoa', description: '《节奏曼狂》是一款充满活力的单按钮节奏迷你游戏合集，融合巴西多种音乐风格，由细雨工作室出品。即将登陆 Steam 与 itch.io。' },
      cartomante: { title: 'Cartomante - Fortune Teller — 细雨工作室 Garoa', description: '多结局塔罗牌分支视觉小说，为古怪的客户占卜命运。现已上架 Steam、itch.io 与 Nuuvem。' },
      standByMe: { title: 'Stand By Me — 细雨工作室 Garoa', description: '色彩缤纷的物理解谜游戏，主题是关心你的朋友。现已上架 Steam、itch.io 与 Nuuvem。' },
      catLeatherJackets: { title: 'Cat Leather Jackets — 细雨工作室 Garoa', description: '漫画风格的节奏游戏，讲述青少年朋克摇滚与斯卡朋克乐队的故事。现已上架 Steam、itch.io 与 Nuuvem。' },
      astroPig: { title: 'Astro Pig — 细雨工作室 Garoa', description: '90年代风格的低保真冒险解谜平台游戏，主角是一只小猪宇航员和他的智能飞船。Steam、itch.io、Nuuvem 现已上架。' },
    },
  },
  ja: {
    brandTagline: 'リオデジャネイロ発、受賞歴あるインディーゲームスタジオ',
    home: {
      title: 'Garoa Studios — リオデジャネイロのインディーゲームスタジオ',
      description: 'Garoa Studios（ガロア）は2018年設立、リオデジャネイロを拠点に実験的なリズム・ナラティブ・パズルゲームを制作する受賞歴あるインディースタジオです。',
    },
    games: {
      title: '私たちのゲーム — Garoa Studios',
      description: 'Garoa Studiosの全ゲームカタログ。リオで生まれたリズム・ナラティブ・物理・パズル作品を、Steam、itch.io、Nuuvemで配信中。',
    },
    press: {
      title: 'プレス — Garoa Studios',
      description: 'Garoa Studiosのプレスキット、ロゴ、スクリーンショット、メディア掲載情報。取材は press@garoastudios.com まで。',
    },
    jobs: {
      title: '採用 — Garoa Studios',
      description: 'リオデジャネイロの受賞インディースタジオGaroa Studiosで一緒に働きませんか。新しい採用情報はSNSでお知らせします。',
    },
    links: {
      title: 'リンク — Garoa Studios',
      description: 'Garoa Studiosの公式リンク集——ストア、SNS、コミュニティチャンネルをまとめてご覧いただけます。',
    },
    gameMeta: {
      rhythmania: { title: 'リズマニア — Garoa Studios', description: '『リズマニア』は色鮮やかなビジュアルと多彩なブラジル音楽で楽しむ、ワンボタン・リズムミニゲーム集。Steamとitch.ioにて近日配信。' },
      cartomante: { title: 'Cartomante - Fortune Teller — Garoa Studios', description: 'タロット占いをテーマにしたマルチエンディングのビジュアルノベル。Steam・itch.io・Nuuvemで配信中。' },
      standByMe: { title: 'Stand By Me — Garoa Studios', description: '友達を大切にすることがテーマの、カラフルでグルーヴィーな物理パズル。Steam・itch.io・Nuuvemで配信中。' },
      catLeatherJackets: { title: 'Cat Leather Jackets — Garoa Studios', description: 'ティーンのパンクロック＆スカパンクバンドを描く、グラフィックノベル風リズムゲーム。Steam・itch.io・Nuuvemで配信中。' },
      astroPig: { title: 'Astro Pig — Garoa Studios', description: '子豚の宇宙飛行士と知的な宇宙船を描く、90年代風ローファイ・パズルプラットフォーマー。Steam・itch.io・Nuuvemで配信中。' },
    },
  },
};

export const GAME_SLUGS = ['rhythmania', 'astro-pig', 'cat-leather-jackets', 'stand-by-me', 'cartomante'] as const;
