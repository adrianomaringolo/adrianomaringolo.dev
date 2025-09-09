"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

export function BackButton() {
  const router = useRouter()
  const { t } = useLocale()

  return (
    <Button variant="ghost" onClick={() => router.back()} className="group">
      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {t("blog.backToBlog")}
    </Button>
  )
}
