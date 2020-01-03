OBJECT_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var objectName = this.getFieldValue('objectName');
        container.setAttribute('objectname', objectName);
        return container;
    },

    domToMutation: function(xmlElement) {
        var objectName = xmlElement.getAttribute('objectname');
        this.updateObjectName(objectName);
    },

    updateObjectName: function(objectName) {
        this.setFieldValue(objectName, 'objectName');
    }
    };

    Blockly.Extensions.registerMutator('object_selector_mutator', OBJECT_SELECTOR_MUTATOR_MIXIN);

    CATEGORY_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var categoryName = this.getFieldValue('categoryName');
        container.setAttribute('categoryname', categoryName);
        return container;
    },

    domToMutation: function(xmlElement) {
        var categoryName = xmlElement.getAttribute('categoryname');
        this.updateCategoryName(categoryName);
    },

    updateCategoryName: function(categoryName) {
        this.setFieldValue(categoryName, 'categoryName');
    }
    }

    Blockly.Extensions.registerMutator('category_selector_mutator', CATEGORY_SELECTOR_MUTATOR_MIXIN);

    ATTRIBUTE_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var attributeName = this.getFieldValue('attributeName');
        var attributeType = this.getInput('value').connection.getCheck()[0];
        container.setAttribute('attributename', attributeName);
        container.setAttribute('attributetype', attributeType);
        return container;
    },
    domToMutation: function(xmlElement) {
        var attributeName = xmlElement.getAttribute('attributename');
        var attributeType = xmlElement.getAttribute('attributetype');
        this.updateAttributeSelector(attributeName,attributeType);
    },

    updateAttributeSelector: function(attributeName,attributeType) {
        this.setFieldValue(attributeName, "attributeName");
        this.getInput('value').setCheck([attributeType,"ENTITY"]);
    }
    }


    Blockly.Extensions.registerMutator('attribute_selector_mutator', ATTRIBUTE_SELECTOR_MUTATOR_MIXIN);