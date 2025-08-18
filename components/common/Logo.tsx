import { PenTool } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
          <PenTool className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl text-foreground leading-none">AuthorPro</span>
        <span className="text-xs text-muted-foreground leading-none">Professional Writing</span>
      </div>
    </div>
  );
}