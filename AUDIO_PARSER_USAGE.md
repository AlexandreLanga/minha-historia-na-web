# Parser de Áudio para Posts do Blog

Este documento descreve como usar o parser de áudio nos posts do blog.

## Sintaxe

O parser de áudio suporta duas sintaxes diferentes:

### 1. Formato com Pipe (Recomendado)

```
[audio]
horse.mp3|audio/mpeg
horse.ogg|audio/ogg
[/audio]
```

Cada linha dentro do bloco `[audio]...[/audio]` representa uma fonte de áudio no formato:
```
arquivo|tipo_mime
```

### 2. Formato com Atributos HTML

```
[audio]
src="horse.mp3" type="audio/mpeg"
src="horse.ogg" type="audio/ogg"
[/audio]
```

## Exemplos

### Exemplo 1: Áudio simples (MP3)

```
[audio]
meu-audio.mp3|audio/mpeg
[/audio]
```

Isso será convertido em:

```html
<audio controls>
<source src="meu-audio.mp3" type="audio/mpeg">
Your browser does not support the audio element
</audio>
```

### Exemplo 2: Múltiplas fontes

```
[audio]
horse.mp3|audio/mpeg
horse.ogg|audio/ogg
horse.wav|audio/wav
[/audio]
```

Isso será convertido em:

```html
<audio controls>
<source src="horse.mp3" type="audio/mpeg">
<source src="horse.ogg" type="audio/ogg">
<source src="horse.wav" type="audio/wav">
Your browser does not support the audio element
</audio>
```

### Exemplo 3: Uso em um post Markdown

```markdown
# Meu Post sobre Áudio

Este é um post sobre como usar áudio no blog.

[audio]
podcast-ep1.mp3|audio/mpeg
podcast-ep1.ogg|audio/ogg
[/audio]

Você pode ouvir o podcast acima usando o player de áudio.
```

## Tipos MIME Suportados

Aqui estão alguns tipos MIME comuns para áudio:

- `audio/mpeg` - MP3
- `audio/ogg` - Ogg Vorbis
- `audio/wav` - WAV
- `audio/webm` - WebM
- `audio/aac` - AAC
- `audio/flac` - FLAC

## Recursos do Player

O elemento `<audio>` renderizado inclui:

- ✅ Controles de reprodução (play/pause)
- ✅ Barra de progresso
- ✅ Controle de volume
- ✅ Informações de tempo
- ✅ Download do arquivo (dependendo do navegador)

## Estilo

O parser aplica estilos automáticos ao elemento `<audio>`:

- Background com gradiente
- Borda com cor azul
- Sombra sutil
- Responsivo (adapta-se ao tamanho da tela)
- Margem consistente com outros elementos

## Compatibilidade

O parser suporta a sintaxe padrão HTML5 `<audio>`, que é compatível com:

- Chrome/Edge (versão 25+)
- Firefox (versão 25+)
- Safari (versão 6+)
- Opera (versão 15+)
- IE (versão 9+)

## Notas Importantes

1. **Caminhos relativos**: Use caminhos relativos que funciónem com seu servidor. Se o áudio estiver no folder de assets, use o caminho apropriado.

2. **Múltiplas fontes**: Adicione múltiplas fontes em diferentes formatos para melhor compatibilidade. O navegador utilizará a primeira fonte suportada.

3. **Fallback message**: Se o navegador não suportar HTML5 áudio, será exibida a mensagem "Your browser does not support the audio element".

4. **Tamanho dos arquivos**: Recomenda-se otimizar os arquivos de áudio antes de adicioná-los ao blog para melhor performance.
