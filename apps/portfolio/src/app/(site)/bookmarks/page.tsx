import { BookmarksClient } from '@/app/(site)/bookmarks/_components/bookmarks-client'
import { getBookmarks } from '@/lib/bookmarks'

export default async function BookmarksPage() {
  const { bookmarks, tags } = await getBookmarks()
  return <BookmarksClient bookmarks={bookmarks} tags={tags} />
}
