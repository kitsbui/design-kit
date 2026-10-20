---
name: blog-writing
description: Turn a document the owner sends (notes, a knowledge base, an outline, a handoff) into researched blog posts end to end and without asking - pillar and cluster posts, natural writing in each language with trade terms kept in English, verified sources, freely licensed pictures with credits, official videos checked through oEmbed, top SEO/AIO (definition first, facts, FAQ, citations, JSON-LD, hreflang), a content pack and its tests - then present them as a centred article page. Use whenever the owner shares a document for a blog, or asks for guides, news, playlists, skill tutorials or venue reviews.
---

# Blog writing, from a document

The owner's standing request (FeestFinder, 2026-10-20): "I only send the document; you do everything else." No questions back unless the document contradicts itself on something that matters. Everything below is in `blog-kit/` of the design kit; the MCP tools are `blog_guide`, `blog_template`, `blog_check`, `blog_jsonld`.

## 1. Plan the posts (15 min)

Read the whole document. List one pillar post ("What is X?") and the clusters under it (`parent`). For each: the main keyword, the main question, 3–5 side questions, the internal links it will give and receive. Note what the document gets wrong (`blog-kit/writing.md`, "Từ tài liệu").

## 2. Decide where posts live (once per project)

The database is the source of truth (editors fix a post without a deploy); the repo holds **content packs** (one file per post, a media helper for credits, an index of packs) imported by a job that adds new posts for review, updates a post only while nobody edited it (`edited_at`), and never deletes. Never rename a post's key.

## 3. Research (`blog-kit/research.md`)

- Sources: 4–5 per post from different reputable publishers; `scripts/check_urls.py` keeps those answering 200.
- Pictures: `scripts/commons.py`; free licences only; 1600 px thumbnails; credit "Author (file page) · licence · Wikimedia Commons".
- Videos: `scripts/yt.py`; official artist channel → "- Topic" → verified label; validate each with `oembed()`; keep the channel name.
- Never invent a URL, a video id, a year, a nationality or a quote. Unsure → leave it out.

## 4. Write (`blog-kit/writing.md`, `blog-kit/template.md`)

Each language written natively; trade terms stay English. A guide: title ≤ 60 characters with the keyword, excerpt 140–170 characters, a **40–60-word definition first, the term in bold**, how it works, history, 1–2 credited pictures, a table of five people or works, a table of branches, a comparison table, "how to recognise it" as a numbered list, a link into the product ("where to hear it"), three "read next" links; 5–6 facts, 5 FAQ (25–80 words each, standalone), 4–5 sources, media with a one-line note each.

## 5. Check before importing

Call `blog_check` on every post in every language (title and excerpt lengths, definition length, sections, tables, lists, links, credited pictures, FAQ, sources, no HTML). Fix until it passes. Then the project's own content test (both languages present, internal links exist, five tracks), typecheck, tests, lint.

## 6. Present (`blog-kit/presentation.md`)

A centred column (`max-w-read`) on every width: category, H1, excerpt, byline with reading time, chips, credited cover, quick facts, body (headings, lists, quotes, tables that become cards on a phone, figures with captions), media that loads on tap, FAQ accordion, children/parent links, numbered sources. No side column, no HTML from the writer, players rebuilt from an id on allowed hosts.

## 7. SEO/AIO (`blog-kit/seo-aio.md`)

`blog_jsonld` builds the graph (BlogPosting with `citation`, DefinedTerm for a "What is" post, FAQPage, ItemList of recordings, BreadcrumbList). hreflang only when both languages exist. Sitemap, `llms.txt`, a `.md` twin.

## 8. Report

In the owner's language: the posts made, what was corrected from the document, what was left out and why, where the posts wait for review, and one line on how to publish.

Gotchas: a pillar under 500 words fails review (add a glossary table and a regional section); a style key that does not exist in the product breaks the "where to hear it" link; YouTube "Topic" channels embed even when the label's own upload does not; Britannica and Red Bull answer 403 to scripts.
