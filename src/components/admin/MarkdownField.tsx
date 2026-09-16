import { useRef, useState } from 'react';
import { Bold, Heading2, Italic, Link2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Markdown from '@/components/Markdown';

interface MarkdownFieldProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

type Action = 'h2' | 'bold' | 'italic' | 'list' | 'link';

export default function MarkdownField({ value, onChange, id }: MarkdownFieldProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const apply = (action: Action) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    let replacement = selected;

    switch (action) {
      case 'h2':
        replacement = `## ${selected || 'heading'}`;
        break;
      case 'bold':
        replacement = `**${selected || 'bold text'}**`;
        break;
      case 'italic':
        replacement = `*${selected || 'italic text'}*`;
        break;
      case 'list':
        replacement = (selected || 'item')
          .split('\n')
          .map((line) => (line.startsWith('- ') ? line : `- ${line}`))
          .join('\n');
        break;
      case 'link':
        replacement = `[${selected || 'link text'}](https://)`;
        break;
    }

    const next = value.slice(0, start) + replacement + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start, start + replacement.length);
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => apply('h2')} aria-label="heading">
          <Heading2 aria-hidden="true" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => apply('bold')} aria-label="bold">
          <Bold aria-hidden="true" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => apply('italic')} aria-label="italic">
          <Italic aria-hidden="true" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => apply('list')} aria-label="bullet list">
          <List aria-hidden="true" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => apply('link')} aria-label="link">
          <Link2 aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="ml-auto bg-transparent"
          onClick={() => setShowPreview((prev) => !prev)}
        >
          {showPreview ? 'hide preview' : 'preview'}
        </Button>
      </div>

      <Textarea
        id={id}
        ref={ref}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={18}
        className="font-mono text-sm leading-relaxed"
        placeholder={'## heading\n\nParagraph text.\n\n- bullet\n- bullet\n\n[link](https://example.com)'}
      />

      {showPreview && (
        <div className="rounded-md border border-border/60 bg-background/60 p-5">
          <Markdown className="space-y-5 text-base text-foreground/90">{value}</Markdown>
        </div>
      )}
    </div>
  );
}
