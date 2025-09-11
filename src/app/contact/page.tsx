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
} from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { Linkedin, Mail, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContatoPage() {
  const { t } = useLocale()
  const tContact = (tag: string) => t(`contact.${tag}`)

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria o envio do formulário
    console.log('Formulário enviado:', formData)
    alert('Mensagem enviada com sucesso!')
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
      icon: Linkedin,
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

                      <Button type="submit" className="w-full">
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
