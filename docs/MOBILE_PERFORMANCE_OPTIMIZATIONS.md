# Otimizações de Performance Mobile

## Problema Identificado

A página inicial estava apresentando lag significativo em dispositivos móveis devido a:

1. **FloatingCode** com 40 partículas animadas simultaneamente
2. **GradientMesh** com gradientes complexos e animados
3. **TiltCard** com efeitos 3D pesados
4. **Múltiplas animações Framer Motion** rodando ao mesmo tempo
5. **Parallax scrolling** com cálculos pesados
6. **AnimatedBackground** com gradientes rotativos
7. **Backdrop blur** excessivo (muito pesado para GPU mobile)

## Soluções Implementadas

### 1. Hook de Detecção Mobile (`use-reduced-motion.ts`)

Criamos três hooks para detectar quando devemos reduzir animações:

- `useReducedMotion()` - Detecta preferência do sistema
- `useIsMobile()` - Detecta dispositivos mobile (< 768px)
- `useShouldReduceAnimations()` - Combina ambos

### 2. Otimizações por Componente

#### HeroSection

- **FloatingCode**: Reduzido de 40 para 8 partículas no mobile
- **GradientMesh**: Completamente desabilitado no mobile
- **TiltCard**: Substituído por div simples no mobile
- **Floating elements**: Desabilitados no mobile (ícones animados ao redor da foto)
- **Scroll indicator**: Desabilitado no mobile
- **Parallax**: Desabilitado no mobile (y e opacity fixos)

#### AboutSection

- **GradientMesh**: Desabilitado no mobile
- **FloatingCode**: Desabilitado no mobile
- **Background animations**: Desabilitados no mobile (blobs animados)
- **TiltCard**: Substituído por div simples nos cards de estatísticas

#### ServicesSection

- **AnimatedBackground**: Desabilitado no mobile
- **Background gradients**: Desabilitados no mobile
- **TiltCard**: Substituído por div simples nos cards de serviços
- **Hover animations**: Simplificadas no mobile

#### FeaturedProjects

- **ScrollParallax**: Desabilitado no mobile

#### CTASection

- **GradientMesh**: Desabilitado no mobile
- **WaveBackground**: Desabilitado no mobile
- **Animated particles**: Desabilitados no mobile (6 partículas flutuantes)

### 3. Otimizações CSS Globais

Adicionadas regras CSS específicas para mobile:

```css
@media (max-width: 768px) {
  * {
    /* Reduz uso de GPU */
    will-change: auto !important;
  }

  /* Desabilita animações caras */
  .animate-pulse,
  .animate-bounce,
  .animate-spin {
    animation: none !important;
  }

  /* Simplifica backdrop blur */
  .backdrop-blur-* {
    backdrop-filter: none !important;
    background-color: rgba(var(--card), 0.95) !important;
  }

  /* Reduz complexidade de sombras */
  .shadow-2xl,
  .shadow-xl {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
  }
}
```

### 4. Suporte a Reduced Motion

Adicionado suporte completo para `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Resultados Esperados

### Performance

- ✅ Redução de 80% no número de animações simultâneas
- ✅ Eliminação de backdrop-blur (muito pesado para GPU mobile)
- ✅ Redução de partículas de 40 para 8 (80% menos)
- ✅ Eliminação de efeitos 3D (TiltCard) no mobile
- ✅ Desabilitação de parallax scrolling

### Experiência do Usuário

- ✅ Scroll suave sem lag
- ✅ Transições instantâneas
- ✅ Menor consumo de bateria
- ✅ Melhor acessibilidade (respeita prefers-reduced-motion)
- ✅ Mantém a estética visual sem comprometer performance

## Como Testar

1. **Teste Mobile Real**:

   ```bash
   pnpm dev
   # Acesse pelo celular na mesma rede
   ```

2. **Chrome DevTools**:
   - Abra DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Selecione um dispositivo mobile
   - Teste o scroll da página inicial

3. **Performance Profiling**:
   - DevTools > Performance tab
   - Grave enquanto faz scroll
   - Verifique FPS (deve estar próximo de 60fps)

4. **Reduced Motion**:
   - DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion
   - Verifique se animações são desabilitadas

## Próximos Passos (Opcional)

Se ainda houver problemas de performance:

1. **Lazy loading de componentes pesados**:

   ```tsx
   const HeavyComponent = dynamic(() => import('./heavy'), {
     loading: () => <Skeleton />,
     ssr: false,
   })
   ```

2. **Intersection Observer para animações**:
   - Só animar elementos quando estiverem visíveis

3. **Reduzir complexidade de gradientes**:
   - Usar gradientes estáticos em vez de animados

4. **Otimizar imagens**:
   - Usar WebP/AVIF
   - Implementar blur placeholder

## Manutenção

Ao adicionar novos componentes animados:

1. Sempre use `useShouldReduceAnimations()` hook
2. Forneça fallback simples para mobile
3. Teste em dispositivo real
4. Verifique FPS no DevTools
