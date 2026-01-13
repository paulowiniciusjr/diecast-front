┌──────────────┐
│   Browser    │
│  (Angular)   │
└──────┬───────┘
       │ HTTP (JSON)
       │ Authorization: Bearer JWT
       ▼
┌────────────────────────────┐
│        Frontend             │
│        Angular 20           │
│                            │
│  ┌──────────────────────┐  │
│  │ Login Component      │  │
│  │ (tela pública)       │  │
│  └─────────┬────────────┘  │
│            │               │
│  ┌─────────▼────────────┐  │
│  │ AuthGuard             │  │
│  │ (proteção de rotas)   │  │
│  └─────────┬────────────┘  │
│            │               │
│  ┌─────────▼────────────┐  │
│  │ HTTP Interceptor      │  │
│  │ (injeta JWT)          │  │
│  └─────────┬────────────┘  │
│            │               │
│  ┌─────────▼────────────┐  │
│  │ Vehicles Feature      │  │
│  │ (CRUD)                │  │
│  └──────────────────────┘  │
│                            │
│  StorageService             │
│  (localStorage)             │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│          Backend            │
│        Spring Boot          │
│                            │
│  ┌──────────────────────┐  │
│  │ Controller Layer      │  │
│  │ (@RestController)     │  │
│  └─────────┬────────────┘  │
│            │               │
│  ┌─────────▼────────────┐  │
│  │ Service Layer         │  │
│  │ (regras de negócio)   │  │
│  └─────────┬────────────┘  │
│            │               │
│  ┌─────────▼────────────┐  │
│  │ Repository Layer      │  │
│  │ (JPA / Hibernate)     │  │
│  └─────────┬────────────┘  │
│            │               │
│  ┌─────────▼────────────┐  │
│  │ Database              │  │
│  └──────────────────────┘  │
│                            │
│  JwtAuthenticationFilter    │
│  (validação do token)       │
│                            │
│  Spring Security            │
│  + @PreAuthorize            │
└────────────────────────────┘
