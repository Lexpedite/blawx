---
title: User Interface Tour
---
# Blawx User Interface Tour
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Workspace Components
In Blawx you encode laws by sticking puzzle pieces together on a table. The table is called your “workspace”. The place you grab the puzzle pieces from is called the “toolbox.”

In the picture below, the area on the left is the toolbox, and the area on the right is the workspace.

![workspace]({{ site.baseurl }}/img/workspace.png "Blawx Workspace")

The toolbox is made up of categories. When you click on a category name, the blocks available in that category are displayed. If the category has sub-categories, a black triangle appears before the name of the category.

Usually, most of the blocks in a category will match the highlight colour on the left side of the category.

At the top of the workspace is a resizeable, transparent area that shows the results received from the Blawx reasoner.

![response area]({{ site.baseurl }}/img/results_area.png "Results Area")

## Blocks
The individual puzzle pieces that you use to encode laws are called “Blocks”, or “Blawx”. Blocks can include information that you can’t change, like the words “is an Object” in the Object Declaration block shown below, and they can include information that you can change, like the word “rock” in the image below.

### Fields

![text field]({{ site.baseurl }}/img/text_field.png "Text Field")

Information that you can change in a block is called a field. The field above is a text field that allows you to type information into it. There are also fields for numbers, which is a text field that you can only type numbers into.

![number field]({{ site.baseurl }}/img/number_field.png "Number Field")

And there are dropdown fields, that allow you to choose one of several options. One example is the true/false block.

![dropdown field]({{ site.baseurl }}/img/dropdown.png "Dropdown Field")

### Connectors
There are two kinds of connectors on the blocks in in Blawx (say that 5 times fast!): “insert” connectors, and “and” connectors. Each has a positive and negative version.

The positive “insert” connector looks like the sticky-outie part of a puzzle piece and sticks out of the left side of the block.

![positive insert connector]({{ site.baseurl }}/img/positive_insert_connector.png "Positive Insert Connector")

Th negative insert connector looks like a “hole” where the positive insert connector would fit. Most of these locations show up as a missing puzzle piece inside a larger block.

![negative insert connector]({{ site.baseurl }}/img/negative_insert_connector.png "Negative Insert Connector")

The size of the hole doesn’t matter, and will expand to fit whatever block connects to it.

Occasionally, the connector is on the outside of another block, like this:

![external insert connector]({{ site.baseurl }}/img/external_insert_connector.png "External Insert Connector")

### When Insert Connectors “Don’t Fit”
Blawx tries to help make sure that you don’t stick things where they don’t belong. So as an example, if you try to stick a number where Blawx is expecting a string, the blocks won’t “fit properly.” Just like when you’re doing a jigsaw puzzle and you’re trying to stick two pieces together that don’t belong together… it just doesn’t quite work.

If you’re trying to insert a block and it “won’t fit”, you are probably trying to insert a block that is of the wrong datatype.

Whenever you use an insert connector, it has the same meaning as “filling in the blank”. Most blocks will not work if any of their negative insert connectors are empty. If there’s a blank, you need to fill it.

### And Connectors
The “And” connectors, which are show as a divot (negative) on the top of a block and a bump (positive) on the bottom of a block.

Blocks with “and” connectors can be stacked with each other vertically. When you stack two things vertically using the “and” connector, that has the same effect as using an And block.

So this:

![vertical stack and]({{ site.baseurl }}/img/vertical_stack_image.png "Vertical Stack And")

Means exactly the same thing as this:

![and block]({{ site.baseurl }}/img/and_block_version.png "And Block")

You can see that the And block has four and connectors. It has a negative on the top and a positive on the bottom, so it can be stacked with other blocks that have and connectors. But it also has positive And connectors on the inside of two “holes” on the right side.

These connectors show that a stack of and-connected blocks is expected here. These are “internal” and connectors. A block usually won’t work properly if it has any internal And connectors that are left empty.

An external And connector with nothing attached to it doesn’t do anything, and you don’t have to connect anything to it.

You also don’t need to worry about and connectors not fitting. All blocks with an and connector can connect to all other blocks with an and connector.

### Keeping Connected: Outer Blocks
For your encoding to work, all of the blocks need to be connected to an outer block that has no empty connectors. The outer blocks are facts, rules, and queries, and look like this:

![outer blocks]({{ site.baseurl }}/img/outer_blocks.png "Outer Blocks")

