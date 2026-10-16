interface AudienceNoteProps {
  readonly title: string
  readonly body: string
}

export function AudienceNote({ title, body }: AudienceNoteProps) {
  return (
    <aside className="audience-note" aria-label={title}>
      <p className="audience-note-title">{title}</p>
      <p className="audience-note-body">{body}</p>
    </aside>
  )
}
