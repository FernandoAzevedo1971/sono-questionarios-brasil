
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada",
        description: "Agradecemos seu contato. Responderemos em breve.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        {/* Contact Header */}
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Voltar para o início</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">Contato</h1>
            <p className="text-lg opacity-90">
              Entre em contato conosco para dúvidas, sugestões ou colaborações
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Fale Conosco</h2>
                    <p className="text-neutral-700 mb-6">
                      Tem alguma dúvida, sugestão de questionário para inclusão, ou quer colaborar com o portal?
                      Envie-nos uma mensagem e responderemos em breve.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-neutral-900">E-mail:</h3>
                          <p className="text-neutral-700">contato@portalsonomedicina.com.br</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-neutral-900">Suporte:</h3>
                          <p className="text-neutral-700">Para questões técnicas, envie mensagem para suporte@portalsonomedicina.com.br</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                          Nome
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                          E-mail
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                          Mensagem
                        </label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="w-full min-h-[120px]"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar Mensagem"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
