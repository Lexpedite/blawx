from cobalt.hierarchical import Act
from django.forms import NullBooleanField
from lxml import etree
import lxml

NS = "{http://docs.oasis-open.org/legaldocml/ns/akn/3.0}"
TAGS = [
    'act',
    'body',
    'hcontainer',
    'part',
    'section',
    'subsection',
    'paragraph',
    'subparagraph',
    'span'
]

LAW_PARTS = [NS + tag for tag in TAGS]

# An example of the target look for a content node looks like this:
# <content xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
#   <p>The winner of a game is the 
#       <span class="lawpart span" id="sec_4_section__player_span">
#           <input class="form-check-inline" type="radio" name="section" id="sec_4_section__player_span">
#               player who 
#               <span class="lawpart span" id="sec_4_section__player_span__throws_span">
#                   <input class="form-check-inline" type="radio" name="section" id="sec_4_section__payer_span__throws_span">
#                   throws a sign
#               </span>
#       </span>
#       that beats the sign of the other player.
#   </p>
# </content>
# Need to make some changes to the CSS so it displays better, but that should do the trick.

def generate_text(node):
    #TODO Insert text and generate spans where required.
    if type(node) != str:
        for child in node.getchildren():
            if child.tag == NS + "span":
                generate_span(child)
                generate_text(child)
            else:
                generate_text(child)
    return
    
def generate_span(node):
    #TODO Generate span and selector and then generate_text for the span body.
    # Add 'lawpart span' to the classes for the span node.
    node.attrib['class'] = "lawpart span"
    # Add an input node as a first-child for the span.
    node.insert(0,node.makeelement('input',{
        'class': "form-check-inline",
        'type': "radio",
        'name': "section",
        'id': node.attrib['eId'] + "_section"
    }))
    node.getchildren()[0].tail = node.text
    lxml.objectify.ObjectifiedDataElement._setText(node,'')
    # Recursively call generate_text on the contents of the span?
    return

def generate_selector(type,name,text,children,checked=False):
    html = ""
    html += '<div class="lawpart ' + type + '"><div class="form-check">'
    html += '<input class="form-check-input" type="radio" name="section" id="' + name + '_section"'
    if checked:
        html += ' checked'
    html += ">"
    html += '<div class="lawtext"'
    if children:
        html += '><i class="bi bi-caret-right" data-bs-toggle="collapse" data-bs-target="#' + name + '"></i>'
    else:
        html += '>'
    html += text
    html += '</div></div></div>'
    if children:
        html += '<div class="subparts collapse" id="' + name + '">'
    return html

def generate_tree(node,indent=0):
    #TODO Use generate_text for text sections (intro, wrapup, content, etc.)
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
            if node['num'].text:
                initial_text += "<num>" + node['num'].text + "</num>"
        if NS + 'heading' in subtags:
            # print(" "*indent + "Heading: " + node['heading'].text)
            if node['heading'].text:
                initial_text += node['heading'].text
        if NS + 'subheading' in subtags:
            # print(" "*indent + "Subheading: " + node['subheading'].text)
            if node['subheading'].text:
                initial_text += node['subheading'].text

        # Now we need to figure out if this is a leaf node, or not
        # It is a leaf node if it contains a content tag.
        if NS + "content" in subtags: # This is a leaf node
            # the initial text should be added to the HTML as a lawtext part, followed
            # by the content of the internal text elements.
            content_text = ""
            # for sub_content in node['content'].getchildren():
            #     content_text += str(etree.tostring(sub_content).decode("utf-8"))
            generate_text(node['content'])
            content_text = etree.tostring(node['content'], method="html", encoding="utf-8").decode('utf-8')
            # Get a good name for the current node
            node_name =  node.attrib['eId']
            # print(node_name)
            html += generate_selector(node.tag.replace(NS,""),node_name,initial_text + " " + content_text,False)
        else: # This is a node with optional intro and wrapup, and list of sub-elements.
            # If this section has an intro, add the text of the intro to the initial_text
            if NS + "intro" in subtags: # This section has an intro.
                # print(" "*indent + "Intro: " + node['intro'].text)
                generate_text(node['intro'])
                initial_text += etree.tostring(node['intro'], method="html", encoding="utf-8").decode('utf-8')
                # initial_text += node['intro']['p'].text # This is likely fragile for sections that don't use p in the intro.
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
                generate_text(node['wrapup'])
                html += '<div class="lawtext">' + etree.tostring(node['wrapup'], method="html", encoding="utf-8").decode('utf-8') + "</div>"
            # Close the sub-parts
            html += "</div>"
    return html