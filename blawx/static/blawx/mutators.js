function blawxTypeToBlocklyType(blawxType) {
    if (blawxType == 'boolean') {
      return 'Boolean';
    } else if (blawxType == "number") {
      return 'Number';
    } else if (blawxType == "Text") {
      return 'String';
    } else if (blawxType == "date") {
      return 'DATE';
    } else if (blawxType == "datetime") {
      return 'DATETIME';
    } else if (blawxType == "time") {
      return "TIME";
    } else if (blawxType == "duration") {
      return "DURATION";
    } else if (blawxType == "list") {
      return "LIST";
    } else {
      return 'OBJECT';
    }
  }

OBJECT_DECLARATION_MUTATOR_MIXIN = {
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var category_name = this.blawxCategoryName;
    var prefix = this.blawxPrefix;
    var postfix = this.blawxPostfix;
    container.setAttribute('category_name', category_name);
    container.setAttribute('prefix',prefix);
    container.setAttribute('postfix',postfix);
    return container;
  },

  domToMutation: function(xmlElement) {
    var category_name = xmlElement.getAttribute('category_name');
    var prefix = xmlElement.getAttribute('prefix');
    var postfix = xmlElement.getAttribute('postfix');
    this.blawxCategoryName = category_name;
    this.blawxPrefix = prefix;
    this.blawxPostfix = postfix;
  }
}


Blockly.Extensions.registerMutator('object_declaration_mutator', OBJECT_DECLARATION_MUTATOR_MIXIN);

OBJECT_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var objectName = this.getFieldValue('object_name');
        container.setAttribute('objectname', objectName);
        return container;
    },

    domToMutation: function(xmlElement) {
        var objectName = xmlElement.getAttribute('objectname');
        this.updateObjectName(objectName);
    },

    updateObjectName: function(objectName) {
        this.setFieldValue(objectName, 'object_name');
    }
    };

    Blockly.Extensions.registerMutator('object_selector_mutator', OBJECT_SELECTOR_MUTATOR_MIXIN);

CATEGORY_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var categoryName = this.getFieldValue('category_name');
        container.setAttribute('category_name', categoryName);
        return container;
    },

    domToMutation: function(xmlElement) {
        var categoryName = xmlElement.getAttribute('category_name');
        this.updateCategoryName(categoryName);
    },

    updateCategoryName: function(categoryName) {
        this.setFieldValue(categoryName, 'category_name');
    }
    }

    Blockly.Extensions.registerMutator('category_selector_mutator', CATEGORY_SELECTOR_MUTATOR_MIXIN);

ATTRIBUTE_DECLARATION_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var attributeName = this.getFieldValue('attribute_name');
        var attributeType = this.getInput('attribute_type').connection.getCheck()[0];
        container.setAttribute('attribute_name', attributeName);
        container.setAttribute('attribute_type', attributeType);
        return container;
    },
    domToMutation: function(xmlElement) {
        var attributeName = xmlElement.getAttribute('attribute_name');
        var attributeType = xmlElement.getAttribute('attribute_type');
    },
    }


Blockly.Extensions.registerMutator('attribute_declaration_mutator', ATTRIBUTE_DECLARATION_MUTATOR_MIXIN);

Blockly.Extensions.register('changeAttributeDisplayText', function() {
    this.setOnChange(function(changeEvent) {
        if (this.getFieldValue('order') == "ov") {
        this.getField('first_element').setValue('object');
        this.getField('second_element').setValue('value');
        } else {
        this.getField('first_element').setValue('value');
        this.getField('second_element').setValue('object');
        }
    });
    });

ATTRIBUTE_SELECTOR_MUTATOR_MIXIN = {
      mutationToDom: function() {
        //   console.log("Saving : " + this.blawxAttributeName + ", " + this.blawxAttributeType + ", " + this.blawxAttributeOrder)
          var container = document.createElement('mutation');
          container.setAttribute('attributename', this.blawxAttributeName);
          container.setAttribute('attributetype', this.blawxAttributeType);
          container.setAttribute('attributeorder', this.blawxAttributeOrder);
          return container;
      },
      domToMutation: function(xmlElement) {
          var attributeName = xmlElement.getAttribute('attributename');
          var attributeType = xmlElement.getAttribute('attributetype');
          var attributeOrder = xmlElement.getAttribute('attributeorder');
          this.blawxAttributeName = attributeName;
          this.blawxAttributeType = attributeType;
          this.blawxAttributeOrder = attributeOrder;

          // I "think" that the field values are automatically serialized,
          // as are the words "object" and "value" in the serialized text,
          // so the only thing to do here other than collecting the hidden
          // data should be to set the type checking.
          // This should only be done if the object has a type set, which may
          // not have happened yet for new blocks.
          if (attributeType) {
            if (attributeOrder == 'ov') {
                // Change the second input.
                this.getInput('second_element').connection.setCheck([blawxTypeToBlocklyType(attributeType),'VARIABLE']);
                this.getInput('first_element').connection.setCheck(['OBJECT','VARIABLE']);
            } else {
                // Change the first input.
                this.getInput('first_element').connection.setCheck([blawxTypeToBlocklyType(attributeType),'VARIABLE']);
                this.getInput('second_element').connection.setCheck(['OBJECT','VARIABLE']);
            }
          }
      }
      }
  
Blockly.Extensions.registerMutator('attribute_selector_mutator', ATTRIBUTE_SELECTOR_MUTATOR_MIXIN);

UNARY_ATTRIBUTE_SELECTOR_MUTATOR_MIXIN = {
  mutationToDom: function() {
    //   console.log("Saving : " + this.blawxAttributeName + ", " + this.blawxAttributeType + ", " + this.blawxAttributeOrder)
      var container = document.createElement('mutation');
      container.setAttribute('attributename', this.blawxAttributeName);
      container.setAttribute('attributetype', this.blawxAttributeType);
      return container;
  },
  domToMutation: function(xmlElement) {
      var attributeName = xmlElement.getAttribute('attributename');
      var attributeType = xmlElement.getAttribute('attributetype');
      this.blawxAttributeName = attributeName;
      this.blawxAttributeType = attributeType;
  }
  }

Blockly.Extensions.registerMutator('unary_attribute_selector_mutator', UNARY_ATTRIBUTE_SELECTOR_MUTATOR_MIXIN);

RULE_SELECTOR_MUTATOR_MIXIN = {
  mutationToDom: function() {
      var container = document.createElement('mutation');
      // var section_reference = this.getFieldValue('section_reference');
      container.setAttribute('section_reference', this.section_reference);
      return container;
  },

  domToMutation: function(xmlElement) {
      var section_reference = xmlElement.getAttribute('section_reference');
      this.section_reference = section_reference;
  }
  }

  Blockly.Extensions.registerMutator('rule_selector_mutator', RULE_SELECTOR_MUTATOR_MIXIN);


// Blockly.Extensions.register('changeCategoryDisplayText', function() {
//   this.setOnChange(function(changeEvent) {
//       if (this.getFieldValue('order') == "oc") {
//       this.getField('first_element').setValue('object');
//       this.getField('second_element').setValue('category');
//       } else {
//       this.getField('first_element').setValue('category');
//       this.getField('second_element').setValue('object');
//       }
//   });
//   });



function onCategoryChange(event) {
  if (event.type == Blockly.Events.BLOCK_CHANGE || event.type == Blockly.Events.BLOCK_DELETE || event.type == Blockly.Events.BLOCK_CREATE) {
    updateLocalCategories();
  }
}