import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  children: string;
  className?: string;
}

/** Renders posting bodies. Raw HTML is not enabled, so content is safe by default. */
export default function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="font-display text-2xl sm:text-3xl text-foreground pt-4">{children}</h2>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-2xl sm:text-3xl text-foreground pt-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-xl sm:text-2xl text-foreground pt-2">{children}</h3>
          ),
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-3 pl-6 marker:text-accent">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-3 pl-6 marker:text-accent">{children}</ol>
          ),
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          hr: () => <hr className="border-border/60" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent pl-4 text-foreground/80">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 hover:text-accent/80"
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
