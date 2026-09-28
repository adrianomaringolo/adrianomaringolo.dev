# Configuração de Desenvolvimento

Este documento descreve como configurar o ambiente de desenvolvimento para o projeto.

## Prettier - Formatação de Código

### Configuração Automática

O projeto está configurado para formatar automaticamente o código ao salvar arquivos no VS Code.

#### Extensões Necessárias

Instale as seguintes extensões no VS Code:

- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)

#### Configurações do VS Code

As configurações estão em `.vscode/settings.json`:

- `formatOnSave: true` - Formata automaticamente ao salvar
- `defaultFormatter: prettier` - Usa Prettier como formatador padrão
- Organiza imports automaticamente
- Corrige problemas do ESLint ao salvar

### Comandos Disponíveis

```bash
# Formatar todos os arquivos
npm run format

# Verificar se todos os arquivos estão formatados
npm run format:check

# Corrigir problemas do ESLint
npm run lint:fix

# Verificar tipos TypeScript
npm run type-check
```

### Configuração do Prettier

Arquivo `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 90,
  "plugins": ["prettier-plugin-tailwindcss", "prettier-plugin-organize-imports"]
}
```

### Plugins Incluídos

- **prettier-plugin-tailwindcss**: Ordena classes do Tailwind CSS
- **prettier-plugin-organize-imports**: Organiza e remove imports não utilizados

## Solução de Problemas

### Prettier não funciona ao salvar

1. Verifique se a extensão Prettier está instalada
2. Verifique se o VS Code está usando Prettier como formatador padrão
3. Reinicie o VS Code
4. Execute `npm run format` manualmente para testar

### Conflitos entre ESLint e Prettier

O projeto está configurado para evitar conflitos:

- ESLint foca em qualidade de código
- Prettier foca em formatação
- Ambos executam automaticamente ao salvar

### Comandos de Verificação

```bash
# Verificar se Prettier está funcionando
npx prettier --version

# Testar formatação em um arquivo específico
npx prettier --write src/components/exemplo.tsx

# Verificar todos os arquivos
npm run format:check
```

## Fluxo de Trabalho Recomendado

1. **Desenvolvimento**: O código é formatado automaticamente ao salvar
2. **Antes do commit**: Execute `npm run format:check` para garantir formatação
3. **CI/CD**: O pipeline verifica formatação e linting automaticamente

## Configurações Adicionais

### EditorConfig

O arquivo `.editorconfig` garante configurações consistentes:

- Charset UTF-8
- Indentação com 2 espaços
- Final de linha LF
- Remove espaços em branco no final das linhas

### Arquivos Ignorados

O `.prettierignore` exclui:

- `node_modules/`
- `.next/`
- Arquivos de build
- Logs
- Lock files
