# ai-chat (portable module)

Drag this whole folder into another site's `src/` and render the widget:

```jsx
import { ChatWidget } from "./ai-chat";
<ChatWidget />   // e.g. inside your layout
```

## Requirements in the host site
- React 18+, Vite
- `lucide-react`
- Tailwind CSS (classes are used; make sure `./src/**/*.{js,jsx}` is in its content paths)

## Config
- API base URL: `config.js` (or `VITE_AI_CHAT_API_URL` in `.env`)
- Assistant photo/videos: `assets/` (replace files, keep names)

## Layout
- `components/` ChatWidget (launcher), AIChat (panel), GirlAvatar, GirlPortrait, ChatHistorySkeleton
- `hooks/` speech recognition + synthesis
- `utils/` speech helpers
- `services/chatApi.js` chat endpoints
