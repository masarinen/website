import json, re, sys, os, glob
src, outdir = sys.argv[1], sys.argv[2]
data = json.load(open(src, encoding="utf-8"))
for f in glob.glob(f"{outdir}/*.php"): os.remove(f)
def php(markup):
    markup = re.sub(r"%%ILL:([a-z-]+)%%", lambda m: f"<?php echo esc_url( get_theme_file_uri( 'assets/illustrations/{m.group(1)}.svg' ) ); ?>", markup)
    markup = re.sub(r"%%URL:([^%]*)%%", lambda m: "<?php echo esc_url( home_url( '" + m.group(1).replace("'", "\\'") + "' ) ); ?>", markup)
    assert "%%" not in markup
    return markup
for i, (slug, v) in enumerate(data.items()):
    head = ["<?php", "/**", f" * Title: {v['title']}", f" * Slug: wolf/{slug}"]
    if v["cats"]: head.append(f" * Categories: {', '.join(v['cats'])}")
    if v.get("inserter") is False: head.append(" * Inserter: no")
    if v.get("page"):
        head += [" * Block Types: core/post-content", " * Post Types: page"]
    head += [" * Viewport Width: 1400", " */", "?>"]
    open(f"{outdir}/{slug}.php", "w", encoding="utf-8").write("\n".join(head) + "\n" + php(v["markup"]) + "\n")
print(len(data), "pattern files")
