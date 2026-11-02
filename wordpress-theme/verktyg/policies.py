import re, html, json, sys
SRC = "/home/user/website/policyer"
OUT = "/home/user/website/wordpress-theme/wolf/inc/policyer"
FILES = [("2-integritetspolicy.txt", "integritetspolicy", "Integritetspolicy"),
         ("3-kopvillkor.txt", "kopvillkor", "Köpvillkor"),
         ("1-returpolicy.txt", "returpolicy", "Returpolicy"),
         ("4-fraktpolicy.txt", "fraktpolicy", "Fraktpolicy"),
         ("6-anvandarvillkor.txt", "anvandarvillkor", "Användarvillkor"),
         ("7-rattsligt-meddelande.txt", "rattsligt-meddelande", "Rättsligt meddelande")]
def e(s): return html.escape(s, quote=False)
def para(lines): return '<!-- wp:paragraph -->\n<p>' + "<br>".join(e(l) for l in lines) + '</p>\n<!-- /wp:paragraph -->'
def head(t, lvl): 
    attrs = '' if lvl == 2 else ' {"level":%d}' % lvl
    return f'<!-- wp:heading{attrs} -->\n<h{lvl} class="wp-block-heading">{e(t)}</h{lvl}>\n<!-- /wp:heading -->'
def lst(items): 
    inner = "".join(f'<!-- wp:list-item -->\n<li>{e(i)}</li>\n<!-- /wp:list-item -->' for i in items)
    return f'<!-- wp:list -->\n<ul class="wp-block-list">{inner}</ul>\n<!-- /wp:list -->'
def short(l): return len(l) < 70 and not re.search(r"[.:;!?]$", l)
index = []
for fn, slug, title in FILES:
    text = open(f"{SRC}/{fn}", encoding="utf-8").read().replace("\r", "")
    lines = text.split("\n")
    lines = lines[1:]  # rubriken blir sidans titel
    raw = "\n".join(lines).strip("\n")
    sections = re.split(r"\n\s*\n\s*\n+", raw)
    blocks = []
    for si, sec in enumerate(sections):
        chunks = [c.strip("\n").split("\n") for c in re.split(r"\n\s*\n", sec) if c.strip()]
        for ci, ch in enumerate(chunks):
            ch = [l.rstrip() for l in ch]
            if si > 0 and ci == 0 and len(ch) == 1 and short(ch[0]):
                blocks.append(head(ch[0], 2)); continue
            if si > 0 and ci == 0 and len(ch) > 1 and short(ch[0]) and not ch[0].startswith(("-", "•")):
                blocks.append(head(ch[0], 2)); ch = ch[1:]
            elif len(ch) > 1 and short(ch[0]) and not ch[0].startswith(("-", "•")) and not ch[1].startswith(("-", "•")) and len(ch[1]) > 40:
                blocks.append(head(ch[0], 3)); ch = ch[1:]
            items = [l for l in ch if l.lstrip().startswith(("-", "•"))]
            if items and len(items) == len(ch):
                blocks.append(lst([l.lstrip()[1:].strip() for l in ch]))
            elif items:
                pre = [l for l in ch if not l.lstrip().startswith(("-", "•"))]
                if pre: blocks.append(para(pre))
                blocks.append(lst([l.lstrip()[1:].strip() for l in items]))
            else:
                blocks.append(para(ch))
    out = "\n\n".join(blocks) + "\n"
    for a, b in [("– Shopify (plattform för webbplats och webbutik)", "– one.com (webbhotell för webbplatsen och e-post)"),
                 ("[t.ex. Shopify Payments, Klarna, Swish", "[t.ex. Klarna, Swish, Stripe"),
                 ("Vissa leverantörer, till exempel Shopify, kan", "Vissa leverantörer kan")]:
        out = out.replace(a, b)
    open(f"{OUT}/{slug}.html", "w", encoding="utf-8").write(out)
    index.append({"slug": slug, "title": title})
json.dump(index, open(f"{OUT}/index.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(index)
