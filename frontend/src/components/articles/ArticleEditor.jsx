import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArticleBody from "./ArticleBody";
import { getPlainTextFromHtml, sanitizeArticleHtml } from "../../utils/html";

const initialForm = {
  title: "",
  body: "",
  tagNames: "",
  coverImage: null,
};

const slashCommands = [
  { html: "<h1><br></h1><p><br></p>", keywords: "h1 title large encabezado", label: "Heading 1", preview: "H1" },
  { html: "<h2><br></h2><p><br></p>", keywords: "h2 subtitle encabezado", label: "Heading 2", preview: "H2" },
  { html: "<h3><br></h3><p><br></p>", keywords: "h3 small title encabezado", label: "Heading 3", preview: "H3" },
  { html: "<p><strong><br></strong></p>", keywords: "bold strong negrita", label: "Bold", preview: "B" },
  { html: "<p><em><br></em></p>", keywords: "italic cursiva", label: "Italic", preview: "I" },
  { html: "<blockquote><br></blockquote><p><br></p>", keywords: "quote cita", label: "Quote", preview: "“”" },
  { html: "<ul><li><br></li></ul><p><br></p>", keywords: "bullet list viñeta vineta", label: "Bullet list", preview: "•" },
  { html: "<ol><li><br></li></ol><p><br></p>", keywords: "number ordered list enumerada", label: "Numbered list", preview: "1." },
  { html: '<ul data-type="task-list"><li><input type="checkbox" disabled> <br></li></ul><p><br></p>', keywords: "task todo checkbox tarea", label: "Task", preview: "☐" },
  { html: "<pre><code><br></code></pre><p><br></p>", keywords: "code block codigo", label: "Code block", preview: "</>" },
  { html: '<p><a href="https://example.com"><br></a></p>', keywords: "link url enlace", label: "Link", preview: "↗" },
  { html: "<hr><p><br></p>", keywords: "divider separator separador", label: "Divider", preview: "—" },
  { html: '<p><span style="color: #7c3aed;"><br></span></p>', keywords: "color violet text", label: "Violet text", preview: "A" },
  { html: "<p><mark><br></mark></p>", keywords: "highlight resaltado", label: "Highlight", preview: "▣" },
  { html: '<p><span style="font-size: 1.35rem; font-weight: 700;"><br></span></p>', keywords: "size large text grande", label: "Large text", preview: "T" },
  { html: "<p><small><br></small></p>", keywords: "size small text pequeno", label: "Small text", preview: "t" },
];

function getSelectedRange() {
  const selection = window.getSelection();
  return selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
}

function moveCaretToNode(node) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

