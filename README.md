# QGIS aplicado ao CAR — material 2026-2

Pacote estático preparado para o repositório `dalvigeo/qgis-car-material-2026-2-a7c91d4e`.

## Conteúdo implementado

- Preparação 01 — Instalar o QGIS pelo OSGeo4W
- Preparação 02 — Instalar ou atualizar o perfil do QGIS (Dalvi_GEO)
- Exercício 01 — Digitalização e edição vetorial
- Atividade 01 — Construção do imóvel no Módulo CAR
- Atividade 02 — Construção do imóvel a partir de arquivo KML
- Atividade 03 — Construção do imóvel a partir das coordenadas da matrícula georreferenciada
- Espaço reservado para Atividade 04

## Revisões desta versão

- Atividade 03 incorporada com extração assistida da tabela de coordenadas, geração do polígono, análise histórica da vegetação, uso do Apple Maps Satellite, composição da Reserva Legal, exportação e conferência do relatório de importação;
- painel lateral recolhível **Resultado esperado**, com ampliação da imagem no desktop e botão flutuante em telas menores;
- correção da formatação do aviso **Coloque a camada em edição** no Exercício 01;
- tela de Simbologia incluída no Exercício 01 e referência complementar à documentação oficial do QGIS;
- orientação para consultar múltiplas bases históricas na delimitação de Vegetação Nativa e Reserva Legal;
- orientação padronizada para executar `01.3. Atualizar Camadas após Importação` após abrir o projeto e após modelos automatizados que alterem/importem dados;
- orientação final para executar `12. Limpar projeto atual` somente depois da aprovação e conferência do croqui;
- Atividade 02 corrigida: APMP → ÁREA ALTERADA usa **Copiar (Ctrl+C)**, preservando a APMP;
- coordenadas centrais específicas de cada atividade apresentadas com botões copiáveis, além da orientação para `Windows + V`;
- botão de acesso direto ao Simulador de Importação de Shape do SIMLAM.

## Uso local

Não há build nem dependências. Extraia o pacote e abra `index.html` no navegador. O conteúdo principal, as imagens do curso, os ícones, a navegação, os botões copiáveis e os tópicos recolhíveis usam caminhos relativos e funcionam localmente. Uma ilustração complementar da documentação oficial do QGIS é carregada pela internet quando disponível.

## GitHub Pages

Faça upload de todo o conteúdo desta pasta para a raiz da branch `main`. Depois configure o GitHub Pages para publicar a partir da branch `main`, pasta `/ (root)`.

O arquivo `.nojekyll` está incluído para servir o pacote como site estático simples.

## Estrutura

- `index.html`: página inicial e conteúdo consolidado
- `assets/css/`: estilos compartilhados e estilos dos guias
- `assets/js/site.js`: navegação, tópicos recolhíveis, cópia de textos/coordenadas, painel de resultado e impressão
- `assets/icons/qgis/`: ícones SVG oficiais utilizados nos guias
- `assets/img/`: imagens organizadas por preparação/atividade
- `robots.txt`: solicitação de não indexação por mecanismos de busca

## Observação de privacidade

`robots.txt` e as meta tags `noindex` reduzem a indexação por buscadores, mas não constituem controle de acesso. Se o repositório ou o GitHub Pages estiverem públicos, quem conhecer ou descobrir o endereço poderá acessar o conteúdo.