The Facts and Query blocks have only one And connector. The Rule query has two. All of them must be connected to a stack of blocks to work properly. And all blocks with connectors must be attached to (or attached to something that is attached to) an outer block with no empty connectors.

So if you have blocks hanging around with empty negative and connectors, that won’t work. But if you put them inside an outer block, it will.

What Fact, Rule, and Query blocks actually do is discussed here.

We say “blocks with connectors” must be attached to outer blocks, because there are some blocks that do not have connectors, and are allowed to stand alone in the workspace. An example is the “Include” block.

![include]({{ site.baseurl }}/img/no_connectors.png "Include Block")

So you have well formed code if there are only full outer blocks, and blocks with no connections in the workspace.

## Navigating the Blawx User Interface

### Scrolling
The size of the workspace increases as necessary for however many blocks you add to it. If you can’t see all the blocks on the workspace, you can scroll around the workspace using the vertical and horizontal scroll bars.

![workspace]({{ site.baseurl }}/img/workspace.png "Blawx Workspace")

You can also scroll the workspace by dragging any empty part of the workspace.

### Dragging Blocks
You drag blocks from the toolbox to the workspace in order to add them to your code, and you drag them around the workspace in order to connect them to one another.

Dragging a block in a vertical stack will drag that block and any blocks that are connected below it, but not blocks above it or blocks containing it.

Dragging a block will drag blocks contained in it.

Because of the different ways in which dragging behaves, it’s important to know which block is currently selected. For that reason, the currently selected block is highlighted with an orange boundary.

![block highlighting]({{ site.baseurl }}/img/block_highlighting.png "Block Highlighting")

### Keyboard Navigation

For accessibility and convenience, Blawx offers keyboard navigation so that it
can be used without a mouse.

To enable keyboard navigation, press `SHIFT-CTRL-K` on your keyboard. This will
create a "cursor" that will allow you to navigate your workspace. The cursor can
be at a number of "level," each of which is nested inside the workspace.

1. Workspace
   1. Top-Level Blocks
      1. Individual Block
         1. Connector
            1. Sub-Block
         2. Field

A "top-level block" means a block that is not connected above, or on the left,
to another block, which is different from an "outer block", which is a block that
has no top or left-side connectors.

Navigation is done using the `WASD` keys that you are familiar with from video games.

At each level, pressing `D` on your keyboard takes you "in" to a deeper level. So for example, pressing D while a connector is highlighted will take you to the block that is attached to that connector.

At each level, pressing `A` takes you "out" to a shallower level, with the most
shallow level being the workspace itself.

At each level, pressing `W` takes you "up" among the options, and pressing `S` takes you down among the options.

When you are on the workspace level, holding the `Shift` key while using `WASD`
allows you to navigate through the workspace in two dimensions to be able to
choose arbitrary places as targets.

Pressing the `Enter` key while on a location on the workspace,
or a connector, means "select this as the target."

Pressing `I` means "insert", or "move this item to the selected target." This
is used both to connect blocks and to move them on the workspace.

Pressing `X` while highlighting a connection in a block stack will disconnect
the blocks above and below it.

The layer of naviation you are in is represented by the shape of the cursor.
If you are on the workspace, the cursor is a flat line of fixed length.
If you are navigating
top blocks, an entire stack of blocks is outlined. If you are navigating
inside a top block, one block is highlighted with a "cover". If you are
navigating inside a block, fields will be outlined, and connectors will be
highlighted with a horizontal line.

This is what it looks like when a connector in a rule block is highlighted, and
you have navigated to a new object top block.

![beforemove]({{ site.baseurl }}/img/highlighted_target.png "Highlighted target")

This is what you will see after you press `I` to insert:

![aftermove]({{ site.baseurl }}/img/inserted_block.png "Block Inserted")

