from cobalt.hierarchical import Act
from lxml import etree

NS = "{http://docs.oasis-open.org/legaldocml/ns/akn/3.0}"
TAGS = [
    'act',
    'body',
    'hcontainer',
    'part',
    'section',
    'subsection',
    'paragraph',
    'subparagraph'
]

LAW_PARTS = [NS + tag for tag in TAGS]

def generate_selector(type,name,text,children,checked=False):
    html = ""
    html += '<div class="lawpart ' + type + '"><div class="form-check">'
    html += '<input class="form-check-input" type="radio" name="section" id="' + name + '_section"'
    if checked:
        html += ' checked'
    html += ">"
    html += '<div class="lawtext"'
    if children:
        html += ' data-bs-toggle="collapse" data-bs-target="#' + name + '"><i class="bi bi-caret-right"></i>'
    else:
        html += '>'
    html += text
    html += '</div></div></div>'
    if children:
        html += '<div class="subparts collapse" id="' + name + '">'
    return html

def generate_tree(node,indent=0):
    # print(" "*indent + node.tag.replace(NS,""))
    html = ""
    if node.tag == NS + "act":
        # Add the header, the do the same to the body.
        title = node.preface.find(NS + "p[@class='title']")
        # print(" "*indent + "Act: " + title.shortTitle.text)
        html += '<nav class="column">\n'
        html += generate_selector("act","root",title.shortTitle.text,True,True)
        for child in node.body.getchildren():
            html += generate_tree(child)
        # html += generate_tree(node.body,indent+1)
        html += "</div></nav>"
    else:
        children = node.getchildren()
        subtags = [x.tag for x in children]
        initial_text = ""
        # First, we are going to generate the text that
        # should appear here if it is a numbered or named section.
        if NS + 'num' in subtags:
            # print(" "*indent + "Num: " + node['num'].text)
            initial_text += "<num>" + node['num'].text + "</num>"
        if NS + 'heading' in subtags:
            # print(" "*indent + "Heading: " + node['heading'].text)
            initial_text += node['heading'].text
        if NS + 'subheading' in subtags:
            # print(" "*indent + "Subheading: " + node['subheading'].text)
            initial_text += node['subheading'].text

        # Now we need to figure out if this is a leaf node, or not
        # It is a leaf node if it contains a content tag.
        if NS + "content" in subtags: # This is a leaf node
            # the initial text should be added to the HTML as a lawtext part, followed
            # by the content of the internal text elements.
            content_text = ""
            # for sub_content in node['content'].getchildren():
            #     content_text += str(etree.tostring(sub_content).decode("utf-8"))
            content_text = etree.tostring(node['content'], method="html", encoding="utf-8").decode('utf-8')
            # Get a good name for the current node
            node_name =  node.attrib['eId']
            # print(node_name)
            html += generate_selector(node.tag.replace(NS,""),node_name,initial_text + " " + content_text,False)
        else: # This is a node with optional intro and wrapup, and list of sub-elements.
            # If this section has an intro, add the text of the intro to the initial_text
            if NS + "intro" in subtags: # This section has an intro.
                # print(" "*indent + "Intro: " + node['intro'].text)
                initial_text += node['intro'].text
            # Get a good name for the current node
            node_name =  node.attrib['eId']
            # print(node_name)
            # Generate the selector, and the start of the sub-parts
            html += generate_selector(node.tag.replace(NS,""),node_name,initial_text,True)
            # Generate the sub-parts.
            for child in children:
                if child.tag not in [NS + "num", NS + "heading", NS + "content", NS + "subheading", NS + 'intro',NS + 'wrapUp']:
                    html += generate_tree(child)
            # If there is a wrapup tag, add it to the subparts as a lawtext.
            if NS + "wrapup" in subtags:
                # print(" "*indent + "Wrapup: " + node['wrapup'].text)
                html += '<div class="lawtext">' + node['wrapup'].text + "</div>"
            # Close the sub-parts
            html += "</div>"
    return html
