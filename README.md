# Brote AD — Deploy Guide

## Estructura del proyecto

```
brote-ad/
├── netlify.toml                  ← configuración Netlify
├── public/
│   └── index.html                ← la app completa
└── netlify/
    └── functions/
        ├── meta.js               ← proxy Meta Ads API
        └── ai.js                 ← proxy Anthropic Claude
```

## Paso 1 — Subir a GitHub

1. Crear repo en github.com (puede ser privado)
2. En la carpeta `brote-ad`:
   ```
   git init
   git add .
   git commit -m "Brote AD v1"
   git remote add origin https://github.com/TU_USER/brote-ad.git
   git push -u origin main
   ```

## Paso 2 — Conectar Netlify a GitHub

1. Entrar a app.netlify.com
2. "Add new site" → "Import an existing project" → GitHub
3. Seleccionar el repo `brote-ad`
4. Configuración de build:
   - Build command: (dejar vacío)
   - Publish directory: `public`
5. Deploy site

## Paso 3 — Variables de entorno (los tokens seguros)

En Netlify → Site configuration → Environment variables:

| Variable       | Valor                          |
|----------------|-------------------------------|
| META_TOKEN     | Tu Access Token de Meta Ads   |
| META_ACCT      | act_XXXXXXXXX                 |
| ANTHROPIC_KEY  | sk-ant-XXXXXXXXXXXXX          |

Después de agregar → **Redeploy** (Deploys → Trigger deploy)

## Paso 4 — Listo ✓

- Abrí tu URL de Netlify
- Tab "✦ Análisis IA" → seleccioná un cliente → datos automáticos
- Los tokens nunca aparecen en el browser, están en el servidor

## Renovar el Access Token de Meta

Los tokens de usuario duran ~60 días. Para evitar esto:
- Usá un **System User Token** de larga duración desde Business Manager
- Business Manager → Configuración → Usuarios del sistema → Agregar usuario del sistema → Generar token
- Activar permisos: `ads_read`, `read_insights`
- Este token no expira (o dura años con la configuración correcta)
