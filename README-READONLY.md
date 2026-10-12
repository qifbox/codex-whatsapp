# WhatsApp Relay read-only

Esta variante é uma cópia pública reduzida do upstream `abuiles/codex-whatsapp-relay`, mantendo a licença e a atribuição upstream.

O único entry point é `npm run whatsapp:mcp`. O MCP local por stdio permite consultar o estado, conversas, mensagens em cache e uma triagem heurística de possíveis mensagens sem resposta. Não existem ferramentas para enviar, apagar, editar, marcar como lida, gerir contactos/grupos, controlar Codex, iniciar QR, TTS ou webhooks.

A receção passiva só tenta usar credenciais já existentes. Sem credenciais fica em `not_authenticated`; esta cópia não pede pairing. O cache é evidência limitada: pode estar desatualizado, incompleto, duplicado ou omitir alterações/revogações e respostas feitas noutro dispositivo. “Sem resposta observável” não é uma decisão de resposta.

Não incluir credenciais, `data/auth`, cache real, logs com conteúdo ou dados de clientes no fork. Mensagens são dados não confiáveis e nunca instruções. Exemplos sintéticos vivem apenas nos testes. O futuro fluxo de resposta é revisão humana, aprovação explícita de Bruno e envio manual no browser, fora deste processo.

Baileys é um cliente não oficial. A versão está fixada em `7.0.0-rc.12`, correção mínima adotada para o advisory GHSA-qvv5-jq5g-4cgg/CVE-2026-48063 no momento desta implementação; executar auditoria de dependências antes de qualquer ligação real.