More details on keyboard navigation are [available here](https://developers.google.com/blockly/guides/configure/web/keyboard-nav).

### Block Context Menu
If you right-click on a block in the workspace you will get a context menu.

![context menu]({{ site.baseurl }}/img/context_menu.png "Block Context Menu")

#### Duplicate
The Duplicate menu option will make a copy of the block you have selected (and any blocks that are contained in it, but not any blocks it is vertically stacked with), and put it on the workspace.

#### Comments
Adding a comment opens a bubble that you can type extra information into. That information has no effect on the meaning of the blocks, it is just to allow you to add more useful information to the workspace.

Comments are typically used by software developers to explain what a piece of code is supposed to do, and why it is built the way it is, so that if anyone else (or the same person, but after a long period of time) needs to make adjustments later, they can get up to speed more quickly.

That is a very good idea. When encoding legislation, until we add more specific features for it, the comments are also a good place to include information about the source for the rule.

When a block already has a comment, the context menu will allow you to delete it instead. When a block has a comment, that comment can be hidden or shown by clicking on the blue question mark icon that appears on the top left of the block.

![commment]({{ site.baseurl }}/img/comment.png "Comment")

#### Collapsing
Collapsing a block reduces it to one line high, and makes the right side of the block look “torn” to show that it is a collapsed block.

![collapsed]({{ site.baseurl }}/img/collapsed.png "Collapsed Block")

In a collapsed block the context menu will allow you to expand it to its normal size again.

Collapsing blocks can be very helpful when you are dealing with a lot of complicated outer blocks at the same time.

Note that when a block is collapsed you cannot see whether it has a comment.

#### Disabling
A disabled block will change in colour to a cross-hatch pattern. Disabled blocks remain on the workspace, but they do not mean anything. So it does not matter whether a disabled block has unfilled connectors.

![disabled]({{ site.baseurl }}/img/disabled.png "Disabled Blocks")

Disabling a block disables that block and any blocks it contains.

For a disabled block, the context menu will allow you to enable it again.

#### Deleting
Deleting a block removes a block and any blocks it contains from the workspace. If you delete a block in a vertical stack, the blocks above and below will become vertically connected with each other.

The context menu will tell you how many blocks you are about to delete, as shown here:

![context menu delete]({{ site.baseurl }}/img/context_menu_delete.png "Context Menu Delete")

#### Block-Specific Help
If there is a help page for the specific kind of block you are using, the Help item in the context menu will take you to that help page. If there isn’t, it will be disabled.

The help context menu is also the only item that is available when you right click on a block in the toolbox.

![context menu toolbox]({{ site.baseurl }}/img/context_menu_in_toolbox.png "Context Menu Toolbox")

### Workspace Context Menu
There is also a context menu that you can access by right-clicking on an empty part of the workspace.

![workspace context menu]({{ site.baseurl }}/img/workspace_context_menu.png "Workspace Context Menu")

#### Undo and Redo
If you make a mistake, you can use the Undo and Redo commands in the workspace context menu to get things back to how they were before the mistake.

#### Clean Up Blocks
Cleaning up blocks will cause all the blocks in the workspace to be organized in a single vertical column along the left side of the workspace. This can be useful if your workspace has gotten out of control.

#### Collapse and Expand Blocks
Collapsing and expanding blocks from the workspace context menu does it to all the blocks in the workspace.

#### Delete All
Deleting blocks from the workspace context menu will delete all the blocks in the workspace, and has the same effect as using the Menu, Clear Workspace command.

### Keyboard Shortcuts
`CTRL-C` will copy the currently selected block and any blocks that would move with it if you dragged it.

`CTRL-V` will pase the most recently copied blocks slightly below and to the right of where it was copied (which may not be where you are looking).

The `Delete` key will delete the currently selected block and any blocks it contains.

`CTRL-Z` will undo the most recent change to the workspace.

### Trash Can
The trash can is located in the bottom right of the workspace, no matter where you scroll.

![trash can]({{ site.baseurl }}/img/trash.png "Trash Can")


Dragging a block to the trash can deletes it from the workspace.

Clicking on the trash can will open the trash can and allow you to drag blocks that were deleted back into the workspace.

![open trash can]({{ site.baseurl }}/img/open_trash.png "Open Trash Can")

### The Toolbox Command Menu
Commands that you can run on an entire workspace are located in the “Menu” section of the Toolbox.

![menu]({{ site.baseurl }}/img/menu.png "Command Menu")

#### Clear Workspace
The Clear Workspace command will delete all of the blocks in the current workspace.

#### Load Workspace
The Load Workspace command will let you choose a local .blawx file to open as the current workspace. If you load a workspace with unsaved changes to the current workspace, those changes will be lost.

#### Save Workspace
The Save Workspace command will allow you to save the current workspace to a local .blawx file.

#### Run Blawx Code
The Run Blawx Code command sends the current workspace to the Blawx reasoner and displays the results in the reasoner output area.

#### Help
The Help command brings you to the Support section of Blawx.com.