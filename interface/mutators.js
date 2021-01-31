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

    Blockly.Extensions.register('changeCustomAttributeText', function() {
        this.setOnChange(function(changeEvent) {
          if (this.getFieldValue('order') == "object_first") {
            this.getField('first_element').setValue('object');
            this.getField('second_element').setValue('value');
          } else {
            this.getField('first_element').setValue('value');
            this.getField('second_element').setValue('object');
          }
        });
      });

      CUSTOM_ATTRIBUTE_SELECTOR_MUTATOR_MIXIN = {
      mutationToDom: function() {
          var container = document.createElement('mutation');
          var payload = JSON.parse(this.data);
          var attributeName = payload['attributeName'];
          var attributeType = payload['type'];
          var attributeOrder = payload['order'];
          container.setAttribute('attributename', attributeName);
          container.setAttribute('attributetype', attributeType);
          container.setAttribute('attributeorder', attributeOrder);
          return container;
      },
      domToMutation: function(xmlElement) {
          var attributeName = xmlElement.getAttribute('attributename');
          var attributeType = xmlElement.getAttribute('attributetype');
          var attributeOrder = xmlElement.getAttribute('attributeorder');
          // I "think" that the field values are automatically serialized,
          // as are the words "object" and "value" in the serialized text,
          // so the only thing to do here should be to set the type checking.
          // This should only be done if the object has a type set, which may
          // not have happened yet for new blocks.
          if (attributeType != "undefined") {
            if (attributeOrder == 'object_first') {
                // Change the second input.
                this.getInput('second_entity').connection.setCheck([attributeType,'ENTITY']);
                this.getInput('first_entity').connection.setCheck('ENTITY');
            } else {
                // Change the first input.
                this.getInput('first_entity').connection.setCheck([type,'ENTITY']);
                this.getInput('second_entity').connection.setCheck('ENTITY');
            }
          }
      }
      }
  
      Blockly.Extensions.registerMutator('custom_attribute_selector_mutator', CUSTOM_ATTRIBUTE_SELECTOR_MUTATOR_MIXIN);