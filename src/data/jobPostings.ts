import type { Locale } from '@/i18n/config';

export type JobSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  trailingParagraphs?: string[];
};

export type JobPostingCopy = {
  title: string;
  intro: string[];
  targetLanguages: string;
  sections: JobSection[];
  closing: string;
  applyLabel: string;
  backLabel: string;
  seoTitle: string;
  seoDescription: string;
};

export type JobPosting = {
  slug: string;
  applicationUrl: string;
  copy: Record<Locale, JobPostingCopy>;
};

export const JOB_POSTINGS: JobPosting[] = [
  {
    slug: '2026-01',
    applicationUrl: 'https://forms.gle/6SZKoUBepXegfJjK9?utm_source=garoastudios.com',
    copy: {
      br: {
        title: 'Chamada para localizadores - RitMania',
        intro: [
          'Estamos buscando localizadores para a Demo do RitMania, um jogo de ritmo de um só botão inspirado por jogos como Rhythm Heaven, desenvolvido no Brasil e construído em torno de situações cotidianas, humor, referências culturais e no “caos divertido” que é muito familiar para nós.',
          'A Demo está entrando em uma nova etapa de localização, e procuramos profissionais para trabalhar nos seguintes idiomas:',
        ],
        targetLanguages: 'Chinês Simplificado • Hindi • Árabe • Russo • Coreano',
        sections: [
          {
            heading: 'Quem estamos procurando',
            paragraphs: ['Buscamos pessoas que:'],
            bullets: [
              'sejam nativas ou fluentes em brasileiro, com conhecimento profundo da cultura brasileira, tanto contemporânea quanto folclórica;',
              'sejam nativas ou tenham fluência equivalente à nativa em um ou mais dos idiomas-alvo, com bom domínio de referências culturais, mídia, humor, folclore e linguagem cotidiana de seus respectivos contextos;',
              'tenham experiência prévia com localização;',
              'preferencialmente, tenham experiência com localização de jogos digitais.',
            ],
          },
          { paragraphs: ['Caso você se encaixe nos critérios para mais de um idioma-alvo, pode se candidatar para mais de um.'] },
          {
            heading: 'Sobre o trabalho',
            paragraphs: ['O trabalho consiste em revisar e localizar aproximadamente 600 palavras, utilizando como referência os textos originais em português brasileiro e inglês.', 'O conteúdo inclui:'],
            bullets: [
              'menus, botões e outros textos de interface;',
              'títulos de fases;',
              'tutoriais e instruções;',
              'descrições curtas;',
              'textos de resultado e pontuação;',
              'outros pequenos textos criativos do jogo.',
            ],
          },
          { paragraphs: ['Já existe uma tradução utilizada como placeholder durante a implementação dos diferentes sistemas de escrita e fontes. Ela estará disponível como referência técnica, mas não precisa ser preservada: o objetivo é chegar à melhor localização possível a partir dos textos originais.', 'Este trabalho cobre o conteúdo da Demo do RitMania. Caso a colaboração funcione bem, poderemos entrar novamente em contato futuramente para a localização do jogo completo.'] },
          {
            heading: 'Prazo e pagamento',
            bullets: [
              'Prazo: 20 dias corridos após a seleção da pessoa candidata.',
              'Cachê: R$ 400 por idioma.',
              'Pagamento: 50% no início do trabalho e 50% após a entrega.',
            ],
            trailingParagraphs: ['É desejável, mas não obrigatório, poder emitir nota fiscal pela prestação do serviço.'],
          },
          { paragraphs: ['Procuramos pessoas interessadas não apenas em traduzir o texto, mas em encontrar soluções que façam o RitMania funcionar de forma natural, divertida e culturalmente relevante em outro idioma, preservando o espírito do original sem ficar preso a ele.'] },
        ],
        closing: 'Obrigado pelo interesse!',
        applyLabel: 'candidatar-se pelo Google Forms',
        backLabel: 'voltar para vagas',
        seoTitle: 'Localizadores para RitMania — Garoa Studios',
        seoDescription: 'Vaga freelance para localizar a Demo do RitMania em chinês simplificado, hindi, árabe, russo ou coreano. Confira requisitos, prazo e cachê.',
      },
      en: {
        title: 'Call for localizers - RhythMania',
        intro: [
          'We are looking for localizers for the RhythMania Demo, a one-button rhythm game inspired by titles such as Rhythm Heaven, developed in Brazil and built around everyday situations, humor, cultural references, and the “fun chaos” that feels very familiar to us.',
          'The Demo is entering a new localization stage, and we are looking for professionals to work in the following languages:',
        ],
        targetLanguages: 'Simplified Chinese • Hindi • Arabic • Russian • Korean',
        sections: [
          {
            heading: 'Who we are looking for',
            paragraphs: ['We are looking for people who:'],
            bullets: [
              'are native or fluent speakers of Brazilian Portuguese, with deep knowledge of Brazilian culture, both contemporary and folkloric;',
              'are native or have native-equivalent fluency in one or more of the target languages, with a strong command of cultural references, media, humor, folklore, and everyday language in their respective contexts;',
              'have previous localization experience;',
              'preferably have experience localizing digital games.',
            ],
          },
          { paragraphs: ['If you meet the criteria for more than one target language, you may apply for more than one.'] },
          {
            heading: 'About the work',
            paragraphs: ['The work consists of reviewing and localizing approximately 600 words, using the original Brazilian Portuguese and English texts as references.', 'The content includes:'],
            bullets: [
              'menus, buttons, and other interface text;',
              'level titles;',
              'tutorials and instructions;',
              'short descriptions;',
              'results and scoring text;',
              'other short creative texts from the game.',
            ],
          },
          { paragraphs: ['A translation already exists as a placeholder used while implementing the different writing systems and fonts. It will be available as a technical reference, but it does not need to be preserved: the goal is to arrive at the best possible localization based on the original texts.', 'This work covers the content of the RhythMania Demo. If the collaboration goes well, we may contact you again in the future to localize the full game.'] },
          {
            heading: 'Timeline and payment',
            bullets: [
              'Timeline: 20 calendar days after the candidate is selected.',
              'Fee: R$ 400 per language.',
              'Payment: 50% at the start of the work and 50% after delivery.',
            ],
            trailingParagraphs: ['Being able to issue an invoice for the service is desirable, but not required.'],
          },
          { paragraphs: ['We are looking for people interested not only in translating the text, but in finding solutions that make RhythMania feel natural, fun, and culturally relevant in another language, preserving the spirit of the original without being constrained by it.'] },
        ],
        closing: 'Thank you for your interest!',
        applyLabel: 'apply through Google Forms',
        backLabel: 'back to jobs',
        seoTitle: 'RhythMania Localizers — Garoa Studios',
        seoDescription: 'Freelance opening to localize the RhythMania Demo into Simplified Chinese, Hindi, Arabic, Russian, or Korean. See requirements, timeline, and fee.',
      },
      es: {
        title: 'Convocatoria para localizadores - RitManía',
        intro: [
          'Buscamos localizadores para la Demo de RitManía, un juego de ritmo de un solo botón inspirado en títulos como Rhythm Heaven, desarrollado en Brasil y construido en torno a situaciones cotidianas, humor, referencias culturales y ese “caos divertido” que nos resulta tan familiar.',
          'La Demo está entrando en una nueva etapa de localización y buscamos profesionales para trabajar en los siguientes idiomas:',
        ],
        targetLanguages: 'Chino simplificado • Hindi • Árabe • Ruso • Coreano',
        sections: [
          {
            heading: 'A quién buscamos',
            paragraphs: ['Buscamos personas que:'],
            bullets: [
              'sean hablantes nativas o fluidas de portugués brasileño, con un conocimiento profundo de la cultura brasileña, tanto contemporánea como folclórica;',
              'sean nativas o tengan un dominio equivalente al nativo de uno o más de los idiomas objetivo, con buen conocimiento de las referencias culturales, los medios, el humor, el folclore y el lenguaje cotidiano de sus respectivos contextos;',
              'tengan experiencia previa en localización;',
              'preferiblemente, tengan experiencia en localización de videojuegos.',
            ],
          },
          { paragraphs: ['Si cumples los criterios para más de un idioma objetivo, puedes postularte para más de uno.'] },
          {
            heading: 'Sobre el trabajo',
            paragraphs: ['El trabajo consiste en revisar y localizar aproximadamente 600 palabras, tomando como referencia los textos originales en portugués brasileño e inglés.', 'El contenido incluye:'],
            bullets: [
              'menús, botones y otros textos de interfaz;',
              'títulos de niveles;',
              'tutoriales e instrucciones;',
              'descripciones breves;',
              'textos de resultados y puntuación;',
              'otros pequeños textos creativos del juego.',
            ],
          },
          { paragraphs: ['Ya existe una traducción utilizada como texto provisional durante la implementación de los distintos sistemas de escritura y fuentes. Estará disponible como referencia técnica, pero no es necesario conservarla: el objetivo es lograr la mejor localización posible a partir de los textos originales.', 'Este trabajo abarca el contenido de la Demo de RitManía. Si la colaboración funciona bien, podremos volver a contactarte en el futuro para localizar el juego completo.'] },
          {
            heading: 'Plazo y pago',
            bullets: [
              'Plazo: 20 días naturales desde la selección de la persona candidata.',
              'Honorarios: R$ 400 por idioma.',
              'Pago: 50 % al inicio del trabajo y 50 % después de la entrega.',
            ],
            trailingParagraphs: ['Es deseable, pero no obligatorio, poder emitir una factura por la prestación del servicio.'],
          },
          { paragraphs: ['Buscamos personas interesadas no solo en traducir el texto, sino en encontrar soluciones que hagan que RitManía funcione de forma natural, divertida y culturalmente relevante en otro idioma, preservando el espíritu del original sin quedar atadas a él.'] },
        ],
        closing: '¡Gracias por tu interés!',
        applyLabel: 'postularse mediante Google Forms',
        backLabel: 'volver a empleo',
        seoTitle: 'Localizadores para RitManía — Garoa Studios',
        seoDescription: 'Vacante freelance para localizar la Demo de RitManía al chino simplificado, hindi, árabe, ruso o coreano. Consulta requisitos, plazo y honorarios.',
      },
      zh: {
        title: 'RitMania 本地化人员招募',
        intro: [
          '我们正在为 RitMania Demo 招募本地化人员。RitMania 是一款受《节奏天国》等作品启发的单按钮节奏游戏，由巴西团队开发，内容围绕日常情境、幽默、文化元素，以及我们十分熟悉的“欢乐混乱”展开。',
          'Demo 即将进入新的本地化阶段，我们正在寻找能够负责以下语言的专业人士：',
        ],
        targetLanguages: '简体中文 • 印地语 • 阿拉伯语 • 俄语 • 韩语',
        sections: [
          {
            heading: '我们在寻找谁',
            paragraphs: ['我们希望申请者：'],
            bullets: [
              '以巴西葡萄牙语为母语或能流利使用，并深入了解巴西的当代文化与民间文化；',
              '以一种或多种目标语言为母语，或具备接近母语水平的能力，并熟悉相应语境中的文化元素、媒体、幽默、民间文化和日常表达；',
              '具有本地化工作经验；',
              '有电子游戏本地化经验者优先。',
            ],
          },
          { paragraphs: ['如果你同时符合多个目标语言的要求，可以申请多个语言。'] },
          {
            heading: '工作内容',
            paragraphs: ['工作内容为审校并本地化约 600 个词，以巴西葡萄牙语和英语原文作为参考。', '内容包括：'],
            bullets: [
              '菜单、按钮及其他界面文本；',
              '关卡标题；',
              '教程和说明；',
              '简短描述；',
              '结果与得分文本；',
              '游戏中的其他简短创意文本。',
            ],
          },
          { paragraphs: ['在实现不同书写系统和字体时，我们已经使用了一份临时译文。该译文可作为技术参考，但无需保留；我们的目标是从原文出发，完成尽可能出色的本地化。', '本次工作涵盖 RitMania Demo 的内容。如果合作顺利，我们将来可能会再次联系你，参与完整版游戏的本地化。'] },
          {
            heading: '期限与报酬',
            bullets: [
              '期限：候选人确定后 20 个自然日。',
              '报酬：每种语言 400 巴西雷亚尔。',
              '付款：工作开始时支付 50%，交付后支付另外 50%。',
            ],
            trailingParagraphs: ['能够为该服务开具发票者优先，但并非必要条件。'],
          },
          { paragraphs: ['我们寻找的不只是逐字翻译的人，而是能找到合适方案，让 RitMania 在另一种语言中依然自然、有趣且具有文化共鸣的人；既保留原作精神，又不受原文形式束缚。'] },
        ],
        closing: '感谢你的关注！',
        applyLabel: '通过 Google Forms 申请',
        backLabel: '返回招聘',
        seoTitle: 'RitMania 本地化人员招募 — 细雨工作室',
        seoDescription: 'RitMania Demo 自由职业本地化岗位，目标语言为简体中文、印地语、阿拉伯语、俄语或韩语。查看要求、期限与报酬。',
      },
      ja: {
        title: 'RitMania ローカライザー募集',
        intro: [
          'RitMania Demoのローカライザーを募集します。RitManiaは『リズム天国』などに影響を受けたワンボタンのリズムゲームです。ブラジルで開発され、日常のシチュエーションやユーモア、文化的な引用、そして私たちにとってなじみ深い「楽しいカオス」を軸に作られています。',
          'Demoは新たなローカライズ段階に入り、以下の言語を担当するプロフェッショナルを募集しています。',
        ],
        targetLanguages: '簡体字中国語 • ヒンディー語 • アラビア語 • ロシア語 • 韓国語',
        sections: [
          {
            heading: '求める人材',
            paragraphs: ['以下の条件を満たす方を求めています。'],
            bullets: [
              'ブラジル・ポルトガル語のネイティブ、または流暢な話者で、現代文化と民間文化の両面からブラジル文化を深く理解している方；',
              '対象言語のうち一つ以上を母語とする、または母語同等に運用でき、それぞれの文化的背景、メディア、ユーモア、民間文化、日常表現に精通している方；',
              'ローカライズの実務経験がある方；',
              'デジタルゲームのローカライズ経験があれば尚可。',
            ],
          },
          { paragraphs: ['複数の対象言語の条件を満たす場合は、複数言語に応募できます。'] },
          {
            heading: '仕事内容',
            paragraphs: ['ブラジル・ポルトガル語と英語の原文を参照し、約600ワードのレビューとローカライズを行います。', '対象となる内容：'],
            bullets: [
              'メニュー、ボタン、その他のUIテキスト；',
              'ステージタイトル；',
              'チュートリアルと説明；',
              '短い説明文；',
              'リザルトとスコアのテキスト；',
              'ゲーム内のその他の短いクリエイティブテキスト。',
            ],
          },
          { paragraphs: ['異なる文字体系とフォントの実装時に使用した仮訳がすでにあります。技術的な参考資料として提供しますが、それを維持する必要はありません。原文から最適なローカライズを作り上げることが目的です。', '今回の業務はRitMania Demoの内容を対象とします。良い協力関係を築けた場合、将来、製品版のローカライズについて再度ご連絡する可能性があります。'] },
          {
            heading: '期間と報酬',
            bullets: [
              '期間：採用決定後20暦日。',
              '報酬：1言語につき400ブラジルレアル。',
              '支払い：業務開始時に50％、納品後に50％。',
            ],
            trailingParagraphs: ['業務に対する請求書を発行できることが望ましいですが、必須ではありません。'],
          },
          { paragraphs: ['単に文章を翻訳するだけでなく、原作の精神を保ちながら原文に縛られず、別の言語でもRitManiaが自然で楽しく、文化的に意味のあるものになるような表現を見つけられる方を求めています。'] },
        ],
        closing: 'ご関心をお寄せいただき、ありがとうございます！',
        applyLabel: 'Google Formsから応募',
        backLabel: '採用情報に戻る',
        seoTitle: 'RitMania ローカライザー募集 — Garoa Studios',
        seoDescription: 'RitMania Demoを簡体字中国語、ヒンディー語、アラビア語、ロシア語、韓国語にローカライズする業務委託募集。条件・期間・報酬をご確認ください。',
      },
    },
  },
];

export function getJobPosting(slug: string | undefined) {
  return JOB_POSTINGS.find((posting) => posting.slug === slug);
}
