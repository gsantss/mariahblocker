# MariahBlocker™ — Sistema de Proteção Natalina

Projeto React + TypeScript + Vite de uma pegadinha natalina com duas experiências integradas:

1. **MariahBlocker / Proteção:** falso antivírus com escaneamento de 16 segundos, falha de contenção, revelação e resultado.
2. **Operação Descongelamento:** jogo de laboratório criogênico com temperatura, integridade, energia, refrigeração, potência, reinício do compressor e protocolo de emergência que alteram realmente a simulação. A entidade é liberada após a falha progressiva do núcleo.

Ambos funcionam sem backend, banco de dados ou login. A estética tecnológica se converte em uma festa natalina na revelação. Compatível com telas pequenas, teclado e preferência por movimento reduzido.

## Começar

Requisitos: Node.js 20.19+ (ou 22+) e npm.

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite. Para gerar uma versão de produção:

```bash
npm run build
npm run preview
```

A aplicação gerada fica em `dist/`. Os arquivos `vercel.json` e `netlify.toml` incluem regras de fallback de rotas para hospedagens SPA correspondentes. Exemplos de rotas: `/`, `/protecao`, `/descongelamento`, `/resultado`.

## Música e imagem

**O pacote não inclui a música comercial da Mariah Carey nem fotografias da artista.** A faixa que vem de fábrica, `public/assets/festive-original.mp3`, é uma composição instrumental simples e original, feita especialmente como fallback para esta demonstração.

Para incluir uma faixa para a qual você possui as autorizações de uso e distribuição:

1. Coloque-a em `public/assets/mariah-christmas.mp3`.
2. Edite `src/config/experience.ts`, mudando `celebrationAudio` para `'/assets/mariah-christmas.mp3'`.
3. Se desejar, adicione uma imagem licenciada em `public/assets/mariah-reveal.png` — a aplicação a mostrará automaticamente. Sem ela, uma ilustração SVG original é exibida.
4. Faça `npm run build` e publique.

O clique em "Ativar proteção" ou "Iniciar monitoramento" habilita o áudio dentro das regras habituais dos navegadores. Se o arquivo não estiver disponível, o mecanismo tenta uma sequência instrumental original sintetizada pela Web Audio API. A interface oferece controles de pausar/retomar, silenciar e volume (limitado a 80%).

*Nota:* o arquivo demonstrativo não é uma gravação nem uma imitação da música da Mariah Carey. Para usar o fonograma real publicamente, é necessária a licença aplicável para a composição e gravação.

## Organização

```text
src/
  components/
    audio/             # expansões futuras de interface sonora
    cryo/              # câmara criogênica e controles
    effects/           # partículas, ilustração, revelação natalina
    layout/            # cabeçalho e rodapé
    security/          # painel de varredura
    ui/                # botões no padrão shadcn e status
  config/experience.ts # duração, volume e caminhos dos arquivos
  context/AudioContext.tsx
  hooks/useCryoSimulation.ts
  lib/utils.ts
  pages/               # Início, Proteção, Descongelamento e Resultado
  types/experience.ts
  App.tsx
  styles.css
public/assets/
  festive-original.mp3
```

O botão de compartilhamento usa a Web Share API quando disponível e copia o link no fallback; URLs diretas apontam para a experiência, sem revelar a surpresa. Nenhuma informação pessoal é coletada. Os avisos de segurança são apenas uma simulação dentro da página, não mensagens reais do sistema operacional.

## Ajustes de timing

Em `src/config/experience.ts`:

- `scanDurationMs`: duração da proteção (padrão 16s);
- `cryoMaximumDurationSec`: duração máxima da contenção (padrão 48s);
- `revealDurationMs`: tempo de exibição da revelação antes do resultado;
- `safeVolume`: volume inicial, de 0 a 0.8.

A duração típica do laboratório fica entre 30 e 48 segundos, dependendo das ações. O colapso inevitável é parte da narrativa da pegadinha, embora os botões modifiquem a temperatura, a energia e a integridade de forma real.

## Publicação no Lovable

Este diretório é um projeto Vite/React convencional, preparado para controle de versão. Se o fluxo da sua conta Lovable permitir a importação de um repositório existente, envie o conteúdo para o GitHub e importe/conecte o repositório. Caso o fluxo disponível seja somente o editor do Lovable, use o prompt de especificação e insira os arquivos de mídia e lógica conforme permitido pelo editor. O ZIP também pode ser implantado diretamente em uma hospedagem de aplicações Vite, sem depender do Lovable.

## Conferência recomendada

- Home → Proteção → Ativar → escanear → 99% → revelação → resultado.
- Home → Laboratório → Iniciar → acionar controles → colapso → revelação → resultado.
- Compartilhar e abrir diretamente o link em outra sessão.
- Repetir cada modo, inclusive voltar de rota durante o escaneamento.
- Verificar versão mobile e `prefers-reduced-motion`.
- Validar permissões de áudio no Safari/iPhone; em caso de bloqueio, toque em Reproduzir na tela de resultado.

**Aviso:** pegadinha fictícia com transições visuais moderadas; não há flashes estroboscópicos ou janelas de sistema falsas.