export default function ArticleEditor({
  backTo = "/",
  initialArticle,
  mode = "create",
  onSubmit,
}) {
  const editorRef = useRef(null);
  const commandRangeRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [slashMenu, setSlashMenu] = useState({ activeIndex: 0, open: false, query: "" });

  useEffect(() => {
    if (!initialArticle) {
      return;
    }

    const nextBody = sanitizeArticleHtml(initialArticle.body || "");
    const nextForm = {
      body: nextBody,
      coverImage: null,
      tagNames: initialArticle.tags?.map((tag) => tag.name).join(", ") || "",
      title: initialArticle.title || "",
    };

    setForm(nextForm);

    if (editorRef.current) {
      editorRef.current.innerHTML = nextBody;
    }
  }, [initialArticle]);

  const tags = useMemo(
    () => form.tagNames.split(",").map((tag) => tag.trim()).filter(Boolean),
    [form.tagNames],
  );

  const filteredCommands = useMemo(() => {
    const query = slashMenu.query.toLowerCase();
    if (!query) return slashCommands;
    return slashCommands.filter((command) =>
      `${command.label} ${command.keywords}`.toLowerCase().includes(query),
    );
  }, [slashMenu.query]);

  const syncEditorBody = () => {
    const body = sanitizeArticleHtml(editorRef.current?.innerHTML || "");
    setForm((current) => ({ ...current, body }));
    return body;
  };

  const updateField = (event) => {
    const { files, name, value } = event.target;
    setForm((current) => ({ ...current, [name]: files ? files[0] : value }));
  };

  const closeSlashMenu = () => {
    setSlashMenu((current) => ({ ...current, open: false, query: "" }));
  };

  const insertCommand = (command) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    const selection = window.getSelection();
    const range = commandRangeRef.current || getSelectedRange();

    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const template = document.createElement("template");
    template.innerHTML = command.html;
    const nodes = Array.from(template.content.childNodes);
    const activeRange = selection.getRangeAt(0);
    activeRange.deleteContents();

    nodes.forEach((node) => {
      activeRange.insertNode(node);
      activeRange.setStartAfter(node);
      activeRange.collapse(true);
    });

    const firstElement = nodes.find((node) => node.nodeType === Node.ELEMENT_NODE);
    if (firstElement) {
      moveCaretToNode(firstElement);
    }

    closeSlashMenu();
    syncEditorBody();
  };

  const handleEditorKeyDown = (event) => {
    if (event.key === "/" && !slashMenu.open) {
      event.preventDefault();
      commandRangeRef.current = getSelectedRange();
      setSlashMenu({ activeIndex: 0, open: true, query: "" });
      return;
    }

    if (!slashMenu.open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeSlashMenu();
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      setSlashMenu((current) => ({
        ...current,
        activeIndex: 0,
        query: current.query.slice(0, -1),
      }));
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSlashMenu((current) => ({
        ...current,
        activeIndex: Math.min(current.activeIndex + 1, filteredCommands.length - 1),
      }));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSlashMenu((current) => ({
        ...current,
        activeIndex: Math.max(current.activeIndex - 1, 0),
      }));
      return;
    }

    if (event.key === "Enter" || event.key === "Tab") {
      const command = filteredCommands[slashMenu.activeIndex];
      if (command) {
        event.preventDefault();
        insertCommand(command);
      }
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
      setSlashMenu((current) => ({
        ...current,
        activeIndex: 0,
        query: `${current.query}${event.key}`,
      }));
    }
  };

  const submitArticle = async (event) => {
    event.preventDefault();
    const body = syncEditorBody();

    if (!getPlainTextFromHtml(body)) {
      setError("Agrega contenido al articulo antes de guardarlo.");
      editorRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setError(null);

    const articleData = new FormData();
    articleData.append("title", form.title);
    articleData.append("body", body);
    articleData.append("tag_names", form.tagNames);

    if (form.coverImage) {
      articleData.append("cover_image", form.coverImage);
    }

    try {
      await onSubmit(articleData);
    } catch (submitError) {
      console.error("Error guardando articulo", submitError);
      setError("No se pudo guardar el articulo. Revisa los campos e intenta otra vez.");
    } finally {
      setSubmitting(false);
    }
  };

  const plainBody = getPlainTextFromHtml(form.body);
  const isEditing = mode === "edit";

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 border-t border-slate-300 pt-8 dark:border-slate-700 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            to={backTo}
            className="mb-4 inline-flex text-sm font-semibold text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            {isEditing ? "Back to article" : "Back to blog"}
          </Link>
          <h2 className="text-4xl font-bold tracking-normal text-slate-950 dark:text-white">
            {isEditing ? "Edit post" : "Create a new post"}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {isEditing
              ? "Refine the article content, tags, and cover image."
              : "Draft the article, attach a cover, and publish it directly to your blog."}
          </p>
        </div>

        <button
          type="submit"
          form="article-editor"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:w-fit"
        >
          {submitting ? "Saving..." : isEditing ? "Save changes" : "Publish article"}
        </button>
      </div>

      <form
        id="article-editor"
        onSubmit={submitArticle}
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
      >
        <section className="grid gap-6">
          <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <label className="grid gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Title
              </span>
              <input
                name="title"
                value={form.title}
                onChange={updateField}
                required
                className="w-full bg-transparent text-3xl font-bold tracking-normal text-slate-950 outline-none placeholder:text-slate-300 dark:text-white dark:placeholder:text-slate-700"
                placeholder="A sharp title for your post"
              />
            </label>
          </div>

          <div className="relative border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Article body
              </span>
              <span className="text-xs font-medium text-slate-400">
                Press / for blocks and styles
              </span>
            </div>

            <div className="relative">
              {!plainBody && (
                <p className="pointer-events-none absolute left-0 top-0 text-base leading-8 text-slate-400 dark:text-slate-600">
                  Start writing, or press / for commands.
                </p>
              )}

              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={syncEditorBody}
                onInput={syncEditorBody}
                onKeyDown={handleEditorKeyDown}
                className="article-content min-h-[460px] max-w-none outline-none"
              />
            </div>

            {slashMenu.open && (
              <div className="absolute left-5 right-5 top-20 z-20 max-w-xl border border-slate-200 bg-slate-50 p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-2 flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Commands
                  </span>
                  <span className="text-xs font-semibold text-slate-400">/{slashMenu.query}</span>
                </div>
                <div className="grid max-h-72 gap-1 overflow-y-auto">
                  {filteredCommands.length > 0 ? (
                    filteredCommands.map((command, index) => (
                      <button
                        key={command.label}
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          insertCommand(command);
                        }}
                        className={`grid grid-cols-[40px_1fr] items-center gap-3 px-3 py-2 text-left transition ${
                          index === slashMenu.activeIndex
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                            : "text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center text-xs font-bold ${
                            index === slashMenu.activeIndex
                              ? "bg-white/10 dark:bg-slate-950/10"
                              : "bg-slate-200 dark:bg-slate-800"
                          }`}
                        >
                          {command.preview}
                        </span>
                        <span className="text-sm font-semibold">{command.label}</span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                      No commands found.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Saved output
              </h3>
              <span className="text-xs font-medium text-slate-400">{plainBody.length} chars</span>
            </div>
            <div className="min-h-36">
              {plainBody ? (
                <ArticleBody content={form.body} />
              ) : (
                <p className="text-slate-400">The rendered article will appear here.</p>
              )}
            </div>
          </div>
        </section>

        <aside className="h-fit border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-6">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Post settings</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Add the details that help the post scan well on the homepage.
            </p>
          </div>

          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Tags</span>
              <input
                name="tagNames"
                value={form.tagNames}
                onChange={updateField}
                className="border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none focus:border-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white"
                placeholder="React, Django, Portfolio"
              />
            </label>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <label className="grid cursor-pointer gap-3 border border-dashed border-slate-300 bg-white p-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <span className="font-semibold">Cover image</span>
              <span className="text-slate-500 dark:text-slate-400">
                {form.coverImage
                  ? form.coverImage.name
                  : isEditing
                    ? "Keep current cover or choose a new one"
                    : "Choose an image file"}
              </span>
              <input
                name="coverImage"
                type="file"
                accept="image/*"
                onChange={updateField}
                className="sr-only"
              />
            </label>

            <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
              <dl className="grid gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Title</dt>
                  <dd className={form.title ? "font-semibold" : "text-slate-400"}>
                    {form.title ? "Ready" : "Missing"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Body</dt>
                  <dd className={plainBody ? "font-semibold" : "text-slate-400"}>
                    {plainBody ? "Ready" : "Missing"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Cover</dt>
                  <dd className={form.coverImage || initialArticle?.cover_image ? "font-semibold" : "text-slate-400"}>
                    {form.coverImage || initialArticle?.cover_image ? "Added" : "Optional"}
                  </dd>
                </div>
              </dl>
            </div>

            {error && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                {error}
              </p>
            )}
          </div>
        </aside>
      </form>
    </>
  );
}
