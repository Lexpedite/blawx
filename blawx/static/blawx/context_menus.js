const customizeDisplayMenuItem = {
    displayText: 'Customize Display',
    preconditionFn: function(scope) {
        if (scope.block.type == "attribute_declaration" || scope.block.type == "category_declaration") {
            return 'enabled';
        } else {
            return 'hidden';
        }
    },
    callback: function(scope) {
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'customize_display',
    weight: 0,
  };
// Blockly.ContextMenuRegistry.registry.register(customizeDisplayMenuItem);

const advancedDefeasibilityMenuItem = {
    displayText: 'Advanced...',
    preconditionFn: function(scope) {
        if (scope.block.type == "unattributed_rule") {
            return 'enabled';
        } else {
            return 'hidden';
        }
    },
    callback: function(scope) {
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'advanced_defeasibility',
    weight: 0,
  };
// Blockly.ContextMenuRegistry.registry.register(advancedDefeasibilityMenuItem);