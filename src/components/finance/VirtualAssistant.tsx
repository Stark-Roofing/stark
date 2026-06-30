
import React from 'react';

// "Ask StarkBot" floating assistant removed per client request (2026-06-29).
// Component kept as a no-op so the ~16 pages that import/render it don't break.
// To restore the chatbot, revert this file to git history (FloatingButton +
// PromptBubble + ChatDialog wired via useVirtualAssistant).
const VirtualAssistant = () => null;

export default VirtualAssistant;
