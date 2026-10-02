import { collection, config, fields } from '@keystatic/core'

/*
 * Keystatic edits the bookmarks as JSON files in this repo, so there's no
 * database: in development it writes to disk, in production it commits to
 * GitHub (login with GitHub; only accounts with write access can save), and
 * the commit triggers a new deploy.
 */

// The admin only runs in production once the GitHub App env vars exist
// (KEYSTATIC_GITHUB_CLIENT_ID/SECRET, KEYSTATIC_SECRET,
// NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG); until then /keystatic is a 404.
export const keystaticAdminEnabled =
  process.env.NODE_ENV === 'development' || !!process.env.KEYSTATIC_GITHUB_CLIENT_ID

export const bookmarkTypes = [
  { label: 'Ferramenta', value: 'tool' },
  { label: 'Biblioteca', value: 'library' },
  { label: 'Artigo', value: 'article' },
  { label: 'Vídeo', value: 'video' },
  { label: 'Curso', value: 'course' },
  { label: 'Referência', value: 'reference' },
] as const

export default config({
  storage:
    // NEXT_PUBLIC_ because this config also runs in the admin's client bundle.
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== 'github'
      ? { kind: 'local' }
      : {
          kind: 'github',
          repo: 'adrianomaringolo/adrianomaringolo.dev',
          pathPrefix: 'apps/portfolio',
        },
  ui: {
    brand: { name: 'Bookmarks · adrianomaringolo.dev' },
    navigation: ['bookmarks', 'bookmarkTags'],
  },
  collections: {
    bookmarks: collection({
      label: 'Bookmarks',
      path: 'src/content/bookmarks/items/*',
      format: { data: 'json' },
      slugField: 'title',
      columns: ['title', 'type', 'addedAt'],
      entryLayout: 'form',
      schema: {
        title: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
        }),
        url: fields.url({ label: 'URL', validation: { isRequired: true } }),
        type: fields.select({
          label: 'Tipo',
          options: [...bookmarkTypes],
          defaultValue: 'tool',
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'bookmarkTags',
            validation: { isRequired: true },
          }),
          { label: 'Tags', itemLabel: (props) => props.value ?? 'Escolha uma tag' },
        ),
        notePt: fields.text({
          label: 'Nota (pt-BR)',
          description: 'Por que esse link vale a pena. Aparece na página.',
          multiline: true,
        }),
        noteEn: fields.text({
          label: 'Note (en-US)',
          description: 'Opcional. Sem ela, a página em inglês mostra a nota em português.',
          multiline: true,
        }),
        language: fields.select({
          label: 'Idioma do conteúdo',
          options: [
            { label: 'Inglês', value: 'en' },
            { label: 'Português', value: 'pt' },
            { label: 'Outro', value: 'other' },
          ],
          defaultValue: 'en',
        }),
        favorite: fields.checkbox({ label: 'Favorito', defaultValue: false }),
        addedAt: fields.date({
          label: 'Adicionado em',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
      },
    }),
    bookmarkTags: collection({
      label: 'Tags',
      path: 'src/content/bookmarks/tags/*',
      format: { data: 'json' },
      slugField: 'name',
      schema: {
        name: fields.slug({ name: { label: 'Nome', validation: { isRequired: true } } }),
        labelEn: fields.text({
          label: 'Nome em inglês',
          description: 'Opcional, quando o nome muda entre os idiomas (ex.: animação → animation).',
        }),
      },
    }),
  },
})
