'use client'

import type React from 'react'

import { useLocale } from '@/hooks/use-locale'
import { SiGithub } from '@icons-pack/react-simple-icons'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  toast,
  Toaster,
} from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
import { useState } from 'react'

export default function ContatoPage() {
  const { t } = useLocale()
  const tContact = (tag: string) => t(`contact.${tag}`)

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (result.status === 'success') {
        toast.success(tContact('successMessage'))
        setFormData({ nome: '', email: '', mensagem: '' })
      } else {
        toast.error(tContact('errorMessage'))
      }
    } catch {
      toast.error(tContact('errorMessage'))
    } finally {
      setLoading(false)
    }

    setFormData({ nome: '', email: '', mensagem: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contacts = [
    {
      icon: Mail,
      label: 'E-mail',
      value: 'adrianomaringolo@gmail.com',
      href: 'mailto:adrianomaringolo@gmail.com',
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: '/in/adrianomaringolo',
      href: 'https://linkedin.com/in/adrianomaringolo',
    },
    {
      icon: SiGithub,
      label: 'GitHub',
      value: '/adrianomaringolo',
      href: 'https://github.com/adrianomaringolo',
    },
  ]

  return (
    <section>
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Toaster expand />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-balance">
              {tContact('title')}
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto text-pretty">
              {tContact('subtitle')}
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Links de Contato */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-6">{tContact('connect')}</h2>
                <div className="space-y-4">
                  {contacts.map((contact, index) => (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <contact.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{contact.label}</p>
                        <p className="text-sm text-muted-foreground">{contact.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Formulário */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{tContact('sendMessage')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="nome">{tContact('name')}</Label>
                        <Input
                          id="nome"
                          name="nome"
                          type="text"
                          value={formData.nome}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">{tContact('email')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="mensagem">{tContact('message')}</Label>
                        <Textarea
                          id="mensagem"
                          name="mensagem"
                          value={formData.mensagem}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="mt-1"
                          placeholder={tContact('messagePlaceholder')}
                        />
                      </div>

                      <Button type="submit" className="w-full" isLoading={loading}>
                        <Send className="h-4 w-4 mr-2" />
                        {tContact('send')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
