"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  MessageSquare,
  Users,
  Command,
  Settings,
  Mic,
  MicOff,
  Sun,
  Moon,
  Menu,
  X,
  Plus,
  Send,
  Crown,
  Zap,
  FileText,
  Globe,
  Lightbulb,
  BookOpen,
} from "lucide-react";

// Os caminhos para os componentes foram corrigidos para `../components/ui/`
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

// Simulação de dados iniciais
const initialMessages = [
  {
    id: "1",
    content:
      "Olá! Sou o M.A.G.I.A., seu assistente de IA. Como posso ajudar você hoje?",
    role: "assistant",
    timestamp: new Date(),
  },
];

const quickActions = [
  {
    id: "resume",
    label: "Fazer resumo",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "translate",
    label: "Traduzir",
    icon: Globe,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "idea",
    label: "Gerar ideia",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "explain",
    label: "Explicar",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
  },
];

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState("essencial");
  const [theme, setTheme] = useState("dark");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activePanel, setActivePanel] = useState("chat");

  // Aplicar tema ao documento
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Alternar tema
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Alternar modo
  const toggleMode = () => {
    setCurrentMode(currentMode === "essencial" ? "pro" : "essencial");
  };

  // Enviar mensagem
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simular resposta da IA
    setTimeout(
      () => {
        const responses = [
          "Entendi! Como posso ajudar você com isso?",
          "Interessante pergunta. Deixe-me pensar sobre isso...",
          "Claro! Vou te ajudar com essa tarefa.",
          "Ótima ideia! Vamos trabalhar nisso juntos.",
          "Posso te dar algumas sugestões sobre isso.",
        ];

        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 2000,
    );
  };

  // Componente da Sidebar
  const Sidebar = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="fixed inset-y-0 left-0 z-50 w-80 glass-strong border-r border-white/10 lg:relative lg:translate-x-0 particle-bg"
    >
      {/* Header da Sidebar */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-glow-strong animate-float">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-gradient animate-neon-pulse">
              M.A.G.I.A.
            </h2>
            <div className="flex items-center gap-1">
              {currentMode === "pro" ? (
                <Crown className="w-3 h-3 text-yellow-400" />
              ) : (
                <Zap className="w-3 h-3 text-cyan-400" />
              )}
              <span className="text-xs text-muted-foreground">
                {currentMode === "pro" ? "Modo Pro" : "Modo Essencial"}
              </span>
            </div>
          </div>
        </motion.div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden hover-glow"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Menu de Navegação */}
      <div className="p-4 space-y-3">
        {[
          {
            id: "chat",
            label: "Chat",
            icon: MessageSquare,
            count: messages.length,
            color: "text-cyan-400",
          },
          {
            id: "commands",
            label: "Comandos",
            icon: Command,
            color: "text-blue-400",
          },
          ...(currentMode === "pro"
            ? [
                {
                  id: "agents",
                  label: "Agentes",
                  icon: Users,
                  color: "text-purple-400",
                },
              ]
            : []),
          {
            id: "settings",
            label: "Configurações",
            icon: Settings,
            color: "text-orange-400",
          },
        ].map((item, index) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start gap-3 h-12 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-glow text-white"
                    : "hover:bg-white/5 hover:border-white/10 border border-transparent"
                }`}
                onClick={() => setActivePanel(item.id)}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-cyan-400" : item.color}`}
                />
                <span className="font-medium">{item.label}</span>
                {item.count && (
                  <Badge
                    variant="secondary"
                    className="ml-auto bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                  >
                    {item.count}
                  </Badge>
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Nova Conversa */}
      <div className="p-4 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-3 h-12 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover-glow transition-all duration-300"
          >
            <Plus className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">Nova Conversa</span>
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <motion.div
          className="flex items-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Powered by AI · Created by Carilo Lemos</span>
        </motion.div>
      </div>
    </motion.div>
  );

  // Componente do Chat
  const ChatArea = () => (
    <div className="flex flex-col h-full aurora-bg">
      {/* Header do Chat */}
      <div className="glass-strong border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden hover-glow"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <motion.h1
              className="text-2xl font-bold text-gradient-cosmic"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              M.A.G.I.A.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge
                variant={currentMode === "pro" ? "default" : "secondary"}
                className={`${
                  currentMode === "pro"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-glow"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-glow"
                } border-0`}
              >
                {currentMode === "pro" ? "Modo Pro" : "Modo Essencial"}
              </Badge>
            </motion.div>
          </div>

          <div className="flex items-center gap-2">
            {/* Controle de Voz */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={isVoiceActive ? "destructive" : "ghost"}
                size="sm"
                onClick={() => setIsVoiceActive(!isVoiceActive)}
                className={`${
                  isVoiceActive
                    ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse-glow shadow-glow-strong"
                    : "hover:bg-white/10 hover-glow"
                } transition-all duration-300`}
              >
                {isVoiceActive ? (
                  <Mic className="w-5 h-5" />
                ) : (
                  <MicOff className="w-5 h-5" />
                )}
              </Button>
            </motion.div>

            {/* Toggle Modo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMode}
                className="hidden sm:flex gap-2 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover-glow transition-all duration-300"
              >
                {currentMode === "pro" ? (
                  <>
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400">Pro</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400">Essencial</span>
                  </>
                )}
              </Button>
            </motion.div>

            {/* Toggle Tema */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hover:bg-white/10 hover-glow transition-all duration-300"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 1 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center shadow-glow-strong animate-float"
            >
              <Bot className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h3
              className="text-3xl font-bold mb-3 text-gradient-cosmic animate-neon-pulse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Olá! Como posso ajudar Mestre?
            </motion.h3>
            <motion.p
              className="text-muted-foreground mb-10 max-w-md text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Comece uma conversa ou use um dos comandos rápidos abaixo.
            </motion.p>

            {/* Ações Rápidas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.7 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="glass-card hover-lift focus-ring cursor-pointer border-white/20 hover:border-cyan-500/50 transition-all duration-300 group">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-all duration-300`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {action.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`flex gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-glow"
                        : "gradient-primary shadow-glow-strong"
                    }`}
                  >
                    {message.role === "user" ? (
                      <div className="w-6 h-6 bg-white/30 rounded-full" />
                    ) : (
                      <Bot className="w-6 h-6 text-white" />
                    )}
                  </motion.div>

                  {/* Mensagem */}
                  <div
                    className={`flex-1 max-w-[80%] ${
                      message.role === "user" ? "items-end" : "items-start"
                    } flex flex-col`}
                  >
                    <Card
                      className={`glass-card shadow-medium transition-all duration-300 hover:shadow-strong ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 ml-8"
                          : "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 mr-8"
                      }`}
                    >
                      <CardContent className="p-4">
                        <p className="text-sm leading-relaxed text-white">
                          {message.content}
                        </p>
                      </CardContent>
                    </Card>
                    <span className="text-xs text-muted-foreground mt-2 px-2">
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Indicador de digitação */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-glow-strong">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <Card className="glass-card mr-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Área de Input */}
      <div className="glass-strong border-t border-white/10 p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Textarea
              value={inputMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInputMessage(e.target.value)
              }
              onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Digite sua mensagem..."
              className="min-h-[60px] max-h-32 input-modern resize-none border-white/20 focus:border-cyan-500/50 bg-white/5 backdrop-blur-lg"
              disabled={isTyping}
            />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="default" // Adicionado para corrigir o erro
              size="default" // Adicionado para corrigir o erro
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="gradient-primary text-white shadow-glow hover:shadow-glow-strong disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 h-12 px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Ações Rápidas no Modo Essencial */}
        {currentMode === "essencial" && (
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {quickActions.slice(0, 4).map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass text-xs border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover-glow transition-all duration-300"
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {action.label}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-foreground overflow-hidden">
      <div className="flex h-screen">
        {/* Sidebar Desktop */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Sidebar Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="lg:hidden">
                <Sidebar />
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Área Principal */}
        <div className="flex-1 flex flex-col">
          <ChatArea />
        </div>
      </div>
    </div>
  );
}
