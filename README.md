# Porshure Green

**Premium Document Processing Services**

Secure document support, organized with clarity. Professional document preparation, formatting, conversion, and submission services for individuals and businesses.

![Porshure Green](public/images/hero-main.jpg)

## Features

- **Document Processing** - Convert, merge, edit, and sign documents with precision
- **50+ Document Types** - Business, education, immigration, medical, family, and more
- **Secure & Confidential** - AES-256 encryption, auto file destruction, zero-trust access
- **Fast Turnaround** - Under 2 hours for most documents
- **Admin Dashboard** - Manage inquiries and client communications
- **Multi-Channel Contact** - WhatsApp, Email, iMessage, Phone integration

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend | Hono, tRPC 11, Drizzle ORM, MySQL |
| Auth | JWT-based email/password authentication |
| Animations | GSAP, Three.js (3D carousel), Lenis smooth scroll |
| Fonts | Playfair Display (headlines), Inter (body) |

## Brand Identity

| Color | Hex | Usage |
|-------|-----|-------|
| Ink Black | `#1A1A2E` | Text, dark sections |
| Paper Cream | `#FFF8ED` | Backgrounds |
| Porshure Green | `#3DDC84` | Signature accent |
| Olive Support | `#6C8F5A` | Secondary accent |
| Slate Gray | `#6E7480` | Body text |
| Warm Silver | `#C9C9C9` | Borders, dividers |

## Admin Dashboard

**URL:** `/admin`

**Login Credentials:**
- Email: `porshuregreen@gmail.com`
- Password: `PorshureGreen2025!`

### Dashboard Features
- Inquiry management (view, update status, delete)
- Statistics cards (Total, New, Read, Replied, Archived)
- Real-time data refresh
- Protected admin routes

## Deployment

### Vercel

1. Connect your GitHub repo to Vercel
2. Set environment variables (see `.env.example`)
3. Deploy automatically on every push

### Environment Variables

```env
DATABASE_URL=mysql://user:pass@host:port/db
ADMIN_JWT_SECRET=your-secret-key
```

### Build

```bash
npm install
npm run build
```

### Development

```bash
npm install
npm run db:push
npm run dev
```

## Contact

- **WhatsApp:** +1 (415) 534-5986
- **Email:** porshuregreen@gmail.com
- **iMessage:** porshuregreen@gmail.com
- **Phone:** +1 (415) 534-5986

## License

Private - All rights reserved.
