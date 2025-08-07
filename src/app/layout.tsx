import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PWARegister from "./components/PWARegister";
import "./globals.css";

// Importando as fontes Geist
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Configuração de metadados para a aplicação
// Inclui o título, descrição e, agora, uma configuração de ícones mais completa
export const metadata: Metadata = {
  title: "M.A.G.I.A.",
  description: "Interface migrada com sucesso 🎉",
  icons: {
    icon: '/faviconx.ico', // Ícone da aba do navegador
    shortcut: '/faviconx.ico',
    apple: '/icon-192x192.png', // Ícone para PWA em dispositivos Apple
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icon-512x512.png', // Outro ícone para PWA
      },
    ],
  },
  // Referência para o arquivo de manifesto do PWA, essencial para a instalação
  manifest: '/manifest.json',
};

// Componente de layout principal da aplicação
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Componente que registra o Service Worker do PWA */}
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
