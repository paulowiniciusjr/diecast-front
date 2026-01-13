# 🚗 Diecast – Catálogo de Veículos em Miniatura - FRONTEND

Projeto pessoal para catalogação de veículos diecast, desenvolvido com Java + Spring Boot no backend e Angular 20 no frontend, seguindo padrões modernos de arquitetura, segurança e organização de código.

📌 Visão Geral

O sistema permite:

Autenticação de usuários via JWT

Acesso seguro a endpoints protegidos

Listagem e gerenciamento de veículos em miniatura

A arquitetura foi pensada para ser escalável, segura e de fácil manutenção, utilizando boas práticas atuais tanto no backend quanto no frontend.


🎨 Frontend
🔧 Stack

Angular 20

Standalone Components (sem NgModules)

TypeScript strict

HttpClient com fetch

RxJS

🧠 Arquitetura do Frontend

O frontend segue o padrão feature-based + core + layout, recomendado para aplicações Angular modernas:

app/
├── core/
├── features/
├── layout/
🧩 Core
Services

StorageService

Centraliza acesso ao localStorage

Gerencia o token JWT

Guards

AuthGuard (funcional)

Protege rotas autenticadas

Redireciona para /login quando não autenticado

🔁 HTTP Interceptor

Interceptor funcional (HttpInterceptorFn)

Injeta automaticamente o token JWT em todas as requisições:

Authorization: Bearer <token>

Benefícios:

Elimina repetição de código

Centraliza autenticação HTTP

🎯 Features

Cada funcionalidade é isolada em sua própria pasta:

features/
├── auth/
│   └── login/
├── vehicles/

Isso garante:

Alta coesão

Baixo acoplamento

Facilidade de evolução

🧱 Layout

LayoutComponent

HeaderComponent

Uso de RouterOutlet aninhado

Separação clara entre:

Telas públicas (login)

Telas autenticadas (sistema)

