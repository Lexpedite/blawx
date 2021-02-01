---
title: "Question Block"
nav_order: 3
---
# Question Block
![question block]({{ site.baseurl }}/img/question.png "Question Block")

A question block is one of the three main outer blocks in Blawx: Facts, Rules, and Questions.

A question block accepts a list of statements, and asks Blawx whether it
can find any data in the database, either known or derived, that makes all
those statements true.

You can obtain a response to workspace including a question block by choosing "Run Blawx Code"
from the menu.

If there are no variables in the statements, it is a "yes/no" question, and will
be answered only "Yes" or "No."

If there are variables in the statements, Blawx will answer "Yes" if it knows
or can derive any facts that would make those statements true, and then it
will tell you which facts they were. This is a "search" question.

If Blawx cannot find or derive any facts
that make the statements in a "search" question true, it will answer simply "No."

If there are variables in your question that you do not want to be displayed as a part of
the answer, you can use a [silent variable block](/docs/blocks/silent_variable).

If all variables in the statement are silent, the question block will be treated as a "yes/no" question.

**Note:** Currently, while it is possible to have multiple queries in a workspace, when you click "Run Blawx Code" Blawx will only attempt to answer the query which is highest
and furthest to the left on the workspace.