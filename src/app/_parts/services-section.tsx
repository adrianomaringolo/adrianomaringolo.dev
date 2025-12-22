'use client'

import { AnimatedBackground } from '@/components/ui/animated-background'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { TiltCard } from '@/components/ui/tilt-card'
import { useLocale } from '@/hooks/use-locale'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Database, Globe, Smartphone, Zap } from 'lucide-react'
import Link from 'next/link'

export function ServicesSection() {
  const { t } = useLocale()

  const services = [
    {
      icon: Globe,
      title: t('services.websiteTitle'),
      description: t('services.websiteDescription'),
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      icon: Smartphone,
      title: t('services.webAppTitle'),
      description: t('services.webAppDescription'),
      features: ['PWA Support', 'Real-time Updates', 'Cross-platform'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
    {
      icon: Code2,
      title: t('services.frontendTitle'),
      description: t('services.frontendDescription'),
      features: ['React/Next.js', 'TypeScript', 'Modern UI/UX'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-500',
    },
    {
      icon: Database,
      title: t('services.backendTitle'),
      description: t('services.backendDescription'),
      features: ['API Development', 'Database Design', 'Cloud Integration'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
    },
  ]

  const technologies = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Tailwind CSS',
    'Framer Motion',
    'Supabase',
    'Vercel',
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      <AnimatedBackground />
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-accent to-primary rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <RevealAnimation direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              {t('services.badge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('services.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </RevealAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <RevealAnimation key={service.title} direction="up" delay={0.4 + index * 0.1}>
              <TiltCard className="h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />

                    <CardHeader className="relative">
                      <motion.div
                        className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                      </motion.div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-pretty leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="text-xs bg-background/50"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TiltCard>
            </RevealAnimation>
          ))}
        </div>

        {/* Technologies Section */}
        <RevealAnimation direction="up" delay={0.8}>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-muted-foreground">
              {t('services.technologies')}
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge className="px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-default">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <Link href="/contact">
              <MagneticButton>
                <Button size="lg" className="group">
                  <Zap className="w-4 h-4 mr-2" />
                  {t('services.cta')}
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </MagneticButton>
            </Link>
          </div>
        </RevealAnimation>
      </div>
    </section>
  )
}
